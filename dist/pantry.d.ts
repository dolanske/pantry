import { Component, El, reusable as re } from '@dolanske/cascade';
import type { Route as Route_2 } from '@dolanske/crumbs';

//@ts-ignore
declare const $ = El
//@ts-ignore
declare const reusable = re

export declare function createApp(routes: Router): {
    run: (selector: string) => void;
    stop: () => void;
    errorFallback: (component: Component) => void;
};

export declare interface LoaderProps<D> {
    $params: Record<string, string>;
    $data: D;
}

export declare type PropType<LoaderData, ComponentProps extends object = object> = LoaderProps<LoaderData> & ComponentProps;

export declare interface Route {
    component: Component;
    loader?: Route_2['loader'];
    title?: Route_2['title'];
    default?: Route_2['default'];
    fallback?: Component;
}

declare type Router = Record<string, Route | Component>;

export {
    $,
    reusable
}