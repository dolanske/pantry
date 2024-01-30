import type { Route as CrumbRoute, Router as CrumbRouter } from '@dolanske/crumbs'
import { defineRouter, onRouteError, onRouteResolve } from '@dolanske/crumbs'
import { Component } from '@dolanske/cascade'

function noop() { }

export interface Route {
  component: Component
  loader: CrumbRoute['loader']
  title: CrumbRoute['title']
  default: CrumbRoute['default']
  fallback: Component
}

type Router = Record<string, Route | Component>

export function createApp(routes: Router) {
  const RouterViews: Record<string, Component> = {}
  const RouteFallbacks: Record<string, Component> = {}
  const CrumbsRouter: CrumbRouter = {}

  // Serialize base application routes into what crumbs can consume
  for (const [path, route] of Object.entries(routes)) {
    // This router is generic, built for HTML, so within Cascade, we just need to
    // mimic the router paths with an emty div as a router wrapper
    const html = '<div route-boundary>'
    if (route instanceof Component) {
      RouterViews[path] = route
      CrumbsRouter[path] = {
        html,
      }
    }
    else {
      const { loader, title, default: _default, fallback, component } = route
      RouterViews[path] = component
      CrumbsRouter[path] = {
        loader,
        title,
        default: _default,
        html,
      }

      if (fallback)
        RouteFallbacks[path] = fallback
    }
  }

  const router = defineRouter(CrumbsRouter)

  // Store stopper between `run` and `stop` handlers
  let onResolveRelease = noop
  let onErrorRelease = noop

  let prevView: Component | undefined
  let prevFallback: Component | undefined

  return {
    run: (selector: string) => {
      router.run(selector)
      // Watch for when new route is navigated into and then render Cascade app into its wrapper
      onResolveRelease = onRouteResolve((route) => {
        if (prevView)
          prevView.destroy()

        const newView = RouterViews[route.path]
        if (newView) {
          const view = structuredClone(newView)
          // If route contained a loader, set the data as a prop
          view.props({
            $data: route.data,
            $params: route.params,
          })

          view.mount('[router-boundary]')
          prevView = view
        }
      })

      // TODO: add global fallback?
      onErrorRelease = onRouteError((route, error) => {
        if (!route) {
          console.warn('Attempted to navigate to a route that does not exist')
          console.error(error)
          return
        }

        if (prevFallback)
          prevFallback.destroy()

        const newFallback = RouteFallbacks[route.path]
        if (newFallback) {
          const fallback = structuredClone(newFallback)

          fallback.mount('route-boundary')
          prevFallback = fallback
        }
      })
    },
    stop: () => {
      router.stop()
      onResolveRelease()
      onErrorRelease()
      if (prevView)
        prevView.destroy()
      if (prevFallback)
        prevFallback.destroy()
    },
  }
}
