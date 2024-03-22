import { a as h, Component as w } from "@dolanske/cascade";
import { navigate as y, defineRouter as F, onRouteResolve as C, onRouteError as g } from "@dolanske/crumbs";
function A(c, s, i) {
  return h(s).setup((n) => {
    n.attr("href", c), n.click((u) => {
      u.preventDefault(), y(c, i);
    });
  });
}
function R() {
}
function $(c) {
  const s = {}, i = {}, n = {};
  for (const [o, e] of Object.entries(c)) {
    const r = "<div route-boundary>";
    if (e instanceof w)
      s[o] = e, n[o] = {
        html: r
      };
    else {
      const { loader: t, title: f, default: k, fallback: m, component: v } = e;
      s[o] = v, n[o] = {
        loader: t,
        title: f,
        default: k,
        html: r
      }, m && (i[o] = m);
    }
  }
  const u = F(n);
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
        if (l && (l.el.replaceChildren(), l.destroy()), e ? t = i[e.path] : (console.warn("Attempted to navigate to a route that does not exist"), console.error(r), t = b), t) {
          const f = t.clone();
          f.mount("route-boundary"), l = f;
        }
      }), u.run(o);
    },
    stop: () => {
      u.stop(), p(), d(), a && a.destroy(), l && l.destroy();
    },
    errorFallback: (o) => {
      b = o;
    }
  };
}
export {
  A as Link,
  $ as createApp
};
//# sourceMappingURL=index.js.map
