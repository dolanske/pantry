import { Component } from '@dolanske/cascade';
import type { Route as Route_2 } from '@dolanske/crumbs';

export declare function createApp(routes: Router): {
    run: (selector: string) => void;
    stop: () => void;
};

export declare interface Route {
    component: Component;
    loader?: Route_2['loader'];
    title?: Route_2['title'];
    default?: Route_2['default'];
    fallback?: Component;
}

declare type Router = Record<string, Route | Component>;

export { }
