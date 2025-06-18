function yt(o) {
  if (o === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return o;
}
function Qi(o, t) {
  o.prototype = Object.create(t.prototype), o.prototype.constructor = o, o.__proto__ = t;
}
/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var nt = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Zt = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, hi, X, R, ut = 1e8, P = 1 / ut, $e = Math.PI * 2, en = $e / 4, rn = 0, Ji = Math.sqrt, nn = Math.cos, sn = Math.sin, G = function(t) {
  return typeof t == "string";
}, z = function(t) {
  return typeof t == "function";
}, xt = function(t) {
  return typeof t == "number";
}, _i = function(t) {
  return typeof t > "u";
}, mt = function(t) {
  return typeof t == "object";
}, H = function(t) {
  return t !== !1;
}, di = function() {
  return typeof window < "u";
}, be = function(t) {
  return z(t) || G(t);
}, tr = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, j = Array.isArray, je = /(?:-?\.?\d|\.)+/gi, er = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Xt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, qe = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, ir = /[+-]=-?[.\d]+/, rr = /[^,'"\[\]\s]+/gi, on = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, I, ht, Ke, pi, st = {}, Me = {}, nr, sr = function(t) {
  return (Me = Qt(t, st)) && tt;
}, mi = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, he = function(t, e) {
  return !e && console.warn(t);
}, or = function(t, e) {
  return t && (st[t] = e) && Me && (Me[t] = e) || st;
}, _e = function() {
  return 0;
}, an = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Se = {
  suppressEvents: !0,
  kill: !1
}, un = {
  suppressEvents: !0
}, gi = {}, Ot = [], He = {}, ar, et = {}, Ne = {}, Li = 30, ke = [], yi = "", vi = function(t) {
  var e = t[0], i, r;
  if (mt(e) || z(e) || (t = [t]), !(i = (e._gsap || {}).harness)) {
    for (r = ke.length; r-- && !ke[r].targetTest(e); )
      ;
    i = ke[r];
  }
  for (r = t.length; r--; )
    t[r] && (t[r]._gsap || (t[r]._gsap = new Ar(t[r], i))) || t.splice(r, 1);
  return t;
}, Nt = function(t) {
  return t._gsap || vi(lt(t))[0]._gsap;
}, ur = function(t, e, i) {
  return (i = t[e]) && z(i) ? t[e]() : _i(i) && t.getAttribute && t.getAttribute(e) || i;
}, Z = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, q = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, U = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, jt = function(t, e) {
  var i = e.charAt(0), r = parseFloat(e.substr(2));
  return t = parseFloat(t), i === "+" ? t + r : i === "-" ? t - r : i === "*" ? t * r : t / r;
}, ln = function(t, e) {
  for (var i = e.length, r = 0; t.indexOf(e[r]) < 0 && ++r < i; )
    ;
  return r < i;
}, Pe = function() {
  var t = Ot.length, e = Ot.slice(0), i, r;
  for (He = {}, Ot.length = 0, i = 0; i < t; i++)
    r = e[i], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, wi = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, lr = function(t, e, i, r) {
  Ot.length && !X && Pe(), t.render(e, i, !!(X && e < 0 && wi(t))), Ot.length && !X && Pe();
}, cr = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(rr).length < 2 ? e : G(t) ? t.trim() : t;
}, fr = function(t) {
  return t;
}, ot = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, cn = function(t) {
  return function(e, i) {
    for (var r in i)
      r in e || r === "duration" && t || r === "ease" || (e[r] = i[r]);
  };
}, Qt = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, Ii = function o(t, e) {
  for (var i in e)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (t[i] = mt(e[i]) ? o(t[i] || (t[i] = {}), e[i]) : e[i]);
  return t;
}, Ee = function(t, e) {
  var i = {}, r;
  for (r in t)
    r in e || (i[r] = t[r]);
  return i;
}, le = function(t) {
  var e = t.parent || I, i = t.keyframes ? cn(j(t.keyframes)) : ot;
  if (H(t.inherit))
    for (; e; )
      i(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, fn = function(t, e) {
  for (var i = t.length, r = i === e.length; r && i-- && t[i] === e[i]; )
    ;
  return i < 0;
}, hr = function(t, e, i, r, n) {
  var s = t[r], a;
  if (n)
    for (a = e[n]; s && s[n] > a; )
      s = s._prev;
  return s ? (e._next = s._next, s._next = e) : (e._next = t[i], t[i] = e), e._next ? e._next._prev = e : t[r] = e, e._prev = s, e.parent = e._dp = t, e;
}, Ie = function(t, e, i, r) {
  i === void 0 && (i = "_first"), r === void 0 && (r = "_last");
  var n = e._prev, s = e._next;
  n ? n._next = s : t[i] === e && (t[i] = s), s ? s._prev = n : t[r] === e && (t[r] = n), e._next = e._prev = e.parent = null;
}, Et = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, Bt = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var i = t; i; )
      i._dirty = 1, i = i.parent;
  return t;
}, hn = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, Ze = function(t, e, i, r) {
  return t._startAt && (X ? t._startAt.revert(Se) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, r));
}, _n = function o(t) {
  return !t || t._ts && o(t.parent);
}, Fi = function(t) {
  return t._repeat ? Jt(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, Jt = function(t, e) {
  var i = Math.floor(t = U(t / e));
  return t && i === t ? i - 1 : i;
}, Ae = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, Fe = function(t) {
  return t._end = U(t._start + (t._tDur / Math.abs(t._ts || t._rts || P) || 0));
}, ze = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = U(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Fe(t), i._dirty || Bt(i, t)), t;
}, _r = function(t, e) {
  var i;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = Ae(t.rawTime(), e), (!e._dur || we(0, e.totalDuration(), i) - e._tTime > P) && e.render(i, !0)), Bt(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (i = t; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -P;
  }
}, dt = function(t, e, i, r) {
  return e.parent && Et(e), e._start = U((xt(i) ? i : i || t !== I ? at(t, i, e) : t._time) + e._delay), e._end = U(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), hr(t, e, "_first", "_last", t._sort ? "_start" : 0), Qe(e) || (t._recent = e), r || _r(t, e), t._ts < 0 && ze(t, t._tTime), t;
}, dr = function(t, e) {
  return (st.ScrollTrigger || mi("scrollTrigger", e)) && st.ScrollTrigger.create(e, t);
}, pr = function(t, e, i, r, n) {
  if (bi(t, e, n), !t._initted)
    return 1;
  if (!i && t._pt && !X && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && ar !== it.frame)
    return Ot.push(t), t._lazy = [n, r], 1;
}, dn = function o(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || o(e));
}, Qe = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, pn = function(t, e, i, r) {
  var n = t.ratio, s = e < 0 || !e && (!t._start && dn(t) && !(!t._initted && Qe(t)) || (t._ts < 0 || t._dp._ts < 0) && !Qe(t)) ? 0 : 1, a = t._rDelay, u = 0, l, c, h;
  if (a && t._repeat && (u = we(0, t._tDur, e), c = Jt(u, a), t._yoyo && c & 1 && (s = 1 - s), c !== Jt(t._tTime, a) && (n = 1 - s, t.vars.repeatRefresh && t._initted && t.invalidate())), s !== n || X || r || t._zTime === P || !e && t._zTime) {
    if (!t._initted && pr(t, e, r, i, u))
      return;
    for (h = t._zTime, t._zTime = e || (i ? P : 0), i || (i = e && !h), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = u, l = t._pt; l; )
      l.r(s, l.d), l = l._next;
    e < 0 && Ze(t, e, i, !0), t._onUpdate && !i && rt(t, "onUpdate"), u && t._repeat && !i && t.parent && rt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === s && (s && Et(t, 1), !i && !X && (rt(t, s ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, mn = function(t, e, i) {
  var r;
  if (i > e)
    for (r = t._first; r && r._start <= i; ) {
      if (r.data === "isPause" && r._start > e)
        return r;
      r = r._next;
    }
  else
    for (r = t._last; r && r._start >= i; ) {
      if (r.data === "isPause" && r._start < e)
        return r;
      r = r._prev;
    }
}, te = function(t, e, i, r) {
  var n = t._repeat, s = U(e) || 0, a = t._tTime / t._tDur;
  return a && !r && (t._time *= s / t._dur), t._dur = s, t._tDur = n ? n < 0 ? 1e10 : U(s * (n + 1) + t._rDelay * n) : s, a > 0 && !r && ze(t, t._tTime = t._tDur * a), t.parent && Fe(t), i || Bt(t.parent, t), t;
}, zi = function(t) {
  return t instanceof K ? Bt(t) : te(t, t._dur);
}, gn = {
  _start: 0,
  endTime: _e,
  totalDuration: _e
}, at = function o(t, e, i) {
  var r = t.labels, n = t._recent || gn, s = t.duration() >= ut ? n.endTime(!1) : t._dur, a, u, l;
  return G(e) && (isNaN(e) || e in r) ? (u = e.charAt(0), l = e.substr(-1) === "%", a = e.indexOf("="), u === "<" || u === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (u === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (l ? (a < 0 ? n : i).totalDuration() / 100 : 1)) : a < 0 ? (e in r || (r[e] = s), r[e]) : (u = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), l && i && (u = u / 100 * (j(i) ? i[0] : i).totalDuration()), a > 1 ? o(t, e.substr(0, a - 1), i) + u : s + u)) : e == null ? s : +e;
}, ce = function(t, e, i) {
  var r = xt(e[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), s = e[n], a, u;
  if (r && (s.duration = e[1]), s.parent = i, t) {
    for (a = s, u = i; u && !("immediateRender" in a); )
      a = u.vars.defaults || {}, u = H(u.vars.inherit) && u.parent;
    s.immediateRender = H(a.immediateRender), t < 2 ? s.runBackwards = 1 : s.startAt = e[n - 1];
  }
  return new B(e[0], s, e[n + 1]);
}, Dt = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, we = function(t, e, i) {
  return i < t ? t : i > e ? e : i;
}, $ = function(t, e) {
  return !G(t) || !(e = on.exec(t)) ? "" : e[1];
}, yn = function(t, e, i) {
  return Dt(i, function(r) {
    return we(t, e, r);
  });
}, Je = [].slice, mr = function(t, e) {
  return t && mt(t) && "length" in t && (!e && !t.length || t.length - 1 in t && mt(t[0])) && !t.nodeType && t !== ht;
}, vn = function(t, e, i) {
  return i === void 0 && (i = []), t.forEach(function(r) {
    var n;
    return G(r) && !e || mr(r, 1) ? (n = i).push.apply(n, lt(r)) : i.push(r);
  }) || i;
}, lt = function(t, e, i) {
  return R && !e && R.selector ? R.selector(t) : G(t) && !i && (Ke || !ee()) ? Je.call((e || pi).querySelectorAll(t), 0) : j(t) ? vn(t, i) : mr(t) ? Je.call(t, 0) : t ? [t] : [];
}, ti = function(t) {
  return t = lt(t)[0] || he("Invalid scope") || {}, function(e) {
    var i = t.current || t.nativeElement || t;
    return lt(e, i.querySelectorAll ? i : i === t ? he("Invalid scope") || pi.createElement("div") : t);
  };
}, gr = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, yr = function(t) {
  if (z(t))
    return t;
  var e = mt(t) ? t : {
    each: t
  }, i = Ut(e.ease), r = e.from || 0, n = parseFloat(e.base) || 0, s = {}, a = r > 0 && r < 1, u = isNaN(r) || a, l = e.axis, c = r, h = r;
  return G(r) ? c = h = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !a && u && (c = r[0], h = r[1]), function(_, d, p) {
    var f = (p || e).length, m = s[f], y, v, w, x, g, T, S, k, b;
    if (!m) {
      if (b = e.grid === "auto" ? 0 : (e.grid || [1, ut])[1], !b) {
        for (S = -ut; S < (S = p[b++].getBoundingClientRect().left) && b < f; )
          ;
        b < f && b--;
      }
      for (m = s[f] = [], y = u ? Math.min(b, f) * c - 0.5 : r % b, v = b === ut ? 0 : u ? f * h / b - 0.5 : r / b | 0, S = 0, k = ut, T = 0; T < f; T++)
        w = T % b - y, x = v - (T / b | 0), m[T] = g = l ? Math.abs(l === "y" ? x : w) : Ji(w * w + x * x), g > S && (S = g), g < k && (k = g);
      r === "random" && gr(m), m.max = S - k, m.min = k, m.v = f = (parseFloat(e.amount) || parseFloat(e.each) * (b > f ? f - 1 : l ? l === "y" ? f / b : b : Math.max(b, f / b)) || 0) * (r === "edges" ? -1 : 1), m.b = f < 0 ? n - f : n, m.u = $(e.amount || e.each) || 0, i = i && f < 0 ? Mr(i) : i;
    }
    return f = (m[_] - m.min) / m.max || 0, U(m.b + (i ? i(f) : f) * m.v) + m.u;
  };
}, ei = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(i) {
    var r = U(Math.round(parseFloat(i) / t) * t * e);
    return (r - r % 1) / e + (xt(i) ? 0 : $(i));
  };
}, vr = function(t, e) {
  var i = j(t), r, n;
  return !i && mt(t) && (r = i = t.radius || ut, t.values ? (t = lt(t.values), (n = !xt(t[0])) && (r *= r)) : t = ei(t.increment)), Dt(e, i ? z(t) ? function(s) {
    return n = t(s), Math.abs(n - s) <= r ? n : s;
  } : function(s) {
    for (var a = parseFloat(n ? s.x : s), u = parseFloat(n ? s.y : 0), l = ut, c = 0, h = t.length, _, d; h--; )
      n ? (_ = t[h].x - a, d = t[h].y - u, _ = _ * _ + d * d) : _ = Math.abs(t[h] - a), _ < l && (l = _, c = h);
    return c = !r || l <= r ? t[c] : s, n || c === s || xt(s) ? c : c + $(s);
  } : ei(t));
}, wr = function(t, e, i, r) {
  return Dt(j(t) ? !e : i === !0 ? !!(i = 0) : !r, function() {
    return j(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + i * 0.99)) / i) * i * r) / r;
  });
}, wn = function() {
  for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
    e[i] = arguments[i];
  return function(r) {
    return e.reduce(function(n, s) {
      return s(n);
    }, r);
  };
}, xn = function(t, e) {
  return function(i) {
    return t(parseFloat(i)) + (e || $(i));
  };
}, bn = function(t, e, i) {
  return br(t, e, 0, 1, i);
}, xr = function(t, e, i) {
  return Dt(i, function(r) {
    return t[~~e(r)];
  });
}, Tn = function o(t, e, i) {
  var r = e - t;
  return j(t) ? xr(t, o(0, t.length), e) : Dt(i, function(n) {
    return (r + (n - t) % r) % r + t;
  });
}, Sn = function o(t, e, i) {
  var r = e - t, n = r * 2;
  return j(t) ? xr(t, o(0, t.length - 1), e) : Dt(i, function(s) {
    return s = (n + (s - t) % n) % n || 0, t + (s > r ? n - s : s);
  });
}, de = function(t) {
  for (var e = 0, i = "", r, n, s, a; ~(r = t.indexOf("random(", e)); )
    s = t.indexOf(")", r), a = t.charAt(r + 7) === "[", n = t.substr(r + 7, s - r - 7).match(a ? rr : je), i += t.substr(e, r - e) + wr(a ? n : +n[0], a ? 0 : +n[1], +n[2] || 1e-5), e = s + 1;
  return i + t.substr(e, t.length - e);
}, br = function(t, e, i, r, n) {
  var s = e - t, a = r - i;
  return Dt(n, function(u) {
    return i + ((u - t) / s * a || 0);
  });
}, kn = function o(t, e, i, r) {
  var n = isNaN(t + e) ? 0 : function(d) {
    return (1 - d) * t + d * e;
  };
  if (!n) {
    var s = G(t), a = {}, u, l, c, h, _;
    if (i === !0 && (r = 1) && (i = null), s)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (j(t) && !j(e)) {
      for (c = [], h = t.length, _ = h - 2, l = 1; l < h; l++)
        c.push(o(t[l - 1], t[l]));
      h--, n = function(p) {
        p *= h;
        var f = Math.min(_, ~~p);
        return c[f](p - f);
      }, i = e;
    } else r || (t = Qt(j(t) ? [] : {}, t));
    if (!c) {
      for (u in e)
        xi.call(a, t, u, "get", e[u]);
      n = function(p) {
        return ki(p, a) || (s ? t.p : t);
      };
    }
  }
  return Dt(i, n);
}, qi = function(t, e, i) {
  var r = t.labels, n = ut, s, a, u;
  for (s in r)
    a = r[s] - e, a < 0 == !!i && a && n > (a = Math.abs(a)) && (u = s, n = a);
  return u;
}, rt = function(t, e, i) {
  var r = t.vars, n = r[e], s = R, a = t._ctx, u, l, c;
  if (n)
    return u = r[e + "Params"], l = r.callbackScope || t, i && Ot.length && Pe(), a && (R = a), c = u ? n.apply(l, u) : n.call(l), R = s, c;
}, oe = function(t) {
  return Et(t), t.scrollTrigger && t.scrollTrigger.kill(!!X), t.progress() < 1 && rt(t, "onInterrupt"), t;
}, $t, Tr = [], Sr = function(t) {
  if (t)
    if (t = !t.name && t.default || t, di() || t.headless) {
      var e = t.name, i = z(t), r = e && !i && t.init ? function() {
        this._props = [];
      } : t, n = {
        init: _e,
        render: ki,
        add: xi,
        kill: Un,
        modifier: Bn,
        rawVars: 0
      }, s = {
        targetTest: 0,
        get: 0,
        getSetter: Si,
        aliases: {},
        register: 0
      };
      if (ee(), t !== r) {
        if (et[e])
          return;
        ot(r, ot(Ee(t, n), s)), Qt(r.prototype, Qt(n, Ee(t, s))), et[r.prop = e] = r, t.targetTest && (ke.push(r), gi[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      or(e, r), t.register && t.register(tt, r, Q);
    } else
      Tr.push(t);
}, M = 255, ae = {
  aqua: [0, M, M],
  lime: [0, M, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, M],
  navy: [0, 0, 128],
  white: [M, M, M],
  olive: [128, 128, 0],
  yellow: [M, M, 0],
  orange: [M, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [M, 0, 0],
  pink: [M, 192, 203],
  cyan: [0, M, M],
  transparent: [M, M, M, 0]
}, Be = function(t, e, i) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : t * 3 < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * M + 0.5 | 0;
}, kr = function(t, e, i) {
  var r = t ? xt(t) ? [t >> 16, t >> 8 & M, t & M] : 0 : ae.black, n, s, a, u, l, c, h, _, d, p;
  if (!r) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), ae[t])
      r = ae[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (n = t.charAt(1), s = t.charAt(2), a = t.charAt(3), t = "#" + n + n + s + s + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return r = parseInt(t.substr(1, 6), 16), [r >> 16, r >> 8 & M, r & M, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), r = [t >> 16, t >> 8 & M, t & M];
    } else if (t.substr(0, 3) === "hsl") {
      if (r = p = t.match(je), !e)
        u = +r[0] % 360 / 360, l = +r[1] / 100, c = +r[2] / 100, s = c <= 0.5 ? c * (l + 1) : c + l - c * l, n = c * 2 - s, r.length > 3 && (r[3] *= 1), r[0] = Be(u + 1 / 3, n, s), r[1] = Be(u, n, s), r[2] = Be(u - 1 / 3, n, s);
      else if (~t.indexOf("="))
        return r = t.match(er), i && r.length < 4 && (r[3] = 1), r;
    } else
      r = t.match(je) || ae.transparent;
    r = r.map(Number);
  }
  return e && !p && (n = r[0] / M, s = r[1] / M, a = r[2] / M, h = Math.max(n, s, a), _ = Math.min(n, s, a), c = (h + _) / 2, h === _ ? u = l = 0 : (d = h - _, l = c > 0.5 ? d / (2 - h - _) : d / (h + _), u = h === n ? (s - a) / d + (s < a ? 6 : 0) : h === s ? (a - n) / d + 2 : (n - s) / d + 4, u *= 60), r[0] = ~~(u + 0.5), r[1] = ~~(l * 100 + 0.5), r[2] = ~~(c * 100 + 0.5)), i && r.length < 4 && (r[3] = 1), r;
}, Or = function(t) {
  var e = [], i = [], r = -1;
  return t.split(Ct).forEach(function(n) {
    var s = n.match(Xt) || [];
    e.push.apply(e, s), i.push(r += s.length + 1);
  }), e.c = i, e;
}, Ni = function(t, e, i) {
  var r = "", n = (t + r).match(Ct), s = e ? "hsla(" : "rgba(", a = 0, u, l, c, h;
  if (!n)
    return t;
  if (n = n.map(function(_) {
    return (_ = kr(_, e, 1)) && s + (e ? _[0] + "," + _[1] + "%," + _[2] + "%," + _[3] : _.join(",")) + ")";
  }), i && (c = Or(t), u = i.c, u.join(r) !== c.c.join(r)))
    for (l = t.replace(Ct, "1").split(Xt), h = l.length - 1; a < h; a++)
      r += l[a] + (~u.indexOf(a) ? n.shift() || s + "0,0,0,0)" : (c.length ? c : n.length ? n : i).shift());
  if (!l)
    for (l = t.split(Ct), h = l.length - 1; a < h; a++)
      r += l[a] + n[a];
  return r + l[h];
}, Ct = function() {
  var o = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in ae)
    o += "|" + t + "\\b";
  return new RegExp(o + ")", "gi");
}(), On = /hsl[a]?\(/, Cr = function(t) {
  var e = t.join(" "), i;
  if (Ct.lastIndex = 0, Ct.test(e))
    return i = On.test(e), t[1] = Ni(t[1], i), t[0] = Ni(t[0], i, Or(t[1])), !0;
}, pe, it = function() {
  var o = Date.now, t = 500, e = 33, i = o(), r = i, n = 1e3 / 240, s = n, a = [], u, l, c, h, _, d, p = function f(m) {
    var y = o() - r, v = m === !0, w, x, g, T;
    if ((y > t || y < 0) && (i += y - e), r += y, g = r - i, w = g - s, (w > 0 || v) && (T = ++h.frame, _ = g - h.time * 1e3, h.time = g = g / 1e3, s += w + (w >= n ? 4 : n - w), x = 1), v || (u = l(f)), x)
      for (d = 0; d < a.length; d++)
        a[d](g, _, T, m);
  };
  return h = {
    time: 0,
    frame: 0,
    tick: function() {
      p(!0);
    },
    deltaRatio: function(m) {
      return _ / (1e3 / (m || 60));
    },
    wake: function() {
      nr && (!Ke && di() && (ht = Ke = window, pi = ht.document || {}, st.gsap = tt, (ht.gsapVersions || (ht.gsapVersions = [])).push(tt.version), sr(Me || ht.GreenSockGlobals || !ht.gsap && ht || {}), Tr.forEach(Sr)), c = typeof requestAnimationFrame < "u" && requestAnimationFrame, u && h.sleep(), l = c || function(m) {
        return setTimeout(m, s - h.time * 1e3 + 1 | 0);
      }, pe = 1, p(2));
    },
    sleep: function() {
      (c ? cancelAnimationFrame : clearTimeout)(u), pe = 0, l = _e;
    },
    lagSmoothing: function(m, y) {
      t = m || 1 / 0, e = Math.min(y || 33, t);
    },
    fps: function(m) {
      n = 1e3 / (m || 240), s = h.time * 1e3 + n;
    },
    add: function(m, y, v) {
      var w = y ? function(x, g, T, S) {
        m(x, g, T, S), h.remove(w);
      } : m;
      return h.remove(m), a[v ? "unshift" : "push"](w), ee(), w;
    },
    remove: function(m, y) {
      ~(y = a.indexOf(m)) && a.splice(y, 1) && d >= y && d--;
    },
    _listeners: a
  }, h;
}(), ee = function() {
  return !pe && it.wake();
}, O = {}, Cn = /^[\d.\-M][\d.\-,\s]/, Mn = /["']/g, Pn = function(t) {
  for (var e = {}, i = t.substr(1, t.length - 3).split(":"), r = i[0], n = 1, s = i.length, a, u, l; n < s; n++)
    u = i[n], a = n !== s - 1 ? u.lastIndexOf(",") : u.length, l = u.substr(0, a), e[r] = isNaN(l) ? l.replace(Mn, "").trim() : +l, r = u.substr(a + 1).trim();
  return e;
}, En = function(t) {
  var e = t.indexOf("(") + 1, i = t.indexOf(")"), r = t.indexOf("(", e);
  return t.substring(e, ~r && r < i ? t.indexOf(")", i + 1) : i);
}, An = function(t) {
  var e = (t + "").split("("), i = O[e[0]];
  return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [Pn(e[1])] : En(t).split(",").map(cr)) : O._CE && Cn.test(t) ? O._CE("", t) : i;
}, Mr = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, Pr = function o(t, e) {
  for (var i = t._first, r; i; )
    i instanceof K ? o(i, e) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== e && (i.timeline ? o(i.timeline, e) : (r = i._ease, i._ease = i._yEase, i._yEase = r, i._yoyo = e)), i = i._next;
}, Ut = function(t, e) {
  return t && (z(t) ? t : O[t] || An(t)) || e;
}, Gt = function(t, e, i, r) {
  i === void 0 && (i = function(u) {
    return 1 - e(1 - u);
  }), r === void 0 && (r = function(u) {
    return u < 0.5 ? e(u * 2) / 2 : 1 - e((1 - u) * 2) / 2;
  });
  var n = {
    easeIn: e,
    easeOut: i,
    easeInOut: r
  }, s;
  return Z(t, function(a) {
    O[a] = st[a] = n, O[s = a.toLowerCase()] = i;
    for (var u in n)
      O[s + (u === "easeIn" ? ".in" : u === "easeOut" ? ".out" : ".inOut")] = O[a + "." + u] = n[u];
  }), n;
}, Er = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, Ue = function o(t, e, i) {
  var r = e >= 1 ? e : 1, n = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), s = n / $e * (Math.asin(1 / r) || 0), a = function(c) {
    return c === 1 ? 1 : r * Math.pow(2, -10 * c) * sn((c - s) * n) + 1;
  }, u = t === "out" ? a : t === "in" ? function(l) {
    return 1 - a(1 - l);
  } : Er(a);
  return n = $e / n, u.config = function(l, c) {
    return o(t, l, c);
  }, u;
}, Ve = function o(t, e) {
  e === void 0 && (e = 1.70158);
  var i = function(s) {
    return s ? --s * s * ((e + 1) * s + e) + 1 : 0;
  }, r = t === "out" ? i : t === "in" ? function(n) {
    return 1 - i(1 - n);
  } : Er(i);
  return r.config = function(n) {
    return o(t, n);
  }, r;
};
Z("Linear,Quad,Cubic,Quart,Quint,Strong", function(o, t) {
  var e = t < 5 ? t + 1 : t;
  Gt(o + ",Power" + (e - 1), t ? function(i) {
    return Math.pow(i, e);
  } : function(i) {
    return i;
  }, function(i) {
    return 1 - Math.pow(1 - i, e);
  }, function(i) {
    return i < 0.5 ? Math.pow(i * 2, e) / 2 : 1 - Math.pow((1 - i) * 2, e) / 2;
  });
});
O.Linear.easeNone = O.none = O.Linear.easeIn;
Gt("Elastic", Ue("in"), Ue("out"), Ue());
(function(o, t) {
  var e = 1 / t, i = 2 * e, r = 2.5 * e, n = function(a) {
    return a < e ? o * a * a : a < i ? o * Math.pow(a - 1.5 / t, 2) + 0.75 : a < r ? o * (a -= 2.25 / t) * a + 0.9375 : o * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  Gt("Bounce", function(s) {
    return 1 - n(1 - s);
  }, n);
})(7.5625, 2.75);
Gt("Expo", function(o) {
  return Math.pow(2, 10 * (o - 1)) * o + o * o * o * o * o * o * (1 - o);
});
Gt("Circ", function(o) {
  return -(Ji(1 - o * o) - 1);
});
Gt("Sine", function(o) {
  return o === 1 ? 1 : -nn(o * en) + 1;
});
Gt("Back", Ve("in"), Ve("out"), Ve());
O.SteppedEase = O.steps = st.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var i = 1 / t, r = t + (e ? 0 : 1), n = e ? 1 : 0, s = 1 - P;
    return function(a) {
      return ((r * we(0, s, a) | 0) + n) * i;
    };
  }
};
Zt.ease = O["quad.out"];
Z("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(o) {
  return yi += o + "," + o + "Params,";
});
var Ar = function(t, e) {
  this.id = rn++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : ur, this.set = e ? e.getSetter : Si;
}, me = /* @__PURE__ */ function() {
  function o(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, te(this, +e.duration, 1, 1), this.data = e.data, R && (this._ctx = R, R.data.push(this)), pe || it.wake();
  }
  var t = o.prototype;
  return t.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, t.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, te(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(i, r) {
    if (ee(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (ze(this, i), !n._dp || n.parent || _r(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && dt(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !r || this._initted && Math.abs(this._zTime) === P || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), lr(this, i, r)), this;
  }, t.time = function(i, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + Fi(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), r) : this._time;
  }, t.totalProgress = function(i, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(i, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + Fi(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(i, r) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * n, r) : this._repeat ? Jt(this._tTime, n) + 1 : 1;
  }, t.timeScale = function(i, r) {
    if (!arguments.length)
      return this._rts === -P ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var n = this.parent && this._ts ? Ae(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -P ? 0 : this._rts, this.totalTime(we(-Math.abs(this._delay), this.totalDuration(), n), r !== !1), Fe(this), hn(this);
  }, t.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (ee(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== P && (this._tTime -= P)))), this) : this._ps;
  }, t.startTime = function(i) {
    if (arguments.length) {
      this._start = i;
      var r = this.parent || this._dp;
      return r && (r._sort || !this.parent) && dt(r, this, i - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(i) {
    return this._start + (H(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(i) {
    var r = this.parent || this._dp;
    return r ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Ae(r.rawTime(i), this) : this._tTime : this._tTime;
  }, t.revert = function(i) {
    i === void 0 && (i = un);
    var r = X;
    return X = i, wi(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), X = r, this;
  }, t.globalTime = function(i) {
    for (var r = this, n = arguments.length ? i : r.rawTime(); r; )
      n = r._start + n / (Math.abs(r._ts) || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : n;
  }, t.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, zi(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(i) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = i, zi(this), r ? this.time(r) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, t.seek = function(i, r) {
    return this.totalTime(at(this, i), H(r));
  }, t.restart = function(i, r) {
    return this.play().totalTime(i ? -this._delay : 0, H(r)), this._dur || (this._zTime = -P), this;
  }, t.play = function(i, r) {
    return i != null && this.seek(i, r), this.reversed(!1).paused(!1);
  }, t.reverse = function(i, r) {
    return i != null && this.seek(i || this.totalDuration(), r), this.reversed(!0).paused(!1);
  }, t.pause = function(i, r) {
    return i != null && this.seek(i, r), this.paused(!0);
  }, t.resume = function() {
    return this.paused(!1);
  }, t.reversed = function(i) {
    return arguments.length ? (!!i !== this.reversed() && this.timeScale(-this._rts || (i ? -P : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -P, this;
  }, t.isActive = function() {
    var i = this.parent || this._dp, r = this._start, n;
    return !!(!i || this._ts && this._initted && i.isActive() && (n = i.rawTime(!0)) >= r && n < this.endTime(!0) - P);
  }, t.eventCallback = function(i, r, n) {
    var s = this.vars;
    return arguments.length > 1 ? (r ? (s[i] = r, n && (s[i + "Params"] = n), i === "onUpdate" && (this._onUpdate = r)) : delete s[i], this) : s[i];
  }, t.then = function(i) {
    var r = this;
    return new Promise(function(n) {
      var s = z(i) ? i : fr, a = function() {
        var l = r.then;
        r.then = null, z(s) && (s = s(r)) && (s.then || s === r) && (r.then = l), n(s), r.then = l;
      };
      r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? a() : r._prom = a;
    });
  }, t.kill = function() {
    oe(this);
  }, o;
}();
ot(me.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -P,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var K = /* @__PURE__ */ function(o) {
  Qi(t, o);
  function t(i, r) {
    var n;
    return i === void 0 && (i = {}), n = o.call(this, i) || this, n.labels = {}, n.smoothChildTiming = !!i.smoothChildTiming, n.autoRemoveChildren = !!i.autoRemoveChildren, n._sort = H(i.sortChildren), I && dt(i.parent || I, yt(n), r), i.reversed && n.reverse(), i.paused && n.paused(!0), i.scrollTrigger && dr(yt(n), i.scrollTrigger), n;
  }
  var e = t.prototype;
  return e.to = function(r, n, s) {
    return ce(0, arguments, this), this;
  }, e.from = function(r, n, s) {
    return ce(1, arguments, this), this;
  }, e.fromTo = function(r, n, s, a) {
    return ce(2, arguments, this), this;
  }, e.set = function(r, n, s) {
    return n.duration = 0, n.parent = this, le(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new B(r, n, at(this, s), 1), this;
  }, e.call = function(r, n, s) {
    return dt(this, B.delayedCall(0, r, n), s);
  }, e.staggerTo = function(r, n, s, a, u, l, c) {
    return s.duration = n, s.stagger = s.stagger || a, s.onComplete = l, s.onCompleteParams = c, s.parent = this, new B(r, s, at(this, u)), this;
  }, e.staggerFrom = function(r, n, s, a, u, l, c) {
    return s.runBackwards = 1, le(s).immediateRender = H(s.immediateRender), this.staggerTo(r, n, s, a, u, l, c);
  }, e.staggerFromTo = function(r, n, s, a, u, l, c, h) {
    return a.startAt = s, le(a).immediateRender = H(a.immediateRender), this.staggerTo(r, n, a, u, l, c, h);
  }, e.render = function(r, n, s) {
    var a = this._time, u = this._dirty ? this.totalDuration() : this._tDur, l = this._dur, c = r <= 0 ? 0 : U(r), h = this._zTime < 0 != r < 0 && (this._initted || !l), _, d, p, f, m, y, v, w, x, g, T, S;
    if (this !== I && c > u && r >= 0 && (c = u), c !== this._tTime || s || h) {
      if (a !== this._time && l && (c += this._time - a, r += this._time - a), _ = c, x = this._start, w = this._ts, y = !w, h && (l || (a = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (T = this._yoyo, m = l + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(m * 100 + r, n, s);
        if (_ = U(c % m), c === u ? (f = this._repeat, _ = l) : (g = U(c / m), f = ~~g, f && f === g && (_ = l, f--), _ > l && (_ = l)), g = Jt(this._tTime, m), !a && this._tTime && g !== f && this._tTime - g * m - this._dur <= 0 && (g = f), T && f & 1 && (_ = l - _, S = 1), f !== g && !this._lock) {
          var k = T && g & 1, b = k === (T && f & 1);
          if (f < g && (k = !k), a = k ? 0 : c % l ? l : c, this._lock = 1, this.render(a || (S ? 0 : U(f * m)), n, !l)._lock = 0, this._tTime = c, !n && this.parent && rt(this, "onRepeat"), this.vars.repeatRefresh && !S && (this.invalidate()._lock = 1), a && a !== this._time || y !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (l = this._dur, u = this._tDur, b && (this._lock = 2, a = k ? l : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !S && this.invalidate()), this._lock = 0, !this._ts && !y)
            return this;
          Pr(this, S);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (v = mn(this, U(a), U(_)), v && (c -= _ - (_ = v._start))), this._tTime = c, this._time = _, this._act = !w, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, a = 0), !a && c && !n && !g && (rt(this, "onStart"), this._tTime !== c))
        return this;
      if (_ >= a && r >= 0)
        for (d = this._first; d; ) {
          if (p = d._next, (d._act || _ >= d._start) && d._ts && v !== d) {
            if (d.parent !== this)
              return this.render(r, n, s);
            if (d.render(d._ts > 0 ? (_ - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (_ - d._start) * d._ts, n, s), _ !== this._time || !this._ts && !y) {
              v = 0, p && (c += this._zTime = -P);
              break;
            }
          }
          d = p;
        }
      else {
        d = this._last;
        for (var C = r < 0 ? r : _; d; ) {
          if (p = d._prev, (d._act || C <= d._end) && d._ts && v !== d) {
            if (d.parent !== this)
              return this.render(r, n, s);
            if (d.render(d._ts > 0 ? (C - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (C - d._start) * d._ts, n, s || X && wi(d)), _ !== this._time || !this._ts && !y) {
              v = 0, p && (c += this._zTime = C ? -P : P);
              break;
            }
          }
          d = p;
        }
      }
      if (v && !n && (this.pause(), v.render(_ >= a ? 0 : -P)._zTime = _ >= a ? 1 : -1, this._ts))
        return this._start = x, Fe(this), this.render(r, n, s);
      this._onUpdate && !n && rt(this, "onUpdate", !0), (c === u && this._tTime >= this.totalDuration() || !c && a) && (x === this._start || Math.abs(w) !== Math.abs(this._ts)) && (this._lock || ((r || !l) && (c === u && this._ts > 0 || !c && this._ts < 0) && Et(this, 1), !n && !(r < 0 && !a) && (c || a || !u) && (rt(this, c === u && r >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(c < u && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(r, n) {
    var s = this;
    if (xt(n) || (n = at(this, n, r)), !(r instanceof me)) {
      if (j(r))
        return r.forEach(function(a) {
          return s.add(a, n);
        }), this;
      if (G(r))
        return this.addLabel(r, n);
      if (z(r))
        r = B.delayedCall(0, r);
      else
        return this;
    }
    return this !== r ? dt(this, r, n) : this;
  }, e.getChildren = function(r, n, s, a) {
    r === void 0 && (r = !0), n === void 0 && (n = !0), s === void 0 && (s = !0), a === void 0 && (a = -ut);
    for (var u = [], l = this._first; l; )
      l._start >= a && (l instanceof B ? n && u.push(l) : (s && u.push(l), r && u.push.apply(u, l.getChildren(!0, n, s)))), l = l._next;
    return u;
  }, e.getById = function(r) {
    for (var n = this.getChildren(1, 1, 1), s = n.length; s--; )
      if (n[s].vars.id === r)
        return n[s];
  }, e.remove = function(r) {
    return G(r) ? this.removeLabel(r) : z(r) ? this.killTweensOf(r) : (r.parent === this && Ie(this, r), r === this._recent && (this._recent = this._last), Bt(this));
  }, e.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = U(it.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), o.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(r, n) {
    return this.labels[r] = at(this, n), this;
  }, e.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, e.addPause = function(r, n, s) {
    var a = B.delayedCall(0, n || _e, s);
    return a.data = "isPause", this._hasPause = 1, dt(this, a, at(this, r));
  }, e.removePause = function(r) {
    var n = this._first;
    for (r = at(this, r); n; )
      n._start === r && n.data === "isPause" && Et(n), n = n._next;
  }, e.killTweensOf = function(r, n, s) {
    for (var a = this.getTweensOf(r, s), u = a.length; u--; )
      Tt !== a[u] && a[u].kill(r, n);
    return this;
  }, e.getTweensOf = function(r, n) {
    for (var s = [], a = lt(r), u = this._first, l = xt(n), c; u; )
      u instanceof B ? ln(u._targets, a) && (l ? (!Tt || u._initted && u._ts) && u.globalTime(0) <= n && u.globalTime(u.totalDuration()) > n : !n || u.isActive()) && s.push(u) : (c = u.getTweensOf(a, n)).length && s.push.apply(s, c), u = u._next;
    return s;
  }, e.tweenTo = function(r, n) {
    n = n || {};
    var s = this, a = at(s, r), u = n, l = u.startAt, c = u.onStart, h = u.onStartParams, _ = u.immediateRender, d, p = B.to(s, ot({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: n.duration || Math.abs((a - (l && "time" in l ? l.time : s._time)) / s.timeScale()) || P,
      onStart: function() {
        if (s.pause(), !d) {
          var m = n.duration || Math.abs((a - (l && "time" in l ? l.time : s._time)) / s.timeScale());
          p._dur !== m && te(p, m, 0, 1).render(p._time, !0, !0), d = 1;
        }
        c && c.apply(p, h || []);
      }
    }, n));
    return _ ? p.render(0) : p;
  }, e.tweenFromTo = function(r, n, s) {
    return this.tweenTo(n, ot({
      startAt: {
        time: at(this, r)
      }
    }, s));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(r) {
    return r === void 0 && (r = this._time), qi(this, at(this, r));
  }, e.previousLabel = function(r) {
    return r === void 0 && (r = this._time), qi(this, at(this, r), 1);
  }, e.currentLabel = function(r) {
    return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + P);
  }, e.shiftChildren = function(r, n, s) {
    s === void 0 && (s = 0);
    for (var a = this._first, u = this.labels, l; a; )
      a._start >= s && (a._start += r, a._end += r), a = a._next;
    if (n)
      for (l in u)
        u[l] >= s && (u[l] += r);
    return Bt(this);
  }, e.invalidate = function(r) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(r), n = n._next;
    return o.prototype.invalidate.call(this, r);
  }, e.clear = function(r) {
    r === void 0 && (r = !0);
    for (var n = this._first, s; n; )
      s = n._next, this.remove(n), n = s;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), Bt(this);
  }, e.totalDuration = function(r) {
    var n = 0, s = this, a = s._last, u = ut, l, c, h;
    if (arguments.length)
      return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -r : r));
    if (s._dirty) {
      for (h = s.parent; a; )
        l = a._prev, a._dirty && a.totalDuration(), c = a._start, c > u && s._sort && a._ts && !s._lock ? (s._lock = 1, dt(s, a, c - a._delay, 1)._lock = 0) : u = c, c < 0 && a._ts && (n -= c, (!h && !s._dp || h && h.smoothChildTiming) && (s._start += c / s._ts, s._time -= c, s._tTime -= c), s.shiftChildren(-c, !1, -1 / 0), u = 0), a._end > n && a._ts && (n = a._end), a = l;
      te(s, s === I && s._time > n ? s._time : n, 1, 1), s._dirty = 0;
    }
    return s._tDur;
  }, t.updateRoot = function(r) {
    if (I._ts && (lr(I, Ae(r, I)), ar = it.frame), it.frame >= Li) {
      Li += nt.autoSleep || 120;
      var n = I._first;
      if ((!n || !n._ts) && nt.autoSleep && it._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || it.sleep();
      }
    }
  }, t;
}(me);
ot(K.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Dn = function(t, e, i, r, n, s, a) {
  var u = new Q(this._pt, t, e, 0, 1, zr, null, n), l = 0, c = 0, h, _, d, p, f, m, y, v;
  for (u.b = i, u.e = r, i += "", r += "", (y = ~r.indexOf("random(")) && (r = de(r)), s && (v = [i, r], s(v, t, e), i = v[0], r = v[1]), _ = i.match(qe) || []; h = qe.exec(r); )
    p = h[0], f = r.substring(l, h.index), d ? d = (d + 1) % 5 : f.substr(-5) === "rgba(" && (d = 1), p !== _[c++] && (m = parseFloat(_[c - 1]) || 0, u._pt = {
      _next: u._pt,
      p: f || c === 1 ? f : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: m,
      c: p.charAt(1) === "=" ? jt(m, p) - m : parseFloat(p) - m,
      m: d && d < 4 ? Math.round : 0
    }, l = qe.lastIndex);
  return u.c = l < r.length ? r.substring(l, r.length) : "", u.fp = a, (ir.test(r) || y) && (u.e = 0), this._pt = u, u;
}, xi = function(t, e, i, r, n, s, a, u, l, c) {
  z(r) && (r = r(n || 0, t, s));
  var h = t[e], _ = i !== "get" ? i : z(h) ? l ? t[e.indexOf("set") || !z(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l) : t[e]() : h, d = z(h) ? l ? zn : Ir : Ti, p;
  if (G(r) && (~r.indexOf("random(") && (r = de(r)), r.charAt(1) === "=" && (p = jt(_, r) + ($(_) || 0), (p || p === 0) && (r = p))), !c || _ !== r || ii)
    return !isNaN(_ * r) && r !== "" ? (p = new Q(this._pt, t, e, +_ || 0, r - (_ || 0), typeof h == "boolean" ? Nn : Fr, 0, d), l && (p.fp = l), a && p.modifier(a, this, t), this._pt = p) : (!h && !(e in t) && mi(e, r), Dn.call(this, t, e, _, r, d, u || nt.stringFilter, l));
}, Rn = function(t, e, i, r, n) {
  if (z(t) && (t = fe(t, n, e, i, r)), !mt(t) || t.style && t.nodeType || j(t) || tr(t))
    return G(t) ? fe(t, n, e, i, r) : t;
  var s = {}, a;
  for (a in t)
    s[a] = fe(t[a], n, e, i, r);
  return s;
}, Dr = function(t, e, i, r, n, s) {
  var a, u, l, c;
  if (et[t] && (a = new et[t]()).init(n, a.rawVars ? e[t] : Rn(e[t], r, n, s, i), i, r, s) !== !1 && (i._pt = u = new Q(i._pt, n, t, 0, 1, a.render, a, 0, a.priority), i !== $t))
    for (l = i._ptLookup[i._targets.indexOf(n)], c = a._props.length; c--; )
      l[a._props[c]] = u;
  return a;
}, Tt, ii, bi = function o(t, e, i) {
  var r = t.vars, n = r.ease, s = r.startAt, a = r.immediateRender, u = r.lazy, l = r.onUpdate, c = r.runBackwards, h = r.yoyoEase, _ = r.keyframes, d = r.autoRevert, p = t._dur, f = t._startAt, m = t._targets, y = t.parent, v = y && y.data === "nested" ? y.vars.targets : m, w = t._overwrite === "auto" && !hi, x = t.timeline, g, T, S, k, b, C, D, E, A, Y, V, N, W;
  if (x && (!_ || !n) && (n = "none"), t._ease = Ut(n, Zt.ease), t._yEase = h ? Mr(Ut(h === !0 ? n : h, Zt.ease)) : 0, h && t._yoyo && !t._repeat && (h = t._yEase, t._yEase = t._ease, t._ease = h), t._from = !x && !!r.runBackwards, !x || _ && !r.stagger) {
    if (E = m[0] ? Nt(m[0]).harness : 0, N = E && r[E.prop], g = Ee(r, gi), f && (f._zTime < 0 && f.progress(1), e < 0 && c && a && !d ? f.render(-1, !0) : f.revert(c && p ? Se : an), f._lazy = 0), s) {
      if (Et(t._startAt = B.set(m, ot({
        data: "isStart",
        overwrite: !1,
        parent: y,
        immediateRender: !0,
        lazy: !f && H(u),
        startAt: null,
        delay: 0,
        onUpdate: l && function() {
          return rt(t, "onUpdate");
        },
        stagger: 0
      }, s))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (X || !a && !d) && t._startAt.revert(Se), a && p && e <= 0 && i <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (c && p && !f) {
      if (e && (a = !1), S = ot({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !f && H(u),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: y
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, g), N && (S[E.prop] = N), Et(t._startAt = B.set(m, S)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (X ? t._startAt.revert(Se) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        o(t._startAt, P, P);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, u = p && H(u) || u && !p, T = 0; T < m.length; T++) {
      if (b = m[T], D = b._gsap || vi(m)[T]._gsap, t._ptLookup[T] = Y = {}, He[D.id] && Ot.length && Pe(), V = v === m ? T : v.indexOf(b), E && (A = new E()).init(b, N || g, t, V, v) !== !1 && (t._pt = k = new Q(t._pt, b, A.name, 0, 1, A.render, A, 0, A.priority), A._props.forEach(function(ft) {
        Y[ft] = k;
      }), A.priority && (C = 1)), !E || N)
        for (S in g)
          et[S] && (A = Dr(S, g, t, V, b, v)) ? A.priority && (C = 1) : Y[S] = k = xi.call(t, b, S, "get", g[S], V, v, 0, r.stringFilter);
      t._op && t._op[T] && t.kill(b, t._op[T]), w && t._pt && (Tt = t, I.killTweensOf(b, Y, t.globalTime(e)), W = !t.parent, Tt = 0), t._pt && u && (He[D.id] = 1);
    }
    C && qr(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = l, t._initted = (!t._op || t._pt) && !W, _ && e <= 0 && x.render(ut, !0, !0);
}, Ln = function(t, e, i, r, n, s, a, u) {
  var l = (t._pt && t._ptCache || (t._ptCache = {}))[e], c, h, _, d;
  if (!l)
    for (l = t._ptCache[e] = [], _ = t._ptLookup, d = t._targets.length; d--; ) {
      if (c = _[d][e], c && c.d && c.d._pt)
        for (c = c.d._pt; c && c.p !== e && c.fp !== e; )
          c = c._next;
      if (!c)
        return ii = 1, t.vars[e] = "+=0", bi(t, a), ii = 0, u ? he(e + " not eligible for reset") : 1;
      l.push(c);
    }
  for (d = l.length; d--; )
    h = l[d], c = h._pt || h, c.s = (r || r === 0) && !n ? r : c.s + (r || 0) + s * c.c, c.c = i - c.s, h.e && (h.e = q(i) + $(h.e)), h.b && (h.b = c.s + $(h.b));
}, In = function(t, e) {
  var i = t[0] ? Nt(t[0]).harness : 0, r = i && i.aliases, n, s, a, u;
  if (!r)
    return e;
  n = Qt({}, e);
  for (s in r)
    if (s in n)
      for (u = r[s].split(","), a = u.length; a--; )
        n[u[a]] = n[s];
  return n;
}, Fn = function(t, e, i, r) {
  var n = e.ease || r || "power1.inOut", s, a;
  if (j(e))
    a = i[t] || (i[t] = []), e.forEach(function(u, l) {
      return a.push({
        t: l / (e.length - 1) * 100,
        v: u,
        e: n
      });
    });
  else
    for (s in e)
      a = i[s] || (i[s] = []), s === "ease" || a.push({
        t: parseFloat(t),
        v: e[s],
        e: n
      });
}, fe = function(t, e, i, r, n) {
  return z(t) ? t.call(e, i, r, n) : G(t) && ~t.indexOf("random(") ? de(t) : t;
}, Rr = yi + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Lr = {};
Z(Rr + ",id,stagger,delay,duration,paused,scrollTrigger", function(o) {
  return Lr[o] = 1;
});
var B = /* @__PURE__ */ function(o) {
  Qi(t, o);
  function t(i, r, n, s) {
    var a;
    typeof r == "number" && (n.duration = r, r = n, n = null), a = o.call(this, s ? r : le(r)) || this;
    var u = a.vars, l = u.duration, c = u.delay, h = u.immediateRender, _ = u.stagger, d = u.overwrite, p = u.keyframes, f = u.defaults, m = u.scrollTrigger, y = u.yoyoEase, v = r.parent || I, w = (j(i) || tr(i) ? xt(i[0]) : "length" in r) ? [i] : lt(i), x, g, T, S, k, b, C, D;
    if (a._targets = w.length ? vi(w) : he("GSAP target " + i + " not found. https://gsap.com", !nt.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = d, p || _ || be(l) || be(c)) {
      if (r = a.vars, x = a.timeline = new K({
        data: "nested",
        defaults: f || {},
        targets: v && v.data === "nested" ? v.vars.targets : w
      }), x.kill(), x.parent = x._dp = yt(a), x._start = 0, _ || be(l) || be(c)) {
        if (S = w.length, C = _ && yr(_), mt(_))
          for (k in _)
            ~Rr.indexOf(k) && (D || (D = {}), D[k] = _[k]);
        for (g = 0; g < S; g++)
          T = Ee(r, Lr), T.stagger = 0, y && (T.yoyoEase = y), D && Qt(T, D), b = w[g], T.duration = +fe(l, yt(a), g, b, w), T.delay = (+fe(c, yt(a), g, b, w) || 0) - a._delay, !_ && S === 1 && T.delay && (a._delay = c = T.delay, a._start += c, T.delay = 0), x.to(b, T, C ? C(g, b, w) : 0), x._ease = O.none;
        x.duration() ? l = c = 0 : a.timeline = 0;
      } else if (p) {
        le(ot(x.vars.defaults, {
          ease: "none"
        })), x._ease = Ut(p.ease || r.ease || "none");
        var E = 0, A, Y, V;
        if (j(p))
          p.forEach(function(N) {
            return x.to(w, N, ">");
          }), x.duration();
        else {
          T = {};
          for (k in p)
            k === "ease" || k === "easeEach" || Fn(k, p[k], T, p.easeEach);
          for (k in T)
            for (A = T[k].sort(function(N, W) {
              return N.t - W.t;
            }), E = 0, g = 0; g < A.length; g++)
              Y = A[g], V = {
                ease: Y.e,
                duration: (Y.t - (g ? A[g - 1].t : 0)) / 100 * l
              }, V[k] = Y.v, x.to(w, V, E), E += V.duration;
          x.duration() < l && x.to({}, {
            duration: l - x.duration()
          });
        }
      }
      l || a.duration(l = x.duration());
    } else
      a.timeline = 0;
    return d === !0 && !hi && (Tt = yt(a), I.killTweensOf(w), Tt = 0), dt(v, yt(a), n), r.reversed && a.reverse(), r.paused && a.paused(!0), (h || !l && !p && a._start === U(v._time) && H(h) && _n(yt(a)) && v.data !== "nested") && (a._tTime = -P, a.render(Math.max(0, -c) || 0)), m && dr(yt(a), m), a;
  }
  var e = t.prototype;
  return e.render = function(r, n, s) {
    var a = this._time, u = this._tDur, l = this._dur, c = r < 0, h = r > u - P && !c ? u : r < P ? 0 : r, _, d, p, f, m, y, v, w, x;
    if (!l)
      pn(this, r, n, s);
    else if (h !== this._tTime || !r || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== c || this._lazy) {
      if (_ = h, w = this.timeline, this._repeat) {
        if (f = l + this._rDelay, this._repeat < -1 && c)
          return this.totalTime(f * 100 + r, n, s);
        if (_ = U(h % f), h === u ? (p = this._repeat, _ = l) : (m = U(h / f), p = ~~m, p && p === m ? (_ = l, p--) : _ > l && (_ = l)), y = this._yoyo && p & 1, y && (x = this._yEase, _ = l - _), m = Jt(this._tTime, f), _ === a && !s && this._initted && p === m)
          return this._tTime = h, this;
        p !== m && (w && this._yEase && Pr(w, y), this.vars.repeatRefresh && !y && !this._lock && _ !== f && this._initted && (this._lock = s = 1, this.render(U(f * p), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (pr(this, c ? r : _, s, n, h))
          return this._tTime = 0, this;
        if (a !== this._time && !(s && this.vars.repeatRefresh && p !== m))
          return this;
        if (l !== this._dur)
          return this.render(r, n, s);
      }
      if (this._tTime = h, this._time = _, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = v = (x || this._ease)(_ / l), this._from && (this.ratio = v = 1 - v), !a && h && !n && !m && (rt(this, "onStart"), this._tTime !== h))
        return this;
      for (d = this._pt; d; )
        d.r(v, d.d), d = d._next;
      w && w.render(r < 0 ? r : w._dur * w._ease(_ / this._dur), n, s) || this._startAt && (this._zTime = r), this._onUpdate && !n && (c && Ze(this, r, n, s), rt(this, "onUpdate")), this._repeat && p !== m && this.vars.onRepeat && !n && this.parent && rt(this, "onRepeat"), (h === this._tDur || !h) && this._tTime === h && (c && !this._onUpdate && Ze(this, r, !0, !0), (r || !l) && (h === this._tDur && this._ts > 0 || !h && this._ts < 0) && Et(this, 1), !n && !(c && !a) && (h || a || y) && (rt(this, h === u ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < u && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), o.prototype.invalidate.call(this, r);
  }, e.resetTo = function(r, n, s, a, u) {
    pe || it.wake(), this._ts || this.play();
    var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts), c;
    return this._initted || bi(this, l), c = this._ease(l / this._dur), Ln(this, r, n, s, a, c, l, u) ? this.resetTo(r, n, s, a, 1) : (ze(this, 0), this.parent || hr(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? oe(this) : this.scrollTrigger && this.scrollTrigger.kill(!!X), this;
    if (this.timeline) {
      var s = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, Tt && Tt.vars.overwrite !== !0)._first || oe(this), this.parent && s !== this.timeline.totalDuration() && te(this, this._dur * this.timeline._tDur / s, 0, 1), this;
    }
    var a = this._targets, u = r ? lt(r) : a, l = this._ptLookup, c = this._pt, h, _, d, p, f, m, y;
    if ((!n || n === "all") && fn(a, u))
      return n === "all" && (this._pt = 0), oe(this);
    for (h = this._op = this._op || [], n !== "all" && (G(n) && (f = {}, Z(n, function(v) {
      return f[v] = 1;
    }), n = f), n = In(a, n)), y = a.length; y--; )
      if (~u.indexOf(a[y])) {
        _ = l[y], n === "all" ? (h[y] = n, p = _, d = {}) : (d = h[y] = h[y] || {}, p = n);
        for (f in p)
          m = _ && _[f], m && ((!("kill" in m.d) || m.d.kill(f) === !0) && Ie(this, m, "_pt"), delete _[f]), d !== "all" && (d[f] = 1);
      }
    return this._initted && !this._pt && c && oe(this), this;
  }, t.to = function(r, n) {
    return new t(r, n, arguments[2]);
  }, t.from = function(r, n) {
    return ce(1, arguments);
  }, t.delayedCall = function(r, n, s, a) {
    return new t(n, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: r,
      onComplete: n,
      onReverseComplete: n,
      onCompleteParams: s,
      onReverseCompleteParams: s,
      callbackScope: a
    });
  }, t.fromTo = function(r, n, s) {
    return ce(2, arguments);
  }, t.set = function(r, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(r, n);
  }, t.killTweensOf = function(r, n, s) {
    return I.killTweensOf(r, n, s);
  }, t;
}(me);
ot(B.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
Z("staggerTo,staggerFrom,staggerFromTo", function(o) {
  B[o] = function() {
    var t = new K(), e = Je.call(arguments, 0);
    return e.splice(o === "staggerFromTo" ? 5 : 4, 0, 0), t[o].apply(t, e);
  };
});
var Ti = function(t, e, i) {
  return t[e] = i;
}, Ir = function(t, e, i) {
  return t[e](i);
}, zn = function(t, e, i, r) {
  return t[e](r.fp, i);
}, qn = function(t, e, i) {
  return t.setAttribute(e, i);
}, Si = function(t, e) {
  return z(t[e]) ? Ir : _i(t[e]) && t.setAttribute ? qn : Ti;
}, Fr = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, Nn = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, zr = function(t, e) {
  var i = e._pt, r = "";
  if (!t && e.b)
    r = e.b;
  else if (t === 1 && e.e)
    r = e.e;
  else {
    for (; i; )
      r = i.p + (i.m ? i.m(i.s + i.c * t) : Math.round((i.s + i.c * t) * 1e4) / 1e4) + r, i = i._next;
    r += e.c;
  }
  e.set(e.t, e.p, r, e);
}, ki = function(t, e) {
  for (var i = e._pt; i; )
    i.r(t, i.d), i = i._next;
}, Bn = function(t, e, i, r) {
  for (var n = this._pt, s; n; )
    s = n._next, n.p === r && n.modifier(t, e, i), n = s;
}, Un = function(t) {
  for (var e = this._pt, i, r; e; )
    r = e._next, e.p === t && !e.op || e.op === t ? Ie(this, e, "_pt") : e.dep || (i = 1), e = r;
  return !i;
}, Vn = function(t, e, i, r) {
  r.mSet(t, e, r.m.call(r.tween, i, r.mt), r);
}, qr = function(t) {
  for (var e = t._pt, i, r, n, s; e; ) {
    for (i = e._next, r = n; r && r.pr > e.pr; )
      r = r._next;
    (e._prev = r ? r._prev : s) ? e._prev._next = e : n = e, (e._next = r) ? r._prev = e : s = e, e = i;
  }
  t._pt = n;
}, Q = /* @__PURE__ */ function() {
  function o(e, i, r, n, s, a, u, l, c) {
    this.t = i, this.s = n, this.c = s, this.p = r, this.r = a || Fr, this.d = u || this, this.set = l || Ti, this.pr = c || 0, this._next = e, e && (e._prev = this);
  }
  var t = o.prototype;
  return t.modifier = function(i, r, n) {
    this.mSet = this.mSet || this.set, this.set = Vn, this.m = i, this.mt = n, this.tween = r;
  }, o;
}();
Z(yi + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(o) {
  return gi[o] = 1;
});
st.TweenMax = st.TweenLite = B;
st.TimelineLite = st.TimelineMax = K;
I = new K({
  sortChildren: !1,
  defaults: Zt,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
nt.stringFilter = Cr;
var Vt = [], Oe = {}, Wn = [], Bi = 0, Gn = 0, We = function(t) {
  return (Oe[t] || Wn).map(function(e) {
    return e();
  });
}, ri = function() {
  var t = Date.now(), e = [];
  t - Bi > 2 && (We("matchMediaInit"), Vt.forEach(function(i) {
    var r = i.queries, n = i.conditions, s, a, u, l;
    for (a in r)
      s = ht.matchMedia(r[a]).matches, s && (u = 1), s !== n[a] && (n[a] = s, l = 1);
    l && (i.revert(), u && e.push(i));
  }), We("matchMediaRevert"), e.forEach(function(i) {
    return i.onMatch(i, function(r) {
      return i.add(null, r);
    });
  }), Bi = t, We("matchMedia"));
}, Nr = /* @__PURE__ */ function() {
  function o(e, i) {
    this.selector = i && ti(i), this.data = [], this._r = [], this.isReverted = !1, this.id = Gn++, e && this.add(e);
  }
  var t = o.prototype;
  return t.add = function(i, r, n) {
    z(i) && (n = r, r = i, i = z);
    var s = this, a = function() {
      var l = R, c = s.selector, h;
      return l && l !== s && l.data.push(s), n && (s.selector = ti(n)), R = s, h = r.apply(s, arguments), z(h) && s._r.push(h), R = l, s.selector = c, s.isReverted = !1, h;
    };
    return s.last = a, i === z ? a(s, function(u) {
      return s.add(null, u);
    }) : i ? s[i] = a : a;
  }, t.ignore = function(i) {
    var r = R;
    R = null, i(this), R = r;
  }, t.getTweens = function() {
    var i = [];
    return this.data.forEach(function(r) {
      return r instanceof o ? i.push.apply(i, r.getTweens()) : r instanceof B && !(r.parent && r.parent.data === "nested") && i.push(r);
    }), i;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(i, r) {
    var n = this;
    if (i ? function() {
      for (var a = n.getTweens(), u = n.data.length, l; u--; )
        l = n.data[u], l.data === "isFlip" && (l.revert(), l.getChildren(!0, !0, !1).forEach(function(c) {
          return a.splice(a.indexOf(c), 1);
        }));
      for (a.map(function(c) {
        return {
          g: c._dur || c._delay || c._sat && !c._sat.vars.immediateRender ? c.globalTime(0) : -1 / 0,
          t: c
        };
      }).sort(function(c, h) {
        return h.g - c.g || -1 / 0;
      }).forEach(function(c) {
        return c.t.revert(i);
      }), u = n.data.length; u--; )
        l = n.data[u], l instanceof K ? l.data !== "nested" && (l.scrollTrigger && l.scrollTrigger.revert(), l.kill()) : !(l instanceof B) && l.revert && l.revert(i);
      n._r.forEach(function(c) {
        return c(i, n);
      }), n.isReverted = !0;
    }() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), r)
      for (var s = Vt.length; s--; )
        Vt[s].id === this.id && Vt.splice(s, 1);
  }, t.revert = function(i) {
    this.kill(i || {});
  }, o;
}(), Yn = /* @__PURE__ */ function() {
  function o(e) {
    this.contexts = [], this.scope = e, R && R.data.push(this);
  }
  var t = o.prototype;
  return t.add = function(i, r, n) {
    mt(i) || (i = {
      matches: i
    });
    var s = new Nr(0, n || this.scope), a = s.conditions = {}, u, l, c;
    R && !s.selector && (s.selector = R.selector), this.contexts.push(s), r = s.add("onMatch", r), s.queries = i;
    for (l in i)
      l === "all" ? c = 1 : (u = ht.matchMedia(i[l]), u && (Vt.indexOf(s) < 0 && Vt.push(s), (a[l] = u.matches) && (c = 1), u.addListener ? u.addListener(ri) : u.addEventListener("change", ri)));
    return c && r(s, function(h) {
      return s.add(null, h);
    }), this;
  }, t.revert = function(i) {
    this.kill(i || {});
  }, t.kill = function(i) {
    this.contexts.forEach(function(r) {
      return r.kill(i, !0);
    });
  }, o;
}(), De = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    e.forEach(function(r) {
      return Sr(r);
    });
  },
  timeline: function(t) {
    return new K(t);
  },
  getTweensOf: function(t, e) {
    return I.getTweensOf(t, e);
  },
  getProperty: function(t, e, i, r) {
    G(t) && (t = lt(t)[0]);
    var n = Nt(t || {}).get, s = i ? fr : cr;
    return i === "native" && (i = ""), t && (e ? s((et[e] && et[e].get || n)(t, e, i, r)) : function(a, u, l) {
      return s((et[a] && et[a].get || n)(t, a, u, l));
    });
  },
  quickSetter: function(t, e, i) {
    if (t = lt(t), t.length > 1) {
      var r = t.map(function(c) {
        return tt.quickSetter(c, e, i);
      }), n = r.length;
      return function(c) {
        for (var h = n; h--; )
          r[h](c);
      };
    }
    t = t[0] || {};
    var s = et[e], a = Nt(t), u = a.harness && (a.harness.aliases || {})[e] || e, l = s ? function(c) {
      var h = new s();
      $t._pt = 0, h.init(t, i ? c + i : c, $t, 0, [t]), h.render(1, h), $t._pt && ki(1, $t);
    } : a.set(t, u);
    return s ? l : function(c) {
      return l(t, u, i ? c + i : c, a, 1);
    };
  },
  quickTo: function(t, e, i) {
    var r, n = tt.to(t, ot((r = {}, r[e] = "+=0.1", r.paused = !0, r.stagger = 0, r), i || {})), s = function(u, l, c) {
      return n.resetTo(e, u, l, c);
    };
    return s.tween = n, s;
  },
  isTweening: function(t) {
    return I.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = Ut(t.ease, Zt.ease)), Ii(Zt, t || {});
  },
  config: function(t) {
    return Ii(nt, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, i = t.effect, r = t.plugins, n = t.defaults, s = t.extendTimeline;
    (r || "").split(",").forEach(function(a) {
      return a && !et[a] && !st[a] && he(e + " effect requires " + a + " plugin.");
    }), Ne[e] = function(a, u, l) {
      return i(lt(a), ot(u || {}, n), l);
    }, s && (K.prototype[e] = function(a, u, l) {
      return this.add(Ne[e](a, mt(u) ? u : (l = u) && {}, this), l);
    });
  },
  registerEase: function(t, e) {
    O[t] = Ut(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? Ut(t, e) : O;
  },
  getById: function(t) {
    return I.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var i = new K(t), r, n;
    for (i.smoothChildTiming = H(t.smoothChildTiming), I.remove(i), i._dp = 0, i._time = i._tTime = I._time, r = I._first; r; )
      n = r._next, (e || !(!r._dur && r instanceof B && r.vars.onComplete === r._targets[0])) && dt(i, r, r._start - r._delay), r = n;
    return dt(I, i, 0), i;
  },
  context: function(t, e) {
    return t ? new Nr(t, e) : R;
  },
  matchMedia: function(t) {
    return new Yn(t);
  },
  matchMediaRefresh: function() {
    return Vt.forEach(function(t) {
      var e = t.conditions, i, r;
      for (r in e)
        e[r] && (e[r] = !1, i = 1);
      i && t.revert();
    }) || ri();
  },
  addEventListener: function(t, e) {
    var i = Oe[t] || (Oe[t] = []);
    ~i.indexOf(e) || i.push(e);
  },
  removeEventListener: function(t, e) {
    var i = Oe[t], r = i && i.indexOf(e);
    r >= 0 && i.splice(r, 1);
  },
  utils: {
    wrap: Tn,
    wrapYoyo: Sn,
    distribute: yr,
    random: wr,
    snap: vr,
    normalize: bn,
    getUnit: $,
    clamp: yn,
    splitColor: kr,
    toArray: lt,
    selector: ti,
    mapRange: br,
    pipe: wn,
    unitize: xn,
    interpolate: kn,
    shuffle: gr
  },
  install: sr,
  effects: Ne,
  ticker: it,
  updateRoot: K.updateRoot,
  plugins: et,
  globalTimeline: I,
  core: {
    PropTween: Q,
    globals: or,
    Tween: B,
    Timeline: K,
    Animation: me,
    getCache: Nt,
    _removeLinkedListItem: Ie,
    reverting: function() {
      return X;
    },
    context: function(t) {
      return t && R && (R.data.push(t), t._ctx = R), R;
    },
    suppressOverwrites: function(t) {
      return hi = t;
    }
  }
};
Z("to,from,fromTo,delayedCall,set,killTweensOf", function(o) {
  return De[o] = B[o];
});
it.add(K.updateRoot);
$t = De.to({}, {
  duration: 0
});
var Xn = function(t, e) {
  for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
    i = i._next;
  return i;
}, $n = function(t, e) {
  var i = t._targets, r, n, s;
  for (r in e)
    for (n = i.length; n--; )
      s = t._ptLookup[n][r], s && (s = s.d) && (s._pt && (s = Xn(s, r)), s && s.modifier && s.modifier(e[r], t, i[n], r));
}, Ge = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(r, n, s) {
      s._onInit = function(a) {
        var u, l;
        if (G(n) && (u = {}, Z(n, function(c) {
          return u[c] = 1;
        }), n = u), e) {
          u = {};
          for (l in n)
            u[l] = e(n[l]);
          n = u;
        }
        $n(a, n);
      };
    }
  };
}, tt = De.registerPlugin({
  name: "attr",
  init: function(t, e, i, r, n) {
    var s, a, u;
    this.tween = i;
    for (s in e)
      u = t.getAttribute(s) || "", a = this.add(t, "setAttribute", (u || 0) + "", e[s], r, n, 0, 0, s), a.op = s, a.b = u, this._props.push(s);
  },
  render: function(t, e) {
    for (var i = e._pt; i; )
      X ? i.set(i.t, i.p, i.b, i) : i.r(t, i.d), i = i._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(t, e) {
    for (var i = e.length; i--; )
      this.add(t, i, t[i] || 0, e[i], 0, 0, 0, 0, 0, 1);
  }
}, Ge("roundProps", ei), Ge("modifiers"), Ge("snap", vr)) || De;
B.version = K.version = tt.version = "3.13.0";
nr = 1;
di() && ee();
O.Power0;
O.Power1;
O.Power2;
O.Power3;
O.Power4;
O.Linear;
O.Quad;
O.Cubic;
O.Quart;
O.Quint;
O.Strong;
O.Elastic;
O.Back;
O.SteppedEase;
O.Bounce;
O.Sine;
O.Expo;
O.Circ;
/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Ui, St, Kt, Oi, qt, Vi, Ci, jn = function() {
  return typeof window < "u";
}, bt = {}, zt = 180 / Math.PI, Ht = Math.PI / 180, Yt = Math.atan2, Wi = 1e8, Mi = /([A-Z])/g, Kn = /(left|right|width|margin|padding|x)/i, Hn = /[\s,\(]\S/, pt = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, ni = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, Zn = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, Qn = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, Jn = function(t, e) {
  var i = e.s + e.c * t;
  e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
}, Br = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, Ur = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, ts = function(t, e, i) {
  return t.style[e] = i;
}, es = function(t, e, i) {
  return t.style.setProperty(e, i);
}, is = function(t, e, i) {
  return t._gsap[e] = i;
}, rs = function(t, e, i) {
  return t._gsap.scaleX = t._gsap.scaleY = i;
}, ns = function(t, e, i, r, n) {
  var s = t._gsap;
  s.scaleX = s.scaleY = i, s.renderTransform(n, s);
}, ss = function(t, e, i, r, n) {
  var s = t._gsap;
  s[e] = i, s.renderTransform(n, s);
}, F = "transform", J = F + "Origin", os = function o(t, e) {
  var i = this, r = this.target, n = r.style, s = r._gsap;
  if (t in bt && n) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = pt[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return i.tfm[a] = vt(r, a);
      }) : this.tfm[t] = s.x ? s[t] : vt(r, t), t === J && (this.tfm.zOrigin = s.zOrigin);
    else
      return pt.transform.split(",").forEach(function(a) {
        return o.call(i, a, e);
      });
    if (this.props.indexOf(F) >= 0)
      return;
    s.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(J, e, "")), t = F;
  }
  (n || e) && this.props.push(t, e, n[t]);
}, Vr = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, as = function() {
  var t = this.props, e = this.target, i = e.style, r = e._gsap, n, s;
  for (n = 0; n < t.length; n += 3)
    t[n + 1] ? t[n + 1] === 2 ? e[t[n]](t[n + 2]) : e[t[n]] = t[n + 2] : t[n + 2] ? i[t[n]] = t[n + 2] : i.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(Mi, "-$1").toLowerCase());
  if (this.tfm) {
    for (s in this.tfm)
      r[s] = this.tfm[s];
    r.svg && (r.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), n = Ci(), (!n || !n.isStart) && !i[F] && (Vr(i), r.zOrigin && i[J] && (i[J] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
  }
}, Wr = function(t, e) {
  var i = {
    target: t,
    props: [],
    revert: as,
    save: os
  };
  return t._gsap || tt.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(r) {
    return i.save(r);
  }), i;
}, Gr, si = function(t, e) {
  var i = St.createElementNS ? St.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : St.createElement(t);
  return i && i.style ? i : St.createElement(t);
}, ct = function o(t, e, i) {
  var r = getComputedStyle(t);
  return r[e] || r.getPropertyValue(e.replace(Mi, "-$1").toLowerCase()) || r.getPropertyValue(e) || !i && o(t, ie(e) || e, 1) || "";
}, Gi = "O,Moz,ms,Ms,Webkit".split(","), ie = function(t, e, i) {
  var r = e || qt, n = r.style, s = 5;
  if (t in n && !i)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(Gi[s] + t in n); )
    ;
  return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? Gi[s] : "") + t;
}, oi = function() {
  jn() && window.document && (Ui = window, St = Ui.document, Kt = St.documentElement, qt = si("div") || {
    style: {}
  }, si("div"), F = ie(F), J = F + "Origin", qt.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Gr = !!ie("perspective"), Ci = tt.core.reverting, Oi = 1);
}, Yi = function(t) {
  var e = t.ownerSVGElement, i = si("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = t.cloneNode(!0), n;
  r.style.display = "block", i.appendChild(r), Kt.appendChild(i);
  try {
    n = r.getBBox();
  } catch {
  }
  return i.removeChild(r), Kt.removeChild(i), n;
}, Xi = function(t, e) {
  for (var i = e.length; i--; )
    if (t.hasAttribute(e[i]))
      return t.getAttribute(e[i]);
}, Yr = function(t) {
  var e, i;
  try {
    e = t.getBBox();
  } catch {
    e = Yi(t), i = 1;
  }
  return e && (e.width || e.height) || i || (e = Yi(t)), e && !e.width && !e.x && !e.y ? {
    x: +Xi(t, ["x", "cx", "x1"]) || 0,
    y: +Xi(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, Xr = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Yr(t));
}, Wt = function(t, e) {
  if (e) {
    var i = t.style, r;
    e in bt && e !== J && (e = F), i.removeProperty ? (r = e.substr(0, 2), (r === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), i.removeProperty(r === "--" ? e : e.replace(Mi, "-$1").toLowerCase())) : i.removeAttribute(e);
  }
}, kt = function(t, e, i, r, n, s) {
  var a = new Q(t._pt, e, i, 0, 1, s ? Ur : Br);
  return t._pt = a, a.b = r, a.e = n, t._props.push(i), a;
}, $i = {
  deg: 1,
  rad: 1,
  turn: 1
}, us = {
  grid: 1,
  flex: 1
}, At = function o(t, e, i, r) {
  var n = parseFloat(i) || 0, s = (i + "").trim().substr((n + "").length) || "px", a = qt.style, u = Kn.test(e), l = t.tagName.toLowerCase() === "svg", c = (l ? "client" : "offset") + (u ? "Width" : "Height"), h = 100, _ = r === "px", d = r === "%", p, f, m, y;
  if (r === s || !n || $i[r] || $i[s])
    return n;
  if (s !== "px" && !_ && (n = o(t, e, i, "px")), y = t.getCTM && Xr(t), (d || s === "%") && (bt[e] || ~e.indexOf("adius")))
    return p = y ? t.getBBox()[u ? "width" : "height"] : t[c], q(d ? n / p * h : n / 100 * p);
  if (a[u ? "width" : "height"] = h + (_ ? s : r), f = r !== "rem" && ~e.indexOf("adius") || r === "em" && t.appendChild && !l ? t : t.parentNode, y && (f = (t.ownerSVGElement || {}).parentNode), (!f || f === St || !f.appendChild) && (f = St.body), m = f._gsap, m && d && m.width && u && m.time === it.time && !m.uncache)
    return q(n / m.width * h);
  if (d && (e === "height" || e === "width")) {
    var v = t.style[e];
    t.style[e] = h + r, p = t[c], v ? t.style[e] = v : Wt(t, e);
  } else
    (d || s === "%") && !us[ct(f, "display")] && (a.position = ct(t, "position")), f === t && (a.position = "static"), f.appendChild(qt), p = qt[c], f.removeChild(qt), a.position = "absolute";
  return u && d && (m = Nt(f), m.time = it.time, m.width = f[c]), q(_ ? p * n / h : p && n ? h / p * n : 0);
}, vt = function(t, e, i, r) {
  var n;
  return Oi || oi(), e in pt && e !== "transform" && (e = pt[e], ~e.indexOf(",") && (e = e.split(",")[0])), bt[e] && e !== "transform" ? (n = ye(t, r), n = e !== "transformOrigin" ? n[e] : n.svg ? n.origin : Le(ct(t, J)) + " " + n.zOrigin + "px") : (n = t.style[e], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = Re[e] && Re[e](t, e, i) || ct(t, e) || ur(t, e) || (e === "opacity" ? 1 : 0))), i && !~(n + "").trim().indexOf(" ") ? At(t, e, n, i) + i : n;
}, ls = function(t, e, i, r) {
  if (!i || i === "none") {
    var n = ie(e, t, 1), s = n && ct(t, n, 1);
    s && s !== i ? (e = n, i = s) : e === "borderColor" && (i = ct(t, "borderTopColor"));
  }
  var a = new Q(this._pt, t.style, e, 0, 1, zr), u = 0, l = 0, c, h, _, d, p, f, m, y, v, w, x, g;
  if (a.b = i, a.e = r, i += "", r += "", r.substring(0, 6) === "var(--" && (r = ct(t, r.substring(4, r.indexOf(")")))), r === "auto" && (f = t.style[e], t.style[e] = r, r = ct(t, e) || r, f ? t.style[e] = f : Wt(t, e)), c = [i, r], Cr(c), i = c[0], r = c[1], _ = i.match(Xt) || [], g = r.match(Xt) || [], g.length) {
    for (; h = Xt.exec(r); )
      m = h[0], v = r.substring(u, h.index), p ? p = (p + 1) % 5 : (v.substr(-5) === "rgba(" || v.substr(-5) === "hsla(") && (p = 1), m !== (f = _[l++] || "") && (d = parseFloat(f) || 0, x = f.substr((d + "").length), m.charAt(1) === "=" && (m = jt(d, m) + x), y = parseFloat(m), w = m.substr((y + "").length), u = Xt.lastIndex - w.length, w || (w = w || nt.units[e] || x, u === r.length && (r += w, a.e += w)), x !== w && (d = At(t, e, f, w) || 0), a._pt = {
        _next: a._pt,
        p: v || l === 1 ? v : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: d,
        c: y - d,
        m: p && p < 4 || e === "zIndex" ? Math.round : 0
      });
    a.c = u < r.length ? r.substring(u, r.length) : "";
  } else
    a.r = e === "display" && r === "none" ? Ur : Br;
  return ir.test(r) && (a.e = 0), this._pt = a, a;
}, ji = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, cs = function(t) {
  var e = t.split(" "), i = e[0], r = e[1] || "50%";
  return (i === "top" || i === "bottom" || r === "left" || r === "right") && (t = i, i = r, r = t), e[0] = ji[i] || i, e[1] = ji[r] || r, e.join(" ");
}, fs = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var i = e.t, r = i.style, n = e.u, s = i._gsap, a, u, l;
    if (n === "all" || n === !0)
      r.cssText = "", u = 1;
    else
      for (n = n.split(","), l = n.length; --l > -1; )
        a = n[l], bt[a] && (u = 1, a = a === "transformOrigin" ? J : F), Wt(i, a);
    u && (Wt(i, F), s && (s.svg && i.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", ye(i, 1), s.uncache = 1, Vr(r)));
  }
}, Re = {
  clearProps: function(t, e, i, r, n) {
    if (n.data !== "isFromStart") {
      var s = t._pt = new Q(t._pt, e, i, 0, 0, fs);
      return s.u = r, s.pr = -10, s.tween = n, t._props.push(i), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, ge = [1, 0, 0, 1, 0, 0], $r = {}, jr = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, Ki = function(t) {
  var e = ct(t, F);
  return jr(e) ? ge : e.substr(7).match(er).map(q);
}, Pi = function(t, e) {
  var i = t._gsap || Nt(t), r = t.style, n = Ki(t), s, a, u, l;
  return i.svg && t.getAttribute("transform") ? (u = t.transform.baseVal.consolidate().matrix, n = [u.a, u.b, u.c, u.d, u.e, u.f], n.join(",") === "1,0,0,1,0,0" ? ge : n) : (n === ge && !t.offsetParent && t !== Kt && !i.svg && (u = r.display, r.display = "block", s = t.parentNode, (!s || !t.offsetParent && !t.getBoundingClientRect().width) && (l = 1, a = t.nextElementSibling, Kt.appendChild(t)), n = Ki(t), u ? r.display = u : Wt(t, "display"), l && (a ? s.insertBefore(t, a) : s ? s.appendChild(t) : Kt.removeChild(t))), e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, ai = function(t, e, i, r, n, s) {
  var a = t._gsap, u = n || Pi(t, !0), l = a.xOrigin || 0, c = a.yOrigin || 0, h = a.xOffset || 0, _ = a.yOffset || 0, d = u[0], p = u[1], f = u[2], m = u[3], y = u[4], v = u[5], w = e.split(" "), x = parseFloat(w[0]) || 0, g = parseFloat(w[1]) || 0, T, S, k, b;
  i ? u !== ge && (S = d * m - p * f) && (k = x * (m / S) + g * (-f / S) + (f * v - m * y) / S, b = x * (-p / S) + g * (d / S) - (d * v - p * y) / S, x = k, g = b) : (T = Yr(t), x = T.x + (~w[0].indexOf("%") ? x / 100 * T.width : x), g = T.y + (~(w[1] || w[0]).indexOf("%") ? g / 100 * T.height : g)), r || r !== !1 && a.smooth ? (y = x - l, v = g - c, a.xOffset = h + (y * d + v * f) - y, a.yOffset = _ + (y * p + v * m) - v) : a.xOffset = a.yOffset = 0, a.xOrigin = x, a.yOrigin = g, a.smooth = !!r, a.origin = e, a.originIsAbsolute = !!i, t.style[J] = "0px 0px", s && (kt(s, a, "xOrigin", l, x), kt(s, a, "yOrigin", c, g), kt(s, a, "xOffset", h, a.xOffset), kt(s, a, "yOffset", _, a.yOffset)), t.setAttribute("data-svg-origin", x + " " + g);
}, ye = function(t, e) {
  var i = t._gsap || new Ar(t);
  if ("x" in i && !e && !i.uncache)
    return i;
  var r = t.style, n = i.scaleX < 0, s = "px", a = "deg", u = getComputedStyle(t), l = ct(t, J) || "0", c, h, _, d, p, f, m, y, v, w, x, g, T, S, k, b, C, D, E, A, Y, V, N, W, ft, xe, re, ne, Rt, Ri, gt, Lt;
  return c = h = _ = f = m = y = v = w = x = 0, d = p = 1, i.svg = !!(t.getCTM && Xr(t)), u.translate && ((u.translate !== "none" || u.scale !== "none" || u.rotate !== "none") && (r[F] = (u.translate !== "none" ? "translate3d(" + (u.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (u.rotate !== "none" ? "rotate(" + u.rotate + ") " : "") + (u.scale !== "none" ? "scale(" + u.scale.split(" ").join(",") + ") " : "") + (u[F] !== "none" ? u[F] : "")), r.scale = r.rotate = r.translate = "none"), S = Pi(t, i.svg), i.svg && (i.uncache ? (ft = t.getBBox(), l = i.xOrigin - ft.x + "px " + (i.yOrigin - ft.y) + "px", W = "") : W = !e && t.getAttribute("data-svg-origin"), ai(t, W || l, !!W || i.originIsAbsolute, i.smooth !== !1, S)), g = i.xOrigin || 0, T = i.yOrigin || 0, S !== ge && (D = S[0], E = S[1], A = S[2], Y = S[3], c = V = S[4], h = N = S[5], S.length === 6 ? (d = Math.sqrt(D * D + E * E), p = Math.sqrt(Y * Y + A * A), f = D || E ? Yt(E, D) * zt : 0, v = A || Y ? Yt(A, Y) * zt + f : 0, v && (p *= Math.abs(Math.cos(v * Ht))), i.svg && (c -= g - (g * D + T * A), h -= T - (g * E + T * Y))) : (Lt = S[6], Ri = S[7], re = S[8], ne = S[9], Rt = S[10], gt = S[11], c = S[12], h = S[13], _ = S[14], k = Yt(Lt, Rt), m = k * zt, k && (b = Math.cos(-k), C = Math.sin(-k), W = V * b + re * C, ft = N * b + ne * C, xe = Lt * b + Rt * C, re = V * -C + re * b, ne = N * -C + ne * b, Rt = Lt * -C + Rt * b, gt = Ri * -C + gt * b, V = W, N = ft, Lt = xe), k = Yt(-A, Rt), y = k * zt, k && (b = Math.cos(-k), C = Math.sin(-k), W = D * b - re * C, ft = E * b - ne * C, xe = A * b - Rt * C, gt = Y * C + gt * b, D = W, E = ft, A = xe), k = Yt(E, D), f = k * zt, k && (b = Math.cos(k), C = Math.sin(k), W = D * b + E * C, ft = V * b + N * C, E = E * b - D * C, N = N * b - V * C, D = W, V = ft), m && Math.abs(m) + Math.abs(f) > 359.9 && (m = f = 0, y = 180 - y), d = q(Math.sqrt(D * D + E * E + A * A)), p = q(Math.sqrt(N * N + Lt * Lt)), k = Yt(V, N), v = Math.abs(k) > 2e-4 ? k * zt : 0, x = gt ? 1 / (gt < 0 ? -gt : gt) : 0), i.svg && (W = t.getAttribute("transform"), i.forceCSS = t.setAttribute("transform", "") || !jr(ct(t, F)), W && t.setAttribute("transform", W))), Math.abs(v) > 90 && Math.abs(v) < 270 && (n ? (d *= -1, v += f <= 0 ? 180 : -180, f += f <= 0 ? 180 : -180) : (p *= -1, v += v <= 0 ? 180 : -180)), e = e || i.uncache, i.x = c - ((i.xPercent = c && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-c) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + s, i.y = h - ((i.yPercent = h && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + s, i.z = _ + s, i.scaleX = q(d), i.scaleY = q(p), i.rotation = q(f) + a, i.rotationX = q(m) + a, i.rotationY = q(y) + a, i.skewX = v + a, i.skewY = w + a, i.transformPerspective = x + s, (i.zOrigin = parseFloat(l.split(" ")[2]) || !e && i.zOrigin || 0) && (r[J] = Le(l)), i.xOffset = i.yOffset = 0, i.force3D = nt.force3D, i.renderTransform = i.svg ? _s : Gr ? Kr : hs, i.uncache = 0, i;
}, Le = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, Ye = function(t, e, i) {
  var r = $(e);
  return q(parseFloat(e) + parseFloat(At(t, "x", i + "px", r))) + r;
}, hs = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, Kr(t, e);
}, It = "0deg", se = "0px", Ft = ") ", Kr = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, u = i.z, l = i.rotation, c = i.rotationY, h = i.rotationX, _ = i.skewX, d = i.skewY, p = i.scaleX, f = i.scaleY, m = i.transformPerspective, y = i.force3D, v = i.target, w = i.zOrigin, x = "", g = y === "auto" && t && t !== 1 || y === !0;
  if (w && (h !== It || c !== It)) {
    var T = parseFloat(c) * Ht, S = Math.sin(T), k = Math.cos(T), b;
    T = parseFloat(h) * Ht, b = Math.cos(T), s = Ye(v, s, S * b * -w), a = Ye(v, a, -Math.sin(T) * -w), u = Ye(v, u, k * b * -w + w);
  }
  m !== se && (x += "perspective(" + m + Ft), (r || n) && (x += "translate(" + r + "%, " + n + "%) "), (g || s !== se || a !== se || u !== se) && (x += u !== se || g ? "translate3d(" + s + ", " + a + ", " + u + ") " : "translate(" + s + ", " + a + Ft), l !== It && (x += "rotate(" + l + Ft), c !== It && (x += "rotateY(" + c + Ft), h !== It && (x += "rotateX(" + h + Ft), (_ !== It || d !== It) && (x += "skew(" + _ + ", " + d + Ft), (p !== 1 || f !== 1) && (x += "scale(" + p + ", " + f + Ft), v.style[F] = x || "translate(0, 0)";
}, _s = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, u = i.rotation, l = i.skewX, c = i.skewY, h = i.scaleX, _ = i.scaleY, d = i.target, p = i.xOrigin, f = i.yOrigin, m = i.xOffset, y = i.yOffset, v = i.forceCSS, w = parseFloat(s), x = parseFloat(a), g, T, S, k, b;
  u = parseFloat(u), l = parseFloat(l), c = parseFloat(c), c && (c = parseFloat(c), l += c, u += c), u || l ? (u *= Ht, l *= Ht, g = Math.cos(u) * h, T = Math.sin(u) * h, S = Math.sin(u - l) * -_, k = Math.cos(u - l) * _, l && (c *= Ht, b = Math.tan(l - c), b = Math.sqrt(1 + b * b), S *= b, k *= b, c && (b = Math.tan(c), b = Math.sqrt(1 + b * b), g *= b, T *= b)), g = q(g), T = q(T), S = q(S), k = q(k)) : (g = h, k = _, T = S = 0), (w && !~(s + "").indexOf("px") || x && !~(a + "").indexOf("px")) && (w = At(d, "x", s, "px"), x = At(d, "y", a, "px")), (p || f || m || y) && (w = q(w + p - (p * g + f * S) + m), x = q(x + f - (p * T + f * k) + y)), (r || n) && (b = d.getBBox(), w = q(w + r / 100 * b.width), x = q(x + n / 100 * b.height)), b = "matrix(" + g + "," + T + "," + S + "," + k + "," + w + "," + x + ")", d.setAttribute("transform", b), v && (d.style[F] = b);
}, ds = function(t, e, i, r, n) {
  var s = 360, a = G(n), u = parseFloat(n) * (a && ~n.indexOf("rad") ? zt : 1), l = u - r, c = r + l + "deg", h, _;
  return a && (h = n.split("_")[1], h === "short" && (l %= s, l !== l % (s / 2) && (l += l < 0 ? s : -s)), h === "cw" && l < 0 ? l = (l + s * Wi) % s - ~~(l / s) * s : h === "ccw" && l > 0 && (l = (l - s * Wi) % s - ~~(l / s) * s)), t._pt = _ = new Q(t._pt, e, i, r, l, Zn), _.e = c, _.u = "deg", t._props.push(i), _;
}, Hi = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, ps = function(t, e, i) {
  var r = Hi({}, i._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", s = i.style, a, u, l, c, h, _, d, p;
  r.svg ? (l = i.getAttribute("transform"), i.setAttribute("transform", ""), s[F] = e, a = ye(i, 1), Wt(i, F), i.setAttribute("transform", l)) : (l = getComputedStyle(i)[F], s[F] = e, a = ye(i, 1), s[F] = l);
  for (u in bt)
    l = r[u], c = a[u], l !== c && n.indexOf(u) < 0 && (d = $(l), p = $(c), h = d !== p ? At(i, u, l, p) : parseFloat(l), _ = parseFloat(c), t._pt = new Q(t._pt, a, u, h, _ - h, ni), t._pt.u = p || 0, t._props.push(u));
  Hi(a, r);
};
Z("padding,margin,Width,Radius", function(o, t) {
  var e = "Top", i = "Right", r = "Bottom", n = "Left", s = (t < 3 ? [e, i, r, n] : [e + n, e + i, r + i, r + n]).map(function(a) {
    return t < 2 ? o + a : "border" + a + o;
  });
  Re[t > 1 ? "border" + o : o] = function(a, u, l, c, h) {
    var _, d;
    if (arguments.length < 4)
      return _ = s.map(function(p) {
        return vt(a, p, l);
      }), d = _.join(" "), d.split(_[0]).length === 5 ? _[0] : d;
    _ = (c + "").split(" "), d = {}, s.forEach(function(p, f) {
      return d[p] = _[f] = _[f] || _[(f - 1) / 2 | 0];
    }), a.init(u, d, h);
  };
});
var Hr = {
  name: "css",
  register: oi,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, i, r, n) {
    var s = this._props, a = t.style, u = i.vars.startAt, l, c, h, _, d, p, f, m, y, v, w, x, g, T, S, k;
    Oi || oi(), this.styles = this.styles || Wr(t), k = this.styles.props, this.tween = i;
    for (f in e)
      if (f !== "autoRound" && (c = e[f], !(et[f] && Dr(f, e, i, r, t, n)))) {
        if (d = typeof c, p = Re[f], d === "function" && (c = c.call(i, r, t, n), d = typeof c), d === "string" && ~c.indexOf("random(") && (c = de(c)), p)
          p(this, t, f, c, i) && (S = 1);
        else if (f.substr(0, 2) === "--")
          l = (getComputedStyle(t).getPropertyValue(f) + "").trim(), c += "", Ct.lastIndex = 0, Ct.test(l) || (m = $(l), y = $(c)), y ? m !== y && (l = At(t, f, l, y) + y) : m && (c += m), this.add(a, "setProperty", l, c, r, n, 0, 0, f), s.push(f), k.push(f, 0, a[f]);
        else if (d !== "undefined") {
          if (u && f in u ? (l = typeof u[f] == "function" ? u[f].call(i, r, t, n) : u[f], G(l) && ~l.indexOf("random(") && (l = de(l)), $(l + "") || l === "auto" || (l += nt.units[f] || $(vt(t, f)) || ""), (l + "").charAt(1) === "=" && (l = vt(t, f))) : l = vt(t, f), _ = parseFloat(l), v = d === "string" && c.charAt(1) === "=" && c.substr(0, 2), v && (c = c.substr(2)), h = parseFloat(c), f in pt && (f === "autoAlpha" && (_ === 1 && vt(t, "visibility") === "hidden" && h && (_ = 0), k.push("visibility", 0, a.visibility), kt(this, a, "visibility", _ ? "inherit" : "hidden", h ? "inherit" : "hidden", !h)), f !== "scale" && f !== "transform" && (f = pt[f], ~f.indexOf(",") && (f = f.split(",")[0]))), w = f in bt, w) {
            if (this.styles.save(f), d === "string" && c.substring(0, 6) === "var(--" && (c = ct(t, c.substring(4, c.indexOf(")"))), h = parseFloat(c)), x || (g = t._gsap, g.renderTransform && !e.parseTransform || ye(t, e.parseTransform), T = e.smoothOrigin !== !1 && g.smooth, x = this._pt = new Q(this._pt, a, F, 0, 1, g.renderTransform, g, 0, -1), x.dep = 1), f === "scale")
              this._pt = new Q(this._pt, g, "scaleY", g.scaleY, (v ? jt(g.scaleY, v + h) : h) - g.scaleY || 0, ni), this._pt.u = 0, s.push("scaleY", f), f += "X";
            else if (f === "transformOrigin") {
              k.push(J, 0, a[J]), c = cs(c), g.svg ? ai(t, c, 0, T, 0, this) : (y = parseFloat(c.split(" ")[2]) || 0, y !== g.zOrigin && kt(this, g, "zOrigin", g.zOrigin, y), kt(this, a, f, Le(l), Le(c)));
              continue;
            } else if (f === "svgOrigin") {
              ai(t, c, 1, T, 0, this);
              continue;
            } else if (f in $r) {
              ds(this, g, f, _, v ? jt(_, v + c) : c);
              continue;
            } else if (f === "smoothOrigin") {
              kt(this, g, "smooth", g.smooth, c);
              continue;
            } else if (f === "force3D") {
              g[f] = c;
              continue;
            } else if (f === "transform") {
              ps(this, c, t);
              continue;
            }
          } else f in a || (f = ie(f) || f);
          if (w || (h || h === 0) && (_ || _ === 0) && !Hn.test(c) && f in a)
            m = (l + "").substr((_ + "").length), h || (h = 0), y = $(c) || (f in nt.units ? nt.units[f] : m), m !== y && (_ = At(t, f, l, y)), this._pt = new Q(this._pt, w ? g : a, f, _, (v ? jt(_, v + h) : h) - _, !w && (y === "px" || f === "zIndex") && e.autoRound !== !1 ? Jn : ni), this._pt.u = y || 0, m !== y && y !== "%" && (this._pt.b = l, this._pt.r = Qn);
          else if (f in a)
            ls.call(this, t, f, l, v ? v + c : c);
          else if (f in t)
            this.add(t, f, l || t[f], v ? v + c : c, r, n);
          else if (f !== "parseTransform") {
            mi(f, c);
            continue;
          }
          w || (f in a ? k.push(f, 0, a[f]) : typeof t[f] == "function" ? k.push(f, 2, t[f]()) : k.push(f, 1, l || t[f])), s.push(f);
        }
      }
    S && qr(this);
  },
  render: function(t, e) {
    if (e.tween._time || !Ci())
      for (var i = e._pt; i; )
        i.r(t, i.d), i = i._next;
    else
      e.styles.revert();
  },
  get: vt,
  aliases: pt,
  getSetter: function(t, e, i) {
    var r = pt[e];
    return r && r.indexOf(",") < 0 && (e = r), e in bt && e !== J && (t._gsap.x || vt(t, "x")) ? i && Vi === i ? e === "scale" ? rs : is : (Vi = i || {}) && (e === "scale" ? ns : ss) : t.style && !_i(t.style[e]) ? ts : ~e.indexOf("-") ? es : Si(t, e);
  },
  core: {
    _removeProperty: Wt,
    _getMatrix: Pi
  }
};
tt.utils.checkPrefix = ie;
tt.core.getStyleSaver = Wr;
(function(o, t, e, i) {
  var r = Z(o + "," + t + "," + e, function(n) {
    bt[n] = 1;
  });
  Z(t, function(n) {
    nt.units[n] = "deg", $r[n] = 1;
  }), pt[r[13]] = o + "," + t, Z(i, function(n) {
    var s = n.split(":");
    pt[s[1]] = r[s[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Z("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(o) {
  nt.units[o] = "px";
});
tt.registerPlugin(Hr);
var L = tt.registerPlugin(Hr) || tt;
L.core.Tween;
const ve = {
  fadeOutDuration: 0.4,
  fadeInDuration: 0.3,
  ease: "power2.out"
};
let Ce = !1, ue = !1;
function ms() {
  if (console.log("🎬 initLoadingScreen - Début de l'initialisation"), Ce)
    return console.log("ℹ️ Écran de chargement déjà initialisé"), Promise.resolve();
  const o = document.querySelector(".loadingscreen"), t = document.querySelector(".loading_logo_wrap");
  return console.log("🔍 Éléments trouvés:", {
    loadingScreen: !!o,
    logoWrap: !!t
  }), !o || !t ? (console.warn("⚠️ Éléments manquants:", {
    loadingScreen: o ? "OK" : "Non trouvé",
    logoWrap: t ? "OK" : "Non trouvé"
  }), Ce = !1, Promise.resolve(null)) : (console.log("🎨 Configuration des styles initiaux"), L.set(o, {
    opacity: 1,
    display: "flex",
    backgroundColor: "white"
  }), L.set(t, { opacity: 0, scale: 0.9 }), L.to(t, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    delay: 0.1,
    ease: ve.ease
  }), ws(), Ce = !0, console.log("✅ Écran de chargement initialisé avec succès"), Promise.resolve(o));
}
function gs() {
  if (console.log("🎬 hideLoadingScreen - Début du masquage"), !Ce) {
    console.warn("⚠️ Écran de chargement non initialisé");
    return;
  }
  if (ue) {
    console.log("ℹ️ Masquage déjà en cours");
    return;
  }
  ue = !0;
  const o = document.querySelector(".loadingscreen"), t = document.querySelector(".loading_logo_wrap");
  if (console.log("🔍 Éléments trouvés pour le masquage:", {
    loadingScreen: !!o,
    logoWrap: !!t
  }), !o || !t) {
    console.warn("⚠️ Éléments manquants pour le masquage"), ue = !1;
    return;
  }
  console.log("🎬 Démarrage de l'animation de masquage"), L.timeline({
    onComplete: () => {
      console.log("✅ Animation de masquage terminée"), L.set(o, { display: "none" }), ue = !1;
    }
  }).to(o, {
    opacity: 0,
    duration: ve.fadeOutDuration,
    ease: ve.ease
  });
}
function ys() {
  const o = document.querySelector(".loadingscreen");
  o && L.set(o, { display: "none" }), ue = !1;
}
function vs(o) {
  const t = document.querySelector(".loadingscreen");
  if (!t) {
    o();
    return;
  }
  L.timeline({ onComplete: o }).set(t, { display: "flex", opacity: 0, backgroundColor: "white" }).to(t, { opacity: 1, duration: ve.fadeInDuration, ease: ve.ease });
}
function ws() {
  document.addEventListener("click", (o) => {
    const t = o.target.closest("a");
    if (!t) return;
    const e = t.getAttribute("href"), i = t.getAttribute("target");
    !e || e.startsWith("#") || e.startsWith("http") || i === "_blank" || e.startsWith("mailto:") || e.startsWith("tel:") || (o.preventDefault(), vs(() => {
      window.location.href = e;
    }));
  }, !0);
}
const _t = {
  MENU_BUTTON: "#hamburger-menu",
  MAIN_MENU: "#main-menu-mobile",
  ALL_MENUS: "#main-menu-mobile, #parc-menu-mobile, #activite-menu-mobile, #offres-menu-mobile",
  SUB_MENU_TRIGGERS: {
    "#parcs-nav_button_mobile": "#parc-menu-mobile",
    "#activites-nav_button_mobile": "#activite-menu-mobile",
    "#formules-nav_button_mobile": "#offres-menu-mobile"
  },
  CLOSE_BUTTONS: ".button-close",
  BACK_BUTTONS: ".button-back-menu"
};
let Te, Ei, ui = 0;
function xs() {
  ui = window.pageYOffset || document.documentElement.scrollTop, document.body.style.overflow = "hidden", document.body.style.position = "fixed", document.body.style.width = "100%", document.body.style.top = `-${ui}px`;
}
function bs() {
  document.body.style.overflow = "", document.body.style.position = "", document.body.style.width = "", document.body.style.top = "", window.scrollTo(0, ui);
}
function Ai(o) {
  o && (o.classList.add("is-open"), L.fromTo(o, { x: "100%" }, { x: "0%", duration: 0.4, ease: "power2.out" }));
}
function Di(o, t) {
  o && L.to(o, {
    x: "100%",
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      o.classList.remove("is-open");
    }
  });
}
function li() {
  document.querySelectorAll(_t.ALL_MENUS).forEach((o) => {
    o.classList.contains("is-open") && Di(o);
  }), Ei.reverse(), bs();
}
function Ts() {
  li();
  const o = document.querySelector(_t.MAIN_MENU);
  Ai(o), Ei.play(), xs();
}
function Ss(o) {
  const t = document.querySelector(_t.MAIN_MENU), e = document.querySelector(o);
  Di(t), Ai(e);
}
function ks() {
  const o = document.querySelector(".is-open:not(#main-menu-mobile)"), t = document.querySelector(_t.MAIN_MENU);
  o && Di(o), Ai(t);
}
function Os() {
  var o;
  if (Te = document.querySelector(_t.MENU_BUTTON), !!Te) {
    Ei = L.timeline({ paused: !0 }).to(Te, { rotation: 90, duration: 0.4, ease: "elastic.out(1, 0.5)" }), Te.addEventListener("click", () => {
      document.querySelector(_t.ALL_MENUS + ".is-open") ? li() : Ts();
    });
    for (const t in _t.SUB_MENU_TRIGGERS)
      (o = document.querySelector(t)) == null || o.addEventListener("click", () => {
        Ss(_t.SUB_MENU_TRIGGERS[t]);
      });
    document.querySelectorAll(_t.CLOSE_BUTTONS).forEach((t) => {
      t.addEventListener("click", li);
    }), document.querySelectorAll(_t.BACK_BUTTONS).forEach((t) => {
      t.addEventListener("click", ks);
    });
  }
}
const Zr = [
  { buttonId: "nav-link-desktop-parcs", containerSelector: ".parc_menu_desktop" },
  { buttonId: "nav-link-desktop-activites", containerSelector: ".activites_menu_desktop" },
  { buttonId: "nav-link-desktop-offres", containerSelector: ".offres_menu_desktop" }
];
let wt = !1, Mt = null;
function ci(o, t = () => {
}) {
  if (!Mt || wt) {
    t && t();
    return;
  }
  wt = !0;
  const e = Mt, i = document.querySelector(e.containerSelector);
  document.body.classList.remove("scroll-lock"), o.classList.remove("is-open"), L.to(i, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.inOut",
    onComplete: () => {
      i.classList.remove("is-open"), wt = !1, Mt = null, t && t();
    }
  });
}
function Cs(o, t) {
  if (wt) return;
  wt = !0;
  const e = document.querySelector(o.containerSelector);
  if (!e) {
    console.error(`Conteneur de menu non trouvé pour ${o.buttonId}`), wt = !1;
    return;
  }
  document.body.classList.add("scroll-lock"), t.classList.add("is-open"), e.classList.add("is-open"), L.fromTo(e, { opacity: 0 }, {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out",
    onComplete: () => {
      wt = !1, Mt = o;
    }
  });
}
function Ms(o, t) {
  var r;
  if (wt || !Mt) return;
  const e = Zr.some((n) => {
    var s;
    return (s = document.getElementById(n.buttonId)) == null ? void 0 : s.contains(o.target);
  }), i = Mt && ((r = document.querySelector(Mt.containerSelector)) == null ? void 0 : r.contains(o.target));
  !e && !i && ci(t);
}
function Ps() {
  console.log("🚀 Initialisation du menu desktop (v2.1.0)");
  const o = document.querySelector(".desktop_menu_wrapper");
  if (!o) {
    console.error("❌ Menu wrapper (.desktop_menu_wrapper) non trouvé. Abandon.");
    return;
  }
  Zr.forEach((t) => {
    const e = document.getElementById(t.buttonId), i = document.querySelector(t.containerSelector);
    if (!e) {
      console.warn(`Bouton de menu #${t.buttonId} non trouvé.`);
      return;
    }
    if (!i) {
      console.warn(`Conteneur de menu ${t.containerSelector} non trouvé.`);
      return;
    }
    i.classList.remove("is-open"), L.set(i, { opacity: 0 }), e.addEventListener("click", (r) => {
      r.preventDefault(), r.stopPropagation(), !wt && (Mt === t ? ci(o) : ci(o, () => {
        Cs(t, o);
      }));
    });
  }), document.addEventListener("click", (t) => Ms(t, o)), console.log("✅ Menu desktop initialisé.");
}
let Xe = !1;
async function Zi(o, t) {
  if (!o || !o.classList.contains("is-open")) return;
  const e = o.querySelector(t.contentSelector), i = o.querySelector(t.arrowSelector);
  o.classList.remove("is-open");
  const r = L.timeline();
  r.to(e, {
    height: 0,
    opacity: 0,
    duration: 0.4,
    ease: "back.in(1.7)"
  }, 0), i && r.to(i, {
    rotation: 0,
    duration: 0.25,
    ease: "power2.inOut"
  }, 0), await r, e.style.display = "none";
}
async function Es(o, t) {
  if (!o || o.classList.contains("is-open")) return;
  o.classList.add("is-open");
  const e = o.querySelector(t.contentSelector), i = o.querySelector(t.arrowSelector);
  L.set(e, {
    display: "block",
    height: "auto",
    opacity: 0
  });
  const r = e.scrollHeight, n = L.timeline();
  n.from(e, { height: 0, opacity: 0 }, 0), n.to(e, {
    height: r,
    opacity: 1,
    duration: 0.6,
    ease: "elastic.out(1.2, 0.5)"
  }, 0), i && n.to(i, {
    rotation: 90,
    duration: 0.25,
    ease: "back.out(1.7)"
  }, "<"), await n;
}
async function As(o, t) {
  if (!Xe) {
    Xe = !0;
    try {
      if (o.classList.contains("is-open"))
        await Zi(o, t);
      else {
        const i = document.querySelectorAll(`${t.itemSelector}.is-open`);
        await Promise.all(Array.from(i).map((n) => Zi(n, t))), await Es(o, t);
        const r = new CustomEvent("accordion:opened", {
          bubbles: !0,
          detail: {
            item: o,
            config: t
          }
        });
        o.dispatchEvent(r);
      }
    } catch (e) {
      console.error("Erreur lors du toggle de l'accordéon:", e);
    } finally {
      Xe = !1;
    }
  }
}
function Qr(o) {
  const t = document.querySelectorAll(o.itemSelector);
  t.length !== 0 && t.forEach((e) => {
    const i = e.querySelector(o.triggerSelector), r = e.querySelector(o.contentSelector);
    !i || !r || (e.classList.contains("is-open") || L.set(r, { display: "none", height: 0 }), i.addEventListener("click", (n) => {
      n.preventDefault(), As(e, o);
    }));
  });
}
console.log("🚀 centre-card.js v4.0.0 chargé – Refactorisé avec Accordion et Events");
const Pt = {
  maxOffset: 0.1875,
  defaultVerticalOffset: 0.1875,
  shadowColor: "var(--colors--black)",
  scaleAmount: 1.05,
  scaleDuration: 0.15,
  scaleEase: "elastic.out(1, 0.3)"
};
function Ds(o, t) {
  const e = t.getBoundingClientRect();
  return { x: -((o.clientX - e.left) / e.width * 2 - 1) };
}
function Rs(o, t) {
  if (!t || t.classList.contains("is-open")) return;
  const i = Ds(o, t).x * Pt.maxOffset;
  t.style.boxShadow = `${i}rem ${Pt.defaultVerticalOffset}rem 0 0 ${Pt.shadowColor}`;
}
function Ls(o, t) {
  !t || t.classList.contains("is-open") || L.to(t, {
    scale: Pt.scaleAmount,
    duration: Pt.scaleDuration,
    ease: Pt.scaleEase
  });
}
function Is(o) {
  o && L.to(o, {
    scale: 1,
    duration: Pt.scaleDuration,
    ease: Pt.scaleEase,
    onComplete: () => {
      o.classList.contains("is-open") || (o.style.boxShadow = "");
    }
  });
}
function Fs(o) {
  o.addEventListener("mouseenter", (t) => Ls(t, o)), o.addEventListener("mousemove", (t) => Rs(t, o)), o.addEventListener("mouseleave", () => Is(o));
}
function zs() {
  const o = {
    itemSelector: ".centre-card_wrapper.effect-cartoon-shadow",
    triggerSelector: '.clickable_wrap[data-attribute="data-card-toggle"]',
    contentSelector: ".centre-card_scroll_wrapper",
    arrowSelector: ".svg-holder.arrow"
  };
  Qr(o), document.querySelectorAll(o.itemSelector).forEach((e) => {
    Fs(e);
  }), document.addEventListener("accordion:opened", (e) => {
    var r;
    const i = e.detail.item;
    if (i.matches(o.itemSelector)) {
      const n = (r = i.closest(".w-dyn-item")) == null ? void 0 : r.dataset.placeId;
      n && document.dispatchEvent(new CustomEvent("map:focus", {
        bubbles: !0,
        detail: { placeId: n }
      }));
    }
  });
}
const qs = () => {
  const o = document.querySelector(".desktop_menu_content.right .w-dyn-items"), t = document.querySelectorAll(".desktop_menu_list.acitivt-s .default-container");
  if (!o || !t.length) return;
  const e = Array.from(o.children).find((s) => {
    const a = s.querySelector("img");
    return a && a.id === "Bowling";
  });
  Array.from(o.children).forEach((s) => {
    s === e ? (s.style.opacity = "1", s.style.display = "block") : (s.style.opacity = "0", s.style.display = "none");
  });
  const i = /* @__PURE__ */ new Map(), r = (s, a) => {
    const u = Array.from(o.children).find((l) => {
      const c = l.querySelector("img");
      return c && c.id === s;
    });
    if (u)
      if (i.has(u) && (i.get(u).kill(), i.delete(u)), a) {
        if (e && e !== u) {
          i.has(e) && i.get(e).kill();
          const c = gsap.to(e, {
            opacity: 0,
            duration: 0.15,
            ease: "power2.out",
            onComplete: () => {
              e && (e.style.display = "none"), i.delete(e);
            }
          });
          i.set(e, c);
        }
        u.style.display = "block";
        const l = gsap.to(u, {
          opacity: 1,
          duration: 0.15,
          ease: "power2.out",
          onComplete: () => i.delete(u)
        });
        i.set(u, l);
      } else {
        const l = gsap.to(u, {
          opacity: 0,
          duration: 0.15,
          ease: "power2.out",
          onComplete: () => {
            if (u.style.display = "none", e) {
              e.style.display = "block", i.has(e) && i.get(e).kill();
              const c = gsap.to(e, {
                opacity: 1,
                duration: 0.15,
                ease: "power2.out",
                onComplete: () => i.delete(e)
              });
              i.set(e, c);
            }
            i.delete(u);
          }
        });
        i.set(u, l);
      }
  }, n = (s, a) => {
    i.has(s) && (i.get(s).kill(), i.delete(s));
    const u = {
      duration: a ? 0.1 : 0.05,
      ease: "power2.out",
      onComplete: () => i.delete(s)
    }, l = a ? { scale: 1.1, backgroundColor: "#FFFFFF" } : { scale: 1, backgroundColor: "" }, c = gsap.to(s, { ...l, ...u });
    i.set(s, c);
  };
  t.forEach((s) => {
    const a = s.getAttribute("data-name");
    a && (s.addEventListener("mouseenter", () => {
      r(a, !0), n(s, !0);
    }), s.addEventListener("mouseleave", () => {
      r(a, !1), n(s, !1);
    }));
  });
};
function Jr() {
  const o = document.querySelector(".span_mover");
  if (o)
    try {
      let i = function() {
        if (e) return;
        e = !0;
        const r = L.timeline({
          onComplete: () => {
            e = !1, L.to(o, {
              y: t.positions.start,
              duration: t.duration,
              ease: t.ease,
              onComplete: () => {
                setTimeout(i, t.cycleDelay * 1e3);
              }
            });
          }
        }), n = [
          t.positions.start,
          t.positions.middle,
          t.positions.end
        ];
        for (let s = 0; s < n.length; s++)
          r.to(o, {
            y: n[s],
            duration: t.duration,
            ease: t.ease
          }), s < n.length - 1 && r.to({}, { duration: t.pauseDuration });
        r.play();
      };
      const t = {
        duration: 0.6,
        ease: "back.out(1.7)",
        pauseDuration: 1.5,
        cycleDelay: 0.5,
        positions: {
          start: "0%",
          middle: "-34%",
          end: "-68%"
        }
      };
      let e = !1;
      i(), window.addEventListener("beforeunload", () => {
        L.killTweensOf(o);
      });
    } catch (t) {
      console.error("Erreur dans l'animation de texte:", t);
    }
}
function tn() {
  setTimeout(typeof L < "u" ? Jr : tn, 100);
}
tn();
console.log("🚀 faq-toggle.js v1.0.2 chargé – Système de FAQ avec animations GSAP");
async function Ns() {
  Qr({
    itemSelector: ".faq_item.effect-cartoon-shadow",
    triggerSelector: ".faq_wrapper",
    contentSelector: ".faq_respond",
    arrowSelector: ".svg-holder.medium"
  });
}
console.log("🗺️ map-integration.js v2.0.0 chargé");
const fi = {
  map: null,
  markers: [],
  infoWindow: null,
  // Coordonnées centrées pour couvrir Paris et sa petite couronne, y compris l'ouest.
  initialCenter: { lat: 48.82, lng: 2.25 },
  initialZoom: 10,
  /**
   * Initialise la carte, l'infobulle et crée les marqueurs pour chaque centre.
   * Cette fonction est appelée par le script de l'API Google Maps.
   */
  initMap: function() {
    const o = document.getElementById("map");
    if (!o) {
      console.error("Erreur : L'élément #map est introuvable dans le DOM.");
      return;
    }
    this.map = new google.maps.Map(o, {
      center: this.initialCenter,
      zoom: this.initialZoom,
      disableDefaultUI: !0,
      // On peut désactiver l'UI par défaut pour un look plus épuré
      zoomControl: !0,
      styles: [
        /* TODO: Ajouter des styles custom pour la carte si désiré */
      ]
    }), this.infoWindow = new google.maps.InfoWindow(), this.createMarkers(), this.listenForFocusEvents();
  },
  /**
   * Scanne le DOM pour les cartes de centre et crée un marqueur pour chacune.
   */
  createMarkers: function() {
    const o = document.querySelectorAll(".w-dyn-item[data-place-id]");
    console.log(`📍 ${o.length} cartes trouvées pour la création des marqueurs.`), o.forEach((t) => {
      var a;
      const e = parseFloat(t.dataset.lat), i = parseFloat(t.dataset.lng), r = t.dataset.placeId, n = t.getAttribute("id");
      if (!e || !i || !r) {
        console.warn("⚠️ Carte ignorée car il manque data-lat, data-lng ou data-place-id", t);
        return;
      }
      const s = new google.maps.marker.AdvancedMarkerElement({
        map: this.map,
        position: { lat: e, lng: i },
        title: ((a = t.querySelector("h3")) == null ? void 0 : a.textContent) || "Centre Smile World"
      });
      s.addListener("click", () => {
        const u = t.querySelector('.clickable_wrap[data-attribute="data-card-toggle"]');
        u ? u.click() : console.warn("Impossible de trouver l'élément cliquable pour ouvrir la carte", t);
      }), this.markers.push({ placeId: r, cardId: n, marker: s });
    });
  },
  /**
   * Zoome sur un centre spécifique et affiche son infobulle avec les détails de Google Places.
   * @param {string} placeId L'identifiant Google Place du centre.
   */
  focusOnCenter: function(o) {
    if (!o || !this.map) return;
    console.log(`🔎 Zoom sur le centre avec Place ID : ${o}`), new google.maps.places.PlacesService(this.map).getDetails({
      placeId: o,
      fields: ["name", "formatted_address", "geometry", "rating", "website", "url"]
    }, (e, i) => {
      var r;
      if (i === google.maps.places.PlacesServiceStatus.OK && e && e.geometry && e.geometry.location) {
        this.map.panTo(e.geometry.location), this.map.setZoom(15);
        const n = `
                    <div class="map-infowindow-content">
                        <div class="map-infowindow-title">${e.name}</div>
                        <div class="map-infowindow-address">${e.formatted_address}</div>
                        ${e.rating ? `<div class="map-infowindow-rating">Note : ${e.rating} ★</div>` : ""}
                        <a href="${e.url}" target="_blank">Voir sur Google Maps</a>
                    </div>
                `;
        this.infoWindow.setContent(n);
        const s = (r = this.markers.find((a) => a.placeId === o)) == null ? void 0 : r.marker;
        s && this.infoWindow.open(this.map, s);
      } else
        console.error(`Erreur lors de la récupération des détails pour le Place ID ${o}: ${i}`);
    });
  },
  /**
   * Réinitialise la vue de la carte à son état initial.
   */
  resetMapView: function() {
    this.map && (console.log("🔄 Réinitialisation de la vue de la carte."), this.infoWindow.close(), this.map.panTo(this.initialCenter), this.map.setZoom(this.initialZoom));
  },
  listenForFocusEvents: function() {
    document.addEventListener("map:focus", (o) => {
      this.focusOnCenter(o.detail.placeId);
    });
  }
};
window.initGoogleMap = fi.initMap.bind(fi);
function Bs() {
  const o = document.getElementById("map");
  if (!o) {
    console.warn("⚠️ L'élément #map est introuvable, l'intégration de la carte est annulée.");
    return;
  }
  const t = o.dataset.apiKey;
  if (!t) {
    console.error(`❌ Clé API Google Maps manquante. Veuillez l'ajouter dans l'attribut "data-api-key" de la div #map.`);
    return;
  }
  if (window.google && window.google.maps) {
    console.log("🗺️ Google Maps API déjà chargée."), fi.initMap();
    return;
  }
  console.log("🗺️ Chargement de l'API Google Maps...");
  const e = document.createElement("script");
  e.src = `https://maps.googleapis.com/maps/api/js?key=${t}&libraries=places,marker&callback=initGoogleMap`, e.async = !0, document.head.appendChild(e);
}
console.log("🔍 main_gsap.js - Module chargé et exécution commencée");
console.log("📦 main_gsap.js - Début du chargement");
function Us() {
  document.querySelectorAll(".desktop_menu_wrapper, .parc_menu_desktop, .activites_menu_desktop, .offres_menu_desktop, .menu-mobile").forEach((o) => {
    o && o.classList.add("is-hidden");
  });
}
async function Vs() {
  console.log("🎬 Début de l'initialisation des modules");
  try {
    Us(), console.log("✅ États initiaux définis via classes CSS");
    const o = await ms(), t = [
      Os(),
      Ps(),
      zs(),
      qs(),
      Jr(),
      Ns(),
      Bs()
    ];
    if (await Promise.all(t), console.log("✨ Tous les modules ont été initialisés"), document.getElementById("container-initial")) {
      console.log("🏝️ Page de réservation détectée, chargement du module...");
      try {
        const { SmileWorldReservation: i } = await import("./reservation-vjeM8q8r.mjs");
        new i(), console.log("✅ Module de réservation chargé et initialisé.");
      } catch (i) {
        console.error("❌ Erreur lors du chargement du module de réservation:", i);
      }
    }
    o && gs();
  } catch (o) {
    console.error("❌ Erreur fatale lors de l'initialisation:", o), ys();
  }
}
window.Webflow = window.Webflow || [];
window.Webflow.push(Vs);
export {
  L as g
};
