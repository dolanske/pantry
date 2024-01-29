import { navigate as m, defineRouter as v, onRouteResolve as b, onRouteError as h } from "@dolanske/crumbs";
import { onNavigation as j, onRouteError as D, onRouteResolve as F } from "@dolanske/crumbs";
import { El as k, Component as E } from "@dolanske/cascade";
function x(s, r) {
  return k.a().setup((n) => {
    n.attr("href", r), n.nest(s), n.click((a) => {
      a.preventDefault(), m(r);
    });
  });
}
function p() {
}
function y(s) {
  const r = {}, n = {}, a = {};
  for (const [e, t] of Object.entries(s)) {
    const o = "<div route-boundary>";
    if (t instanceof E)
      r[e] = t, a[e] = {
        html: o
      };
    else {
      const { loader: u, title: R, default: d, fallback: f } = t;
      r[e] = t.component, a[e] = {
        loader: u,
        title: R,
        default: d,
        html: o
      }, f && (n[e] = f);
    }
  }
  const l = v(a);
  let i = p, c = p;
  return {
    run: (e) => {
      l.run(e), i = b((t) => {
        const o = r[t.path];
        o.props({ data: t.data }), o && o.mount("[router-boundary]");
      }), c = h((t, o) => {
        if (!t) {
          console.warn("Attempted to navigate to a route that does not exist"), console.error(o);
          return;
        }
        const u = n[t.path];
        u && u.mount("route-boundary");
      });
    },
    stop: () => {
      l.stop(), i(), c();
    }
  };
}
export {
  x as RouterLink,
  y as createApp,
  j as onNavigation,
  D as onRouteError,
  F as onRouteResolve
};
