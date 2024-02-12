import { navigate, onNavigation, onRouteError, onRouteResolve } from '@dolanske/crumbs'
import type { Component } from '@dolanske/cascade'
import { El, getInstance } from '@dolanske/cascade'
import { RouterLink } from './link'
import type { Route } from './pantry'
import { createApp } from './pantry'

// type $ = typeof El

const $: typeof El = El

export {
  RouterLink,
  createApp,
  // Crumbs
  onRouteError,
  onRouteResolve,
  onNavigation,
  navigate,
  // Cascade
  $,
  getInstance,

  // Types
  type Route,
  type Component,
  // type El,
}
