import { navigate, onNavigation, onRouteError, onRouteResolve } from '@dolanske/crumbs'
import type { Component } from '@dolanske/cascade'
import { El, getInstance } from '@dolanske/cascade'
import { RouterLink } from './link'
import type { Route } from './pantry'
import { createApp } from './pantry'

export {
  RouterLink,
  createApp,
  // Crumbs
  onRouteError,
  onRouteResolve,
  onNavigation,
  navigate,
  // Cascade
  El as $,
  getInstance,

  // Types
  type Route,
  type Component,
}
