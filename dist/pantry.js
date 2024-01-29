import { navigate as v, defineRouter as b, onRouteResolve as h, onRouteError as k } from "@dolanske/crumbs";
import { onNavigation as D, onRouteError as F, onRouteResolve as I } from "@dolanske/crumbs";
import { El as E, Component as g } from "@dolanske/cascade";
import { El as N, getInstance as O } from "@dolanske/cascade";
function y(s, r) {
  return E.a().setup((n) => {
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
    if (t instanceof g)
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
      l.run(e), i = h((t) => {
        const o = r[t.path];
        o.props({ data: t.data }), o && o.mount("[router-boundary]");
      }), c = k((t, o) => {
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
  N as El,
  y as RouterLink,
  A as createApp,
  O as getInstance,
  D as onNavigation,
  F as onRouteError,
  I as onRouteResolve
};
