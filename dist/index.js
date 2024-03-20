import { a as h, Component as w } from "@dolanske/cascade";
import { navigate as y, defineRouter as F, onRouteResolve as C, onRouteError as g } from "@dolanske/crumbs";
function A(c, s, i) {
  return h().setup((r) => {
    r.attr("href", c), r.nest(s), r.click((u) => {
      u.preventDefault(), y(c, { props: i });
    });
  });
}
function R() {
}
function $(c) {
  const s = {}, i = {}, r = {};
  for (const [o, e] of Object.entries(c)) {
    const n = "<div route-boundary>";
    if (e instanceof w)
      s[o] = e, r[o] = {
        html: n
      };
    else {
      const { loader: t, title: f, default: k, fallback: m, component: v } = e;
      s[o] = v, r[o] = {
        loader: t,
        title: f,
        default: k,
        html: n
      }, m && (i[o] = m);
    }
  }
  const u = F(r);
  let p = R, d = R, a, l, b;
  return {
    run: (o) => {
      p = C((e) => {
        a && (a.el.replaceChildren(), a.destroy());
        const n = s[e.path];
        if (n) {
          const t = n.clone();
          t.props({
            $data: e.data,
            $params: e.params
          }), t.mount("[route-boundary]"), a = t;
        }
      }), d = g((e, n) => {
        let t;
        if (l && (l.el.replaceChildren(), l.destroy()), e ? t = i[e.path] : (console.warn("Attempted to navigate to a route that does not exist"), console.error(n), t = b), t) {
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
