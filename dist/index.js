import { a as h, Component as w } from "@dolanske/cascade";
import { navigate as y, defineRouter as F, onRouteResolve as C, onRouteError as g } from "@dolanske/crumbs";
function A(i, s) {
  return h().setup((n) => {
    n.attr("href", i), n.nest(s), n.click((c) => {
      c.preventDefault(), y(i);
    });
  });
}
function R() {
}
function $(i) {
  const s = {}, n = {}, c = {};
  for (const [o, e] of Object.entries(i)) {
    const r = "<div route-boundary>";
    if (e instanceof w)
      s[o] = e, c[o] = {
        html: r
      };
    else {
      const { loader: t, title: u, default: k, fallback: m, component: v } = e;
      s[o] = v, c[o] = {
        loader: t,
        title: u,
        default: k,
        html: r
      }, m && (n[o] = m);
    }
  }
  const f = F(c);
  let p = R, d = R, a, l, b;
  return {
    run: (o) => {
      p = C((e) => {
        a && (a.el.replaceChildren(), a.destroy());
        const r = s[e.path];
        if (r) {
          const t = r.clone();
          t.props({
            $data: e.data,
            $params: e.params
          }), t.mount("[route-boundary]"), a = t;
        }
      }), d = g((e, r) => {
        let t;
        if (l && (l.el.replaceChildren(), l.destroy()), e ? t = n[e.path] : (console.warn("Attempted to navigate to a route that does not exist"), console.error(r), t = b), t) {
          const u = t.clone();
          u.mount("route-boundary"), l = u;
        }
      }), f.run(o);
    },
    stop: () => {
      f.stop(), p(), d(), a && a.destroy(), l && l.destroy();
    },
    errorFallback: (o) => {
      b = o;
    }
  };
}
export {
  A as RouterLink,
  $ as createApp
};
//# sourceMappingURL=index.js.map
