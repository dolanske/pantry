import { onNavigation, onRouteError, onRouteResolve } from '@dolanske/crumbs'
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
  // Types
  type Route,
}
