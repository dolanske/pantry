import { onNavigation, onRouteError, onRouteResolve } from '@dolanske/crumbs'
import type { Component } from '@dolanske/cascade'
import { El, getInstance } from '@dolanske/cascade'
import { RouterLink } from './link'
import type { Route } from './pantry'
import { createApp } from './pantry'

export {
  RouterLink,
  createApp,
  // Router methods
  onRouteError,
  onRouteResolve,
  onNavigation,
  // Cascade
  El,
  getInstance,

  // Types
  type Route,
  type Component,
}
