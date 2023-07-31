function On(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let i = 0; i < s.length; i++)
    n[s[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
const W = {}, Ze = [], _e = () => {
}, Ni = () => !1, Ui = /^on[^a-z]/, Kt = (e) => Ui.test(e), Dn = (e) => e.startsWith("onUpdate:"), Y = Object.assign, Rn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Mi = Object.prototype.hasOwnProperty, U = (e, t) => Mi.call(e, t), O = Array.isArray, et = (e) => Bt(e) === "[object Map]", js = (e) => Bt(e) === "[object Set]", C = (e) => typeof e == "function", q = (e) => typeof e == "string", An = (e) => typeof e == "symbol", k = (e) => e !== null && typeof e == "object", zs = (e) => k(e) && C(e.then) && C(e.catch), Hs = Object.prototype.toString, Bt = (e) => Hs.call(e), Li = (e) => Bt(e).slice(8, -1), Ws = (e) => Bt(e) === "[object Object]", Cn = (e) => q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Mt = /* @__PURE__ */ On(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Vt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Fi = /-(\w)/g, ye = Vt((e) => e.replace(Fi, (t, n) => n ? n.toUpperCase() : "")), ji = /\B([A-Z])/g, ue = Vt(
  (e) => e.replace(ji, "-$1").toLowerCase()
), Gs = Vt(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), ln = Vt(
  (e) => e ? `on${Gs(e)}` : ""
), bt = (e, t) => !Object.is(e, t), Lt = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Wt = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, _n = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, ss = (e) => {
  const t = q(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let is;
const hn = () => is || (is = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Pn(e) {
  if (O(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = q(s) ? Gi(s) : Pn(s);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else {
    if (q(e))
      return e;
    if (k(e))
      return e;
  }
}
const zi = /;(?![^(]*\))/g, Hi = /:([^]+)/, Wi = /\/\*[^]*?\*\//g;
function Gi(e) {
  const t = {};
  return e.replace(Wi, "").split(zi).forEach((n) => {
    if (n) {
      const s = n.split(Hi);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Nn(e) {
  let t = "";
  if (q(e))
    t = e;
  else if (O(e))
    for (let n = 0; n < e.length; n++) {
      const s = Nn(e[n]);
      s && (t += s + " ");
    }
  else if (k(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const ki = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Xi = /* @__PURE__ */ On(ki);
function ks(e) {
  return !!e || e === "";
}
const J = (e) => q(e) ? e : e == null ? "" : O(e) || k(e) && (e.toString === Hs || !C(e.toString)) ? JSON.stringify(e, Xs, 2) : String(e), Xs = (e, t) => t && t.__v_isRef ? Xs(e, t.value) : et(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, i]) => (n[`${s} =>`] = i, n), {})
} : js(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : k(t) && !O(t) && !Ws(t) ? String(t) : t;
let ae;
class $i {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = ae, !t && ae && (this.index = (ae.scopes || (ae.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = ae;
      try {
        return ae = this, t();
      } finally {
        ae = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ae = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    ae = this.parent;
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
function Ki(e, t = ae) {
  t && t.active && t.effects.push(e);
}
function Bi() {
  return ae;
}
const Un = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, $s = (e) => (e.w & Ue) > 0, Ks = (e) => (e.n & Ue) > 0, Vi = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Ue;
}, Yi = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      $s(i) && !Ks(i) ? i.delete(e) : t[n++] = i, i.w &= ~Ue, i.n &= ~Ue;
    }
    t.length = n;
  }
}, mn = /* @__PURE__ */ new WeakMap();
let pt = 0, Ue = 1;
const gn = 30;
let fe;
const $e = Symbol(""), bn = Symbol("");
class Mn {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Ki(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = fe, n = Pe;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = fe, fe = this, Pe = !0, Ue = 1 << ++pt, pt <= gn ? Vi(this) : rs(this), this.fn();
    } finally {
      pt <= gn && Yi(this), Ue = 1 << --pt, fe = this.parent, Pe = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    fe === this ? this.deferStop = !0 : this.active && (rs(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function rs(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Pe = !0;
const Bs = [];
function lt() {
  Bs.push(Pe), Pe = !1;
}
function ct() {
  const e = Bs.pop();
  Pe = e === void 0 ? !0 : e;
}
function re(e, t, n) {
  if (Pe && fe) {
    let s = mn.get(e);
    s || mn.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || s.set(n, i = Un()), Vs(i);
  }
}
function Vs(e, t) {
  let n = !1;
  pt <= gn ? Ks(e) || (e.n |= Ue, n = !$s(e)) : n = !e.has(fe), n && (e.add(fe), fe.deps.push(e));
}
function Ie(e, t, n, s, i, r) {
  const o = mn.get(e);
  if (!o)
    return;
  let c = [];
  if (t === "clear")
    c = [...o.values()];
  else if (n === "length" && O(e)) {
    const a = Number(s);
    o.forEach((f, p) => {
      (p === "length" || p >= a) && c.push(f);
    });
  } else
    switch (n !== void 0 && c.push(o.get(n)), t) {
      case "add":
        O(e) ? Cn(n) && c.push(o.get("length")) : (c.push(o.get($e)), et(e) && c.push(o.get(bn)));
        break;
      case "delete":
        O(e) || (c.push(o.get($e)), et(e) && c.push(o.get(bn)));
        break;
      case "set":
        et(e) && c.push(o.get($e));
        break;
    }
  if (c.length === 1)
    c[0] && En(c[0]);
  else {
    const a = [];
    for (const f of c)
      f && a.push(...f);
    En(Un(a));
  }
}
function En(e, t) {
  const n = O(e) ? e : [...e];
  for (const s of n)
    s.computed && os(s);
  for (const s of n)
    s.computed || os(s);
}
function os(e, t) {
  (e !== fe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const qi = /* @__PURE__ */ On("__proto__,__v_isRef,__isVue"), Ys = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(An)
), Ji = /* @__PURE__ */ Ln(), Qi = /* @__PURE__ */ Ln(!1, !0), Zi = /* @__PURE__ */ Ln(!0), ls = /* @__PURE__ */ er();
function er() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = M(this);
      for (let r = 0, o = this.length; r < o; r++)
        re(s, "get", r + "");
      const i = s[t](...n);
      return i === -1 || i === !1 ? s[t](...n.map(M)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      lt();
      const s = M(this)[t].apply(this, n);
      return ct(), s;
    };
  }), e;
}
function tr(e) {
  const t = M(this);
  return re(t, "has", e), t.hasOwnProperty(e);
}
function Ln(e = !1, t = !1) {
  return function(s, i, r) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_isShallow")
      return t;
    if (i === "__v_raw" && r === (e ? t ? gr : ei : t ? Zs : Qs).get(s))
      return s;
    const o = O(s);
    if (!e) {
      if (o && U(ls, i))
        return Reflect.get(ls, i, r);
      if (i === "hasOwnProperty")
        return tr;
    }
    const c = Reflect.get(s, i, r);
    return (An(i) ? Ys.has(i) : qi(i)) || (e || re(s, "get", i), t) ? c : te(c) ? o && Cn(i) ? c : c.value : k(c) ? e ? ti(c) : zn(c) : c;
  };
}
const nr = /* @__PURE__ */ qs(), sr = /* @__PURE__ */ qs(!0);
function qs(e = !1) {
  return function(n, s, i, r) {
    let o = n[s];
    if (st(o) && te(o) && !te(i))
      return !1;
    if (!e && (!Gt(i) && !st(i) && (o = M(o), i = M(i)), !O(n) && te(o) && !te(i)))
      return o.value = i, !0;
    const c = O(n) && Cn(s) ? Number(s) < n.length : U(n, s), a = Reflect.set(n, s, i, r);
    return n === M(r) && (c ? bt(i, o) && Ie(n, "set", s, i) : Ie(n, "add", s, i)), a;
  };
}
function ir(e, t) {
  const n = U(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Ie(e, "delete", t, void 0), s;
}
function rr(e, t) {
  const n = Reflect.has(e, t);
  return (!An(t) || !Ys.has(t)) && re(e, "has", t), n;
}
function or(e) {
  return re(e, "iterate", O(e) ? "length" : $e), Reflect.ownKeys(e);
}
const Js = {
  get: Ji,
  set: nr,
  deleteProperty: ir,
  has: rr,
  ownKeys: or
}, lr = {
  get: Zi,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, cr = /* @__PURE__ */ Y(
  {},
  Js,
  {
    get: Qi,
    set: sr
  }
), Fn = (e) => e, Yt = (e) => Reflect.getPrototypeOf(e);
function Rt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const i = M(e), r = M(t);
  n || (t !== r && re(i, "get", t), re(i, "get", r));
  const { has: o } = Yt(i), c = s ? Fn : n ? Wn : Et;
  if (o.call(i, t))
    return c(e.get(t));
  if (o.call(i, r))
    return c(e.get(r));
  e !== i && e.get(t);
}
function At(e, t = !1) {
  const n = this.__v_raw, s = M(n), i = M(e);
  return t || (e !== i && re(s, "has", e), re(s, "has", i)), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function Ct(e, t = !1) {
  return e = e.__v_raw, !t && re(M(e), "iterate", $e), Reflect.get(e, "size", e);
}
function cs(e) {
  e = M(e);
  const t = M(this);
  return Yt(t).has.call(t, e) || (t.add(e), Ie(t, "add", e, e)), this;
}
function as(e, t) {
  t = M(t);
  const n = M(this), { has: s, get: i } = Yt(n);
  let r = s.call(n, e);
  r || (e = M(e), r = s.call(n, e));
  const o = i.call(n, e);
  return n.set(e, t), r ? bt(t, o) && Ie(n, "set", e, t) : Ie(n, "add", e, t), this;
}
function us(e) {
  const t = M(this), { has: n, get: s } = Yt(t);
  let i = n.call(t, e);
  i || (e = M(e), i = n.call(t, e)), s && s.call(t, e);
  const r = t.delete(e);
  return i && Ie(t, "delete", e, void 0), r;
}
function fs() {
  const e = M(this), t = e.size !== 0, n = e.clear();
  return t && Ie(e, "clear", void 0, void 0), n;
}
function Pt(e, t) {
  return function(s, i) {
    const r = this, o = r.__v_raw, c = M(o), a = t ? Fn : e ? Wn : Et;
    return !e && re(c, "iterate", $e), o.forEach((f, p) => s.call(i, a(f), a(p), r));
  };
}
function Nt(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, r = M(i), o = et(r), c = e === "entries" || e === Symbol.iterator && o, a = e === "keys" && o, f = i[e](...s), p = n ? Fn : t ? Wn : Et;
    return !t && re(
      r,
      "iterate",
      a ? bn : $e
    ), {
      // iterator protocol
      next() {
        const { value: x, done: S } = f.next();
        return S ? { value: x, done: S } : {
          value: c ? [p(x[0]), p(x[1])] : p(x),
          done: S
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Re(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function ar() {
  const e = {
    get(r) {
      return Rt(this, r);
    },
    get size() {
      return Ct(this);
    },
    has: At,
    add: cs,
    set: as,
    delete: us,
    clear: fs,
    forEach: Pt(!1, !1)
  }, t = {
    get(r) {
      return Rt(this, r, !1, !0);
    },
    get size() {
      return Ct(this);
    },
    has: At,
    add: cs,
    set: as,
    delete: us,
    clear: fs,
    forEach: Pt(!1, !0)
  }, n = {
    get(r) {
      return Rt(this, r, !0);
    },
    get size() {
      return Ct(this, !0);
    },
    has(r) {
      return At.call(this, r, !0);
    },
    add: Re("add"),
    set: Re("set"),
    delete: Re("delete"),
    clear: Re("clear"),
    forEach: Pt(!0, !1)
  }, s = {
    get(r) {
      return Rt(this, r, !0, !0);
    },
    get size() {
      return Ct(this, !0);
    },
    has(r) {
      return At.call(this, r, !0);
    },
    add: Re("add"),
    set: Re("set"),
    delete: Re("delete"),
    clear: Re("clear"),
    forEach: Pt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = Nt(
      r,
      !1,
      !1
    ), n[r] = Nt(
      r,
      !0,
      !1
    ), t[r] = Nt(
      r,
      !1,
      !0
    ), s[r] = Nt(
      r,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    s
  ];
}
const [
  ur,
  fr,
  dr,
  pr
] = /* @__PURE__ */ ar();
function jn(e, t) {
  const n = t ? e ? pr : dr : e ? fr : ur;
  return (s, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? s : Reflect.get(
    U(n, i) && i in s ? n : s,
    i,
    r
  );
}
const _r = {
  get: /* @__PURE__ */ jn(!1, !1)
}, hr = {
  get: /* @__PURE__ */ jn(!1, !0)
}, mr = {
  get: /* @__PURE__ */ jn(!0, !1)
}, Qs = /* @__PURE__ */ new WeakMap(), Zs = /* @__PURE__ */ new WeakMap(), ei = /* @__PURE__ */ new WeakMap(), gr = /* @__PURE__ */ new WeakMap();
function br(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Er(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : br(Li(e));
}
function zn(e) {
  return st(e) ? e : Hn(
    e,
    !1,
    Js,
    _r,
    Qs
  );
}
function xr(e) {
  return Hn(
    e,
    !1,
    cr,
    hr,
    Zs
  );
}
function ti(e) {
  return Hn(
    e,
    !0,
    lr,
    mr,
    ei
  );
}
function Hn(e, t, n, s, i) {
  if (!k(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const o = Er(e);
  if (o === 0)
    return e;
  const c = new Proxy(
    e,
    o === 2 ? s : n
  );
  return i.set(e, c), c;
}
function tt(e) {
  return st(e) ? tt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function st(e) {
  return !!(e && e.__v_isReadonly);
}
function Gt(e) {
  return !!(e && e.__v_isShallow);
}
function ni(e) {
  return tt(e) || st(e);
}
function M(e) {
  const t = e && e.__v_raw;
  return t ? M(t) : e;
}
function si(e) {
  return Wt(e, "__v_skip", !0), e;
}
const Et = (e) => k(e) ? zn(e) : e, Wn = (e) => k(e) ? ti(e) : e;
function ii(e) {
  Pe && fe && (e = M(e), Vs(e.dep || (e.dep = Un())));
}
function ri(e, t) {
  e = M(e);
  const n = e.dep;
  n && En(n);
}
function te(e) {
  return !!(e && e.__v_isRef === !0);
}
function Ce(e) {
  return wr(e, !1);
}
function wr(e, t) {
  return te(e) ? e : new vr(e, t);
}
class vr {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : M(t), this._value = n ? t : Et(t);
  }
  get value() {
    return ii(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Gt(t) || st(t);
    t = n ? t : M(t), bt(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Et(t), ri(this));
  }
}
function Sr(e) {
  return te(e) ? e.value : e;
}
const Tr = {
  get: (e, t, n) => Sr(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return te(i) && !te(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function oi(e) {
  return tt(e) ? e : new Proxy(e, Tr);
}
class yr {
  constructor(t, n, s, i) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Mn(t, () => {
      this._dirty || (this._dirty = !0, ri(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = s;
  }
  get value() {
    const t = M(this);
    return ii(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function Ir(e, t, n = !1) {
  let s, i;
  const r = C(e);
  return r ? (s = e, i = _e) : (s = e.get, i = e.set), new yr(s, i, r || !i, n);
}
function Ne(e, t, n, s) {
  let i;
  try {
    i = s ? e(...s) : e();
  } catch (r) {
    qt(r, t, n);
  }
  return i;
}
function he(e, t, n, s) {
  if (C(e)) {
    const r = Ne(e, t, n, s);
    return r && zs(r) && r.catch((o) => {
      qt(o, t, n);
    }), r;
  }
  const i = [];
  for (let r = 0; r < e.length; r++)
    i.push(he(e[r], t, n, s));
  return i;
}
function qt(e, t, n, s = !0) {
  const i = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const o = t.proxy, c = n;
    for (; r; ) {
      const f = r.ec;
      if (f) {
        for (let p = 0; p < f.length; p++)
          if (f[p](e, o, c) === !1)
            return;
      }
      r = r.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      Ne(
        a,
        null,
        10,
        [e, o, c]
      );
      return;
    }
  }
  Or(e, n, i, s);
}
function Or(e, t, n, s = !0) {
  console.error(e);
}
let xt = !1, xn = !1;
const Z = [];
let we = 0;
const nt = [];
let Te = null, We = 0;
const li = /* @__PURE__ */ Promise.resolve();
let Gn = null;
function ci(e) {
  const t = Gn || li;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Dr(e) {
  let t = we + 1, n = Z.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    wt(Z[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function kn(e) {
  (!Z.length || !Z.includes(
    e,
    xt && e.allowRecurse ? we + 1 : we
  )) && (e.id == null ? Z.push(e) : Z.splice(Dr(e.id), 0, e), ai());
}
function ai() {
  !xt && !xn && (xn = !0, Gn = li.then(fi));
}
function Rr(e) {
  const t = Z.indexOf(e);
  t > we && Z.splice(t, 1);
}
function Ar(e) {
  O(e) ? nt.push(...e) : (!Te || !Te.includes(
    e,
    e.allowRecurse ? We + 1 : We
  )) && nt.push(e), ai();
}
function ds(e, t = xt ? we + 1 : 0) {
  for (; t < Z.length; t++) {
    const n = Z[t];
    n && n.pre && (Z.splice(t, 1), t--, n());
  }
}
function ui(e) {
  if (nt.length) {
    const t = [...new Set(nt)];
    if (nt.length = 0, Te) {
      Te.push(...t);
      return;
    }
    for (Te = t, Te.sort((n, s) => wt(n) - wt(s)), We = 0; We < Te.length; We++)
      Te[We]();
    Te = null, We = 0;
  }
}
const wt = (e) => e.id == null ? 1 / 0 : e.id, Cr = (e, t) => {
  const n = wt(e) - wt(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function fi(e) {
  xn = !1, xt = !0, Z.sort(Cr);
  const t = _e;
  try {
    for (we = 0; we < Z.length; we++) {
      const n = Z[we];
      n && n.active !== !1 && Ne(n, null, 14);
    }
  } finally {
    we = 0, Z.length = 0, ui(), xt = !1, Gn = null, (Z.length || nt.length) && fi();
  }
}
function Pr(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || W;
  let i = n;
  const r = t.startsWith("update:"), o = r && t.slice(7);
  if (o && o in s) {
    const p = `${o === "modelValue" ? "model" : o}Modifiers`, { number: x, trim: S } = s[p] || W;
    S && (i = n.map((v) => q(v) ? v.trim() : v)), x && (i = n.map(_n));
  }
  let c, a = s[c = ln(t)] || // also try camelCase event handler (#2249)
  s[c = ln(ye(t))];
  !a && r && (a = s[c = ln(ue(t))]), a && he(
    a,
    e,
    6,
    i
  );
  const f = s[c + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, he(
      f,
      e,
      6,
      i
    );
  }
}
function di(e, t, n = !1) {
  const s = t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let o = {}, c = !1;
  if (!C(e)) {
    const a = (f) => {
      const p = di(f, t, !0);
      p && (c = !0, Y(o, p));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !r && !c ? (k(e) && s.set(e, null), null) : (O(r) ? r.forEach((a) => o[a] = null) : Y(o, r), k(e) && s.set(e, o), o);
}
function Jt(e, t) {
  return !e || !Kt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), U(e, t[0].toLowerCase() + t.slice(1)) || U(e, ue(t)) || U(e, t));
}
let de = null, pi = null;
function kt(e) {
  const t = de;
  return de = e, pi = e && e.type.__scopeId || null, t;
}
function Nr(e, t = de, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && vs(-1);
    const r = kt(t);
    let o;
    try {
      o = e(...i);
    } finally {
      kt(r), s._d && vs(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function cn(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: i,
    props: r,
    propsOptions: [o],
    slots: c,
    attrs: a,
    emit: f,
    render: p,
    renderCache: x,
    data: S,
    setupState: v,
    ctx: R,
    inheritAttrs: A
  } = e;
  let K, j;
  const B = kt(e);
  try {
    if (n.shapeFlag & 4) {
      const P = i || s;
      K = xe(
        p.call(
          P,
          P,
          x,
          r,
          v,
          S,
          R
        )
      ), j = a;
    } else {
      const P = t;
      K = xe(
        P.length > 1 ? P(
          r,
          { attrs: a, slots: c, emit: f }
        ) : P(
          r,
          null
          /* we know it doesn't need it */
        )
      ), j = t.props ? a : Ur(a);
    }
  } catch (P) {
    mt.length = 0, qt(P, e, 1), K = me(Be);
  }
  let Q = K;
  if (j && A !== !1) {
    const P = Object.keys(j), { shapeFlag: De } = Q;
    P.length && De & 7 && (o && P.some(Dn) && (j = Mr(
      j,
      o
    )), Q = rt(Q, j));
  }
  return n.dirs && (Q = rt(Q), Q.dirs = Q.dirs ? Q.dirs.concat(n.dirs) : n.dirs), n.transition && (Q.transition = n.transition), K = Q, kt(B), K;
}
const Ur = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Kt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Mr = (e, t) => {
  const n = {};
  for (const s in e)
    (!Dn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Lr(e, t, n) {
  const { props: s, children: i, component: r } = e, { props: o, children: c, patchFlag: a } = t, f = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? ps(s, o, f) : !!o;
    if (a & 8) {
      const p = t.dynamicProps;
      for (let x = 0; x < p.length; x++) {
        const S = p[x];
        if (o[S] !== s[S] && !Jt(f, S))
          return !0;
      }
    }
  } else
    return (i || c) && (!c || !c.$stable) ? !0 : s === o ? !1 : s ? o ? ps(s, o, f) : !0 : !!o;
  return !1;
}
function ps(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (t[r] !== e[r] && !Jt(n, r))
      return !0;
  }
  return !1;
}
function Fr({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const jr = (e) => e.__isSuspense;
function zr(e, t) {
  t && t.pendingBranch ? O(e) ? t.effects.push(...e) : t.effects.push(e) : Ar(e);
}
const Ut = {};
function an(e, t, n) {
  return _i(e, t, n);
}
function _i(e, t, { immediate: n, deep: s, flush: i, onTrack: r, onTrigger: o } = W) {
  var c;
  const a = Bi() === ((c = ee) == null ? void 0 : c.scope) ? ee : null;
  let f, p = !1, x = !1;
  if (te(e) ? (f = () => e.value, p = Gt(e)) : tt(e) ? (f = () => e, s = !0) : O(e) ? (x = !0, p = e.some((P) => tt(P) || Gt(P)), f = () => e.map((P) => {
    if (te(P))
      return P.value;
    if (tt(P))
      return ke(P);
    if (C(P))
      return Ne(P, a, 2);
  })) : C(e) ? t ? f = () => Ne(e, a, 2) : f = () => {
    if (!(a && a.isUnmounted))
      return S && S(), he(
        e,
        a,
        3,
        [v]
      );
  } : f = _e, t && s) {
    const P = f;
    f = () => ke(P());
  }
  let S, v = (P) => {
    S = B.onStop = () => {
      Ne(P, a, 4);
    };
  }, R;
  if (St)
    if (v = _e, t ? n && he(t, a, 3, [
      f(),
      x ? [] : void 0,
      v
    ]) : f(), i === "sync") {
      const P = No();
      R = P.__watcherHandles || (P.__watcherHandles = []);
    } else
      return _e;
  let A = x ? new Array(e.length).fill(Ut) : Ut;
  const K = () => {
    if (B.active)
      if (t) {
        const P = B.run();
        (s || p || (x ? P.some(
          (De, at) => bt(De, A[at])
        ) : bt(P, A))) && (S && S(), he(t, a, 3, [
          P,
          // pass undefined as the old value when it's changed for the first time
          A === Ut ? void 0 : x && A[0] === Ut ? [] : A,
          v
        ]), A = P);
      } else
        B.run();
  };
  K.allowRecurse = !!t;
  let j;
  i === "sync" ? j = K : i === "post" ? j = () => ie(K, a && a.suspense) : (K.pre = !0, a && (K.id = a.uid), j = () => kn(K));
  const B = new Mn(f, j);
  t ? n ? K() : A = B.run() : i === "post" ? ie(
    B.run.bind(B),
    a && a.suspense
  ) : B.run();
  const Q = () => {
    B.stop(), a && a.scope && Rn(a.scope.effects, B);
  };
  return R && R.push(Q), Q;
}
function Hr(e, t, n) {
  const s = this.proxy, i = q(e) ? e.includes(".") ? hi(s, e) : () => s[e] : e.bind(s, s);
  let r;
  C(t) ? r = t : (r = t.handler, n = t);
  const o = ee;
  ot(this);
  const c = _i(i, r.bind(s), n);
  return o ? ot(o) : Ke(), c;
}
function hi(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
function ke(e, t) {
  if (!k(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), te(e))
    ke(e.value, t);
  else if (O(e))
    for (let n = 0; n < e.length; n++)
      ke(e[n], t);
  else if (js(e) || et(e))
    e.forEach((n) => {
      ke(n, t);
    });
  else if (Ws(e))
    for (const n in e)
      ke(e[n], t);
  return e;
}
function Wr(e, t) {
  const n = de;
  if (n === null)
    return e;
  const s = tn(n) || n.proxy, i = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [o, c, a, f = W] = t[r];
    o && (C(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && ke(c), i.push({
      dir: o,
      instance: s,
      value: c,
      oldValue: void 0,
      arg: a,
      modifiers: f
    }));
  }
  return e;
}
function ze(e, t, n, s) {
  const i = e.dirs, r = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const c = i[o];
    r && (c.oldValue = r[o].value);
    let a = c.dir[s];
    a && (lt(), he(a, n, 8, [
      e.el,
      c,
      e,
      t
    ]), ct());
  }
}
function Ve(e, t) {
  return C(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => Y({ name: e.name }, t, { setup: e }))()
  ) : e;
}
const Ft = (e) => !!e.type.__asyncLoader, mi = (e) => e.type.__isKeepAlive;
function Gr(e, t) {
  gi(e, "a", t);
}
function kr(e, t) {
  gi(e, "da", t);
}
function gi(e, t, n = ee) {
  const s = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (Qt(t, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      mi(i.parent.vnode) && Xr(s, t, n, i), i = i.parent;
  }
}
function Xr(e, t, n, s) {
  const i = Qt(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  bi(() => {
    Rn(s[t], i);
  }, n);
}
function Qt(e, t, n = ee, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...o) => {
      if (n.isUnmounted)
        return;
      lt(), ot(n);
      const c = he(t, n, e, o);
      return Ke(), ct(), c;
    });
    return s ? i.unshift(r) : i.push(r), r;
  }
}
const Oe = (e) => (t, n = ee) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!St || e === "sp") && Qt(e, (...s) => t(...s), n)
), $r = Oe("bm"), Xn = Oe("m"), Kr = Oe("bu"), Br = Oe("u"), Vr = Oe("bum"), bi = Oe("um"), Yr = Oe("sp"), qr = Oe(
  "rtg"
), Jr = Oe(
  "rtc"
);
function Qr(e, t = ee) {
  Qt("ec", e, t);
}
const Zr = Symbol.for("v-ndc");
function $n(e, t, n, s) {
  let i;
  const r = n && n[s];
  if (O(e) || q(e)) {
    i = new Array(e.length);
    for (let o = 0, c = e.length; o < c; o++)
      i[o] = t(e[o], o, void 0, r && r[o]);
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let o = 0; o < e; o++)
      i[o] = t(o + 1, o, void 0, r && r[o]);
  } else if (k(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (o, c) => t(o, c, void 0, r && r[c])
      );
    else {
      const o = Object.keys(e);
      i = new Array(o.length);
      for (let c = 0, a = o.length; c < a; c++) {
        const f = o[c];
        i[c] = t(e[f], f, c, r && r[c]);
      }
    }
  else
    i = [];
  return n && (n[s] = i), i;
}
const wn = (e) => e ? Ri(e) ? tn(e) || e.proxy : wn(e.parent) : null, ht = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Y(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => wn(e.parent),
    $root: (e) => wn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Kn(e),
    $forceUpdate: (e) => e.f || (e.f = () => kn(e.update)),
    $nextTick: (e) => e.n || (e.n = ci.bind(e.proxy)),
    $watch: (e) => Hr.bind(e)
  })
), un = (e, t) => e !== W && !e.__isScriptSetup && U(e, t), eo = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: i, props: r, accessCache: o, type: c, appContext: a } = e;
    let f;
    if (t[0] !== "$") {
      const v = o[t];
      if (v !== void 0)
        switch (v) {
          case 1:
            return s[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (un(s, t))
          return o[t] = 1, s[t];
        if (i !== W && U(i, t))
          return o[t] = 2, i[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && U(f, t)
        )
          return o[t] = 3, r[t];
        if (n !== W && U(n, t))
          return o[t] = 4, n[t];
        vn && (o[t] = 0);
      }
    }
    const p = ht[t];
    let x, S;
    if (p)
      return t === "$attrs" && re(e, "get", t), p(e);
    if (
      // css module (injected by vue-loader)
      (x = c.__cssModules) && (x = x[t])
    )
      return x;
    if (n !== W && U(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      S = a.config.globalProperties, U(S, t)
    )
      return S[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: i, ctx: r } = e;
    return un(i, t) ? (i[t] = n, !0) : s !== W && U(s, t) ? (s[t] = n, !0) : U(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, propsOptions: r }
  }, o) {
    let c;
    return !!n[o] || e !== W && U(e, o) || un(t, o) || (c = r[0]) && U(c, o) || U(s, o) || U(ht, o) || U(i.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : U(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function _s(e) {
  return O(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let vn = !0;
function to(e) {
  const t = Kn(e), n = e.proxy, s = e.ctx;
  vn = !1, t.beforeCreate && hs(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: r,
    methods: o,
    watch: c,
    provide: a,
    inject: f,
    // lifecycle
    created: p,
    beforeMount: x,
    mounted: S,
    beforeUpdate: v,
    updated: R,
    activated: A,
    deactivated: K,
    beforeDestroy: j,
    beforeUnmount: B,
    destroyed: Q,
    unmounted: P,
    render: De,
    renderTracked: at,
    renderTriggered: Tt,
    errorCaptured: Me,
    serverPrefetch: nn,
    // public API
    expose: Le,
    inheritAttrs: ut,
    // assets
    components: yt,
    directives: It,
    filters: sn
  } = t;
  if (f && no(f, s, null), o)
    for (const X in o) {
      const z = o[X];
      C(z) && (s[X] = z.bind(n));
    }
  if (i) {
    const X = i.call(n, n);
    k(X) && (e.data = zn(X));
  }
  if (vn = !0, r)
    for (const X in r) {
      const z = r[X], Fe = C(z) ? z.bind(n, n) : C(z.get) ? z.get.bind(n, n) : _e, Ot = !C(z) && C(z.set) ? z.set.bind(n) : _e, je = gt({
        get: Fe,
        set: Ot
      });
      Object.defineProperty(s, X, {
        enumerable: !0,
        configurable: !0,
        get: () => je.value,
        set: (ge) => je.value = ge
      });
    }
  if (c)
    for (const X in c)
      Ei(c[X], s, n, X);
  if (a) {
    const X = C(a) ? a.call(n) : a;
    Reflect.ownKeys(X).forEach((z) => {
      co(z, X[z]);
    });
  }
  p && hs(p, e, "c");
  function ne(X, z) {
    O(z) ? z.forEach((Fe) => X(Fe.bind(n))) : z && X(z.bind(n));
  }
  if (ne($r, x), ne(Xn, S), ne(Kr, v), ne(Br, R), ne(Gr, A), ne(kr, K), ne(Qr, Me), ne(Jr, at), ne(qr, Tt), ne(Vr, B), ne(bi, P), ne(Yr, nn), O(Le))
    if (Le.length) {
      const X = e.exposed || (e.exposed = {});
      Le.forEach((z) => {
        Object.defineProperty(X, z, {
          get: () => n[z],
          set: (Fe) => n[z] = Fe
        });
      });
    } else
      e.exposed || (e.exposed = {});
  De && e.render === _e && (e.render = De), ut != null && (e.inheritAttrs = ut), yt && (e.components = yt), It && (e.directives = It);
}
function no(e, t, n = _e) {
  O(e) && (e = Sn(e));
  for (const s in e) {
    const i = e[s];
    let r;
    k(i) ? "default" in i ? r = jt(
      i.from || s,
      i.default,
      !0
      /* treat default function as factory */
    ) : r = jt(i.from || s) : r = jt(i), te(r) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (o) => r.value = o
    }) : t[s] = r;
  }
}
function hs(e, t, n) {
  he(
    O(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Ei(e, t, n, s) {
  const i = s.includes(".") ? hi(n, s) : () => n[s];
  if (q(e)) {
    const r = t[e];
    C(r) && an(i, r);
  } else if (C(e))
    an(i, e.bind(n));
  else if (k(e))
    if (O(e))
      e.forEach((r) => Ei(r, t, n, s));
    else {
      const r = C(e.handler) ? e.handler.bind(n) : t[e.handler];
      C(r) && an(i, r, e);
    }
}
function Kn(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: o }
  } = e.appContext, c = r.get(t);
  let a;
  return c ? a = c : !i.length && !n && !s ? a = t : (a = {}, i.length && i.forEach(
    (f) => Xt(a, f, o, !0)
  ), Xt(a, t, o)), k(t) && r.set(t, a), a;
}
function Xt(e, t, n, s = !1) {
  const { mixins: i, extends: r } = t;
  r && Xt(e, r, n, !0), i && i.forEach(
    (o) => Xt(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const c = so[o] || n && n[o];
      e[o] = c ? c(e[o], t[o]) : t[o];
    }
  return e;
}
const so = {
  data: ms,
  props: gs,
  emits: gs,
  // objects
  methods: _t,
  computed: _t,
  // lifecycle
  beforeCreate: se,
  created: se,
  beforeMount: se,
  mounted: se,
  beforeUpdate: se,
  updated: se,
  beforeDestroy: se,
  beforeUnmount: se,
  destroyed: se,
  unmounted: se,
  activated: se,
  deactivated: se,
  errorCaptured: se,
  serverPrefetch: se,
  // assets
  components: _t,
  directives: _t,
  // watch
  watch: ro,
  // provide / inject
  provide: ms,
  inject: io
};
function ms(e, t) {
  return t ? e ? function() {
    return Y(
      C(e) ? e.call(this, this) : e,
      C(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function io(e, t) {
  return _t(Sn(e), Sn(t));
}
function Sn(e) {
  if (O(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function se(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function _t(e, t) {
  return e ? Y(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function gs(e, t) {
  return e ? O(e) && O(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Y(
    /* @__PURE__ */ Object.create(null),
    _s(e),
    _s(t ?? {})
  ) : t;
}
function ro(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Y(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = se(e[s], t[s]);
  return n;
}
function xi() {
  return {
    app: null,
    config: {
      isNativeTag: Ni,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let oo = 0;
function lo(e, t) {
  return function(s, i = null) {
    C(s) || (s = Y({}, s)), i != null && !k(i) && (i = null);
    const r = xi(), o = /* @__PURE__ */ new Set();
    let c = !1;
    const a = r.app = {
      _uid: oo++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: Uo,
      get config() {
        return r.config;
      },
      set config(f) {
      },
      use(f, ...p) {
        return o.has(f) || (f && C(f.install) ? (o.add(f), f.install(a, ...p)) : C(f) && (o.add(f), f(a, ...p))), a;
      },
      mixin(f) {
        return r.mixins.includes(f) || r.mixins.push(f), a;
      },
      component(f, p) {
        return p ? (r.components[f] = p, a) : r.components[f];
      },
      directive(f, p) {
        return p ? (r.directives[f] = p, a) : r.directives[f];
      },
      mount(f, p, x) {
        if (!c) {
          const S = me(
            s,
            i
          );
          return S.appContext = r, p && t ? t(S, f) : e(S, f, x), c = !0, a._container = f, f.__vue_app__ = a, tn(S.component) || S.component.proxy;
        }
      },
      unmount() {
        c && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(f, p) {
        return r.provides[f] = p, a;
      },
      runWithContext(f) {
        $t = a;
        try {
          return f();
        } finally {
          $t = null;
        }
      }
    };
    return a;
  };
}
let $t = null;
function co(e, t) {
  if (ee) {
    let n = ee.provides;
    const s = ee.parent && ee.parent.provides;
    s === n && (n = ee.provides = Object.create(s)), n[e] = t;
  }
}
function jt(e, t, n = !1) {
  const s = ee || de;
  if (s || $t) {
    const i = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : $t._context.provides;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && C(t) ? t.call(s && s.proxy) : t;
  }
}
function ao(e, t, n, s = !1) {
  const i = {}, r = {};
  Wt(r, en, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), wi(e, t, i, r);
  for (const o in e.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? e.props = s ? i : xr(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function uo(e, t, n, s) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: o }
  } = e, c = M(i), [a] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const p = e.vnode.dynamicProps;
      for (let x = 0; x < p.length; x++) {
        let S = p[x];
        if (Jt(e.emitsOptions, S))
          continue;
        const v = t[S];
        if (a)
          if (U(r, S))
            v !== r[S] && (r[S] = v, f = !0);
          else {
            const R = ye(S);
            i[R] = Tn(
              a,
              c,
              R,
              v,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          v !== r[S] && (r[S] = v, f = !0);
      }
    }
  } else {
    wi(e, t, i, r) && (f = !0);
    let p;
    for (const x in c)
      (!t || // for camelCase
      !U(t, x) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((p = ue(x)) === x || !U(t, p))) && (a ? n && // for camelCase
      (n[x] !== void 0 || // for kebab-case
      n[p] !== void 0) && (i[x] = Tn(
        a,
        c,
        x,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete i[x]);
    if (r !== c)
      for (const x in r)
        (!t || !U(t, x)) && (delete r[x], f = !0);
  }
  f && Ie(e, "set", "$attrs");
}
function wi(e, t, n, s) {
  const [i, r] = e.propsOptions;
  let o = !1, c;
  if (t)
    for (let a in t) {
      if (Mt(a))
        continue;
      const f = t[a];
      let p;
      i && U(i, p = ye(a)) ? !r || !r.includes(p) ? n[p] = f : (c || (c = {}))[p] = f : Jt(e.emitsOptions, a) || (!(a in s) || f !== s[a]) && (s[a] = f, o = !0);
    }
  if (r) {
    const a = M(n), f = c || W;
    for (let p = 0; p < r.length; p++) {
      const x = r[p];
      n[x] = Tn(
        i,
        a,
        x,
        f[x],
        e,
        !U(f, x)
      );
    }
  }
  return o;
}
function Tn(e, t, n, s, i, r) {
  const o = e[n];
  if (o != null) {
    const c = U(o, "default");
    if (c && s === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && C(a)) {
        const { propsDefaults: f } = i;
        n in f ? s = f[n] : (ot(i), s = f[n] = a.call(
          null,
          t
        ), Ke());
      } else
        s = a;
    }
    o[
      0
      /* shouldCast */
    ] && (r && !c ? s = !1 : o[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === ue(n)) && (s = !0));
  }
  return s;
}
function vi(e, t, n = !1) {
  const s = t.propsCache, i = s.get(e);
  if (i)
    return i;
  const r = e.props, o = {}, c = [];
  let a = !1;
  if (!C(e)) {
    const p = (x) => {
      a = !0;
      const [S, v] = vi(x, t, !0);
      Y(o, S), v && c.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p);
  }
  if (!r && !a)
    return k(e) && s.set(e, Ze), Ze;
  if (O(r))
    for (let p = 0; p < r.length; p++) {
      const x = ye(r[p]);
      bs(x) && (o[x] = W);
    }
  else if (r)
    for (const p in r) {
      const x = ye(p);
      if (bs(x)) {
        const S = r[p], v = o[x] = O(S) || C(S) ? { type: S } : Y({}, S);
        if (v) {
          const R = ws(Boolean, v.type), A = ws(String, v.type);
          v[
            0
            /* shouldCast */
          ] = R > -1, v[
            1
            /* shouldCastTrue */
          ] = A < 0 || R < A, (R > -1 || U(v, "default")) && c.push(x);
        }
      }
    }
  const f = [o, c];
  return k(e) && s.set(e, f), f;
}
function bs(e) {
  return e[0] !== "$";
}
function Es(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function xs(e, t) {
  return Es(e) === Es(t);
}
function ws(e, t) {
  return O(t) ? t.findIndex((n) => xs(n, e)) : C(t) && xs(t, e) ? 0 : -1;
}
const Si = (e) => e[0] === "_" || e === "$stable", Bn = (e) => O(e) ? e.map(xe) : [xe(e)], fo = (e, t, n) => {
  if (t._n)
    return t;
  const s = Nr((...i) => Bn(t(...i)), n);
  return s._c = !1, s;
}, Ti = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (Si(i))
      continue;
    const r = e[i];
    if (C(r))
      t[i] = fo(i, r, s);
    else if (r != null) {
      const o = Bn(r);
      t[i] = () => o;
    }
  }
}, yi = (e, t) => {
  const n = Bn(t);
  e.slots.default = () => n;
}, po = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = M(t), Wt(t, "_", n)) : Ti(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && yi(e, t);
  Wt(e.slots, en, 1);
}, _o = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let r = !0, o = W;
  if (s.shapeFlag & 32) {
    const c = t._;
    c ? n && c === 1 ? r = !1 : (Y(i, t), !n && c === 1 && delete i._) : (r = !t.$stable, Ti(t, i)), o = t;
  } else
    t && (yi(e, t), o = { default: 1 });
  if (r)
    for (const c in i)
      !Si(c) && !(c in o) && delete i[c];
};
function yn(e, t, n, s, i = !1) {
  if (O(e)) {
    e.forEach(
      (S, v) => yn(
        S,
        t && (O(t) ? t[v] : t),
        n,
        s,
        i
      )
    );
    return;
  }
  if (Ft(s) && !i)
    return;
  const r = s.shapeFlag & 4 ? tn(s.component) || s.component.proxy : s.el, o = i ? null : r, { i: c, r: a } = e, f = t && t.r, p = c.refs === W ? c.refs = {} : c.refs, x = c.setupState;
  if (f != null && f !== a && (q(f) ? (p[f] = null, U(x, f) && (x[f] = null)) : te(f) && (f.value = null)), C(a))
    Ne(a, c, 12, [o, p]);
  else {
    const S = q(a), v = te(a);
    if (S || v) {
      const R = () => {
        if (e.f) {
          const A = S ? U(x, a) ? x[a] : p[a] : a.value;
          i ? O(A) && Rn(A, r) : O(A) ? A.includes(r) || A.push(r) : S ? (p[a] = [r], U(x, a) && (x[a] = p[a])) : (a.value = [r], e.k && (p[e.k] = a.value));
        } else
          S ? (p[a] = o, U(x, a) && (x[a] = o)) : v && (a.value = o, e.k && (p[e.k] = o));
      };
      o ? (R.id = -1, ie(R, n)) : R();
    }
  }
}
const ie = zr;
function ho(e) {
  return mo(e);
}
function mo(e, t) {
  const n = hn();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: i,
    patchProp: r,
    createElement: o,
    createText: c,
    createComment: a,
    setText: f,
    setElementText: p,
    parentNode: x,
    nextSibling: S,
    setScopeId: v = _e,
    insertStaticContent: R
  } = e, A = (l, u, d, h = null, _ = null, b = null, w = !1, g = null, E = !!u.dynamicChildren) => {
    if (l === u)
      return;
    l && !dt(l, u) && (h = Dt(l), ge(l, _, b, !0), l = null), u.patchFlag === -2 && (E = !1, u.dynamicChildren = null);
    const { type: m, ref: y, shapeFlag: T } = u;
    switch (m) {
      case Zt:
        K(l, u, d, h);
        break;
      case Be:
        j(l, u, d, h);
        break;
      case fn:
        l == null && B(u, d, h, w);
        break;
      case le:
        yt(
          l,
          u,
          d,
          h,
          _,
          b,
          w,
          g,
          E
        );
        break;
      default:
        T & 1 ? De(
          l,
          u,
          d,
          h,
          _,
          b,
          w,
          g,
          E
        ) : T & 6 ? It(
          l,
          u,
          d,
          h,
          _,
          b,
          w,
          g,
          E
        ) : (T & 64 || T & 128) && m.process(
          l,
          u,
          d,
          h,
          _,
          b,
          w,
          g,
          E,
          Ye
        );
    }
    y != null && _ && yn(y, l && l.ref, b, u || l, !u);
  }, K = (l, u, d, h) => {
    if (l == null)
      s(
        u.el = c(u.children),
        d,
        h
      );
    else {
      const _ = u.el = l.el;
      u.children !== l.children && f(_, u.children);
    }
  }, j = (l, u, d, h) => {
    l == null ? s(
      u.el = a(u.children || ""),
      d,
      h
    ) : u.el = l.el;
  }, B = (l, u, d, h) => {
    [l.el, l.anchor] = R(
      l.children,
      u,
      d,
      h,
      l.el,
      l.anchor
    );
  }, Q = ({ el: l, anchor: u }, d, h) => {
    let _;
    for (; l && l !== u; )
      _ = S(l), s(l, d, h), l = _;
    s(u, d, h);
  }, P = ({ el: l, anchor: u }) => {
    let d;
    for (; l && l !== u; )
      d = S(l), i(l), l = d;
    i(u);
  }, De = (l, u, d, h, _, b, w, g, E) => {
    w = w || u.type === "svg", l == null ? at(
      u,
      d,
      h,
      _,
      b,
      w,
      g,
      E
    ) : nn(
      l,
      u,
      _,
      b,
      w,
      g,
      E
    );
  }, at = (l, u, d, h, _, b, w, g) => {
    let E, m;
    const { type: y, props: T, shapeFlag: I, transition: D, dirs: N } = l;
    if (E = l.el = o(
      l.type,
      b,
      T && T.is,
      T
    ), I & 8 ? p(E, l.children) : I & 16 && Me(
      l.children,
      E,
      null,
      h,
      _,
      b && y !== "foreignObject",
      w,
      g
    ), N && ze(l, null, h, "created"), Tt(E, l, l.scopeId, w, h), T) {
      for (const F in T)
        F !== "value" && !Mt(F) && r(
          E,
          F,
          null,
          T[F],
          b,
          l.children,
          h,
          _,
          Se
        );
      "value" in T && r(E, "value", null, T.value), (m = T.onVnodeBeforeMount) && Ee(m, h, l);
    }
    N && ze(l, null, h, "beforeMount");
    const H = (!_ || _ && !_.pendingBranch) && D && !D.persisted;
    H && D.beforeEnter(E), s(E, u, d), ((m = T && T.onVnodeMounted) || H || N) && ie(() => {
      m && Ee(m, h, l), H && D.enter(E), N && ze(l, null, h, "mounted");
    }, _);
  }, Tt = (l, u, d, h, _) => {
    if (d && v(l, d), h)
      for (let b = 0; b < h.length; b++)
        v(l, h[b]);
    if (_) {
      let b = _.subTree;
      if (u === b) {
        const w = _.vnode;
        Tt(
          l,
          w,
          w.scopeId,
          w.slotScopeIds,
          _.parent
        );
      }
    }
  }, Me = (l, u, d, h, _, b, w, g, E = 0) => {
    for (let m = E; m < l.length; m++) {
      const y = l[m] = g ? Ae(l[m]) : xe(l[m]);
      A(
        null,
        y,
        u,
        d,
        h,
        _,
        b,
        w,
        g
      );
    }
  }, nn = (l, u, d, h, _, b, w) => {
    const g = u.el = l.el;
    let { patchFlag: E, dynamicChildren: m, dirs: y } = u;
    E |= l.patchFlag & 16;
    const T = l.props || W, I = u.props || W;
    let D;
    d && He(d, !1), (D = I.onVnodeBeforeUpdate) && Ee(D, d, u, l), y && ze(u, l, d, "beforeUpdate"), d && He(d, !0);
    const N = _ && u.type !== "foreignObject";
    if (m ? Le(
      l.dynamicChildren,
      m,
      g,
      d,
      h,
      N,
      b
    ) : w || z(
      l,
      u,
      g,
      null,
      d,
      h,
      N,
      b,
      !1
    ), E > 0) {
      if (E & 16)
        ut(
          g,
          u,
          T,
          I,
          d,
          h,
          _
        );
      else if (E & 2 && T.class !== I.class && r(g, "class", null, I.class, _), E & 4 && r(g, "style", T.style, I.style, _), E & 8) {
        const H = u.dynamicProps;
        for (let F = 0; F < H.length; F++) {
          const V = H[F], ce = T[V], qe = I[V];
          (qe !== ce || V === "value") && r(
            g,
            V,
            ce,
            qe,
            _,
            l.children,
            d,
            h,
            Se
          );
        }
      }
      E & 1 && l.children !== u.children && p(g, u.children);
    } else
      !w && m == null && ut(
        g,
        u,
        T,
        I,
        d,
        h,
        _
      );
    ((D = I.onVnodeUpdated) || y) && ie(() => {
      D && Ee(D, d, u, l), y && ze(u, l, d, "updated");
    }, h);
  }, Le = (l, u, d, h, _, b, w) => {
    for (let g = 0; g < u.length; g++) {
      const E = l[g], m = u[g], y = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        E.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === le || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !dt(E, m) || // - In the case of a component, it could contain anything.
        E.shapeFlag & 70) ? x(E.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          d
        )
      );
      A(
        E,
        m,
        y,
        null,
        h,
        _,
        b,
        w,
        !0
      );
    }
  }, ut = (l, u, d, h, _, b, w) => {
    if (d !== h) {
      if (d !== W)
        for (const g in d)
          !Mt(g) && !(g in h) && r(
            l,
            g,
            d[g],
            null,
            w,
            u.children,
            _,
            b,
            Se
          );
      for (const g in h) {
        if (Mt(g))
          continue;
        const E = h[g], m = d[g];
        E !== m && g !== "value" && r(
          l,
          g,
          m,
          E,
          w,
          u.children,
          _,
          b,
          Se
        );
      }
      "value" in h && r(l, "value", d.value, h.value);
    }
  }, yt = (l, u, d, h, _, b, w, g, E) => {
    const m = u.el = l ? l.el : c(""), y = u.anchor = l ? l.anchor : c("");
    let { patchFlag: T, dynamicChildren: I, slotScopeIds: D } = u;
    D && (g = g ? g.concat(D) : D), l == null ? (s(m, d, h), s(y, d, h), Me(
      u.children,
      d,
      y,
      _,
      b,
      w,
      g,
      E
    )) : T > 0 && T & 64 && I && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (Le(
      l.dynamicChildren,
      I,
      d,
      _,
      b,
      w,
      g
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (u.key != null || _ && u === _.subTree) && Ii(
      l,
      u,
      !0
      /* shallow */
    )) : z(
      l,
      u,
      d,
      y,
      _,
      b,
      w,
      g,
      E
    );
  }, It = (l, u, d, h, _, b, w, g, E) => {
    u.slotScopeIds = g, l == null ? u.shapeFlag & 512 ? _.ctx.activate(
      u,
      d,
      h,
      w,
      E
    ) : sn(
      u,
      d,
      h,
      _,
      b,
      w,
      E
    ) : Jn(l, u, E);
  }, sn = (l, u, d, h, _, b, w) => {
    const g = l.component = Io(
      l,
      h,
      _
    );
    if (mi(l) && (g.ctx.renderer = Ye), Oo(g), g.asyncDep) {
      if (_ && _.registerDep(g, ne), !l.el) {
        const E = g.subTree = me(Be);
        j(null, E, u, d);
      }
      return;
    }
    ne(
      g,
      l,
      u,
      d,
      _,
      b,
      w
    );
  }, Jn = (l, u, d) => {
    const h = u.component = l.component;
    if (Lr(l, u, d))
      if (h.asyncDep && !h.asyncResolved) {
        X(h, u, d);
        return;
      } else
        h.next = u, Rr(h.update), h.update();
    else
      u.el = l.el, h.vnode = u;
  }, ne = (l, u, d, h, _, b, w) => {
    const g = () => {
      if (l.isMounted) {
        let { next: y, bu: T, u: I, parent: D, vnode: N } = l, H = y, F;
        He(l, !1), y ? (y.el = N.el, X(l, y, w)) : y = N, T && Lt(T), (F = y.props && y.props.onVnodeBeforeUpdate) && Ee(F, D, y, N), He(l, !0);
        const V = cn(l), ce = l.subTree;
        l.subTree = V, A(
          ce,
          V,
          // parent may have changed if it's in a teleport
          x(ce.el),
          // anchor may have changed if it's in a fragment
          Dt(ce),
          l,
          _,
          b
        ), y.el = V.el, H === null && Fr(l, V.el), I && ie(I, _), (F = y.props && y.props.onVnodeUpdated) && ie(
          () => Ee(F, D, y, N),
          _
        );
      } else {
        let y;
        const { el: T, props: I } = u, { bm: D, m: N, parent: H } = l, F = Ft(u);
        if (He(l, !1), D && Lt(D), !F && (y = I && I.onVnodeBeforeMount) && Ee(y, H, u), He(l, !0), T && on) {
          const V = () => {
            l.subTree = cn(l), on(
              T,
              l.subTree,
              l,
              _,
              null
            );
          };
          F ? u.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !l.isUnmounted && V()
          ) : V();
        } else {
          const V = l.subTree = cn(l);
          A(
            null,
            V,
            d,
            h,
            l,
            _,
            b
          ), u.el = V.el;
        }
        if (N && ie(N, _), !F && (y = I && I.onVnodeMounted)) {
          const V = u;
          ie(
            () => Ee(y, H, V),
            _
          );
        }
        (u.shapeFlag & 256 || H && Ft(H.vnode) && H.vnode.shapeFlag & 256) && l.a && ie(l.a, _), l.isMounted = !0, u = d = h = null;
      }
    }, E = l.effect = new Mn(
      g,
      () => kn(m),
      l.scope
      // track it in component's effect scope
    ), m = l.update = () => E.run();
    m.id = l.uid, He(l, !0), m();
  }, X = (l, u, d) => {
    u.component = l;
    const h = l.vnode.props;
    l.vnode = u, l.next = null, uo(l, u.props, h, d), _o(l, u.children, d), lt(), ds(), ct();
  }, z = (l, u, d, h, _, b, w, g, E = !1) => {
    const m = l && l.children, y = l ? l.shapeFlag : 0, T = u.children, { patchFlag: I, shapeFlag: D } = u;
    if (I > 0) {
      if (I & 128) {
        Ot(
          m,
          T,
          d,
          h,
          _,
          b,
          w,
          g,
          E
        );
        return;
      } else if (I & 256) {
        Fe(
          m,
          T,
          d,
          h,
          _,
          b,
          w,
          g,
          E
        );
        return;
      }
    }
    D & 8 ? (y & 16 && Se(m, _, b), T !== m && p(d, T)) : y & 16 ? D & 16 ? Ot(
      m,
      T,
      d,
      h,
      _,
      b,
      w,
      g,
      E
    ) : Se(m, _, b, !0) : (y & 8 && p(d, ""), D & 16 && Me(
      T,
      d,
      h,
      _,
      b,
      w,
      g,
      E
    ));
  }, Fe = (l, u, d, h, _, b, w, g, E) => {
    l = l || Ze, u = u || Ze;
    const m = l.length, y = u.length, T = Math.min(m, y);
    let I;
    for (I = 0; I < T; I++) {
      const D = u[I] = E ? Ae(u[I]) : xe(u[I]);
      A(
        l[I],
        D,
        d,
        null,
        _,
        b,
        w,
        g,
        E
      );
    }
    m > y ? Se(
      l,
      _,
      b,
      !0,
      !1,
      T
    ) : Me(
      u,
      d,
      h,
      _,
      b,
      w,
      g,
      E,
      T
    );
  }, Ot = (l, u, d, h, _, b, w, g, E) => {
    let m = 0;
    const y = u.length;
    let T = l.length - 1, I = y - 1;
    for (; m <= T && m <= I; ) {
      const D = l[m], N = u[m] = E ? Ae(u[m]) : xe(u[m]);
      if (dt(D, N))
        A(
          D,
          N,
          d,
          null,
          _,
          b,
          w,
          g,
          E
        );
      else
        break;
      m++;
    }
    for (; m <= T && m <= I; ) {
      const D = l[T], N = u[I] = E ? Ae(u[I]) : xe(u[I]);
      if (dt(D, N))
        A(
          D,
          N,
          d,
          null,
          _,
          b,
          w,
          g,
          E
        );
      else
        break;
      T--, I--;
    }
    if (m > T) {
      if (m <= I) {
        const D = I + 1, N = D < y ? u[D].el : h;
        for (; m <= I; )
          A(
            null,
            u[m] = E ? Ae(u[m]) : xe(u[m]),
            d,
            N,
            _,
            b,
            w,
            g,
            E
          ), m++;
      }
    } else if (m > I)
      for (; m <= T; )
        ge(l[m], _, b, !0), m++;
    else {
      const D = m, N = m, H = /* @__PURE__ */ new Map();
      for (m = N; m <= I; m++) {
        const oe = u[m] = E ? Ae(u[m]) : xe(u[m]);
        oe.key != null && H.set(oe.key, m);
      }
      let F, V = 0;
      const ce = I - N + 1;
      let qe = !1, es = 0;
      const ft = new Array(ce);
      for (m = 0; m < ce; m++)
        ft[m] = 0;
      for (m = D; m <= T; m++) {
        const oe = l[m];
        if (V >= ce) {
          ge(oe, _, b, !0);
          continue;
        }
        let be;
        if (oe.key != null)
          be = H.get(oe.key);
        else
          for (F = N; F <= I; F++)
            if (ft[F - N] === 0 && dt(oe, u[F])) {
              be = F;
              break;
            }
        be === void 0 ? ge(oe, _, b, !0) : (ft[be - N] = m + 1, be >= es ? es = be : qe = !0, A(
          oe,
          u[be],
          d,
          null,
          _,
          b,
          w,
          g,
          E
        ), V++);
      }
      const ts = qe ? go(ft) : Ze;
      for (F = ts.length - 1, m = ce - 1; m >= 0; m--) {
        const oe = N + m, be = u[oe], ns = oe + 1 < y ? u[oe + 1].el : h;
        ft[m] === 0 ? A(
          null,
          be,
          d,
          ns,
          _,
          b,
          w,
          g,
          E
        ) : qe && (F < 0 || m !== ts[F] ? je(be, d, ns, 2) : F--);
      }
    }
  }, je = (l, u, d, h, _ = null) => {
    const { el: b, type: w, transition: g, children: E, shapeFlag: m } = l;
    if (m & 6) {
      je(l.component.subTree, u, d, h);
      return;
    }
    if (m & 128) {
      l.suspense.move(u, d, h);
      return;
    }
    if (m & 64) {
      w.move(l, u, d, Ye);
      return;
    }
    if (w === le) {
      s(b, u, d);
      for (let T = 0; T < E.length; T++)
        je(E[T], u, d, h);
      s(l.anchor, u, d);
      return;
    }
    if (w === fn) {
      Q(l, u, d);
      return;
    }
    if (h !== 2 && m & 1 && g)
      if (h === 0)
        g.beforeEnter(b), s(b, u, d), ie(() => g.enter(b), _);
      else {
        const { leave: T, delayLeave: I, afterLeave: D } = g, N = () => s(b, u, d), H = () => {
          T(b, () => {
            N(), D && D();
          });
        };
        I ? I(b, N, H) : H();
      }
    else
      s(b, u, d);
  }, ge = (l, u, d, h = !1, _ = !1) => {
    const {
      type: b,
      props: w,
      ref: g,
      children: E,
      dynamicChildren: m,
      shapeFlag: y,
      patchFlag: T,
      dirs: I
    } = l;
    if (g != null && yn(g, null, d, l, !0), y & 256) {
      u.ctx.deactivate(l);
      return;
    }
    const D = y & 1 && I, N = !Ft(l);
    let H;
    if (N && (H = w && w.onVnodeBeforeUnmount) && Ee(H, u, l), y & 6)
      Pi(l.component, d, h);
    else {
      if (y & 128) {
        l.suspense.unmount(d, h);
        return;
      }
      D && ze(l, null, u, "beforeUnmount"), y & 64 ? l.type.remove(
        l,
        u,
        d,
        _,
        Ye,
        h
      ) : m && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== le || T > 0 && T & 64) ? Se(
        m,
        u,
        d,
        !1,
        !0
      ) : (b === le && T & 384 || !_ && y & 16) && Se(E, u, d), h && Qn(l);
    }
    (N && (H = w && w.onVnodeUnmounted) || D) && ie(() => {
      H && Ee(H, u, l), D && ze(l, null, u, "unmounted");
    }, d);
  }, Qn = (l) => {
    const { type: u, el: d, anchor: h, transition: _ } = l;
    if (u === le) {
      Ci(d, h);
      return;
    }
    if (u === fn) {
      P(l);
      return;
    }
    const b = () => {
      i(d), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (l.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: w, delayLeave: g } = _, E = () => w(d, b);
      g ? g(l.el, b, E) : E();
    } else
      b();
  }, Ci = (l, u) => {
    let d;
    for (; l !== u; )
      d = S(l), i(l), l = d;
    i(u);
  }, Pi = (l, u, d) => {
    const { bum: h, scope: _, update: b, subTree: w, um: g } = l;
    h && Lt(h), _.stop(), b && (b.active = !1, ge(w, l, u, d)), g && ie(g, u), ie(() => {
      l.isUnmounted = !0;
    }, u), u && u.pendingBranch && !u.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === u.pendingId && (u.deps--, u.deps === 0 && u.resolve());
  }, Se = (l, u, d, h = !1, _ = !1, b = 0) => {
    for (let w = b; w < l.length; w++)
      ge(l[w], u, d, h, _);
  }, Dt = (l) => l.shapeFlag & 6 ? Dt(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : S(l.anchor || l.el), Zn = (l, u, d) => {
    l == null ? u._vnode && ge(u._vnode, null, null, !0) : A(u._vnode || null, l, u, null, null, null, d), ds(), ui(), u._vnode = l;
  }, Ye = {
    p: A,
    um: ge,
    m: je,
    r: Qn,
    mt: sn,
    mc: Me,
    pc: z,
    pbc: Le,
    n: Dt,
    o: e
  };
  let rn, on;
  return t && ([rn, on] = t(
    Ye
  )), {
    render: Zn,
    hydrate: rn,
    createApp: lo(Zn, rn)
  };
}
function He({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Ii(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (O(s) && O(i))
    for (let r = 0; r < s.length; r++) {
      const o = s[r];
      let c = i[r];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = i[r] = Ae(i[r]), c.el = o.el), n || Ii(o, c)), c.type === Zt && (c.el = o.el);
    }
}
function go(e) {
  const t = e.slice(), n = [0];
  let s, i, r, o, c;
  const a = e.length;
  for (s = 0; s < a; s++) {
    const f = e[s];
    if (f !== 0) {
      if (i = n[n.length - 1], e[i] < f) {
        t[s] = i, n.push(s);
        continue;
      }
      for (r = 0, o = n.length - 1; r < o; )
        c = r + o >> 1, e[n[c]] < f ? r = c + 1 : o = c;
      f < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; )
    n[r] = o, o = t[o];
  return n;
}
const bo = (e) => e.__isTeleport, le = Symbol.for("v-fgt"), Zt = Symbol.for("v-txt"), Be = Symbol.for("v-cmt"), fn = Symbol.for("v-stc"), mt = [];
let pe = null;
function L(e = !1) {
  mt.push(pe = e ? null : []);
}
function Eo() {
  mt.pop(), pe = mt[mt.length - 1] || null;
}
let vt = 1;
function vs(e) {
  vt += e;
}
function Oi(e) {
  return e.dynamicChildren = vt > 0 ? pe || Ze : null, Eo(), vt > 0 && pe && pe.push(e), e;
}
function G(e, t, n, s, i, r) {
  return Oi(
    $(
      e,
      t,
      n,
      s,
      i,
      r,
      !0
      /* isBlock */
    )
  );
}
function it(e, t, n, s, i) {
  return Oi(
    me(
      e,
      t,
      n,
      s,
      i,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function xo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function dt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const en = "__vInternal", Di = ({ key: e }) => e ?? null, zt = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? q(e) || te(e) || C(e) ? { i: de, r: e, k: t, f: !!n } : e : null);
function $(e, t = null, n = null, s = 0, i = null, r = e === le ? 0 : 1, o = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Di(t),
    ref: t && zt(t),
    scopeId: pi,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: de
  };
  return c ? (Vn(a, n), r & 128 && e.normalize(a)) : n && (a.shapeFlag |= q(n) ? 8 : 16), vt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  pe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && pe.push(a), a;
}
const me = wo;
function wo(e, t = null, n = null, s = 0, i = null, r = !1) {
  if ((!e || e === Zr) && (e = Be), xo(e)) {
    const c = rt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Vn(c, n), vt > 0 && !r && pe && (c.shapeFlag & 6 ? pe[pe.indexOf(e)] = c : pe.push(c)), c.patchFlag |= -2, c;
  }
  if (Co(e) && (e = e.__vccOpts), t) {
    t = vo(t);
    let { class: c, style: a } = t;
    c && !q(c) && (t.class = Nn(c)), k(a) && (ni(a) && !O(a) && (a = Y({}, a)), t.style = Pn(a));
  }
  const o = q(e) ? 1 : jr(e) ? 128 : bo(e) ? 64 : k(e) ? 4 : C(e) ? 2 : 0;
  return $(
    e,
    t,
    n,
    s,
    i,
    o,
    r,
    !0
  );
}
function vo(e) {
  return e ? ni(e) || en in e ? Y({}, e) : e : null;
}
function rt(e, t, n = !1) {
  const { props: s, ref: i, patchFlag: r, children: o } = e, c = t ? So(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Di(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? O(i) ? i.concat(zt(t)) : [i, zt(t)] : zt(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== le ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && rt(e.ssContent),
    ssFallback: e.ssFallback && rt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Xe(e = " ", t = 0) {
  return me(Zt, null, e, t);
}
function ve(e = "", t = !1) {
  return t ? (L(), it(Be, null, e)) : me(Be, null, e);
}
function xe(e) {
  return e == null || typeof e == "boolean" ? me(Be) : O(e) ? me(
    le,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Ae(e) : me(Zt, null, String(e));
}
function Ae(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : rt(e);
}
function Vn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (O(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Vn(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !(en in t) ? t._ctx = de : i === 3 && de && (de.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    C(t) ? (t = { default: t, _ctx: de }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Xe(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function So(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = Nn([t.class, s.class]));
      else if (i === "style")
        t.style = Pn([t.style, s.style]);
      else if (Kt(i)) {
        const r = t[i], o = s[i];
        o && r !== o && !(O(r) && r.includes(o)) && (t[i] = r ? [].concat(r, o) : o);
      } else
        i !== "" && (t[i] = s[i]);
  }
  return t;
}
function Ee(e, t, n, s = null) {
  he(e, t, 7, [
    n,
    s
  ]);
}
const To = xi();
let yo = 0;
function Io(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || To, r = {
    uid: yo++,
    vnode: e,
    type: s,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new $i(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: vi(s, i),
    emitsOptions: di(s, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: W,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: W,
    data: W,
    props: W,
    attrs: W,
    slots: W,
    refs: W,
    setupState: W,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Pr.bind(null, r), e.ce && e.ce(r), r;
}
let ee = null, Yn, Je, Ss = "__VUE_INSTANCE_SETTERS__";
(Je = hn()[Ss]) || (Je = hn()[Ss] = []), Je.push((e) => ee = e), Yn = (e) => {
  Je.length > 1 ? Je.forEach((t) => t(e)) : Je[0](e);
};
const ot = (e) => {
  Yn(e), e.scope.on();
}, Ke = () => {
  ee && ee.scope.off(), Yn(null);
};
function Ri(e) {
  return e.vnode.shapeFlag & 4;
}
let St = !1;
function Oo(e, t = !1) {
  St = t;
  const { props: n, children: s } = e.vnode, i = Ri(e);
  ao(e, n, i, t), po(e, s);
  const r = i ? Do(e, t) : void 0;
  return St = !1, r;
}
function Do(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = si(new Proxy(e.ctx, eo));
  const { setup: s } = n;
  if (s) {
    const i = e.setupContext = s.length > 1 ? Ao(e) : null;
    ot(e), lt();
    const r = Ne(
      s,
      e,
      0,
      [e.props, i]
    );
    if (ct(), Ke(), zs(r)) {
      if (r.then(Ke, Ke), t)
        return r.then((o) => {
          Ts(e, o, t);
        }).catch((o) => {
          qt(o, e, 0);
        });
      e.asyncDep = r;
    } else
      Ts(e, r, t);
  } else
    Ai(e, t);
}
function Ts(e, t, n) {
  C(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : k(t) && (e.setupState = oi(t)), Ai(e, n);
}
let ys;
function Ai(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && ys && !s.render) {
      const i = s.template || Kn(e).template;
      if (i) {
        const { isCustomElement: r, compilerOptions: o } = e.appContext.config, { delimiters: c, compilerOptions: a } = s, f = Y(
          Y(
            {
              isCustomElement: r,
              delimiters: c
            },
            o
          ),
          a
        );
        s.render = ys(i, f);
      }
    }
    e.render = s.render || _e;
  }
  ot(e), lt(), to(e), ct(), Ke();
}
function Ro(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return re(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function Ao(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Ro(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function tn(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(oi(si(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in ht)
          return ht[n](e);
      },
      has(t, n) {
        return n in t || n in ht;
      }
    }));
}
function Co(e) {
  return C(e) && "__vccOpts" in e;
}
const gt = (e, t) => Ir(e, t, St), Po = Symbol.for("v-scx"), No = () => jt(Po), Uo = "3.3.4", Mo = "http://www.w3.org/2000/svg", Ge = typeof document < "u" ? document : null, Is = Ge && /* @__PURE__ */ Ge.createElement("template"), Lo = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t ? Ge.createElementNS(Mo, e) : Ge.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => Ge.createTextNode(e),
  createComment: (e) => Ge.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ge.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, i, r) {
    const o = n ? n.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), n), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      Is.innerHTML = s ? `<svg>${e}</svg>` : e;
      const c = Is.content;
      if (s) {
        const a = c.firstChild;
        for (; a.firstChild; )
          c.appendChild(a.firstChild);
        c.removeChild(a);
      }
      t.insertBefore(c, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function Fo(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function jo(e, t, n) {
  const s = e.style, i = q(n);
  if (n && !i) {
    if (t && !q(t))
      for (const r in t)
        n[r] == null && In(s, r, "");
    for (const r in n)
      In(s, r, n[r]);
  } else {
    const r = s.display;
    i ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = r);
  }
}
const Os = /\s*!important$/;
function In(e, t, n) {
  if (O(n))
    n.forEach((s) => In(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = zo(e, t);
    Os.test(n) ? e.setProperty(
      ue(s),
      n.replace(Os, ""),
      "important"
    ) : e[s] = n;
  }
}
const Ds = ["Webkit", "Moz", "ms"], dn = {};
function zo(e, t) {
  const n = dn[t];
  if (n)
    return n;
  let s = ye(t);
  if (s !== "filter" && s in e)
    return dn[t] = s;
  s = Gs(s);
  for (let i = 0; i < Ds.length; i++) {
    const r = Ds[i] + s;
    if (r in e)
      return dn[t] = r;
  }
  return t;
}
const Rs = "http://www.w3.org/1999/xlink";
function Ho(e, t, n, s, i) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(Rs, t.slice(6, t.length)) : e.setAttributeNS(Rs, t, n);
  else {
    const r = Xi(t);
    n == null || r && !ks(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
  }
}
function Wo(e, t, n, s, i, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    s && o(s, i, r), e[t] = n ?? "";
    return;
  }
  const c = e.tagName;
  if (t === "value" && c !== "PROGRESS" && // custom elements may use _value internally
  !c.includes("-")) {
    e._value = n;
    const f = c === "OPTION" ? e.getAttribute("value") : e.value, p = n ?? "";
    f !== p && (e.value = p), n == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const f = typeof e[t];
    f === "boolean" ? n = ks(n) : n == null && f === "string" ? (n = "", a = !0) : f === "number" && (n = 0, a = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  a && e.removeAttribute(t);
}
function Qe(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Go(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function ko(e, t, n, s, i = null) {
  const r = e._vei || (e._vei = {}), o = r[t];
  if (s && o)
    o.value = s;
  else {
    const [c, a] = Xo(t);
    if (s) {
      const f = r[t] = Bo(s, i);
      Qe(e, c, f, a);
    } else
      o && (Go(e, c, o, a), r[t] = void 0);
  }
}
const As = /(?:Once|Passive|Capture)$/;
function Xo(e) {
  let t;
  if (As.test(e)) {
    t = {};
    let s;
    for (; s = e.match(As); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ue(e.slice(2)), t];
}
let pn = 0;
const $o = /* @__PURE__ */ Promise.resolve(), Ko = () => pn || ($o.then(() => pn = 0), pn = Date.now());
function Bo(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    he(
      Vo(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Ko(), n;
}
function Vo(e, t) {
  if (O(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (i) => !i._stopped && s && s(i));
  } else
    return t;
}
const Cs = /^on[a-z]/, Yo = (e, t, n, s, i = !1, r, o, c, a) => {
  t === "class" ? Fo(e, s, i) : t === "style" ? jo(e, n, s) : Kt(t) ? Dn(t) || ko(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : qo(e, t, s, i)) ? Wo(
    e,
    t,
    s,
    r,
    o,
    c,
    a
  ) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Ho(e, t, s, i));
};
function qo(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && Cs.test(t) && C(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Cs.test(t) && q(n) ? !1 : t in e;
}
function Jo(e, t) {
  const n = Ve(e);
  class s extends qn {
    constructor(r) {
      super(n, r, t);
    }
  }
  return s.def = n, s;
}
const Qo = typeof HTMLElement < "u" ? HTMLElement : class {
};
class qn extends Qo {
  constructor(t, n = {}, s) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && s ? s(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, ci(() => {
      this._connected || (Ms(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let s = 0; s < this.attributes.length; s++)
      this._setAttr(this.attributes[s].name);
    new MutationObserver((s) => {
      for (const i of s)
        this._setAttr(i.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (s, i = !1) => {
      const { props: r, styles: o } = s;
      let c;
      if (r && !O(r))
        for (const a in r) {
          const f = r[a];
          (f === Number || f && f.type === Number) && (a in this._props && (this._props[a] = ss(this._props[a])), (c || (c = /* @__PURE__ */ Object.create(null)))[ye(a)] = !0);
        }
      this._numberProps = c, i && this._resolveProps(s), this._applyStyles(o), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((s) => t(s, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, s = O(n) ? n : Object.keys(n || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && s.includes(i) && this._setProp(i, this[i], !0, !1);
    for (const i of s.map(ye))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(r) {
          this._setProp(i, r);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const s = ye(t);
    this._numberProps && this._numberProps[s] && (n = ss(n)), this._setProp(s, n, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, s = !0, i = !0) {
    n !== this._props[t] && (this._props[t] = n, i && this._instance && this._update(), s && (n === !0 ? this.setAttribute(ue(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(ue(t), n + "") : n || this.removeAttribute(ue(t))));
  }
  _update() {
    Ms(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = me(this._def, Y({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const s = (r, o) => {
        this.dispatchEvent(
          new CustomEvent(r, {
            detail: o
          })
        );
      };
      n.emit = (r, ...o) => {
        s(r, o), ue(r) !== r && s(ue(r), o);
      };
      let i = this;
      for (; i = i && (i.parentNode || i.host); )
        if (i instanceof qn) {
          n.parent = i._instance, n.provides = i._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const s = document.createElement("style");
      s.textContent = n, this.shadowRoot.appendChild(s);
    });
  }
}
const Ps = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return O(t) ? (n) => Lt(t, n) : t;
};
function Zo(e) {
  e.target.composing = !0;
}
function Ns(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const el = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, i) {
    e._assign = Ps(i);
    const r = s || i.props && i.props.type === "number";
    Qe(e, t ? "change" : "input", (o) => {
      if (o.target.composing)
        return;
      let c = e.value;
      n && (c = c.trim()), r && (c = _n(c)), e._assign(c);
    }), n && Qe(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Qe(e, "compositionstart", Zo), Qe(e, "compositionend", Ns), Qe(e, "change", Ns));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: s, number: i } }, r) {
    if (e._assign = Ps(r), e.composing || document.activeElement === e && e.type !== "range" && (n || s && e.value.trim() === t || (i || e.type === "number") && _n(e.value) === t))
      return;
    const o = t ?? "";
    e.value !== o && (e.value = o);
  }
}, tl = ["ctrl", "shift", "alt", "meta"], nl = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => tl.some((n) => e[`${n}Key`] && !t.includes(n))
}, Ht = (e, t) => (n, ...s) => {
  for (let i = 0; i < t.length; i++) {
    const r = nl[t[i]];
    if (r && r(n, t))
      return;
  }
  return e(n, ...s);
}, sl = /* @__PURE__ */ Y({ patchProp: Yo }, Lo);
let Us;
function il() {
  return Us || (Us = ho(sl));
}
const Ms = (...e) => {
  il().render(...e);
}, rl = {
  key: 0,
  class: "weather-item"
}, ol = { class: "weather-item__title head" }, ll = { class: "weather-item__image" }, cl = ["src"], al = { class: "weather-item__info" }, ul = { class: "weather-item__data" }, fl = { class: "weather-item__metrics" }, dl = {
  key: 0,
  class: "metrics__data speed"
}, pl = /* @__PURE__ */ $("span", { class: "metrics__title icon" }, "⮜", -1), _l = {
  key: 1,
  class: "metrics__data pressure"
}, hl = /* @__PURE__ */ $("span", { class: "metrics__title icon" }, "⌀", -1), ml = {
  key: 2,
  class: "metrics__data humidity"
}, gl = /* @__PURE__ */ $("span", { class: "metrics__title" }, "Humidity:", -1), bl = {
  key: 3,
  class: "metrics__data visibility"
}, El = /* @__PURE__ */ $("span", { class: "metrics__title" }, "Visibility:", -1), Ls = /* @__PURE__ */ Ve({
  __name: "WeatherItem",
  props: {
    weatherInfo: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const t = e, n = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW"
    ], s = gt(() => {
      var c;
      return t.weatherInfo && ((c = t.weatherInfo) == null ? void 0 : c.weather.length) > 0 ? `http://openweathermap.org/img/w/${t.weatherInfo.weather[0].icon}.png` : "";
    }), i = gt(() => {
      const a = Math.floor(t.weatherInfo.wind.deg / 22.5 + 0.5) % 16;
      return n[a];
    }), r = gt(() => t.weatherInfo.visibility ? t.weatherInfo.visibility > 1e3 ? `${(t.weatherInfo.visibility / 1e3).toFixed(2)}km` : `${t.weatherInfo.visibility}m` : ""), o = (c) => c.toFixed(0) + "℃";
    return (c, a) => e.weatherInfo.name ? (L(), G("div", rl, [
      $("div", ol, J(e.weatherInfo.name) + ", " + J(e.weatherInfo.sys.country), 1),
      $("div", ll, [
        $("img", {
          src: s.value,
          alt: "icon"
        }, null, 8, cl),
        $("span", null, J(o(t.weatherInfo.main.temp)), 1)
      ]),
      $("div", al, [
        $("div", ul, " Feels like " + J(o(e.weatherInfo.main.feels_like)) + ", " + J(e.weatherInfo.weather[0].main) + ", " + J(e.weatherInfo.weather[0].description), 1),
        $("div", fl, [
          e.weatherInfo.wind.speed ? (L(), G("div", dl, [
            pl,
            Xe(" " + J(e.weatherInfo.wind.speed) + "m/s " + J(i.value), 1)
          ])) : ve("", !0),
          e.weatherInfo.main.pressure ? (L(), G("div", _l, [
            hl,
            Xe(" " + J(e.weatherInfo.main.pressure) + " hPa ", 1)
          ])) : ve("", !0),
          e.weatherInfo.main.humidity ? (L(), G("div", ml, [
            gl,
            Xe(" " + J(e.weatherInfo.main.humidity), 1)
          ])) : ve("", !0),
          e.weatherInfo.visibility ? (L(), G("div", bl, [
            El,
            Xe(" " + J(r.value), 1)
          ])) : ve("", !0)
        ])
      ])
    ])) : ve("", !0);
  }
}), xl = { class: "weather" }, wl = {
  key: 0,
  class: "weather__local"
}, vl = {
  key: 0,
  class: "weather__local__alert"
}, Sl = {
  key: 1,
  class: "weather__cities"
}, Tl = { key: 0 }, yl = /* @__PURE__ */ Ve({
  __name: "WeatherView.ce",
  props: {
    localWeather: {
      type: null,
      required: !0
    },
    weather: {
      type: Array,
      required: !0
    },
    cities: {
      type: Array,
      required: !0
    }
  },
  emits: ["fetch:weather"],
  setup(e, { emit: t }) {
    const n = e, s = gt(() => n.cities.length === 0);
    return Xn(() => {
      n.cities.length > 0 && t("fetch:weather");
    }), (i, r) => (L(), G("div", xl, [
      s.value ? (L(), G("div", wl, [
        e.localWeather ? (L(), it(Ls, {
          key: 1,
          "weather-info": e.localWeather
        }, null, 8, ["weather-info"])) : (L(), G("div", vl, "Perhaps there is no access to geolocation!"))
      ])) : (L(), G("div", Sl, [
        e.weather ? (L(), G("div", Tl, [
          (L(!0), G(le, null, $n(e.weather, (o) => (L(), it(Ls, {
            key: o.id,
            "weather-info": o
          }, null, 8, ["weather-info"]))), 128))
        ])) : ve("", !0)
      ]))
    ]));
  }
}), Il = async (e) => {
  try {
    return await (await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${e}&limit=10&appid=YOUR_API_KEY_HERE`)).json();
  } catch (t) {
    return console.log(t), [];
  }
}, Ol = { class: "settings-form" }, Dl = /* @__PURE__ */ $("div", { class: "settings-form__title head" }, "Add Location", -1), Rl = { class: "settings-form__field" }, Al = {
  key: 0,
  class: "settings-form__cities-pool"
}, Cl = ["onClick"], Pl = { key: 0 }, Nl = /* @__PURE__ */ Ve({
  __name: "CitiesForm",
  props: {
    cities: {
      type: Array,
      required: !0
    }
  },
  emits: ["update:cities"],
  setup(e, { emit: t }) {
    const n = e, s = Ce(""), i = Ce([]), r = Ce(null), o = () => {
      !r.value && s.value.length > 0 && (r.value = setTimeout(async () => {
        i.value = await Il(s.value), r.value = null;
      }, 500)), s.value.length === 0 && (r.value = null, i.value = []);
    }, c = (a) => {
      n.cities.some((f) => f.lat === a.lat && a.lon === f.lon) || (t("update:cities", a), s.value = "", r.value = null, i.value = []);
    };
    return (a, f) => (L(), G("div", Ol, [
      Dl,
      $("div", Rl, [
        Wr($("input", {
          type: "text",
          "onUpdate:modelValue": f[0] || (f[0] = (p) => s.value = p),
          onInput: o,
          class: "settings-form__input"
        }, null, 544), [
          [el, s.value]
        ]),
        i.value.length > 0 ? (L(), G("ul", Al, [
          (L(!0), G(le, null, $n(i.value, (p) => (L(), G("li", {
            key: p.lat + ":" + p.lon,
            onClick: (x) => c(p)
          }, [
            Xe(J(p.name) + ", " + J(p.country) + " ", 1),
            p.state && p.name !== p.state ? (L(), G("span", Pl, "(" + J(p.state) + ")", 1)) : ve("", !0)
          ], 8, Cl))), 128))
        ])) : ve("", !0)
      ])
    ]));
  }
}), Ul = ["data-id"], Ml = { class: "item__title" }, Ll = ["onDragend"], Fl = { key: 0 }, jl = /* @__PURE__ */ Ve({
  __name: "CitiesItem",
  props: {
    city: {
      type: Object,
      required: !0
    }
  },
  emits: ["delete:city"],
  setup(e) {
    const t = (s, i) => {
      s.dataTransfer && s.target instanceof HTMLElement && (s.target.style.opacity = "0.4", s.dataTransfer.effectAllowed = "move", s.dataTransfer.dropEffect = "move", s.dataTransfer.setData("itemId", i.lat + ":" + i.lon));
    }, n = (s) => {
      s.target instanceof HTMLElement && (s.target.style.opacity = "1");
    };
    return (s, i) => (L(), G("div", {
      "data-id": e.city.lat + ":" + e.city.lon,
      class: "settings-cities-item"
    }, [
      $("div", Ml, [
        $("div", {
          class: "item__drag",
          draggable: "true",
          onDragstart: i[0] || (i[0] = Ht((r) => t(r, e.city), ["stop"])),
          onDragover: i[1] || (i[1] = Ht(() => {
          }, ["prevent", "stop"])),
          onDragend: Ht(n, ["stop"])
        }, " ☰ ", 40, Ll),
        Xe(" " + J(e.city.name) + ", " + J(e.city.country) + " ", 1),
        e.city.state && e.city.name !== e.city.state ? (L(), G("span", Fl, "(" + J(e.city.state) + ")", 1)) : ve("", !0)
      ]),
      $("button", {
        class: "item__btn",
        onClick: i[2] || (i[2] = (r) => s.$emit("delete:city", e.city))
      }, "⌫")
    ], 8, Ul));
  }
}), zl = { class: "settings" }, Hl = { class: "settings__body" }, Wl = /* @__PURE__ */ $("div", { class: "settings__title head" }, " Settings ", -1), Gl = /* @__PURE__ */ Ve({
  __name: "SettingsView.ce",
  props: {
    cities: {
      type: Array,
      required: !0
    }
  },
  emits: ["update:cities", "delete:city", "sort:cities"],
  setup(e, { emit: t }) {
    const n = e, s = (i) => {
      if (i.dataTransfer && i.target instanceof HTMLElement) {
        const r = i.dataTransfer.getData("itemId"), [o, c] = r.split(":"), a = n.cities.findIndex((p) => p.lat === +o && p.lon === +c), f = i.target.closest(".settings-cities-item");
        if (f && f.dataset.id) {
          const [p, x] = f.dataset.id.split(":"), S = n.cities.findIndex((v) => v.lat === +p && v.lon === +x);
          t("sort:cities", { itemIdx: a, targetIdx: S });
        }
      }
    };
    return (i, r) => (L(), G("div", zl, [
      $("div", Hl, [
        Wl,
        $("div", {
          class: "settings__cities",
          onDrop: s
        }, [
          (L(!0), G(le, null, $n(e.cities, (o) => (L(), it(jl, {
            key: o.lat + ":" + o.lon,
            city: o,
            "onDelete:city": r[0] || (r[0] = (c) => i.$emit("delete:city", c))
          }, null, 8, ["city"]))), 128))
        ], 32)
      ]),
      me(Nl, {
        cities: e.cities,
        "onUpdate:cities": r[1] || (r[1] = (o) => i.$emit("update:cities", o))
      }, null, 8, ["cities"])
    ]));
  }
}), kl = async (e, t) => {
  try {
    return await (await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${e}&lon=${t}&appid=YOUR_API_KEY_HERE`
    )).json();
  } catch (n) {
    return console.log(n), null;
  }
}, Fs = async (e) => {
  try {
    return await Promise.all(e.map(async (t) => {
      const { name: n, country: s, state: i } = t;
      let r = `${n},${s}`;
      return i && !n.includes(i) && (r += `,${i}`), await (await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${r}&units=metric&appid=YOUR_API_KEY_HERE`
      )).json();
    }));
  } catch (t) {
    return console.log(t), [];
  }
}, Xl = { class: "app" }, $l = {
  key: 0,
  class: "cross"
}, Kl = {
  key: 1,
  class: "gear"
}, Bl = /* @__PURE__ */ Ve({
  __name: "App.ce",
  setup(e) {
    const t = (v, R) => {
      localStorage.setItem(v, JSON.stringify(R));
    }, n = (v) => {
      const R = localStorage.getItem(v);
      return R ? JSON.parse(R) : null;
    }, s = Ce(!1), i = Ce(n("cities") ?? []), r = Ce(null), o = Ce([]), c = Ce(!1), a = ({ itemIdx: v, targetIdx: R }) => {
      const A = (j) => [...j.slice(0, v), ...j.slice(v + 1, R + 1), j[v], ...j.slice(R + 1)].filter((B) => B), K = (j) => [...j.slice(0, R), j[v], ...j.slice(R, v), ...j.slice(v + 1)].filter((B) => B);
      R > v ? (i.value = A(i.value), o.value = A(o.value)) : (i.value = K(i.value), o.value = K(o.value)), t("cities", i.value);
    }, f = (v) => {
      i.value.push(v), t("cities", i.value), c.value = !0;
    }, p = (v) => {
      i.value = i.value.filter((R) => R.lat !== v.lat && R.lon !== v.lon), t("cities", i.value), c.value = !0;
    }, x = async (v, R) => {
      r.value = await kl(v, R);
    }, S = async () => {
      c.value && (o.value = await Fs(i.value)), c.value = !1;
    };
    return Xn(async () => {
      if (i.value.length === 0) {
        navigator.geolocation.getCurrentPosition(
          // eslint-disable-next-line no-undef
          async (v) => {
            const { latitude: R, longitude: A } = v.coords;
            await x(R, A);
          },
          (v) => console.log("geolocation err", v)
        );
        return;
      }
      o.value = await Fs(i.value);
    }), (v, R) => (L(), G("div", Xl, [
      i.value.length > 0 && !s.value ? ve("", !0) : (L(), G("a", {
        key: 0,
        class: "app__settings-btn",
        href: "#",
        onClick: R[0] || (R[0] = Ht((A) => s.value = !s.value, ["prevent"]))
      }, [
        s.value ? (L(), G("span", $l, "×")) : (L(), G("span", Kl, "⚙"))
      ])),
      s.value ? (L(), it(Gl, {
        key: 1,
        cities: i.value,
        "onUpdate:cities": f,
        "onSort:cities": a,
        "onDelete:city": p
      }, null, 8, ["cities"])) : (L(), it(yl, {
        key: 2,
        "local-weather": r.value,
        weather: o.value,
        cities: i.value,
        "onFetch:weather": S
      }, null, 8, ["local-weather", "weather", "cities"]))
    ]));
  }
}), Vl = `@import"https://fonts.googleapis.com/css2?family=Golos+Text&display=swap";*{margin:0;padding:0;outline:none;box-sizing:border-box;font-family:Golos Text,sans-serif;color:#5e5e5e}a{text-decoration:none;color:#000}.head{font-weight:700}.app{background-color:#fff;min-width:300px;width:300px;margin:0 auto;position:relative;padding:10px;min-height:350px;height:auto;border:1px solid #5e5e5e}.app__settings-btn{position:absolute;top:20px;transform:translateY(-50%);right:10px}.app .gear{font-size:18px}.app .cross{font-size:28px}.settings{display:flex;flex-direction:column;justify-content:space-between;min-height:328px;height:auto}.settings__title,.settings__cities{margin-bottom:10px}.settings__cities__item{display:flex;flex-direction:row;align-items:center;justify-content:space-between;margin-bottom:10px}.weather-item{margin-bottom:50px}.weather-item__title{margin-bottom:20px}.weather-item__image{display:flex;flex-direction:row;align-items:center;justify-content:center;font-weight:700;color:#000;font-size:32px;margin-bottom:20px}.weather-item__image img{width:100px;margin-right:20px}.weather-item__image span{width:100px}.weather-item__info{font-size:14px}.weather-item__data{margin-bottom:20px}.weather-item__metrics{display:grid;grid-template-columns:repeat(2,1fr);gap:10px 5px}.metrics__title.icon{font-size:20px}.speed .icon{transform:rotate(45deg);display:inline-block}.settings-form{display:flex;flex-direction:column}.settings-form__title{grid-column:1/3;margin-bottom:5px}.settings-form__field{position:relative}.settings-form__input{border:1px solid #5e5e5e;height:30px;width:100%;padding:5px}.settings-form__input:focus{border-color:#90c4ec;box-shadow:inset 0 0 0 2px #90c4ec}.settings-form__cities-pool{position:absolute;top:100%;left:0;width:100%;border:1px solid #5e5e5e;border-top:none;background-color:#fff;text-decoration:none;list-style-type:none}.settings-form__cities-pool li{height:30px;padding:5px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.settings-form__cities-pool li:not(:last-child){border-bottom:1px solid #5e5e5e}.settings-form__cities-pool li:hover{background-color:#d3d3d3}.settings-form__btn{height:30px;background-color:#fff;cursor:pointer;border:none;font-size:20px}.settings-cities-item{display:flex;flex-direction:row;align-items:center;justify-content:space-between;margin-bottom:10px}.item__title{display:flex;flex-direction:row;white-space:nowrap;overflow:hidden}.item__title span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.item__drag{margin-right:10px;cursor:pointer}.item__btn{border:none;background:none;font-size:16px;cursor:pointer;margin-left:10px}
`, Yl = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, i] of t)
    n[s] = i;
  return n;
}, ql = /* @__PURE__ */ Yl(Bl, [["styles", [Vl]]]), Jl = Jo(ql);
customElements.define("weather-widget", Jl);
