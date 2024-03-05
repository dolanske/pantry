import { navigate as h, defineRouter as w, onRouteResolve as y, onRouteError as g } from "@dolanske/crumbs";
import { navigate as D, onNavigation as I, onRouteError as L, onRouteResolve as N } from "@dolanske/crumbs";
import { El as E, Component as F } from "@dolanske/cascade";
import { El as _, getInstance as q, reusable as z } from "@dolanske/cascade";
function V(c, s) {
  return E.a().setup((a) => {
    a.attr("href", c), a.nest(s), a.click((i) => {
      i.preventDefault(), h(c);
    });
  });
}
function m() {
}
function $(c) {
  const s = {}, a = {}, i = {};
  for (const [o, e] of Object.entries(c)) {
    const r = "<div route-boundary>";
    if (e instanceof F)
      s[o] = e, i[o] = {
        html: r
      };
    else {
      const { loader: t, title: u, default: v, fallback: R, component: k } = e;
      s[o] = k, i[o] = {
        loader: t,
        title: u,
        default: v,
        html: r
      }, R && (a[o] = R);
    }
  }
  const f = w(i);
  let p = m, d = m, n, l, b;
  return {
    run: (o) => {
      p = y((e) => {
        n && (n.el.replaceChildren(), n.destroy());
        const r = s[e.path];
        if (r) {
          const t = r.clone();
          t.props({
            $data: e.data,
            $params: e.params
          }), t.mount("[route-boundary]"), n = t;
        }
      }), d = g((e, r) => {
        let t;
        if (l && (l.el.replaceChildren(), l.destroy()), e ? t = a[e.path] : (console.warn("Attempted to navigate to a route that does not exist"), console.error(r), t = b), t) {
          const u = t.clone();
          u.mount("route-boundary"), l = u;
        }
      }), f.run(o);
    },
    stop: () => {
      f.stop(), p(), d(), n && n.destroy(), l && l.destroy();
    },
    errorFallback: (o) => {
      b = o;
    }
  };
}
export {
  _ as $,
  V as RouterLink,
  $ as createApp,
  q as getInstance,
  D as navigate,
  I as onNavigation,
  L as onRouteError,
  N as onRouteResolve,
  z as reusable
};
//# sourceMappingURL=pantry.js.map
