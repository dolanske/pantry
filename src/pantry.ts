import type { Route as CrumbRoute, Router as CrumbRouter } from '@dolanske/crumbs'
import { defineRouter, onRouteError, onRouteResolve } from '@dolanske/crumbs'
import { Component } from '@dolanske/cascade'

/**
 * TODO
 *
 * [] Add loaderFallback to Route interface
 * [] Rename fallback in Route interface to errorFallback
 */

function noop() { }

export type PropType<LoaderData, ComponentProps extends object = object> = LoaderProps<LoaderData> & ComponentProps

type BaseRouteProps = PropType<object, object> | object

export interface Route {
  component: Component<any>
  loader?: CrumbRoute['loader']
  title?: CrumbRoute['title']
  default?: CrumbRoute['default']
  fallback?: Component<any>
}

export interface LoaderProps<D> {
  $params: Record<string, string>
  $data: D
}

type Router = Record<string, Route | Component<BaseRouteProps>>

export function createApp(routes: Router) {
  const RouterViews: Record<string, Component<BaseRouteProps>> = {}
  const RouteFallbacks: Record<string, Component<BaseRouteProps>> = {}
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

  let prevView: Component<BaseRouteProps> | undefined
  let prevFallback: Component<BaseRouteProps> | undefined
  let globalErrorFallback: Component<BaseRouteProps> | undefined

  return {
    run: (selector: string) => {
      // Watch for when new route is navigated into and then render Cascade app into its wrapper
      onResolveRelease = onRouteResolve((route) => {
        if (prevView) {
          prevView.el.replaceChildren()
          prevView.destroy()
        }

        const newView = RouterViews[route.path]
        if (newView) {
          const view = newView.clone()
          // If route contained a loader, set the data as a prop
          view.props({
            $data: route.data,
            $params: route.params,
          })

          view.mount('[route-boundary]')
          prevView = view
        }
      })

      onErrorRelease = onRouteError((route, error) => {
        let newFallback: Component<BaseRouteProps> | undefined

        if (prevFallback) {
          prevFallback.el.replaceChildren()
          prevFallback.destroy()
        }

        if (!route) {
          console.warn('Attempted to navigate to a route that does not exist')
          console.error(error)
          newFallback = globalErrorFallback
        }
        else {
          newFallback = RouteFallbacks[route.path]
        }

        if (newFallback) {
          const fallback = newFallback.clone()

          fallback.mount('route-boundary')
          prevFallback = fallback
        }
      })

      router.run(selector)
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
    errorFallback: (component: Component<BaseRouteProps>) => {
      globalErrorFallback = component
    },
  }
}
