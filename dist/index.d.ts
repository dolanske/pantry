import { Children } from '@dolanske/cascade';
import { Component } from '@dolanske/cascade';
import { NavigateOptions } from '@dolanske/crumbs';
import { Route as Route_2 } from '@dolanske/crumbs';

declare type BaseRouteProps = PropType<object, object> | object;

export declare function createApp(routes: Router): {
    run: (selector: string) => void;
    stop: () => void;
    errorFallback: (component: Component<BaseRouteProps>) => void;
};

export declare function Link(href: string, children: Children<object>, options?: NavigateOptions): Component<object>;

declare interface LoaderProps<D> {
    $params: Record<string, string>;
    $data: D;
}

declare type PropType<LoaderData, ComponentProps extends object = object> = LoaderProps<LoaderData> & ComponentProps;

declare interface Route {
    component: Component<any>;
    loader?: Route_2['loader'];
    title?: Route_2['title'];
    default?: Route_2['default'];
    fallback?: Component<any>;
}

declare type Router = Record<string, Route | Component<BaseRouteProps>>;

export { }
