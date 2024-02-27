import { navigate as w, defineRouter as y, onRouteResolve as g, onRouteError as E } from "@dolanske/crumbs";
import { navigate as D, onNavigation as I, onRouteError as L, onRouteResolve as N } from "@dolanske/crumbs";
import { El as h, Component as F } from "@dolanske/cascade";
import { El as _, getInstance as q, reusable as z } from "@dolanske/cascade";
function $(u, n) {
  return h.a().setup((a) => {
    a.attr("href", u), a.nest(n), a.click((l) => {
      l.preventDefault(), w(u);
    });
  });
}
function m() {
}
function A(u) {
  const n = {}, a = {}, l = {};
  for (const [o, e] of Object.entries(u)) {
    const r = "<div route-boundary>";
    if (e instanceof F)
      n[o] = e, l[o] = {
        html: r
      };
    else {
      const { loader: t, title: c, default: v, fallback: R, component: k } = e;
      n[o] = k, l[o] = {
        loader: t,
        title: c,
        default: v,
        html: r
      }, R && (a[o] = R);
    }
  }
  const f = y(l);
  let p = m, d = m, s, i, b;
  return {
    run: (o) => {
      p = g((e) => {
        s && s.destroy();
        const r = n[e.path];
        if (r) {
          const t = r.clone();
          t.props({
            $data: e.data,
            $params: e.params
          }), t.mount("[route-boundary]"), s = t;
        }
      }), d = E((e, r) => {
        let t;
        if (i && i.destroy(), e ? t = a[e.path] : (console.warn("Attempted to navigate to a route that does not exist"), console.error(r), t = b), t) {
          const c = t.clone();
          c.mount("route-boundary"), i = c;
        }
      }), f.run(o);
    },
    stop: () => {
      f.stop(), p(), d(), s && s.destroy(), i && i.destroy();
    },
    errorFallback: (o) => {
      b = o;
    }
  };
}
export {
  _ as $,
  $ as RouterLink,
  A as createApp,
  q as getInstance,
  D as navigate,
  I as onNavigation,
  L as onRouteError,
  N as onRouteResolve,
  z as reusable
};
//# sourceMappingURL=pantry.js.map
