import { navigate as k, defineRouter as w, onRouteResolve as y, onRouteError as g } from "@dolanske/crumbs";
import { navigate as j, onNavigation as D, onRouteError as I, onRouteResolve as L } from "@dolanske/crumbs";
import { El as h, Component as E } from "@dolanske/cascade";
import { El as O, getInstance as _ } from "@dolanske/cascade";
function V(u, a) {
  return h.a().setup((n) => {
    n.attr("href", u), n.nest(a), n.click((s) => {
      s.preventDefault(), k(u);
    });
  });
}
function m() {
}
function $(u) {
  const a = {}, n = {}, s = {};
  for (const [o, t] of Object.entries(u)) {
    const r = "<div route-boundary>";
    if (t instanceof E)
      a[o] = t, s[o] = {
        html: r
      };
    else {
      const { loader: e, title: c, default: v, fallback: R, component: b } = t;
      a[o] = b, s[o] = {
        loader: e,
        title: c,
        default: v,
        html: r
      }, R && (n[o] = R);
    }
  }
  const f = w(s);
  let p = m, d = m, l, i;
  return {
    run: (o) => {
      p = y((t) => {
        l && l.destroy();
        const r = a[t.path];
        if (r) {
          const e = r.clone();
          e.props({
            $data: t.data,
            $params: t.params
          }), e.mount("[route-boundary]"), l = e;
        }
      }), d = g((t, r) => {
        if (!t) {
          console.warn("Attempted to navigate to a route that does not exist"), console.error(r);
          return;
        }
        i && i.destroy();
        const e = n[t.path];
        if (e) {
          const c = e.clone();
          c.mount("route-boundary"), i = c;
        }
      }), f.run(o);
    },
    stop: () => {
      f.stop(), p(), d(), l && l.destroy(), i && i.destroy();
    }
  };
}
export {
  O as $,
  V as RouterLink,
  $ as createApp,
  _ as getInstance,
  j as navigate,
  D as onNavigation,
  I as onRouteError,
  L as onRouteResolve
};
