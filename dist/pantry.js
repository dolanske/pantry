let j = [], F = "", $;
function Oe(e) {
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
      F = s, window.addEventListener("popstate", n), he(), H(Le(t));
    },
    /**
     * Stops the router. Navigation will no longer work.
     */
    stop() {
      window.removeEventListener("popstate", n);
    }
  };
}
function Le(e) {
  let t;
  if (e.find((n) => Z(n.path, location.pathname)))
    return location.pathname;
  if (t = e.find((n) => n.default || n.path === "/"), t || (t = e.sort((n, s) => n.path.length - s.path.length)[0], t))
    return t.path;
  throw new Error("No default route found. Please define one by settings its path to `/` or adding the `default` property to the route definitions. Note, it is not possible to set dynamic routes as default routes.");
}
function V(e) {
  return e instanceof Element ? e : new DOMParser().parseFromString(e, "text/html").body.firstElementChild;
}
function ue() {
  if (!F)
    throw new Error("No root selector found. Did you start the router?");
  const e = document.querySelector(F);
  if (!e)
    throw new Error("Invalid root node selector. Please select a valid HTML element.");
  return e;
}
function te(e) {
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
function Z(e, t) {
  if (e === t)
    return !0;
  const n = e.split("/"), s = t.split("/");
  return n.every((i, o) => i.startsWith(":") ? !0 : i === s[o]);
}
function ne(e, t) {
  const n = t.find((r) => Z(r.path, e));
  if (!n)
    throw new Error(`No matching route found for the path "${e}"`);
  const s = n.path.split("/"), i = e.split("/"), o = {};
  for (let r = 0; r < s.length; r++) {
    const l = s[r];
    if (!l || !l.startsWith(":"))
      continue;
    const c = l.substring(1), u = i[r];
    o[c] = u;
  }
  return {
    resolvedPath: e,
    sourcePath: n.path,
    params: o
  };
}
function he() {
  var e;
  const t = ue().querySelectorAll("a[link]");
  for (const n of t) {
    const s = (e = n.getAttributeNode("href")) == null ? void 0 : e.value;
    s && n.addEventListener("click", (i) => {
      i.preventDefault(), j.some((o) => Z(o.path, s)) && H(s, !0);
    });
  }
}
async function H(e, t) {
  const n = new Promise(async (s, i) => {
    const {
      resolvedPath: o,
      sourcePath: r,
      params: l
    } = ne(e, j), c = te({ path: r });
    if (!c)
      return i(new Error("Invalid path. Could not match route."));
    let u = V(c.html);
    De({ ...c, path: e, renderedHtml: u }) === !1 && s(null);
    let h;
    c.loader && (h = await c.loader(l).then((f) => f).catch((f) => c.fallback ? (u = V(c.fallback), null) : i(new Error(f)))), $ = {
      ...c,
      path: r,
      resolvedPath: o,
      renderedHtml: u,
      params: l,
      data: h
    }, t ? history.replaceState({ path: e }, "", o) : history.pushState({ path: e }, "", o), ue().replaceChildren($.renderedHtml), he(), c.title && (document.title = c.title), Re($), s($);
  });
  return n.catch((s) => {
    const i = te({ path: e });
    if (i) {
      const { sourcePath: o } = ne(e, j);
      se({ ...i, path: o, renderedHtml: null }, s);
    } else
      se(null, s);
  }), n;
}
const N = {}, B = /* @__PURE__ */ new Set();
function Ct(e, t) {
  if (typeof e == "string") {
    if (!t)
      return;
    N[e] || (N[e] = /* @__PURE__ */ new Set()), N[e].add(t);
  } else
    e && B.add(e);
  return () => {
    typeof e == "string" ? t && N[e].delete(t) : B.delete(e);
  };
}
function De(e) {
  for (const n of B)
    n(e);
  const t = N[e.path];
  if (t)
    for (const n of t)
      n(e);
}
const R = {}, G = /* @__PURE__ */ new Set();
function Ne(e, t) {
  return typeof e == "string" ? t && (R[e] || (R[e] = /* @__PURE__ */ new Set()), R[e].add(t)) : G.add(e), () => {
    typeof e == "string" ? t && R[e].delete(t) : G.delete(e);
  };
}
function Re(e) {
  for (const n of G)
    n(e);
  const t = R[e.path];
  if (t)
    for (const n of t)
      n(e);
}
const C = {}, U = /* @__PURE__ */ new Set();
function Ce(e, t) {
  return typeof e == "string" ? t && (C[e] || (C[e] = /* @__PURE__ */ new Set()), C[e].add(t)) : U.add(e), () => {
    typeof e == "string" ? t && C[e].delete(t) : U.delete(e);
  };
}
function se(e, t) {
  for (const n of U)
    n(e, t);
  if (e) {
    const n = C[e.path];
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
const fe = () => {
}, de = Object.assign, pe = Array.isArray, S = (e) => typeof e == "function", Ie = (e) => typeof e == "symbol", ye = (e) => e !== null && typeof e == "object", je = (e) => (ye(e) || S(e)) && S(e.then) && S(e.catch), X = (e, t) => !Object.is(e, t);
/**
* @vue/reactivity v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ae(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let g;
class Pe {
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
      process.env.NODE_ENV !== "production" && Ae("cannot run an inactive effect scope.");
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
function ve(e) {
  return new Pe(e);
}
function xe(e, t = g) {
  t && t.active && t.effects.push(e);
}
let I;
class me {
  constructor(t, n, s, i) {
    this.fn = t, this.trigger = n, this.scheduler = s, this.active = !0, this.deps = [], this._dirtyLevel = 2, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, xe(this, i);
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      Te();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && ($e(n.computed), this._dirtyLevel >= 2))
          break;
      }
      this._dirtyLevel < 2 && (this._dirtyLevel = 0), Me();
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
      return O = !0, I = this, this._runnings++, ie(this), this.fn();
    } finally {
      oe(this), this._runnings--, I = n, O = t;
    }
  }
  stop() {
    var t;
    this.active && (ie(this), oe(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function $e(e) {
  return e.value;
}
function ie(e) {
  e._trackId++, e._depsLength = 0;
}
function oe(e) {
  if (e.deps && e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      ge(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function ge(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let O = !0, J = 0;
const _e = [];
function Te() {
  _e.push(O), O = !1;
}
function Me() {
  const e = _e.pop();
  O = e === void 0 ? !0 : e;
}
function Ve() {
  J++;
}
function He() {
  for (J--; !J && K.length; )
    K.shift()();
}
function qe(e, t, n) {
  var s;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const i = e.deps[e._depsLength];
    i !== t ? (i && ge(i, e), e.deps[e._depsLength++] = t) : e._depsLength++, process.env.NODE_ENV !== "production" && ((s = e.onTrack) == null || s.call(e, de({ effect: e }, n)));
  }
}
const K = [];
function We(e, t, n) {
  var s;
  Ve();
  for (const i of e.keys())
    if (i._dirtyLevel < t && e.get(i) === i._trackId) {
      const o = i._dirtyLevel;
      i._dirtyLevel = t, o === 0 && (i._shouldSchedule = !0, process.env.NODE_ENV !== "production" && ((s = i.onTrigger) == null || s.call(i, de({ effect: i }, n))), i.trigger());
    }
  be(e), He();
}
function be(e) {
  for (const t of e.keys())
    t.scheduler && t._shouldSchedule && (!t._runnings || t.allowRecurse) && e.get(t) === t._trackId && (t._shouldSchedule = !1, K.push(t.scheduler));
}
const ze = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
};
Symbol(process.env.NODE_ENV !== "production" ? "iterate" : "");
Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ie)
);
function T(e) {
  return Fe(e) ? T(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Fe(e) {
  return !!(e && e.__v_isReadonly);
}
function Be(e) {
  return !!(e && e.__v_isShallow);
}
function q(e) {
  const t = e && e.__v_raw;
  return t ? q(t) : e;
}
class we {
  constructor(t, n, s, i) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new me(
      () => t(this._value),
      () => z(this, 1),
      () => this.dep && be(this.dep)
    ), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = s;
  }
  get value() {
    const t = q(this);
    return (!t._cacheable || t.effect.dirty) && X(t._value, t._value = t.effect.run()) && z(t, 2), Ue(t), t.effect._dirtyLevel >= 1 && z(t, 1), t._value;
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
function Ge(e, t, n = !1) {
  let s, i;
  const o = S(e);
  o ? (s = e, i = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : fe) : (s = e.get, i = e.set);
  const r = new we(s, i, o || !i, n);
  return process.env.NODE_ENV !== "production" && t && !n && (r.effect.onTrack = t.onTrack, r.effect.onTrigger = t.onTrigger), r;
}
function Ue(e) {
  O && I && (e = q(e), qe(
    I,
    e.dep || (e.dep = ze(
      () => e.dep = void 0,
      e instanceof we ? e : void 0
    )),
    process.env.NODE_ENV !== "production" ? {
      target: e,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function z(e, t = 2, n) {
  e = q(e);
  const s = e.dep;
  s && We(
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
function M(e, t, n) {
  let s;
  try {
    s = n ? e(...n) : e();
  } catch (i) {
    Ee(i, t);
  }
  return s;
}
function Q(e, t, n) {
  if (S(e)) {
    const i = M(e, t, n);
    return i && je(i) && i.catch((o) => {
      Ee(o, t);
    }), i;
  }
  const s = [];
  for (let i = 0; i < e.length; i++)
    s.push(Q(e[i], t, n));
  return s;
}
function Ee(e, t) {
  console.error(new Error(`[@vue-reactivity/watch]: ${t}`)), console.error(e);
}
function Xe(e) {
  console.warn(Je(e));
}
function Je(e) {
  return new Error(`[reactivue]: ${e}`);
}
var re = {};
function p(e, t, n) {
  return Ke(e, t, n);
}
function Ke(e, t, { immediate: n, deep: s, flush: i } = {}) {
  let o, r = !1, l = !1;
  if (b(e) ? (o = () => e.value, r = Be(e)) : T(e) ? (o = () => e, s = !0) : pe(e) ? (l = !0, r = e.some(T), o = () => e.map((d) => b(d) ? d.value : T(d) ? L(d) : S(d) ? M(d, "watch getter") : Xe("invalid source"))) : S(e) ? t ? o = () => M(e, "watch getter") : o = () => (c && c(), Q(e, "watch callback", [u])) : o = fe, t && s) {
    const d = o;
    o = () => L(d());
  }
  let c, u = (d) => {
    c = v.onStop = () => {
      M(d, "watch cleanup");
    };
  }, h = l ? [] : re;
  const f = () => {
    if (v.active)
      if (t) {
        const d = v.run();
        (s || r || (l ? d.some((x, W) => X(x, h[W])) : X(d, h))) && (c && c(), Q(t, "watch value", [
          d,
          h === re ? void 0 : h,
          u
        ]), h = d);
      } else
        v.run();
  };
  f.allowRecurse = !!t;
  let y;
  i === "sync" ? y = f : y = () => {
    f();
  };
  const v = new me(o, y);
  return t ? n ? f() : h = v.run() : v.run(), () => v.stop();
}
function L(e, t = /* @__PURE__ */ new Set()) {
  if (!ye(e) || t.has(e))
    return e;
  if (t.add(e), pe(e))
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
var Qe = Object.defineProperty, Ye = (e, t, n) => t in e ? Qe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, a = (e, t, n) => (Ye(e, typeof t != "symbol" ? t + "" : t, n), n);
function D(e) {
  const t = typeof e;
  return e != null && t === "object";
}
function A(e) {
  return e == null;
}
function k(e) {
  return Object.prototype.toString.call(e) == "[object Function]";
}
function E(e) {
  return Array.isArray(e);
}
function It(e) {
  return Object.hasOwn(e, "__instance") ? Reflect.get(e, "__instance") : null;
}
function w(e, t, n) {
  const s = (i) => {
    Reflect.set(this.el, e, i);
  };
  if (k(t) || b(t)) {
    const i = p(t, (o) => {
      s(n ? String(o) : o);
    }, {
      immediate: !0,
      deep: !0
    });
    this.onDestroy(i);
  } else
    s(n ? String(t) : t);
  return this;
}
function Ze(e) {
  return w.call(this, "textContent", e), this;
}
function et(e, t, n) {
  return this.onMount(() => {
    this.el.addEventListener(e, t, n);
  }), this.onDestroy(() => {
    this.el.removeEventListener(e, t);
  }), this;
}
function tt(e, t) {
  return this.on("click", e, t);
}
function nt(e) {
  let t = "";
  const n = /* @__PURE__ */ Object.create(null), s = (o) => {
    for (const r of Object.keys(o))
      o[r] ? this.el.classList.add(r) : this.el.classList.remove(r);
  }, i = (o) => {
    if (o)
      if (typeof o == "string")
        t && this.el.classList.remove(t), t = o, this.el.classList.add(t);
      else if (E(o)) {
        const r = o.length;
        for (let l = 0; l < r; l++) {
          const c = o[l];
          if (c)
            typeof c == "string" ? (this.el.classList.add(c), n[l] = c) : D(o) && s(c);
          else {
            const u = n[l];
            u && (this.el.classList.remove(u), n[l] = null);
          }
        }
      } else
        D(o) && s(o);
  };
  if (k(e)) {
    const o = p(e, (r) => i(r), {
      immediate: !0,
      deep: !0
    });
    this.onDestroy(o);
  } else
    i(e);
  return this;
}
function st(e) {
  return w.call(this, "innerHTML", e), this;
}
function it(e) {
  return this.scopes.add(e), this.onInit(() => {
    const t = ve();
    t.run(() => {
      e(this, this.componentProps);
    }), this.onDestroy(() => {
      t.stop();
    });
  }), this;
}
function ot(e, t) {
  return Object.assign(this.componentProps, { [e]: t }), this;
}
function rt(e) {
  for (const t of Object.keys(e))
    this.prop(t, e[t]);
  return this;
}
function ct(e) {
  return this.__children(e), this;
}
function ce(e, t) {
  return !t || t.length === 0 ? e : t.reduce((n, s) => s(n), e);
}
function ke(e, t, n) {
  E(e.value) ? e.value.includes(t) ? e.value.splice(e.value.indexOf(t), 1) : e.value.push(t) : n ? e.value = t : e.value = null;
}
function le(e, t) {
  (!e.value || E(e.value) && e.value.length === 0) && t.hasAttribute("checked") && (ke(e, t.value, !0), t.removeAttribute("checked"));
}
function lt(e, t = {}) {
  return this.onMount(() => {
    switch (this.el.tagName) {
      case "INPUT":
      case "TEXTAREA": {
        switch (this.el.type) {
          case "checkbox": {
            const n = this.el, s = p(e, (i) => {
              i === n.value || E(i) && i.includes(n.value) ? n.checked = !0 : n.checked = !1;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { checked: o, value: r } = i.target;
              ke(e, r, o);
            }, t.eventOptions), le(e, n);
            break;
          }
          case "radio": {
            const n = this.el, s = p(e, (i) => {
              n.checked = i === n.value;
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener("change", (i) => {
              const { value: o, checked: r } = i.target;
              r && (e.value = o);
            }, t.eventOptions), le(e, n);
            break;
          }
          default: {
            const n = this.el, s = p(e, (i) => {
              n.value = String(i);
            }, { deep: !0 });
            this.onDestroy(s), n.addEventListener(t.lazy ? "change" : "input", (i) => {
              let o = i.target.value;
              o = ce(o, t.transforms), e.value = o;
            }, t.eventOptions), n.value = String(e.value ?? "");
            break;
          }
        }
        break;
      }
      case "SELECT": {
        const n = this.el, s = p(e, (o) => {
          e.value = o;
        }, { deep: !0 });
        this.onDestroy(s), n.addEventListener("change", (o) => {
          let r = o.target.value;
          r = ce(r, t.transforms), e.value = r;
        }, t.eventOptions);
        const i = E(e.value) ? e.value[0] : e.value;
        if (i)
          n.value = i.toString();
        else if (n.childElementCount > 0) {
          const o = Array.from(n.children).find((r) => r.hasAttribute("selected"));
          if (o) {
            o.removeAttribute("selected");
            const r = o.value;
            e.value = r, n.value = r;
          }
        }
        break;
      }
      case "DETAILS": {
        const n = this.el, s = p(e, (o) => {
          n.open = !!o;
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
function at(e, t, n) {
  const s = Array.from(e.childNodes).at(n);
  return s ? (e.replaceChild(t, s), !0) : !1;
}
function _(e, t, n) {
  const s = e instanceof Element ? e : e.el;
  if (t)
    if (typeof t == "string" || typeof t == "number")
      if (A(n))
        s.innerHTML = String(t);
      else {
        const i = document.createTextNode(String(t));
        at(s, i, n) || s.appendChild(i);
      }
    else if (t instanceof Y)
      _(s, t.children);
    else if (t instanceof Element)
      s.appendChild(t);
    else if (t instanceof m)
      e instanceof m && (t.parent = e), s.appendChild(t.el), t.__runOnInit(), _(t, t.children), t.__runOnMount();
    else if (Array.isArray(t)) {
      const i = t.length;
      for (let o = 0; o < i; o++) {
        const r = t[o];
        r instanceof Element || typeof r == "string" || typeof r == "number" ? _(s, r, o) : r instanceof Y ? _(s, r.children) : k(r) ? p(r, (l) => _(s, l, o), {
          immediate: !0,
          deep: !0
        }) : (e instanceof m && (r.parent = e), s.appendChild(r.el), r.__runOnInit(), _(r, r.children), r.__runOnMount());
      }
    } else
      k(t) && p(t, (i) => _(s, i), {
        immediate: !0,
        deep: !0
      });
}
function P(e, t, n) {
  if (D(t)) {
    Object.entries(t).forEach(([s, i]) => {
      P(e, s, i);
    });
    return;
  }
  A(n) ? e.setAttribute(t, "") : typeof n == "boolean" ? n ? e.setAttribute(t, "") : e.removeAttribute(t) : e.setAttribute(t, String(n));
}
function ut(e) {
  return this.onInit(() => {
    if (k(e)) {
      const t = p(e, (n) => P(this.el, n), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(t);
    } else
      P(this.el, e);
  }), this;
}
function ht(e, t) {
  return this.onInit(() => {
    if (k(t) || b(t)) {
      const n = p(t, (s) => P(this.el, e, s), {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(n);
    } else
      P(this.el, e, t);
  }), this;
}
function ft(e) {
  return this.attr("disabled", e), this;
}
function dt(e) {
  return w.call(this, "id", e), this;
}
function pt(e) {
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
function yt(e) {
  return this.onMount(() => {
    const t = this.el.style.getPropertyValue("display"), n = (s) => {
      s ? A(t) ? this.el.style.removeProperty("display") : this.el.style.setProperty("display", t) : this.el.style.setProperty("display", "none");
    };
    if (k(e) || b(e)) {
      const s = p(e, n, {
        deep: !0,
        immediate: !0
      });
      this.onDestroy(s);
    } else
      n(e);
  }), this;
}
function vt(e, t) {
  let n;
  const s = () => {
    const o = this.el.cloneNode(!0);
    return new m(o);
  }, i = (o) => {
    const r = [];
    if (E(o)) {
      const l = o.length;
      for (let c = 0; c < l; c++) {
        const u = s();
        t(u, { value: o[c], index: c }), r.push(u);
      }
    } else if (D(o)) {
      const l = Object.keys(o), c = l.length;
      for (let u = 0; u < c; u++) {
        const h = l[u], f = s();
        t(f, {
          value: Reflect.get(o, h),
          key: h,
          index: u
        }), r.push(f);
      }
    } else if (typeof o == "number")
      for (let l = 0; l < o; l++) {
        const c = s();
        t(c, l), r.push(c);
      }
    n == null || n.replaceChildren(), n && _(n, r);
  };
  return this.onInit(() => {
    if (n = this.el.parentElement, b(e)) {
      const o = p(e, (r) => {
        i(r);
      }, { immediate: !0, deep: !0 });
      this.onDestroy(o);
    } else
      i(e);
  }), this;
}
function mt(e, t) {
  const n = (s) => {
    if (!D(s)) {
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
      return;
    }
    const i = Object.keys(s);
    for (const o of i)
      this.el.style.setProperty(o, Reflect.get(s, o));
  };
  if (typeof e == "string")
    if (b(t)) {
      const s = p(t, (i) => {
        n({ [e]: i });
      });
      this.onDestroy(s);
    } else
      t && n({ [e]: t });
  else if (b(e))
    if (t)
      console.warn("[El.style] Refs which don't contain a style object are not allowed");
    else {
      const s = p(e, n, {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(s);
    }
  else if (D(e)) {
    const s = Object.keys(e);
    for (const i of s) {
      const o = Reflect.get(e, i);
      if (b(o)) {
        const r = p(o, (l) => {
          A(l) || this.el.style.setProperty(i, String(l));
        });
        this.onDestroy(r);
      } else
        A(o) || this.el.style.setProperty(i, String(o));
    }
  }
  return this;
}
function gt(e) {
  const t = new Comment("if");
  return this.onInit(() => {
    const n = this.parent;
    if (!n)
      return console.warn("Parent element not found. `if()` will not work.");
    const s = (i) => {
      i ? n.el.insertBefore(this.el, t) : this.el.remove();
    };
    if (n.el.insertBefore(t, this.el), k(e)) {
      const i = Ge(e), o = p(i, s, {
        immediate: !0,
        deep: !0
      });
      this.onDestroy(o);
    } else
      s(e);
  }), this;
}
function _t() {
  const e = new m(this.el.cloneNode(!0));
  return e.children = this.children, e.scopes = this.scopes, e;
}
class m {
  // __isElse?: boolean
  // __isElseIf?: ConditionalExpr
  constructor(t, n = {}) {
    a(this, "text", Ze.bind(this)), a(this, "html", st.bind(this)), a(this, "on", et.bind(this)), a(this, "click", tt.bind(this)), a(this, "class", nt.bind(this)), a(this, "setup", it.bind(this)), a(this, "prop", ot.bind(this)), a(this, "props", rt.bind(this)), a(this, "nest", ct.bind(this)), a(this, "model", lt.bind(this)), a(this, "attrs", ut.bind(this)), a(this, "attr", ht.bind(this)), a(this, "disabled", ft.bind(this)), a(this, "id", dt.bind(this)), a(this, "show", yt.bind(this)), a(this, "style", mt.bind(this)), a(this, "if", gt.bind(this)), a(this, "clone", _t.bind(this)), a(this, "el"), a(this, "children", []), a(this, "componentProps"), a(this, "parent", null), a(this, "onMountCbs", []), a(this, "onDestroyCbs", []), a(this, "onInitCbs", []), a(this, "scopes", /* @__PURE__ */ new Set()), a(this, "runningScopes", /* @__PURE__ */ new Set()), this.el = t, Object.defineProperty(this.el, "__instance", this), this.componentProps = n;
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
      const n = ve();
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
    pt(this);
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
    return vt.call(this, t, n);
  }
}
class ee extends m {
  constructor(t) {
    super(document.createElement(t));
  }
  __children(t) {
    this.children = [];
  }
}
class Y extends m {
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
function bt(e) {
  return new Y(e);
}
class Se extends ee {
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
function wt(e = "text") {
  const t = document.createElement("input");
  return new Se(t, e);
}
function Et() {
  const e = document.createElement("textarea");
  return new Se(e);
}
class kt extends ee {
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
function St(e, t) {
  return new kt(e, t);
}
const Ot = ["a", "abbr", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "bgsound", "blink", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "html", "i", "iframe", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "listing", "main", "map", "mark", "menu", "meter", "nav", "noscript", "object", "ol", "optgroup", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "shadow", "small", "spacer", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "tfoot", "th", "thead", "time", "title", "tr", "u", "ul", "var", "video"], Lt = ["area", "base", "br", "col", "embed", "hr", "img", "link", "meta", "source", "track", "wbr"], Dt = Ot.reduce((e, t) => (e[t] = (n) => {
  const s = document.createElement(t), i = new m(s);
  return n && i.__children(n), i;
}, e), {}), Nt = Lt.reduce((e, t) => (e[t] = () => new ee(t), e), {}), Rt = Object.assign(Dt, Nt, {
  fragment: bt,
  input: wt,
  textarea: Et,
  option: St
});
function jt(e, t) {
  return Rt.a().setup((n) => {
    n.attr("href", e), n.nest(t), n.click((s) => {
      s.preventDefault(), H(e);
    });
  });
}
function ae() {
}
function At(e) {
  const t = {}, n = {}, s = {};
  for (const [u, h] of Object.entries(e)) {
    const f = "<div route-boundary>";
    if (h instanceof m)
      t[u] = h, s[u] = {
        html: f
      };
    else {
      const { loader: y, title: v, default: d, fallback: x, component: W } = h;
      t[u] = W, s[u] = {
        loader: y,
        title: v,
        default: d,
        html: f
      }, x && (n[u] = x);
    }
  }
  const i = Oe(s);
  let o = ae, r = ae, l, c;
  return {
    run: (u) => {
      o = Ne((h) => {
        l && l.destroy();
        const f = t[h.path];
        if (f) {
          const y = f.clone();
          y.props({
            $data: h.data,
            $params: h.params
          }), y.mount("[route-boundary]"), l = y;
        }
      }), r = Ce((h, f) => {
        if (!h) {
          console.warn("Attempted to navigate to a route that does not exist"), console.error(f);
          return;
        }
        c && c.destroy();
        const y = n[h.path];
        if (y) {
          const v = y.clone();
          v.mount("route-boundary"), c = v;
        }
      }), i.run(u);
    },
    stop: () => {
      i.stop(), o(), r(), l && l.destroy(), c && c.destroy();
    }
  };
}
export {
  Rt as $,
  jt as RouterLink,
  At as createApp,
  It as getInstance,
  H as navigate,
  Ct as onNavigation,
  Ce as onRouteError,
  Ne as onRouteResolve
};
//# sourceMappingURL=pantry.js.map
