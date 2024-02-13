import { navigate, onNavigation, onRouteError, onRouteResolve } from '@dolanske/crumbs'
import type { Component, El } from '@dolanske/cascade'
import { El as $, getInstance } from '@dolanske/cascade'
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
  $,
  // Cascade
  getInstance,
  // Types
  type El,
  type Route,
  type Component,
}
