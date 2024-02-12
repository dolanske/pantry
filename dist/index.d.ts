import { navigate, onNavigation, onRouteError, onRouteResolve } from '@dolanske/crumbs';
import type { Component } from '@dolanske/cascade';
import { El, getInstance } from '@dolanske/cascade';
import { RouterLink } from './link';
import type { Route } from './pantry';
import { createApp } from './pantry';
declare const $: typeof El;
export { RouterLink, createApp, onRouteError, onRouteResolve, onNavigation, navigate, $, getInstance, type Route, type Component, };
