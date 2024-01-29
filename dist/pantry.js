import { navigate as v, defineRouter as b, onRouteResolve as g, onRouteError as h } from "@dolanske/crumbs";
import { navigate as D, onNavigation as F, onRouteError as I, onRouteResolve as L } from "@dolanske/crumbs";
import { El as k, Component as E } from "@dolanske/cascade";
import { El as O, getInstance as V } from "@dolanske/cascade";
function y(s, r) {
  return k.a().setup((n) => {
    n.attr("href", r), n.nest(s), n.click((a) => {
      a.preventDefault(), v(r);
    });
  });
}
function p() {
}
function A(s) {
  const r = {}, n = {}, a = {};
  for (const [e, t] of Object.entries(s)) {
    const o = "<div route-boundary>";
    if (t instanceof E)
      r[e] = t, a[e] = {
        html: o
      };
    else {
      const { loader: u, title: R, default: d, fallback: f, component: m } = t;
      r[e] = m, a[e] = {
        loader: u,
        title: R,
        default: d,
        html: o
      }, f && (n[e] = f);
    }
  }
  const l = b(a);
  let i = p, c = p;
  return {
    run: (e) => {
      l.run(e), i = g((t) => {
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
  O as El,
  y as RouterLink,
  A as createApp,
  V as getInstance,
  D as navigate,
  F as onNavigation,
  I as onRouteError,
  L as onRouteResolve
};
