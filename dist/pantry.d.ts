import type { Route as CrumbRoute } from '@dolanske/crumbs';
import { Component } from '@dolanske/cascade';
export interface Route {
    component: Component;
    loader?: CrumbRoute['loader'];
    title?: CrumbRoute['title'];
    default?: CrumbRoute['default'];
    fallback?: Component;
}
type Router = Record<string, Route | Component>;
export declare function createApp(routes: Router): {
    run: (selector: string) => void;
    stop: () => void;
};
export {};
