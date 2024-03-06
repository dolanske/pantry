let j = [], z = "", $;
function Re(e) {
  Object.freeze(e);
  const t = Object.entries(e).map(([s, i]) => typeof i == "string" ? {
    html: i,
    renderedHtml: V(i),
    path: s
  } : {
    ...i,
    path: s,
    renderedHtml: V(i.html)
  });
  j = t;
  function n(s) {
    H(s.state.path);
  }
  return {
    /**
     * Start the router.
     *
     * @param selector DOM selector
     */
    run: (s) => {
      z = s, window.addEventListener("popstate", n), fe(), H(Ce(t));
    },
    /**
     * Stops the router. Navigation will no longer work.
     */
    stop() {
      window.removeEventListener("popstate", n);
    }
  };
}
function Ce(e) {
  let t;
  if (e.find((n) => ee(n.path, location.pathname)))
    return location.pathname;
  if (t = e.find((n) => n.default || n.path === "/"), t || (t = e.sort((n, s) => n.path.length - s.path.length)[0], t))
    return t.path;
  throw new Error("No default route found. Please define one by settings its path to `/` or adding the `default` property to the route definitions. Note, it is not possible to set dynamic routes as default routes.");
}
function V(e) {
  return e instanceof Element ? e : new DOMParser().parseFromString(e, "text/html").body.firstElementChild;
}
function he() {
  if (!z)
    throw new Error("No root selector found. Did you start the router?");
  const e = document.querySelector(z);
  if (!e)
    throw new Error("Invalid root node selector. Please select a valid HTML element.");
  return e;
}
function ne(e) {
  const [t, n] = Object.entries(e)[0];
  return j.find((s) => {
    var i;
    switch (t) {
      case "path":
      case "html":
      case "title":
        return s[t] === n;
      case "startsWith":
        return s.path.startsWith(n);
      case "renderedHtml":
        return (i = s.renderedHtml) == null ? void 0 : i.isEqualNode(n);
      default:
        return null;
    }
  });
}
function ee(e, t) {
  if (e === t)
    return !0;
  const n = e.split("/"), s = t.split("/");
  return n.every((i, r) => i.startsWith(":") ? !0 : i === s[r]);
}
function se(e, t) {
  const n = t.find((o) => ee(o.path, e));
  if (!n)
    throw new Error(`No matching route found for the path "${e}"`);
  const s = n.path.split("/"), i = e.split("/"), r = {};
  for (let o = 0; o < s.length; o++) {
    const c = s[o];
    if (!c || !c.startsWith(":"))
      continue;
    const l = c.substring(1), p = i[o];
    r[l] = p;
  }
  return {
    resolvedPath: e,
    sourcePath: n.path,
    params: r
  };
}
function fe() {
  var e;
  const t = he().querySelectorAll("a[link]");
  for (const n of t) {
    const s = (e = n.getAttributeNode("href")) == null ? void 0 : e.value;
    s && n.addEventListener("click", (i) => {
      i.preventDefault(), j.some((r) => ee(r.path, s)) && H(s, !0);
    });
  }
}
async function H(e, t) {
  const n = new Promise(async (s, i) => {
    const {
      resolvedPath: r,
      sourcePath: o,
      params: c
    } = se(e, j), l = ne({ path: o });
    if (!l)
      return i(new Error("Invalid path. Could not match route."));
    let p = V(l.html);
    Ne({ ...l, path: e, renderedHtml: p }) === !1 && s(null);
    let h;
    l.loader && (h = await l.loader(c).then((f) => f).catch((f) => l.fallback ? (p = V(l.fallback), null) : i(new Error(f)))), $ = {
      ...l,
      path: o,
      resolvedPath: r,
      renderedHtml: p,
      params: c,
      data: h
    }, t ? history.replaceState({ path: e }, "", r) : history.pushState({ path: e }, "", r), he().replaceChildren($.renderedHtml), fe(), l.title && (document.title = l.title), je($), s($);
  });
  return n.catch((s) => {
    const i = ne({ path: e });
    if (i) {
      const { sourcePath: r } = se(e, j);
      ie({ ...i, path: r, renderedHtml: null }, s);
    } else
      ie(null, s);
  }), n;
}
const R = {}, B = /* @__PURE__ */ new Set();
function Mt(e, t) {
  if (typeof e == "string") {
    if (!t)
      return;
    R[e] || (R[e] = /* @__PURE__ */ new Set()), R[e].add(t);
  } else
    e && B.add(e);
  return () => {
    typeof e == "string" ? t && R[e].delete(t) : B.delete(e);
  };
}
function Ne(e) {
  for (const n of B)
    n(e);
  const t = R[e.path];
  if (t)
    for (const n of t)
      n(e);
}
const C = {}, G = /* @__PURE__ */ new Set();
function Ie(e, t) {
  return typeof e == "string" ? t && (C[e] || (C[e] = /* @__PURE__ */ new Set()), C[e].add(t)) : G.add(e), () => {
    typeof e == "string" ? t && C[e].delete(t) : G.delete(e);
  };
}
function je(e) {
  for (const n of G)
    n(e);
  const t = C[e.path];
  if (t)
    for (const n of t)
      n(e);
}
const N = {}, U = /* @__PURE__ */ new Set();
function Pe(e, t) {
  return typeof e == "string" ? t && (N[e] || (N[e] = /* @__PURE__ */ new Set()), N[e].add(t)) : U.add(e), () => {
    typeof e == "string" ? t && N[e].delete(t) : U.delete(e);
  };
}
function ie(e, t) {
  for (const n of U)
    n(e, t);
  if (e) {
    const n = N[e.path];
    if (n)
      for (const s of n)
        s(e, t);
  }
}
/**
* @vue/shared v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const de = () => {
}, pe = Object.assign, ye = Array.isArray, S = (e) => typeof e == "function", Ae = (e) => typeof e == "symbol", ve = (e) => e !== null && typeof e == "object", xe = (e) => (ve(e) || S(e)) && S(e.then) && S(e.catch), X = (e, t) => !Object.is(e, t);
/**
* @vue/reactivity v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function $e(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let g;
class Me {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = g, !t && g && (this.index = (g.scopes || (g.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = g;
      try {
        return g = this, t();
      } finally {
        g = n;
      }
    } else
      process.env.NODE_ENV !== "production" && $e("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    g = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    g = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function me(e) {
  return new Me(e);
}
function Te(e, t = g) {
  t && t.active && t.effects.push(e);
}
let I;
class ge {
  constructor(t, n, s, i) {
    this.fn = t, this.trigger = n, this.scheduler = s, this.active = !0, this.deps = [], this._dirtyLevel = 2, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Te(this, i);
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      He();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (Ve(n.computed), this._dirtyLevel >= 2))
          break;
      }
      this._dirtyLevel < 2 && (this._dirtyLevel = 0), qe();
    }
    return this._dirtyLevel >= 2;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 2 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = O, n = I;
    try {
      return O = !0, I = this, this._runnings++, re(this), this.fn();
    } finally {
      oe(this), this._runnings--, I = n, O = t;
    }
  }
  stop() {
    var t;
    this.active && (re(this), oe(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function Ve(e) {
  return e.value;
}
function re(e) {
  e._trackId++, e._depsLength = 0;
}
function oe(e) {
  if (e.deps && e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      _e(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function _e(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let O = !0, J = 0;
const be = [];
function He() {
  be.push(O), O = !1;
}
function qe() {
  const e = be.pop();
  O = e === void 0 ? !0 : e;
}
function We() {
  J++;
}
function Fe() {
  for (J--; !J && K.length; )
    K.shift()();
}
function ze(e, t, n) {
  var s;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const i = e.deps[e._depsLength];
    i !== t ? (i && _e(i, e), e.deps[e._depsLength++] = t) : e._depsLength++, process.env.NODE_ENV !== "production" && ((s = e.onTrack) == null || s.call(e, pe({ effect: e }, n)));
  }
}
const K = [];
function Be(e, t, n) {
  var s;
  We();
  for (const i of e.keys())
    if (i._dirtyLevel < t && e.get(i) === i._trackId) {
      const r = i._dirtyLevel;
      i._dirtyLevel = t, r === 0 && (i._shouldSchedule = !0, process.env.NODE_ENV !== "production" && ((s = i.onTrigger) == null || s.call(i, pe({ effect: i }, n))), i.trigger());
    }
  we(e), Fe();
}
function we(e) {
  for (const t of e.keys())
    t.scheduler && t._shouldSchedule && (!t._runnings || t.allowRecurse) && e.get(t) === t._trackId && (t._shouldSchedule = !1, K.push(t.scheduler));
}
const Ge = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
};
Symbol(process.env.NODE_ENV !== "production" ? "iterate" : "");
Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ae)
);
function M(e) {
  return Ue(e) ? M(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ue(e) {
  return !!(e && e.__v_isReadonly);
}
function Xe(e) {
  return !!(e && e.__v_isShallow);
}
function q(e) {
  const t = e && e.__v_raw;
  return t ? q(t) : e;
}
class Ee {
  constructor(t, n, s, i) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new ge(
      () => t(this._value),
      () => F(this, 1),
      () => this.dep && we(this.dep)
    ), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = s;
  }
  get value() {
    const t = q(this);
    return (!t._cacheable || t.effect.dirty) && X(t._value, t._value = t.effect.run()) && F(t, 2), Ke(t), t.effect._dirtyLevel >= 1 && F(t, 1), t._value;
  }
  set value(t) {
    this._setter(t);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
  // #endregion
}
function Je(e, t, n = !1) {
  let s, i;
  const r = S(e);
  r ? (s = e, i = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : de) : (s = e.get, i = e.set);
  const o = new Ee(s, i, r || !i, n);
  return process.env.NODE_ENV !== "production" && t && !n && (o.effect.onTrack = t.onTrack, o.effect.onTrigger = t.onTrigger), o;
}
function Ke(e) {
  O && I && (e = q(e), ze(
    I,
    e.dep || (e.dep = Ge(
      () => e.dep = void 0,
      e instanceof Ee ? e : void 0
    )),
    process.env.NODE_ENV !== "production" ? {
      target: e,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function F(e, t = 2, n) {
  e = q(e);
  const s = e.dep;
  s && Be(
    s,
    t,
    process.env.NODE_ENV !== "production" ? {
      target: e,
      type: "set",
      key: "value",
      newValue: n
    } : void 0
  );
}
function b(e) {
  return !!(e && e.__v_isRef === !0);
}
function T(e, t, n) {
  let s;
  try {
    s = n ? e(...n) : e();
  } catch (i) {
    ke(i, t);
  }
  return s;
}
function Q(e, t, n) {
  if (S(e)) {
    const i = T(e, t, n);
    return i && xe(i) && i.catch((r) => {
      ke(r, t);
    }), i;
  }
  const s = [];
  for (let i = 0; i < e.length; i++)
    s.push(Q(e[i], t, n));
  return s;
}
function ke(e, t) {
  console.error(new Error(`[@vue-reactivity/watch]: ${t}`)), console.error(e);
}
function Qe(e) {
  console.warn(Ze(e));
}
function Ze(e) {
  return new Error(`[reactivue]: ${e}`);
}
var ce = {};
function y(e, t, n) {
  return Ye(e, t, n);
}
function Ye(e, t, { immediate: n, deep: s, flush: i } = {}) {
  let r, o = !1, c = !1;
  if (b(e) ? (r = () => e.value, o = Xe(e)) : M(e) ? (r = () => e, s = !0) : ye(e) ? (c = !0, o = e.some(M), r = () => e.map((u) => b(u) ? u.value : M(u) ? L(u) : S(u) ? T(u, "watch getter") : Qe("invalid source"))) : S(e) ? t ? r = () => T(e, "watch getter") : r = () => (l && l(), Q(e, "watch callback", [p])) : r = de, t && s) {
    const u = r;
    r = () => L(u());
  }
  let l, p = (u) => {
    l = d.onStop = () => {
      T(u, "watch cleanup");
    };
  }, h = c ? [] : ce;
  const f = () => {
    if (d.active)
      if (t) {
        const u = d.run();
        (s || o || (c ? u.some((W, x) => X(W, h[x])) : X(u, h))) && (l && l(), Q(t, "watch value", [
          u,
          h === ce ? void 0 : h,
          p
        ]), h = u);
      } else
        d.run();
  };
  f.allowRecurse = !!t;
  let v;
  i === "sync" ? v = f : v = () => {
    f();
  };
  const d = new ge(r, v);
  return t ? n ? f() : h = d.run() : d.run(), () => d.stop();
}
function L(e, t = /* @__PURE__ */ new Set()) {
  if (!ve(e) || t.has(e))
    return e;
  if (t.add(e), ye(e))
    for (let n = 0; n < e.length; n++)
      L(e[n], t);
  else if (e instanceof Map)
    e.forEach((n, s) => {
      L(e.get(s), t);
    });
  else if (e instanceof Set)
    e.forEach((n) => {
      L(n, t);
    });
  else
    for (const n of Object.keys(e))
      L(e[n], t);
  return e;
}
var et = Object.defineProperty, tt = (e, t, n) => t in e ? et(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, a = (e, t, n) => (tt(e, typeof t != "symbol" ? t + "" : t, n), n);
function D(e) {
  const t = typeof e;
  return e != null && t === "object";
}
function P(e) {
  return e == null;
}
function k(e) {
  return Object.prototype.toString.call(e) == "[object Function]";
}
function E(e) {
  return Array.isArray(e);
}
function Tt(e) {
  return Object.hasOwn(e, "__instance") ? Reflect.get(e, "__instance") : null;
}
function w(e, t, n) {
  const s = (i) => {
    Reflect.set(this.el, e, i);
  };
  if (k(t) || b(t)) {
    const i = y(t, (r) => {
      s(n ? String(r) : r);
    }, {
      immediate: !0,
      deep: !0
    });
    this.onDestroy(i);
  } else
    s(n ? String(t) : t);
  return this;
}
function nt(e) {
  return w.call(this, "textContent", e), this;
}
function st(e, t, n) {
  return this.onMount(() => {
    this.el.addEventListener(e, t, n);
  }), this.onDestroy(() => {
    this.el.removeEventListener(e, t);
  }), this;
}
function it(e, t) {
  return this.on("click", e, t);
}
function rt(e) {
  let t = "";
  const n = /* @__PURE__ */ Object.create(null), s = (r) => {
    for (const o of Object.keys(r))
      r[o] ? this.el.classList.add(o) : this.el.classList.remove(o);
  }, i = (r) => {
    if (r)
      if (typeof r == "string")
        t && this.el.classList.remove(t), t = r, this.el.classList.add(t);
      else if (E(r)) {
        const o = r.length;
        for (let c = 0; c < o; c++) {
          const l = r[c];
          if (l)
            typeof l == "string" ? (this.el.classList.add(l), n[c] = l) : D(r) && s(l);
          else {
            const p = n[c];
            p && (this.el.classList.remove(p), n[c] = null);
          }
        }
      } else
        D(r) && s(r);
  };
  if (k(e)) {
    const r = y(e, (o) => i(o), {
      immediate: !0,
      deep: !0
    });
    this.onDestroy(r);
  } else
    i(e);
  return this;
}
function ot(e) {
  return w.call(this, "innerHTML", e), this;
}
function ct(e) {
  return this.scopes.add(e), this.onInit(() => {
    const t = me();
    t.run(() => {
      e(this, this.componentProps);
    }), this.onDestroy(() => {
      t.stop();
    });
  }), this;
}
function lt(e, t) {
  return Object.assign(this.componentProps, { [e]: t }), this;
}
function at(e) {
  for (const t of Object.keys(e))
    this.prop(t, e[t]);
  return this;
}
function ut(e) {
  return this.__children(e), this;
}
function le(e, t) {
  return !t || t.length === 0 ? e : t.reduce((n, s) => s(n), e);
}
function Se(e, t, n) {
  E(e.value) ? e.value.includes(t) ? e.value.splice(e.value.indexOf(t), 1) : e.value.push(t) : n ? e.value = t : e.value = null;
}
function ae(e, t) {
  (!e.value || E(e.value) && e.value.length === 0) && t.hasAttribute("checked") && (Se(e, t.value, !0), t.removeAttribute("checked"));
}
function ht(e, t = {}) {
  return this.onMount(() => {
    switch (this.el.tagName) {
      case "INPUT":
      case "TEXTAREA": {
        switch (this.el.type) {
          case "checkbox": {
            const n = this.el, s = y(e, (i) => {
              i === n.value || E(i) && i.includes(n.value) ? n.checked = !0 : n.checked = !1;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { checked: r, value: o } = i.target;
              Se(e, o, r);
            }, t.eventOptions), ae(e, n);
            break;
          }
          case "radio": {
            const n = this.el, s = y(e, (i) => {
              n.checked = i === n.value;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { value: r, checked: o } = i.target;
              o && (e.value = r);
            }, t.eventOptions), ae(e, n);
            break;
          }
          default: {
            const n = this.el, s = y(e, (i) => {
              n.value = String(i);
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener(t.lazy ? "change" : "input", (i) => {
              let r = i.target.value;
              r = le(r, t.transforms), e.value = r;
            }, t.eventOptions), n.value = String(e.value ?? "");
            break;
          }
        }
        break;
      }
      case "SELECT": {
        const n = this.el, s = y(e, (r) => {
          e.value = r;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("change", (r) => {
          let o = r.target.value;
          o = le(o, t.transforms), e.value = o;
        }, t.eventOptions);
        const i = E(e.value) ? e.value[0] : e.value;
        if (i)
          n.value = i.toString();
        else if (n.childElementCount > 0) {
          const r = Array.from(n.children).find((o) => o.hasAttribute("selected"));
          if (r) {
            r.removeAttribute("selected");
            const o = r.value;
            e.value = o, n.value = o;
          }
        }
        break;
      }
      case "DETAILS": {
        const n = this.el, s = y(e, (r) => {
          n.open = !!r;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("toggle", () => {
          e.value = n.open;
        }, t.eventOptions);
        const i = E(e.value) ? e.value[0] : e.value;
        n.open = !!i;
        break;
      }
    }
  }), this;
}
function ft(e, t, n) {
  const s = Array.from(e.childNodes).at(n);
  return s ? (e.replaceChild(t, s), !0) : !1;
}
function _(e, t, n) {
  const s = e instanceof Element ? e : e.el;
  if (t)
    if (typeof t == "string" || typeof t == "number")
      if (P(n))
        s.innerHTML = String(t);
      else {
        const i = document.createTextNode(String(t));
        ft(s, i, n) || s.appendChild(i);
      }
    else if (t instanceof Z)
      _(s, t.children);
    else if (t instanceof Element)
      s.appendChild(t);
    else if (t instanceof m)
      e instanceof m && (t.parent = e), s.appendChild(t.el), t.__runOnInit(), _(t, t.children), t.__runOnMount();
    else if (Array.isArray(t)) {
      const i = t.length;
      for (let r = 0; r < i; r++) {
        const o = t[r];
        o instanceof Element || typeof o == "string" || typeof o == "number" ? _(s, o, r) : o instanceof Z ? _(s, o.children) : k(o) ? y(o, (c) => _(s, c, r), {
          immediate: !0,
          deep: !0
        }) : (e instanceof m && (o.parent = e), s.appendChild(o.el), o.__runOnInit(), _(o, o.children), o.__runOnMount());
      }
    } else
      k(t) && y(t, (i) => _(s, i), {
        immediate: !0,
        deep: !0
      });
}
function A(e, t, n) {
  if (D(t)) {
    Object.entries(t).forEach(([s, i]) => {
      A(e, s, i);
    });
    return;
  }
  P(n) ? e.setAttribute(t, "") : typeof n == "boolean" ? n ? e.setAttribute(t, "") : e.removeAttribute(t) : e.setAttribute(t, String(n));
}
function dt(e) {
  return this.onInit(() => {
    if (k(e)) {
      const t = y(e, (n) => A(this.el, n), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(t);
    } else
      A(this.el, e);
  }), this;
}
function pt(e, t) {
  return this.onInit(() => {
    if (k(t) || b(t)) {
      const n = y(t, (s) => A(this.el, e, s), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(n);
    } else
      A(this.el, e, t);
  }), this;
}
function yt(e) {
  return this.attr("disabled", e), this;
}
function vt(e) {
  return w.call(this, "id", e), this;
}
function mt(e) {
  function t(n) {
    if (!(n instanceof m))
      return;
    for (const i of n.onDestroyCbs)
      i();
    const { children: s } = n;
    if (s instanceof m)
      t(s);
    else if (E(s))
      for (const i of s)
        i instanceof m && t(i);
  }
  t(e), e.__runOnDestroy(), e.el.remove();
}
function gt(e) {
  return this.onMount(() => {
    const t = this.el.style.getPropertyValue("display"), n = (s) => {
      s ? P(t) ? this.el.style.removeProperty("display") : this.el.style.setProperty("display", t) : this.el.style.setProperty("display", "none");
    };
    if (k(e) || b(e)) {
      const s = y(e, n, {
        deep: !0,
        immediate: !0
      });
      this.onDestroy(s);
    } else
      n(e);
  }), this;
}
function _t(e, t) {
  return this.onInit(() => {
    const n = (s) => {
      const i = [];
      if (E(s)) {
        const r = s.length;
        for (let o = 0; o < r; o++) {
          const c = t(s[o], o);
          c && i.push(c);
        }
      } else if (D(s)) {
        const r = Object.keys(s), o = r.length;
        for (let c = 0; c < o; c++) {
          const l = r[c], p = t(Reflect.get(s, l), l, c);
          p && i.push(p);
        }
      } else if (typeof s == "number")
        for (let r = 0; r < s; r++) {
          const o = t(r);
          o && i.push(o);
        }
      this.el.replaceChildren(), _(this.el, i);
    };
    if (b(e)) {
      const s = y(e, (i) => {
        n(i);
      }, { immediate: !0, deep: !0 });
      this.onDestroy(s);
    } else
      n(e);
  }), this;
}
function bt(e, t) {
  const n = (s) => {
    if (!D(s)) {
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
      return;
    }
    const i = Object.keys(s);
    for (const r of i)
      this.el.style.setProperty(r, Reflect.get(s, r));
  };
  if (typeof e == "string")
    if (b(t)) {
      const s = y(t, (i) => {
        n({ [e]: i });
      });
      this.onDestroy(s);
    } else
      t && n({ [e]: t });
  else if (b(e))
    if (t)
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
    else {
      const s = y(e, n, {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(s);
    }
  else if (D(e)) {
    const s = Object.keys(e);
    for (const i of s) {
      const r = Reflect.get(e, i);
      if (b(r)) {
        const o = y(r, (c) => {
          P(c) || this.el.style.setProperty(i, String(c));
        });
        this.onDestroy(o);
      } else
        P(r) || this.el.style.setProperty(i, String(r));
    }
  }
  return this;
}
function wt(e) {
  const t = new Comment("if");
  return this.onInit(() => {
    const n = this.parent;
    if (!n)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (i) => {
      i ? n.el.insertBefore(this.el, t) : this.el.remove();
    };
    if (n.el.insertBefore(t, this.el), k(e)) {
      const i = Je(e), r = y(i, s, {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(r);
    } else
      s(e);
  }), this;
}
function Et() {
  const e = new m(this.el);
  return e.children = this.children, e.scopes = new Set(this.scopes), e;
}
const kt = /* @__PURE__ */ new Set(), St = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), Ot = "abcdefghiklmnopqrstuvwxyz".split("");
function Lt(e) {
  const t = e ? Ot : St;
  let n = "";
  for (let s = 0; s < 5; s++)
    n += t[Math.floor(Math.random() * t.length)];
  return n;
}
function Dt(e = !1) {
  let t = "";
  for (; t.length === 0 || kt.has(t); )
    t = Lt(e);
  return t;
}
class m {
  constructor(t, n = {}) {
    a(this, "text", nt.bind(this)), a(this, "html", ot.bind(this)), a(this, "on", st.bind(this)), a(this, "click", it.bind(this)), a(this, "class", rt.bind(this)), a(this, "setup", ct.bind(this)), a(this, "prop", lt.bind(this)), a(this, "props", at.bind(this)), a(this, "nest", ut.bind(this)), a(this, "model", ht.bind(this)), a(this, "attrs", dt.bind(this)), a(this, "attr", pt.bind(this)), a(this, "disabled", yt.bind(this)), a(this, "id", vt.bind(this)), a(this, "show", gt.bind(this)), a(this, "style", bt.bind(this)), a(this, "if", wt.bind(this)), a(this, "clone", Et.bind(this)), a(this, "el"), a(this, "children", []), a(this, "componentProps"), a(this, "parent", null), a(this, "onMountCbs", []), a(this, "onDestroyCbs", []), a(this, "onInitCbs", []), a(this, "scopes", /* @__PURE__ */ new Set()), a(this, "runningScopes", /* @__PURE__ */ new Set()), a(this, "__identifier"), this.el = t, Object.defineProperty(this.el, "__instance", this), this.componentProps = n, this.__identifier = Dt(!0);
  }
  /////////////////////////////////////////////////////////////
  // Private API
  __children(t) {
    this.children = t;
  }
  __runOnMount() {
    for (const t of this.onMountCbs)
      t();
  }
  __runOnDestroy() {
    for (const t of this.onDestroyCbs)
      t();
  }
  __runOnInit() {
    for (const t of this.onInitCbs)
      t();
  }
  __rerunSetup() {
    for (const t of this.scopes) {
      const n = me();
      n.run(() => {
        t(this, this.componentProps);
      }), this.runningScopes.add(n);
    }
  }
  __closeScopes() {
    for (const t of this.runningScopes)
      t.stop();
    this.runningScopes = /* @__PURE__ */ new Set();
  }
  /////////////////////////////////////////////////////////////
  // Public API
  /**
   * Executes provided callback function when the component is initialized.
   * Before being rendered in the dom.
   *
   * @param callback {function}
   */
  onInit(t) {
    this.onInitCbs.push(t);
  }
  /**
   * Executes provided callback function when the component is mounted in the
   * DOM.
   *
   * @param callback {function}
   */
  onMount(t) {
    this.onMountCbs.push(t);
  }
  /**
   *
   * @param callback executes provided callback function when the component is
   * removed from the DOM.
   */
  onDestroy(t) {
    this.onDestroyCbs.push(t);
  }
  /**
   * Mounts the current element in the DOM. Usually, you would use this function
   * either in the root App component, or a single component, if you're simply
   * adding small reactive scopes into an otherwise static site.
   *
   * @param selector {string} Default: "body" element
   */
  mount(t = "body") {
    const n = document.querySelector(t);
    if (!n)
      throw new Error("Root element does not exist");
    n.appendChild(this.el), this.__rerunSetup(), this.__runOnInit(), _(this, this.children), this.__runOnMount();
  }
  // Removes the root node and its desendants. It also
  destroy() {
    mt(this);
  }
  /**
   * Iterate over the provided object / array / number and execute the provided
   * callback for each item. Components returned from the callback are then
   * rendered.
   *
   * It is recommended not to use other chained methods when using `for`,
   * because the base element is replaced with the return value of the callback
   * function. All logic should therefore be handled there.
   *
   * @param source Array|Object|Number
   * @param callback Function which runs for each provided item.
   * @returns Component to render
   *
   *
   */
  for(t, n) {
    return _t.call(this, t, n);
  }
}
class te extends m {
  constructor(t) {
    super(document.createElement(t));
  }
  __children(t) {
    this.children = [];
  }
}
class Z extends m {
  constructor(t = []) {
    super(document.createElement("template")), this.children = t;
  }
  mount(t) {
    const n = document.querySelector(t);
    if (!n)
      throw new Error("Root element does not exist");
    this.__runOnInit(), _(n, this.children), this.__runOnMount();
  }
}
function Rt(e) {
  return new Z(e);
}
class Oe extends te {
  constructor(t, n) {
    super(), a(this, "el"), this.el = t, this.el instanceof HTMLInputElement && n && (this.el.type = n);
  }
  value(t) {
    return w.call(this, "value", t), this;
  }
  placeholder(t) {
    return w.call(this, "placeholder", t), this;
  }
  name(t) {
    return w.call(this, "name", t), this;
  }
  required(t) {
    return w.call(this, "required", t), this;
  }
}
function Ct(e = "text") {
  const t = document.createElement("input");
  return new Oe(t, e);
}
function Nt() {
  const e = document.createElement("textarea");
  return new Oe(e);
}
class It extends te {
  constructor(t, n) {
    super("option"), t && (this.el.value = String(t), this.el.textContent = String(t)), n && (this.el.textContent = String(n));
  }
  value(t) {
    return w.call(this, "value", t), this;
  }
  selected() {
    return this.attr("selected"), this;
  }
}
function jt(e, t) {
  return new It(e, t);
}
const Pt = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "shadow", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "var", "video"], Le = ["area", "base", "br", "col", "embed", "hr", "img", "link", "meta", "source", "track", "wbr"], At = Pt.reduce((e, t) => (e[t] = (n) => {
  const s = document.createElement(t), i = new m(s);
  return n && i.__children(n), i;
}, e), {}), xt = Le.reduce((e, t) => (e[t] = () => new te(t), e), {}), Y = Object.assign(At, xt, {
  fragment: Rt,
  input: Ct,
  textarea: Nt,
  option: jt
}), $t = [
  ...Le,
  "input",
  "textarea",
  "option"
];
function Vt(e, t) {
  return (n) => {
    const s = $t.includes(e) ? Y[e]() : Y[e](n);
    return s.setup(t), s;
  };
}
function Ht(e, t) {
  return Y.a().setup((n) => {
    n.attr("href", e), n.nest(t), n.click((s) => {
      s.preventDefault(), H(e);
    });
  });
}
function ue() {
}
function qt(e) {
  const t = {}, n = {}, s = {};
  for (const [h, f] of Object.entries(e)) {
    const v = "<div route-boundary>";
    if (f instanceof m)
      t[h] = f, s[h] = {
        html: v
      };
    else {
      const { loader: d, title: u, default: W, fallback: x, component: De } = f;
      t[h] = De, s[h] = {
        loader: d,
        title: u,
        default: W,
        html: v
      }, x && (n[h] = x);
    }
  }
  const i = Re(s);
  let r = ue, o = ue, c, l, p;
  return {
    run: (h) => {
      r = Ie((f) => {
        c && (c.el.replaceChildren(), c.destroy());
        const v = t[f.path];
        if (v) {
          const d = v.clone();
          d.props({
            $data: f.data,
            $params: f.params
          }), d.mount("[route-boundary]"), c = d;
        }
      }), o = Pe((f, v) => {
        let d;
        if (l && (l.el.replaceChildren(), l.destroy()), f ? d = n[f.path] : (console.warn("Attempted to navigate to a route that does not exist"), console.error(v), d = p), d) {
          const u = d.clone();
          u.mount("route-boundary"), l = u;
        }
      }), i.run(h);
    },
    stop: () => {
      i.stop(), r(), o(), c && c.destroy(), l && l.destroy();
    },
    errorFallback: (h) => {
      p = h;
    }
  };
}
export {
  Y as $,
  Ht as RouterLink,
  qt as createApp,
  Tt as getInstance,
  H as navigate,
  Mt as onNavigation,
  Pe as onRouteError,
  Ie as onRouteResolve,
  Vt as reusable
};
//# sourceMappingURL=pantry.js.map
