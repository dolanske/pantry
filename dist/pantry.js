import { navigate as k, defineRouter as w, onRouteResolve as y, onRouteError as g } from "@dolanske/crumbs";
import { navigate as j, onNavigation as D, onRouteError as I, onRouteResolve as L } from "@dolanske/crumbs";
import { El as h, Component as E } from "@dolanske/cascade";
import { El as O, getInstance as _ } from "@dolanske/cascade";
function F(c, n) {
  return h.a().setup((a) => {
    a.attr("href", n), a.nest(c), a.click((s) => {
      s.preventDefault(), k(n);
    });
  });
}
function m() {
}
function V(c) {
  const n = {}, a = {}, s = {};
  for (const [o, t] of Object.entries(c)) {
    const r = "<div route-boundary>";
    if (t instanceof E)
      n[o] = t, s[o] = {
        html: r
      };
    else {
      const { loader: e, title: i, default: v, fallback: R, component: b } = t;
      n[o] = b, s[o] = {
        loader: e,
        title: i,
        default: v,
        html: r
      }, R && (a[o] = R);
    }
  }
  const f = w(s);
  let p = m, d = m, u, l;
  return {
    run: (o) => {
      f.run(o), p = y((t) => {
        u && u.destroy();
        const r = n[t.path];
        if (r) {
          const e = structuredClone(r);
          e.props({
            $data: t.data,
            $params: t.params
          }), e.mount("[router-boundary]"), u = e;
        }
      }), d = g((t, r) => {
        if (!t) {
          console.warn("Attempted to navigate to a route that does not exist"), console.error(r);
          return;
        }
        l && l.destroy();
        const e = a[t.path];
        if (e) {
          const i = structuredClone(e);
          i.mount("route-boundary"), l = i;
        }
      });
    },
    stop: () => {
      f.stop(), p(), d(), u && u.destroy(), l && l.destroy();
    }
  };
}
export {
  O as El,
  F as RouterLink,
  V as createApp,
  _ as getInstance,
  j as navigate,
  D as onNavigation,
  I as onRouteError,
  L as onRouteResolve
};
