import { navigate as y, defineRouter as k, onRouteResolve as g, onRouteError as h } from "@dolanske/crumbs";
import { navigate as j, onNavigation as D, onRouteError as I, onRouteResolve as L } from "@dolanske/crumbs";
import { El as E, Component as w } from "@dolanske/cascade";
import { El as O, getInstance as _ } from "@dolanske/cascade";
function A(i, r) {
  return E.a().setup((n) => {
    n.attr("href", r), n.nest(i), n.click((a) => {
      a.preventDefault(), y(r);
    });
  });
}
function R() {
}
function F(i) {
  const r = {}, n = {}, a = {};
  for (const [o, t] of Object.entries(i)) {
    const e = "<div route-boundary>";
    if (t instanceof w)
      r[o] = t, a[o] = {
        html: e
      };
    else {
      const { loader: l, title: m, default: v, fallback: d, component: b } = t;
      r[o] = b, a[o] = {
        loader: l,
        title: m,
        default: v,
        html: e
      }, d && (n[o] = d);
    }
  }
  const f = k(a);
  let c = R, p = R, s, u;
  return {
    run: (o) => {
      f.run(o), c = g((t) => {
        const e = structuredClone(r[t.path]);
        e.props({
          $data: t.data,
          $params: t.params
        }), e && (s && s.destroy(), e.mount("[router-boundary]"), s = e);
      }), p = h((t, e) => {
        if (!t) {
          console.warn("Attempted to navigate to a route that does not exist"), console.error(e);
          return;
        }
        const l = structuredClone(n[t.path]);
        l && (u && u.destroy(), l.mount("route-boundary"), u = l);
      });
    },
    stop: () => {
      f.stop(), c(), p(), s && s.destroy(), u && u.destroy();
    }
  };
}
export {
  O as El,
  A as RouterLink,
  F as createApp,
  _ as getInstance,
  j as navigate,
  D as onNavigation,
  I as onRouteError,
  L as onRouteResolve
};
