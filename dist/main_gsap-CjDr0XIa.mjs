function yt(o) {
  if (o === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return o;
}
function Ki(o, t) {
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
}, Kt = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, li, X, R, ut = 1e8, M = 1 / ut, Ge = Math.PI * 2, Hr = Ge / 4, Qr = 0, Zi = Math.sqrt, Jr = Math.cos, tn = Math.sin, Y = function(t) {
  return typeof t == "string";
}, F = function(t) {
  return typeof t == "function";
}, xt = function(t) {
  return typeof t == "number";
}, fi = function(t) {
  return typeof t > "u";
}, mt = function(t) {
  return typeof t == "object";
}, Z = function(t) {
  return t !== !1;
}, ci = function() {
  return typeof window < "u";
}, xe = function(t) {
  return F(t) || Y(t);
}, Hi = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, j = Array.isArray, Xe = /(?:-?\.?\d|\.)+/gi, Qi = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Yt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Fe = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Ji = /[+-]=-?[.\d]+/, tr = /[^,'"\[\]\s]+/gi, en = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, L, ht, $e, hi, st = {}, ke = {}, er, ir = function(t) {
  return (ke = Zt(t, st)) && tt;
}, _i = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, fe = function(t, e) {
  return !e && console.warn(t);
}, rr = function(t, e) {
  return t && (st[t] = e) && ke && (ke[t] = e) || st;
}, ce = function() {
  return 0;
}, rn = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Te = {
  suppressEvents: !0,
  kill: !1
}, nn = {
  suppressEvents: !0
}, di = {}, Ot = [], je = {}, nr, et = {}, Ie = {}, Ai = 30, be = [], pi = "", mi = function(t) {
  var e = t[0], i, r;
  if (mt(e) || F(e) || (t = [t]), !(i = (e._gsap || {}).harness)) {
    for (r = be.length; r-- && !be[r].targetTest(e); )
      ;
    i = be[r];
  }
  for (r = t.length; r--; )
    t[r] && (t[r]._gsap || (t[r]._gsap = new Cr(t[r], i))) || t.splice(r, 1);
  return t;
}, It = function(t) {
  return t._gsap || mi(lt(t))[0]._gsap;
}, sr = function(t, e, i) {
  return (i = t[e]) && F(i) ? t[e]() : fi(i) && t.getAttribute && t.getAttribute(e) || i;
}, H = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, I = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, B = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, Xt = function(t, e) {
  var i = e.charAt(0), r = parseFloat(e.substr(2));
  return t = parseFloat(t), i === "+" ? t + r : i === "-" ? t - r : i === "*" ? t * r : t / r;
}, sn = function(t, e) {
  for (var i = e.length, r = 0; t.indexOf(e[r]) < 0 && ++r < i; )
    ;
  return r < i;
}, Pe = function() {
  var t = Ot.length, e = Ot.slice(0), i, r;
  for (je = {}, Ot.length = 0, i = 0; i < t; i++)
    r = e[i], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, gi = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, or = function(t, e, i, r) {
  Ot.length && !X && Pe(), t.render(e, i, !!(X && e < 0 && gi(t))), Ot.length && !X && Pe();
}, ar = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(tr).length < 2 ? e : Y(t) ? t.trim() : t;
}, ur = function(t) {
  return t;
}, ot = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, on = function(t) {
  return function(e, i) {
    for (var r in i)
      r in e || r === "duration" && t || r === "ease" || (e[r] = i[r]);
  };
}, Zt = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, Di = function o(t, e) {
  for (var i in e)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (t[i] = mt(e[i]) ? o(t[i] || (t[i] = {}), e[i]) : e[i]);
  return t;
}, Ce = function(t, e) {
  var i = {}, r;
  for (r in t)
    r in e || (i[r] = t[r]);
  return i;
}, ae = function(t) {
  var e = t.parent || L, i = t.keyframes ? on(j(t.keyframes)) : ot;
  if (Z(t.inherit))
    for (; e; )
      i(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, an = function(t, e) {
  for (var i = t.length, r = i === e.length; r && i-- && t[i] === e[i]; )
    ;
  return i < 0;
}, lr = function(t, e, i, r, n) {
  var s = t[r], a;
  if (n)
    for (a = e[n]; s && s[n] > a; )
      s = s._prev;
  return s ? (e._next = s._next, s._next = e) : (e._next = t[i], t[i] = e), e._next ? e._next._prev = e : t[r] = e, e._prev = s, e.parent = e._dp = t, e;
}, Re = function(t, e, i, r) {
  i === void 0 && (i = "_first"), r === void 0 && (r = "_last");
  var n = e._prev, s = e._next;
  n ? n._next = s : t[i] === e && (t[i] = s), s ? s._prev = n : t[r] === e && (t[r] = n), e._next = e._prev = e.parent = null;
}, Ct = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, qt = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var i = t; i; )
      i._dirty = 1, i = i.parent;
  return t;
}, un = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, Ke = function(t, e, i, r) {
  return t._startAt && (X ? t._startAt.revert(Te) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, r));
}, ln = function o(t) {
  return !t || t._ts && o(t.parent);
}, Ri = function(t) {
  return t._repeat ? Ht(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, Ht = function(t, e) {
  var i = Math.floor(t = B(t / e));
  return t && i === t ? i - 1 : i;
}, Me = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, Le = function(t) {
  return t._end = B(t._start + (t._tDur / Math.abs(t._ts || t._rts || M) || 0));
}, ze = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = B(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Le(t), i._dirty || qt(i, t)), t;
}, fr = function(t, e) {
  var i;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = Me(t.rawTime(), e), (!e._dur || ye(0, e.totalDuration(), i) - e._tTime > M) && e.render(i, !0)), qt(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (i = t; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -M;
  }
}, dt = function(t, e, i, r) {
  return e.parent && Ct(e), e._start = B((xt(i) ? i : i || t !== L ? at(t, i, e) : t._time) + e._delay), e._end = B(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), lr(t, e, "_first", "_last", t._sort ? "_start" : 0), Ze(e) || (t._recent = e), r || fr(t, e), t._ts < 0 && ze(t, t._tTime), t;
}, cr = function(t, e) {
  return (st.ScrollTrigger || _i("scrollTrigger", e)) && st.ScrollTrigger.create(e, t);
}, hr = function(t, e, i, r, n) {
  if (vi(t, e, n), !t._initted)
    return 1;
  if (!i && t._pt && !X && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && nr !== it.frame)
    return Ot.push(t), t._lazy = [n, r], 1;
}, fn = function o(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || o(e));
}, Ze = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, cn = function(t, e, i, r) {
  var n = t.ratio, s = e < 0 || !e && (!t._start && fn(t) && !(!t._initted && Ze(t)) || (t._ts < 0 || t._dp._ts < 0) && !Ze(t)) ? 0 : 1, a = t._rDelay, u = 0, l, f, h;
  if (a && t._repeat && (u = ye(0, t._tDur, e), f = Ht(u, a), t._yoyo && f & 1 && (s = 1 - s), f !== Ht(t._tTime, a) && (n = 1 - s, t.vars.repeatRefresh && t._initted && t.invalidate())), s !== n || X || r || t._zTime === M || !e && t._zTime) {
    if (!t._initted && hr(t, e, r, i, u))
      return;
    for (h = t._zTime, t._zTime = e || (i ? M : 0), i || (i = e && !h), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = u, l = t._pt; l; )
      l.r(s, l.d), l = l._next;
    e < 0 && Ke(t, e, i, !0), t._onUpdate && !i && rt(t, "onUpdate"), u && t._repeat && !i && t.parent && rt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === s && (s && Ct(t, 1), !i && !X && (rt(t, s ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, hn = function(t, e, i) {
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
}, Qt = function(t, e, i, r) {
  var n = t._repeat, s = B(e) || 0, a = t._tTime / t._tDur;
  return a && !r && (t._time *= s / t._dur), t._dur = s, t._tDur = n ? n < 0 ? 1e10 : B(s * (n + 1) + t._rDelay * n) : s, a > 0 && !r && ze(t, t._tTime = t._tDur * a), t.parent && Le(t), i || qt(t.parent, t), t;
}, Li = function(t) {
  return t instanceof K ? qt(t) : Qt(t, t._dur);
}, _n = {
  _start: 0,
  endTime: ce,
  totalDuration: ce
}, at = function o(t, e, i) {
  var r = t.labels, n = t._recent || _n, s = t.duration() >= ut ? n.endTime(!1) : t._dur, a, u, l;
  return Y(e) && (isNaN(e) || e in r) ? (u = e.charAt(0), l = e.substr(-1) === "%", a = e.indexOf("="), u === "<" || u === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (u === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (l ? (a < 0 ? n : i).totalDuration() / 100 : 1)) : a < 0 ? (e in r || (r[e] = s), r[e]) : (u = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), l && i && (u = u / 100 * (j(i) ? i[0] : i).totalDuration()), a > 1 ? o(t, e.substr(0, a - 1), i) + u : s + u)) : e == null ? s : +e;
}, ue = function(t, e, i) {
  var r = xt(e[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), s = e[n], a, u;
  if (r && (s.duration = e[1]), s.parent = i, t) {
    for (a = s, u = i; u && !("immediateRender" in a); )
      a = u.vars.defaults || {}, u = Z(u.vars.inherit) && u.parent;
    s.immediateRender = Z(a.immediateRender), t < 2 ? s.runBackwards = 1 : s.startAt = e[n - 1];
  }
  return new U(e[0], s, e[n + 1]);
}, Et = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, ye = function(t, e, i) {
  return i < t ? t : i > e ? e : i;
}, $ = function(t, e) {
  return !Y(t) || !(e = en.exec(t)) ? "" : e[1];
}, dn = function(t, e, i) {
  return Et(i, function(r) {
    return ye(t, e, r);
  });
}, He = [].slice, _r = function(t, e) {
  return t && mt(t) && "length" in t && (!e && !t.length || t.length - 1 in t && mt(t[0])) && !t.nodeType && t !== ht;
}, pn = function(t, e, i) {
  return i === void 0 && (i = []), t.forEach(function(r) {
    var n;
    return Y(r) && !e || _r(r, 1) ? (n = i).push.apply(n, lt(r)) : i.push(r);
  }) || i;
}, lt = function(t, e, i) {
  return R && !e && R.selector ? R.selector(t) : Y(t) && !i && ($e || !Jt()) ? He.call((e || hi).querySelectorAll(t), 0) : j(t) ? pn(t, i) : _r(t) ? He.call(t, 0) : t ? [t] : [];
}, Qe = function(t) {
  return t = lt(t)[0] || fe("Invalid scope") || {}, function(e) {
    var i = t.current || t.nativeElement || t;
    return lt(e, i.querySelectorAll ? i : i === t ? fe("Invalid scope") || hi.createElement("div") : t);
  };
}, dr = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, pr = function(t) {
  if (F(t))
    return t;
  var e = mt(t) ? t : {
    each: t
  }, i = Nt(e.ease), r = e.from || 0, n = parseFloat(e.base) || 0, s = {}, a = r > 0 && r < 1, u = isNaN(r) || a, l = e.axis, f = r, h = r;
  return Y(r) ? f = h = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !a && u && (f = r[0], h = r[1]), function(_, d, p) {
    var c = (p || e).length, m = s[c], y, v, x, w, g, b, S, O, T;
    if (!m) {
      if (T = e.grid === "auto" ? 0 : (e.grid || [1, ut])[1], !T) {
        for (S = -ut; S < (S = p[T++].getBoundingClientRect().left) && T < c; )
          ;
        T < c && T--;
      }
      for (m = s[c] = [], y = u ? Math.min(T, c) * f - 0.5 : r % T, v = T === ut ? 0 : u ? c * h / T - 0.5 : r / T | 0, S = 0, O = ut, b = 0; b < c; b++)
        x = b % T - y, w = v - (b / T | 0), m[b] = g = l ? Math.abs(l === "y" ? w : x) : Zi(x * x + w * w), g > S && (S = g), g < O && (O = g);
      r === "random" && dr(m), m.max = S - O, m.min = O, m.v = c = (parseFloat(e.amount) || parseFloat(e.each) * (T > c ? c - 1 : l ? l === "y" ? c / T : T : Math.max(T, c / T)) || 0) * (r === "edges" ? -1 : 1), m.b = c < 0 ? n - c : n, m.u = $(e.amount || e.each) || 0, i = i && c < 0 ? Or(i) : i;
    }
    return c = (m[_] - m.min) / m.max || 0, B(m.b + (i ? i(c) : c) * m.v) + m.u;
  };
}, Je = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(i) {
    var r = B(Math.round(parseFloat(i) / t) * t * e);
    return (r - r % 1) / e + (xt(i) ? 0 : $(i));
  };
}, mr = function(t, e) {
  var i = j(t), r, n;
  return !i && mt(t) && (r = i = t.radius || ut, t.values ? (t = lt(t.values), (n = !xt(t[0])) && (r *= r)) : t = Je(t.increment)), Et(e, i ? F(t) ? function(s) {
    return n = t(s), Math.abs(n - s) <= r ? n : s;
  } : function(s) {
    for (var a = parseFloat(n ? s.x : s), u = parseFloat(n ? s.y : 0), l = ut, f = 0, h = t.length, _, d; h--; )
      n ? (_ = t[h].x - a, d = t[h].y - u, _ = _ * _ + d * d) : _ = Math.abs(t[h] - a), _ < l && (l = _, f = h);
    return f = !r || l <= r ? t[f] : s, n || f === s || xt(s) ? f : f + $(s);
  } : Je(t));
}, gr = function(t, e, i, r) {
  return Et(j(t) ? !e : i === !0 ? !!(i = 0) : !r, function() {
    return j(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + i * 0.99)) / i) * i * r) / r;
  });
}, mn = function() {
  for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
    e[i] = arguments[i];
  return function(r) {
    return e.reduce(function(n, s) {
      return s(n);
    }, r);
  };
}, gn = function(t, e) {
  return function(i) {
    return t(parseFloat(i)) + (e || $(i));
  };
}, yn = function(t, e, i) {
  return vr(t, e, 0, 1, i);
}, yr = function(t, e, i) {
  return Et(i, function(r) {
    return t[~~e(r)];
  });
}, vn = function o(t, e, i) {
  var r = e - t;
  return j(t) ? yr(t, o(0, t.length), e) : Et(i, function(n) {
    return (r + (n - t) % r) % r + t;
  });
}, xn = function o(t, e, i) {
  var r = e - t, n = r * 2;
  return j(t) ? yr(t, o(0, t.length - 1), e) : Et(i, function(s) {
    return s = (n + (s - t) % n) % n || 0, t + (s > r ? n - s : s);
  });
}, he = function(t) {
  for (var e = 0, i = "", r, n, s, a; ~(r = t.indexOf("random(", e)); )
    s = t.indexOf(")", r), a = t.charAt(r + 7) === "[", n = t.substr(r + 7, s - r - 7).match(a ? tr : Xe), i += t.substr(e, r - e) + gr(a ? n : +n[0], a ? 0 : +n[1], +n[2] || 1e-5), e = s + 1;
  return i + t.substr(e, t.length - e);
}, vr = function(t, e, i, r, n) {
  var s = e - t, a = r - i;
  return Et(n, function(u) {
    return i + ((u - t) / s * a || 0);
  });
}, wn = function o(t, e, i, r) {
  var n = isNaN(t + e) ? 0 : function(d) {
    return (1 - d) * t + d * e;
  };
  if (!n) {
    var s = Y(t), a = {}, u, l, f, h, _;
    if (i === !0 && (r = 1) && (i = null), s)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (j(t) && !j(e)) {
      for (f = [], h = t.length, _ = h - 2, l = 1; l < h; l++)
        f.push(o(t[l - 1], t[l]));
      h--, n = function(p) {
        p *= h;
        var c = Math.min(_, ~~p);
        return f[c](p - c);
      }, i = e;
    } else r || (t = Zt(j(t) ? [] : {}, t));
    if (!f) {
      for (u in e)
        yi.call(a, t, u, "get", e[u]);
      n = function(p) {
        return Ti(p, a) || (s ? t.p : t);
      };
    }
  }
  return Et(i, n);
}, zi = function(t, e, i) {
  var r = t.labels, n = ut, s, a, u;
  for (s in r)
    a = r[s] - e, a < 0 == !!i && a && n > (a = Math.abs(a)) && (u = s, n = a);
  return u;
}, rt = function(t, e, i) {
  var r = t.vars, n = r[e], s = R, a = t._ctx, u, l, f;
  if (n)
    return u = r[e + "Params"], l = r.callbackScope || t, i && Ot.length && Pe(), a && (R = a), f = u ? n.apply(l, u) : n.call(l), R = s, f;
}, ne = function(t) {
  return Ct(t), t.scrollTrigger && t.scrollTrigger.kill(!!X), t.progress() < 1 && rt(t, "onInterrupt"), t;
}, Gt, xr = [], wr = function(t) {
  if (t)
    if (t = !t.name && t.default || t, ci() || t.headless) {
      var e = t.name, i = F(t), r = e && !i && t.init ? function() {
        this._props = [];
      } : t, n = {
        init: ce,
        render: Ti,
        add: yi,
        kill: In,
        modifier: Fn,
        rawVars: 0
      }, s = {
        targetTest: 0,
        get: 0,
        getSetter: wi,
        aliases: {},
        register: 0
      };
      if (Jt(), t !== r) {
        if (et[e])
          return;
        ot(r, ot(Ce(t, n), s)), Zt(r.prototype, Zt(n, Ce(t, s))), et[r.prop = e] = r, t.targetTest && (be.push(r), di[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      rr(e, r), t.register && t.register(tt, r, Q);
    } else
      xr.push(t);
}, C = 255, se = {
  aqua: [0, C, C],
  lime: [0, C, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, C],
  navy: [0, 0, 128],
  white: [C, C, C],
  olive: [128, 128, 0],
  yellow: [C, C, 0],
  orange: [C, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [C, 0, 0],
  pink: [C, 192, 203],
  cyan: [0, C, C],
  transparent: [C, C, C, 0]
}, qe = function(t, e, i) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : t * 3 < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * C + 0.5 | 0;
}, Tr = function(t, e, i) {
  var r = t ? xt(t) ? [t >> 16, t >> 8 & C, t & C] : 0 : se.black, n, s, a, u, l, f, h, _, d, p;
  if (!r) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), se[t])
      r = se[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (n = t.charAt(1), s = t.charAt(2), a = t.charAt(3), t = "#" + n + n + s + s + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return r = parseInt(t.substr(1, 6), 16), [r >> 16, r >> 8 & C, r & C, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), r = [t >> 16, t >> 8 & C, t & C];
    } else if (t.substr(0, 3) === "hsl") {
      if (r = p = t.match(Xe), !e)
        u = +r[0] % 360 / 360, l = +r[1] / 100, f = +r[2] / 100, s = f <= 0.5 ? f * (l + 1) : f + l - f * l, n = f * 2 - s, r.length > 3 && (r[3] *= 1), r[0] = qe(u + 1 / 3, n, s), r[1] = qe(u, n, s), r[2] = qe(u - 1 / 3, n, s);
      else if (~t.indexOf("="))
        return r = t.match(Qi), i && r.length < 4 && (r[3] = 1), r;
    } else
      r = t.match(Xe) || se.transparent;
    r = r.map(Number);
  }
  return e && !p && (n = r[0] / C, s = r[1] / C, a = r[2] / C, h = Math.max(n, s, a), _ = Math.min(n, s, a), f = (h + _) / 2, h === _ ? u = l = 0 : (d = h - _, l = f > 0.5 ? d / (2 - h - _) : d / (h + _), u = h === n ? (s - a) / d + (s < a ? 6 : 0) : h === s ? (a - n) / d + 2 : (n - s) / d + 4, u *= 60), r[0] = ~~(u + 0.5), r[1] = ~~(l * 100 + 0.5), r[2] = ~~(f * 100 + 0.5)), i && r.length < 4 && (r[3] = 1), r;
}, br = function(t) {
  var e = [], i = [], r = -1;
  return t.split(kt).forEach(function(n) {
    var s = n.match(Yt) || [];
    e.push.apply(e, s), i.push(r += s.length + 1);
  }), e.c = i, e;
}, Fi = function(t, e, i) {
  var r = "", n = (t + r).match(kt), s = e ? "hsla(" : "rgba(", a = 0, u, l, f, h;
  if (!n)
    return t;
  if (n = n.map(function(_) {
    return (_ = Tr(_, e, 1)) && s + (e ? _[0] + "," + _[1] + "%," + _[2] + "%," + _[3] : _.join(",")) + ")";
  }), i && (f = br(t), u = i.c, u.join(r) !== f.c.join(r)))
    for (l = t.replace(kt, "1").split(Yt), h = l.length - 1; a < h; a++)
      r += l[a] + (~u.indexOf(a) ? n.shift() || s + "0,0,0,0)" : (f.length ? f : n.length ? n : i).shift());
  if (!l)
    for (l = t.split(kt), h = l.length - 1; a < h; a++)
      r += l[a] + n[a];
  return r + l[h];
}, kt = function() {
  var o = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in se)
    o += "|" + t + "\\b";
  return new RegExp(o + ")", "gi");
}(), Tn = /hsl[a]?\(/, Sr = function(t) {
  var e = t.join(" "), i;
  if (kt.lastIndex = 0, kt.test(e))
    return i = Tn.test(e), t[1] = Fi(t[1], i), t[0] = Fi(t[0], i, br(t[1])), !0;
}, _e, it = function() {
  var o = Date.now, t = 500, e = 33, i = o(), r = i, n = 1e3 / 240, s = n, a = [], u, l, f, h, _, d, p = function c(m) {
    var y = o() - r, v = m === !0, x, w, g, b;
    if ((y > t || y < 0) && (i += y - e), r += y, g = r - i, x = g - s, (x > 0 || v) && (b = ++h.frame, _ = g - h.time * 1e3, h.time = g = g / 1e3, s += x + (x >= n ? 4 : n - x), w = 1), v || (u = l(c)), w)
      for (d = 0; d < a.length; d++)
        a[d](g, _, b, m);
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
      er && (!$e && ci() && (ht = $e = window, hi = ht.document || {}, st.gsap = tt, (ht.gsapVersions || (ht.gsapVersions = [])).push(tt.version), ir(ke || ht.GreenSockGlobals || !ht.gsap && ht || {}), xr.forEach(wr)), f = typeof requestAnimationFrame < "u" && requestAnimationFrame, u && h.sleep(), l = f || function(m) {
        return setTimeout(m, s - h.time * 1e3 + 1 | 0);
      }, _e = 1, p(2));
    },
    sleep: function() {
      (f ? cancelAnimationFrame : clearTimeout)(u), _e = 0, l = ce;
    },
    lagSmoothing: function(m, y) {
      t = m || 1 / 0, e = Math.min(y || 33, t);
    },
    fps: function(m) {
      n = 1e3 / (m || 240), s = h.time * 1e3 + n;
    },
    add: function(m, y, v) {
      var x = y ? function(w, g, b, S) {
        m(w, g, b, S), h.remove(x);
      } : m;
      return h.remove(m), a[v ? "unshift" : "push"](x), Jt(), x;
    },
    remove: function(m, y) {
      ~(y = a.indexOf(m)) && a.splice(y, 1) && d >= y && d--;
    },
    _listeners: a
  }, h;
}(), Jt = function() {
  return !_e && it.wake();
}, k = {}, bn = /^[\d.\-M][\d.\-,\s]/, Sn = /["']/g, On = function(t) {
  for (var e = {}, i = t.substr(1, t.length - 3).split(":"), r = i[0], n = 1, s = i.length, a, u, l; n < s; n++)
    u = i[n], a = n !== s - 1 ? u.lastIndexOf(",") : u.length, l = u.substr(0, a), e[r] = isNaN(l) ? l.replace(Sn, "").trim() : +l, r = u.substr(a + 1).trim();
  return e;
}, kn = function(t) {
  var e = t.indexOf("(") + 1, i = t.indexOf(")"), r = t.indexOf("(", e);
  return t.substring(e, ~r && r < i ? t.indexOf(")", i + 1) : i);
}, Pn = function(t) {
  var e = (t + "").split("("), i = k[e[0]];
  return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [On(e[1])] : kn(t).split(",").map(ar)) : k._CE && bn.test(t) ? k._CE("", t) : i;
}, Or = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, kr = function o(t, e) {
  for (var i = t._first, r; i; )
    i instanceof K ? o(i, e) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== e && (i.timeline ? o(i.timeline, e) : (r = i._ease, i._ease = i._yEase, i._yEase = r, i._yoyo = e)), i = i._next;
}, Nt = function(t, e) {
  return t && (F(t) ? t : k[t] || Pn(t)) || e;
}, Vt = function(t, e, i, r) {
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
  return H(t, function(a) {
    k[a] = st[a] = n, k[s = a.toLowerCase()] = i;
    for (var u in n)
      k[s + (u === "easeIn" ? ".in" : u === "easeOut" ? ".out" : ".inOut")] = k[a + "." + u] = n[u];
  }), n;
}, Pr = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, Ne = function o(t, e, i) {
  var r = e >= 1 ? e : 1, n = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), s = n / Ge * (Math.asin(1 / r) || 0), a = function(f) {
    return f === 1 ? 1 : r * Math.pow(2, -10 * f) * tn((f - s) * n) + 1;
  }, u = t === "out" ? a : t === "in" ? function(l) {
    return 1 - a(1 - l);
  } : Pr(a);
  return n = Ge / n, u.config = function(l, f) {
    return o(t, l, f);
  }, u;
}, Ue = function o(t, e) {
  e === void 0 && (e = 1.70158);
  var i = function(s) {
    return s ? --s * s * ((e + 1) * s + e) + 1 : 0;
  }, r = t === "out" ? i : t === "in" ? function(n) {
    return 1 - i(1 - n);
  } : Pr(i);
  return r.config = function(n) {
    return o(t, n);
  }, r;
};
H("Linear,Quad,Cubic,Quart,Quint,Strong", function(o, t) {
  var e = t < 5 ? t + 1 : t;
  Vt(o + ",Power" + (e - 1), t ? function(i) {
    return Math.pow(i, e);
  } : function(i) {
    return i;
  }, function(i) {
    return 1 - Math.pow(1 - i, e);
  }, function(i) {
    return i < 0.5 ? Math.pow(i * 2, e) / 2 : 1 - Math.pow((1 - i) * 2, e) / 2;
  });
});
k.Linear.easeNone = k.none = k.Linear.easeIn;
Vt("Elastic", Ne("in"), Ne("out"), Ne());
(function(o, t) {
  var e = 1 / t, i = 2 * e, r = 2.5 * e, n = function(a) {
    return a < e ? o * a * a : a < i ? o * Math.pow(a - 1.5 / t, 2) + 0.75 : a < r ? o * (a -= 2.25 / t) * a + 0.9375 : o * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  Vt("Bounce", function(s) {
    return 1 - n(1 - s);
  }, n);
})(7.5625, 2.75);
Vt("Expo", function(o) {
  return Math.pow(2, 10 * (o - 1)) * o + o * o * o * o * o * o * (1 - o);
});
Vt("Circ", function(o) {
  return -(Zi(1 - o * o) - 1);
});
Vt("Sine", function(o) {
  return o === 1 ? 1 : -Jr(o * Hr) + 1;
});
Vt("Back", Ue("in"), Ue("out"), Ue());
k.SteppedEase = k.steps = st.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var i = 1 / t, r = t + (e ? 0 : 1), n = e ? 1 : 0, s = 1 - M;
    return function(a) {
      return ((r * ye(0, s, a) | 0) + n) * i;
    };
  }
};
Kt.ease = k["quad.out"];
H("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(o) {
  return pi += o + "," + o + "Params,";
});
var Cr = function(t, e) {
  this.id = Qr++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : sr, this.set = e ? e.getSetter : wi;
}, de = /* @__PURE__ */ function() {
  function o(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, Qt(this, +e.duration, 1, 1), this.data = e.data, R && (this._ctx = R, R.data.push(this)), _e || it.wake();
  }
  var t = o.prototype;
  return t.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, t.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, Qt(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(i, r) {
    if (Jt(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (ze(this, i), !n._dp || n.parent || fr(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && dt(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !r || this._initted && Math.abs(this._zTime) === M || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), or(this, i, r)), this;
  }, t.time = function(i, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + Ri(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), r) : this._time;
  }, t.totalProgress = function(i, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(i, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + Ri(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(i, r) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * n, r) : this._repeat ? Ht(this._tTime, n) + 1 : 1;
  }, t.timeScale = function(i, r) {
    if (!arguments.length)
      return this._rts === -M ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var n = this.parent && this._ts ? Me(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -M ? 0 : this._rts, this.totalTime(ye(-Math.abs(this._delay), this.totalDuration(), n), r !== !1), Le(this), un(this);
  }, t.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Jt(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== M && (this._tTime -= M)))), this) : this._ps;
  }, t.startTime = function(i) {
    if (arguments.length) {
      this._start = i;
      var r = this.parent || this._dp;
      return r && (r._sort || !this.parent) && dt(r, this, i - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(i) {
    return this._start + (Z(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(i) {
    var r = this.parent || this._dp;
    return r ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Me(r.rawTime(i), this) : this._tTime : this._tTime;
  }, t.revert = function(i) {
    i === void 0 && (i = nn);
    var r = X;
    return X = i, gi(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), X = r, this;
  }, t.globalTime = function(i) {
    for (var r = this, n = arguments.length ? i : r.rawTime(); r; )
      n = r._start + n / (Math.abs(r._ts) || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : n;
  }, t.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, Li(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(i) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = i, Li(this), r ? this.time(r) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, t.seek = function(i, r) {
    return this.totalTime(at(this, i), Z(r));
  }, t.restart = function(i, r) {
    return this.play().totalTime(i ? -this._delay : 0, Z(r)), this._dur || (this._zTime = -M), this;
  }, t.play = function(i, r) {
    return i != null && this.seek(i, r), this.reversed(!1).paused(!1);
  }, t.reverse = function(i, r) {
    return i != null && this.seek(i || this.totalDuration(), r), this.reversed(!0).paused(!1);
  }, t.pause = function(i, r) {
    return i != null && this.seek(i, r), this.paused(!0);
  }, t.resume = function() {
    return this.paused(!1);
  }, t.reversed = function(i) {
    return arguments.length ? (!!i !== this.reversed() && this.timeScale(-this._rts || (i ? -M : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -M, this;
  }, t.isActive = function() {
    var i = this.parent || this._dp, r = this._start, n;
    return !!(!i || this._ts && this._initted && i.isActive() && (n = i.rawTime(!0)) >= r && n < this.endTime(!0) - M);
  }, t.eventCallback = function(i, r, n) {
    var s = this.vars;
    return arguments.length > 1 ? (r ? (s[i] = r, n && (s[i + "Params"] = n), i === "onUpdate" && (this._onUpdate = r)) : delete s[i], this) : s[i];
  }, t.then = function(i) {
    var r = this;
    return new Promise(function(n) {
      var s = F(i) ? i : ur, a = function() {
        var l = r.then;
        r.then = null, F(s) && (s = s(r)) && (s.then || s === r) && (r.then = l), n(s), r.then = l;
      };
      r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? a() : r._prom = a;
    });
  }, t.kill = function() {
    ne(this);
  }, o;
}();
ot(de.prototype, {
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
  _zTime: -M,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var K = /* @__PURE__ */ function(o) {
  Ki(t, o);
  function t(i, r) {
    var n;
    return i === void 0 && (i = {}), n = o.call(this, i) || this, n.labels = {}, n.smoothChildTiming = !!i.smoothChildTiming, n.autoRemoveChildren = !!i.autoRemoveChildren, n._sort = Z(i.sortChildren), L && dt(i.parent || L, yt(n), r), i.reversed && n.reverse(), i.paused && n.paused(!0), i.scrollTrigger && cr(yt(n), i.scrollTrigger), n;
  }
  var e = t.prototype;
  return e.to = function(r, n, s) {
    return ue(0, arguments, this), this;
  }, e.from = function(r, n, s) {
    return ue(1, arguments, this), this;
  }, e.fromTo = function(r, n, s, a) {
    return ue(2, arguments, this), this;
  }, e.set = function(r, n, s) {
    return n.duration = 0, n.parent = this, ae(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new U(r, n, at(this, s), 1), this;
  }, e.call = function(r, n, s) {
    return dt(this, U.delayedCall(0, r, n), s);
  }, e.staggerTo = function(r, n, s, a, u, l, f) {
    return s.duration = n, s.stagger = s.stagger || a, s.onComplete = l, s.onCompleteParams = f, s.parent = this, new U(r, s, at(this, u)), this;
  }, e.staggerFrom = function(r, n, s, a, u, l, f) {
    return s.runBackwards = 1, ae(s).immediateRender = Z(s.immediateRender), this.staggerTo(r, n, s, a, u, l, f);
  }, e.staggerFromTo = function(r, n, s, a, u, l, f, h) {
    return a.startAt = s, ae(a).immediateRender = Z(a.immediateRender), this.staggerTo(r, n, a, u, l, f, h);
  }, e.render = function(r, n, s) {
    var a = this._time, u = this._dirty ? this.totalDuration() : this._tDur, l = this._dur, f = r <= 0 ? 0 : B(r), h = this._zTime < 0 != r < 0 && (this._initted || !l), _, d, p, c, m, y, v, x, w, g, b, S;
    if (this !== L && f > u && r >= 0 && (f = u), f !== this._tTime || s || h) {
      if (a !== this._time && l && (f += this._time - a, r += this._time - a), _ = f, w = this._start, x = this._ts, y = !x, h && (l || (a = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (b = this._yoyo, m = l + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(m * 100 + r, n, s);
        if (_ = B(f % m), f === u ? (c = this._repeat, _ = l) : (g = B(f / m), c = ~~g, c && c === g && (_ = l, c--), _ > l && (_ = l)), g = Ht(this._tTime, m), !a && this._tTime && g !== c && this._tTime - g * m - this._dur <= 0 && (g = c), b && c & 1 && (_ = l - _, S = 1), c !== g && !this._lock) {
          var O = b && g & 1, T = O === (b && c & 1);
          if (c < g && (O = !O), a = O ? 0 : f % l ? l : f, this._lock = 1, this.render(a || (S ? 0 : B(c * m)), n, !l)._lock = 0, this._tTime = f, !n && this.parent && rt(this, "onRepeat"), this.vars.repeatRefresh && !S && (this.invalidate()._lock = 1), a && a !== this._time || y !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (l = this._dur, u = this._tDur, T && (this._lock = 2, a = O ? l : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !S && this.invalidate()), this._lock = 0, !this._ts && !y)
            return this;
          kr(this, S);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (v = hn(this, B(a), B(_)), v && (f -= _ - (_ = v._start))), this._tTime = f, this._time = _, this._act = !x, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, a = 0), !a && f && !n && !g && (rt(this, "onStart"), this._tTime !== f))
        return this;
      if (_ >= a && r >= 0)
        for (d = this._first; d; ) {
          if (p = d._next, (d._act || _ >= d._start) && d._ts && v !== d) {
            if (d.parent !== this)
              return this.render(r, n, s);
            if (d.render(d._ts > 0 ? (_ - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (_ - d._start) * d._ts, n, s), _ !== this._time || !this._ts && !y) {
              v = 0, p && (f += this._zTime = -M);
              break;
            }
          }
          d = p;
        }
      else {
        d = this._last;
        for (var P = r < 0 ? r : _; d; ) {
          if (p = d._prev, (d._act || P <= d._end) && d._ts && v !== d) {
            if (d.parent !== this)
              return this.render(r, n, s);
            if (d.render(d._ts > 0 ? (P - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (P - d._start) * d._ts, n, s || X && gi(d)), _ !== this._time || !this._ts && !y) {
              v = 0, p && (f += this._zTime = P ? -M : M);
              break;
            }
          }
          d = p;
        }
      }
      if (v && !n && (this.pause(), v.render(_ >= a ? 0 : -M)._zTime = _ >= a ? 1 : -1, this._ts))
        return this._start = w, Le(this), this.render(r, n, s);
      this._onUpdate && !n && rt(this, "onUpdate", !0), (f === u && this._tTime >= this.totalDuration() || !f && a) && (w === this._start || Math.abs(x) !== Math.abs(this._ts)) && (this._lock || ((r || !l) && (f === u && this._ts > 0 || !f && this._ts < 0) && Ct(this, 1), !n && !(r < 0 && !a) && (f || a || !u) && (rt(this, f === u && r >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < u && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(r, n) {
    var s = this;
    if (xt(n) || (n = at(this, n, r)), !(r instanceof de)) {
      if (j(r))
        return r.forEach(function(a) {
          return s.add(a, n);
        }), this;
      if (Y(r))
        return this.addLabel(r, n);
      if (F(r))
        r = U.delayedCall(0, r);
      else
        return this;
    }
    return this !== r ? dt(this, r, n) : this;
  }, e.getChildren = function(r, n, s, a) {
    r === void 0 && (r = !0), n === void 0 && (n = !0), s === void 0 && (s = !0), a === void 0 && (a = -ut);
    for (var u = [], l = this._first; l; )
      l._start >= a && (l instanceof U ? n && u.push(l) : (s && u.push(l), r && u.push.apply(u, l.getChildren(!0, n, s)))), l = l._next;
    return u;
  }, e.getById = function(r) {
    for (var n = this.getChildren(1, 1, 1), s = n.length; s--; )
      if (n[s].vars.id === r)
        return n[s];
  }, e.remove = function(r) {
    return Y(r) ? this.removeLabel(r) : F(r) ? this.killTweensOf(r) : (r.parent === this && Re(this, r), r === this._recent && (this._recent = this._last), qt(this));
  }, e.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = B(it.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), o.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(r, n) {
    return this.labels[r] = at(this, n), this;
  }, e.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, e.addPause = function(r, n, s) {
    var a = U.delayedCall(0, n || ce, s);
    return a.data = "isPause", this._hasPause = 1, dt(this, a, at(this, r));
  }, e.removePause = function(r) {
    var n = this._first;
    for (r = at(this, r); n; )
      n._start === r && n.data === "isPause" && Ct(n), n = n._next;
  }, e.killTweensOf = function(r, n, s) {
    for (var a = this.getTweensOf(r, s), u = a.length; u--; )
      Tt !== a[u] && a[u].kill(r, n);
    return this;
  }, e.getTweensOf = function(r, n) {
    for (var s = [], a = lt(r), u = this._first, l = xt(n), f; u; )
      u instanceof U ? sn(u._targets, a) && (l ? (!Tt || u._initted && u._ts) && u.globalTime(0) <= n && u.globalTime(u.totalDuration()) > n : !n || u.isActive()) && s.push(u) : (f = u.getTweensOf(a, n)).length && s.push.apply(s, f), u = u._next;
    return s;
  }, e.tweenTo = function(r, n) {
    n = n || {};
    var s = this, a = at(s, r), u = n, l = u.startAt, f = u.onStart, h = u.onStartParams, _ = u.immediateRender, d, p = U.to(s, ot({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: n.duration || Math.abs((a - (l && "time" in l ? l.time : s._time)) / s.timeScale()) || M,
      onStart: function() {
        if (s.pause(), !d) {
          var m = n.duration || Math.abs((a - (l && "time" in l ? l.time : s._time)) / s.timeScale());
          p._dur !== m && Qt(p, m, 0, 1).render(p._time, !0, !0), d = 1;
        }
        f && f.apply(p, h || []);
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
    return r === void 0 && (r = this._time), zi(this, at(this, r));
  }, e.previousLabel = function(r) {
    return r === void 0 && (r = this._time), zi(this, at(this, r), 1);
  }, e.currentLabel = function(r) {
    return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + M);
  }, e.shiftChildren = function(r, n, s) {
    s === void 0 && (s = 0);
    for (var a = this._first, u = this.labels, l; a; )
      a._start >= s && (a._start += r, a._end += r), a = a._next;
    if (n)
      for (l in u)
        u[l] >= s && (u[l] += r);
    return qt(this);
  }, e.invalidate = function(r) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(r), n = n._next;
    return o.prototype.invalidate.call(this, r);
  }, e.clear = function(r) {
    r === void 0 && (r = !0);
    for (var n = this._first, s; n; )
      s = n._next, this.remove(n), n = s;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), qt(this);
  }, e.totalDuration = function(r) {
    var n = 0, s = this, a = s._last, u = ut, l, f, h;
    if (arguments.length)
      return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -r : r));
    if (s._dirty) {
      for (h = s.parent; a; )
        l = a._prev, a._dirty && a.totalDuration(), f = a._start, f > u && s._sort && a._ts && !s._lock ? (s._lock = 1, dt(s, a, f - a._delay, 1)._lock = 0) : u = f, f < 0 && a._ts && (n -= f, (!h && !s._dp || h && h.smoothChildTiming) && (s._start += f / s._ts, s._time -= f, s._tTime -= f), s.shiftChildren(-f, !1, -1 / 0), u = 0), a._end > n && a._ts && (n = a._end), a = l;
      Qt(s, s === L && s._time > n ? s._time : n, 1, 1), s._dirty = 0;
    }
    return s._tDur;
  }, t.updateRoot = function(r) {
    if (L._ts && (or(L, Me(r, L)), nr = it.frame), it.frame >= Ai) {
      Ai += nt.autoSleep || 120;
      var n = L._first;
      if ((!n || !n._ts) && nt.autoSleep && it._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || it.sleep();
      }
    }
  }, t;
}(de);
ot(K.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Cn = function(t, e, i, r, n, s, a) {
  var u = new Q(this._pt, t, e, 0, 1, Lr, null, n), l = 0, f = 0, h, _, d, p, c, m, y, v;
  for (u.b = i, u.e = r, i += "", r += "", (y = ~r.indexOf("random(")) && (r = he(r)), s && (v = [i, r], s(v, t, e), i = v[0], r = v[1]), _ = i.match(Fe) || []; h = Fe.exec(r); )
    p = h[0], c = r.substring(l, h.index), d ? d = (d + 1) % 5 : c.substr(-5) === "rgba(" && (d = 1), p !== _[f++] && (m = parseFloat(_[f - 1]) || 0, u._pt = {
      _next: u._pt,
      p: c || f === 1 ? c : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: m,
      c: p.charAt(1) === "=" ? Xt(m, p) - m : parseFloat(p) - m,
      m: d && d < 4 ? Math.round : 0
    }, l = Fe.lastIndex);
  return u.c = l < r.length ? r.substring(l, r.length) : "", u.fp = a, (Ji.test(r) || y) && (u.e = 0), this._pt = u, u;
}, yi = function(t, e, i, r, n, s, a, u, l, f) {
  F(r) && (r = r(n || 0, t, s));
  var h = t[e], _ = i !== "get" ? i : F(h) ? l ? t[e.indexOf("set") || !F(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l) : t[e]() : h, d = F(h) ? l ? Rn : Dr : xi, p;
  if (Y(r) && (~r.indexOf("random(") && (r = he(r)), r.charAt(1) === "=" && (p = Xt(_, r) + ($(_) || 0), (p || p === 0) && (r = p))), !f || _ !== r || ti)
    return !isNaN(_ * r) && r !== "" ? (p = new Q(this._pt, t, e, +_ || 0, r - (_ || 0), typeof h == "boolean" ? zn : Rr, 0, d), l && (p.fp = l), a && p.modifier(a, this, t), this._pt = p) : (!h && !(e in t) && _i(e, r), Cn.call(this, t, e, _, r, d, u || nt.stringFilter, l));
}, Mn = function(t, e, i, r, n) {
  if (F(t) && (t = le(t, n, e, i, r)), !mt(t) || t.style && t.nodeType || j(t) || Hi(t))
    return Y(t) ? le(t, n, e, i, r) : t;
  var s = {}, a;
  for (a in t)
    s[a] = le(t[a], n, e, i, r);
  return s;
}, Mr = function(t, e, i, r, n, s) {
  var a, u, l, f;
  if (et[t] && (a = new et[t]()).init(n, a.rawVars ? e[t] : Mn(e[t], r, n, s, i), i, r, s) !== !1 && (i._pt = u = new Q(i._pt, n, t, 0, 1, a.render, a, 0, a.priority), i !== Gt))
    for (l = i._ptLookup[i._targets.indexOf(n)], f = a._props.length; f--; )
      l[a._props[f]] = u;
  return a;
}, Tt, ti, vi = function o(t, e, i) {
  var r = t.vars, n = r.ease, s = r.startAt, a = r.immediateRender, u = r.lazy, l = r.onUpdate, f = r.runBackwards, h = r.yoyoEase, _ = r.keyframes, d = r.autoRevert, p = t._dur, c = t._startAt, m = t._targets, y = t.parent, v = y && y.data === "nested" ? y.vars.targets : m, x = t._overwrite === "auto" && !li, w = t.timeline, g, b, S, O, T, P, D, E, A, G, V, N, W;
  if (w && (!_ || !n) && (n = "none"), t._ease = Nt(n, Kt.ease), t._yEase = h ? Or(Nt(h === !0 ? n : h, Kt.ease)) : 0, h && t._yoyo && !t._repeat && (h = t._yEase, t._yEase = t._ease, t._ease = h), t._from = !w && !!r.runBackwards, !w || _ && !r.stagger) {
    if (E = m[0] ? It(m[0]).harness : 0, N = E && r[E.prop], g = Ce(r, di), c && (c._zTime < 0 && c.progress(1), e < 0 && f && a && !d ? c.render(-1, !0) : c.revert(f && p ? Te : rn), c._lazy = 0), s) {
      if (Ct(t._startAt = U.set(m, ot({
        data: "isStart",
        overwrite: !1,
        parent: y,
        immediateRender: !0,
        lazy: !c && Z(u),
        startAt: null,
        delay: 0,
        onUpdate: l && function() {
          return rt(t, "onUpdate");
        },
        stagger: 0
      }, s))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (X || !a && !d) && t._startAt.revert(Te), a && p && e <= 0 && i <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (f && p && !c) {
      if (e && (a = !1), S = ot({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !c && Z(u),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: y
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, g), N && (S[E.prop] = N), Ct(t._startAt = U.set(m, S)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (X ? t._startAt.revert(Te) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        o(t._startAt, M, M);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, u = p && Z(u) || u && !p, b = 0; b < m.length; b++) {
      if (T = m[b], D = T._gsap || mi(m)[b]._gsap, t._ptLookup[b] = G = {}, je[D.id] && Ot.length && Pe(), V = v === m ? b : v.indexOf(T), E && (A = new E()).init(T, N || g, t, V, v) !== !1 && (t._pt = O = new Q(t._pt, T, A.name, 0, 1, A.render, A, 0, A.priority), A._props.forEach(function(ct) {
        G[ct] = O;
      }), A.priority && (P = 1)), !E || N)
        for (S in g)
          et[S] && (A = Mr(S, g, t, V, T, v)) ? A.priority && (P = 1) : G[S] = O = yi.call(t, T, S, "get", g[S], V, v, 0, r.stringFilter);
      t._op && t._op[b] && t.kill(T, t._op[b]), x && t._pt && (Tt = t, L.killTweensOf(T, G, t.globalTime(e)), W = !t.parent, Tt = 0), t._pt && u && (je[D.id] = 1);
    }
    P && zr(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = l, t._initted = (!t._op || t._pt) && !W, _ && e <= 0 && w.render(ut, !0, !0);
}, En = function(t, e, i, r, n, s, a, u) {
  var l = (t._pt && t._ptCache || (t._ptCache = {}))[e], f, h, _, d;
  if (!l)
    for (l = t._ptCache[e] = [], _ = t._ptLookup, d = t._targets.length; d--; ) {
      if (f = _[d][e], f && f.d && f.d._pt)
        for (f = f.d._pt; f && f.p !== e && f.fp !== e; )
          f = f._next;
      if (!f)
        return ti = 1, t.vars[e] = "+=0", vi(t, a), ti = 0, u ? fe(e + " not eligible for reset") : 1;
      l.push(f);
    }
  for (d = l.length; d--; )
    h = l[d], f = h._pt || h, f.s = (r || r === 0) && !n ? r : f.s + (r || 0) + s * f.c, f.c = i - f.s, h.e && (h.e = I(i) + $(h.e)), h.b && (h.b = f.s + $(h.b));
}, An = function(t, e) {
  var i = t[0] ? It(t[0]).harness : 0, r = i && i.aliases, n, s, a, u;
  if (!r)
    return e;
  n = Zt({}, e);
  for (s in r)
    if (s in n)
      for (u = r[s].split(","), a = u.length; a--; )
        n[u[a]] = n[s];
  return n;
}, Dn = function(t, e, i, r) {
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
}, le = function(t, e, i, r, n) {
  return F(t) ? t.call(e, i, r, n) : Y(t) && ~t.indexOf("random(") ? he(t) : t;
}, Er = pi + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Ar = {};
H(Er + ",id,stagger,delay,duration,paused,scrollTrigger", function(o) {
  return Ar[o] = 1;
});
var U = /* @__PURE__ */ function(o) {
  Ki(t, o);
  function t(i, r, n, s) {
    var a;
    typeof r == "number" && (n.duration = r, r = n, n = null), a = o.call(this, s ? r : ae(r)) || this;
    var u = a.vars, l = u.duration, f = u.delay, h = u.immediateRender, _ = u.stagger, d = u.overwrite, p = u.keyframes, c = u.defaults, m = u.scrollTrigger, y = u.yoyoEase, v = r.parent || L, x = (j(i) || Hi(i) ? xt(i[0]) : "length" in r) ? [i] : lt(i), w, g, b, S, O, T, P, D;
    if (a._targets = x.length ? mi(x) : fe("GSAP target " + i + " not found. https://gsap.com", !nt.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = d, p || _ || xe(l) || xe(f)) {
      if (r = a.vars, w = a.timeline = new K({
        data: "nested",
        defaults: c || {},
        targets: v && v.data === "nested" ? v.vars.targets : x
      }), w.kill(), w.parent = w._dp = yt(a), w._start = 0, _ || xe(l) || xe(f)) {
        if (S = x.length, P = _ && pr(_), mt(_))
          for (O in _)
            ~Er.indexOf(O) && (D || (D = {}), D[O] = _[O]);
        for (g = 0; g < S; g++)
          b = Ce(r, Ar), b.stagger = 0, y && (b.yoyoEase = y), D && Zt(b, D), T = x[g], b.duration = +le(l, yt(a), g, T, x), b.delay = (+le(f, yt(a), g, T, x) || 0) - a._delay, !_ && S === 1 && b.delay && (a._delay = f = b.delay, a._start += f, b.delay = 0), w.to(T, b, P ? P(g, T, x) : 0), w._ease = k.none;
        w.duration() ? l = f = 0 : a.timeline = 0;
      } else if (p) {
        ae(ot(w.vars.defaults, {
          ease: "none"
        })), w._ease = Nt(p.ease || r.ease || "none");
        var E = 0, A, G, V;
        if (j(p))
          p.forEach(function(N) {
            return w.to(x, N, ">");
          }), w.duration();
        else {
          b = {};
          for (O in p)
            O === "ease" || O === "easeEach" || Dn(O, p[O], b, p.easeEach);
          for (O in b)
            for (A = b[O].sort(function(N, W) {
              return N.t - W.t;
            }), E = 0, g = 0; g < A.length; g++)
              G = A[g], V = {
                ease: G.e,
                duration: (G.t - (g ? A[g - 1].t : 0)) / 100 * l
              }, V[O] = G.v, w.to(x, V, E), E += V.duration;
          w.duration() < l && w.to({}, {
            duration: l - w.duration()
          });
        }
      }
      l || a.duration(l = w.duration());
    } else
      a.timeline = 0;
    return d === !0 && !li && (Tt = yt(a), L.killTweensOf(x), Tt = 0), dt(v, yt(a), n), r.reversed && a.reverse(), r.paused && a.paused(!0), (h || !l && !p && a._start === B(v._time) && Z(h) && ln(yt(a)) && v.data !== "nested") && (a._tTime = -M, a.render(Math.max(0, -f) || 0)), m && cr(yt(a), m), a;
  }
  var e = t.prototype;
  return e.render = function(r, n, s) {
    var a = this._time, u = this._tDur, l = this._dur, f = r < 0, h = r > u - M && !f ? u : r < M ? 0 : r, _, d, p, c, m, y, v, x, w;
    if (!l)
      cn(this, r, n, s);
    else if (h !== this._tTime || !r || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== f || this._lazy) {
      if (_ = h, x = this.timeline, this._repeat) {
        if (c = l + this._rDelay, this._repeat < -1 && f)
          return this.totalTime(c * 100 + r, n, s);
        if (_ = B(h % c), h === u ? (p = this._repeat, _ = l) : (m = B(h / c), p = ~~m, p && p === m ? (_ = l, p--) : _ > l && (_ = l)), y = this._yoyo && p & 1, y && (w = this._yEase, _ = l - _), m = Ht(this._tTime, c), _ === a && !s && this._initted && p === m)
          return this._tTime = h, this;
        p !== m && (x && this._yEase && kr(x, y), this.vars.repeatRefresh && !y && !this._lock && _ !== c && this._initted && (this._lock = s = 1, this.render(B(c * p), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (hr(this, f ? r : _, s, n, h))
          return this._tTime = 0, this;
        if (a !== this._time && !(s && this.vars.repeatRefresh && p !== m))
          return this;
        if (l !== this._dur)
          return this.render(r, n, s);
      }
      if (this._tTime = h, this._time = _, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = v = (w || this._ease)(_ / l), this._from && (this.ratio = v = 1 - v), !a && h && !n && !m && (rt(this, "onStart"), this._tTime !== h))
        return this;
      for (d = this._pt; d; )
        d.r(v, d.d), d = d._next;
      x && x.render(r < 0 ? r : x._dur * x._ease(_ / this._dur), n, s) || this._startAt && (this._zTime = r), this._onUpdate && !n && (f && Ke(this, r, n, s), rt(this, "onUpdate")), this._repeat && p !== m && this.vars.onRepeat && !n && this.parent && rt(this, "onRepeat"), (h === this._tDur || !h) && this._tTime === h && (f && !this._onUpdate && Ke(this, r, !0, !0), (r || !l) && (h === this._tDur && this._ts > 0 || !h && this._ts < 0) && Ct(this, 1), !n && !(f && !a) && (h || a || y) && (rt(this, h === u ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < u && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), o.prototype.invalidate.call(this, r);
  }, e.resetTo = function(r, n, s, a, u) {
    _e || it.wake(), this._ts || this.play();
    var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts), f;
    return this._initted || vi(this, l), f = this._ease(l / this._dur), En(this, r, n, s, a, f, l, u) ? this.resetTo(r, n, s, a, 1) : (ze(this, 0), this.parent || lr(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? ne(this) : this.scrollTrigger && this.scrollTrigger.kill(!!X), this;
    if (this.timeline) {
      var s = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, Tt && Tt.vars.overwrite !== !0)._first || ne(this), this.parent && s !== this.timeline.totalDuration() && Qt(this, this._dur * this.timeline._tDur / s, 0, 1), this;
    }
    var a = this._targets, u = r ? lt(r) : a, l = this._ptLookup, f = this._pt, h, _, d, p, c, m, y;
    if ((!n || n === "all") && an(a, u))
      return n === "all" && (this._pt = 0), ne(this);
    for (h = this._op = this._op || [], n !== "all" && (Y(n) && (c = {}, H(n, function(v) {
      return c[v] = 1;
    }), n = c), n = An(a, n)), y = a.length; y--; )
      if (~u.indexOf(a[y])) {
        _ = l[y], n === "all" ? (h[y] = n, p = _, d = {}) : (d = h[y] = h[y] || {}, p = n);
        for (c in p)
          m = _ && _[c], m && ((!("kill" in m.d) || m.d.kill(c) === !0) && Re(this, m, "_pt"), delete _[c]), d !== "all" && (d[c] = 1);
      }
    return this._initted && !this._pt && f && ne(this), this;
  }, t.to = function(r, n) {
    return new t(r, n, arguments[2]);
  }, t.from = function(r, n) {
    return ue(1, arguments);
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
    return ue(2, arguments);
  }, t.set = function(r, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(r, n);
  }, t.killTweensOf = function(r, n, s) {
    return L.killTweensOf(r, n, s);
  }, t;
}(de);
ot(U.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
H("staggerTo,staggerFrom,staggerFromTo", function(o) {
  U[o] = function() {
    var t = new K(), e = He.call(arguments, 0);
    return e.splice(o === "staggerFromTo" ? 5 : 4, 0, 0), t[o].apply(t, e);
  };
});
var xi = function(t, e, i) {
  return t[e] = i;
}, Dr = function(t, e, i) {
  return t[e](i);
}, Rn = function(t, e, i, r) {
  return t[e](r.fp, i);
}, Ln = function(t, e, i) {
  return t.setAttribute(e, i);
}, wi = function(t, e) {
  return F(t[e]) ? Dr : fi(t[e]) && t.setAttribute ? Ln : xi;
}, Rr = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, zn = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, Lr = function(t, e) {
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
}, Ti = function(t, e) {
  for (var i = e._pt; i; )
    i.r(t, i.d), i = i._next;
}, Fn = function(t, e, i, r) {
  for (var n = this._pt, s; n; )
    s = n._next, n.p === r && n.modifier(t, e, i), n = s;
}, In = function(t) {
  for (var e = this._pt, i, r; e; )
    r = e._next, e.p === t && !e.op || e.op === t ? Re(this, e, "_pt") : e.dep || (i = 1), e = r;
  return !i;
}, qn = function(t, e, i, r) {
  r.mSet(t, e, r.m.call(r.tween, i, r.mt), r);
}, zr = function(t) {
  for (var e = t._pt, i, r, n, s; e; ) {
    for (i = e._next, r = n; r && r.pr > e.pr; )
      r = r._next;
    (e._prev = r ? r._prev : s) ? e._prev._next = e : n = e, (e._next = r) ? r._prev = e : s = e, e = i;
  }
  t._pt = n;
}, Q = /* @__PURE__ */ function() {
  function o(e, i, r, n, s, a, u, l, f) {
    this.t = i, this.s = n, this.c = s, this.p = r, this.r = a || Rr, this.d = u || this, this.set = l || xi, this.pr = f || 0, this._next = e, e && (e._prev = this);
  }
  var t = o.prototype;
  return t.modifier = function(i, r, n) {
    this.mSet = this.mSet || this.set, this.set = qn, this.m = i, this.mt = n, this.tween = r;
  }, o;
}();
H(pi + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(o) {
  return di[o] = 1;
});
st.TweenMax = st.TweenLite = U;
st.TimelineLite = st.TimelineMax = K;
L = new K({
  sortChildren: !1,
  defaults: Kt,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
nt.stringFilter = Sr;
var Ut = [], Se = {}, Nn = [], Ii = 0, Un = 0, Be = function(t) {
  return (Se[t] || Nn).map(function(e) {
    return e();
  });
}, ei = function() {
  var t = Date.now(), e = [];
  t - Ii > 2 && (Be("matchMediaInit"), Ut.forEach(function(i) {
    var r = i.queries, n = i.conditions, s, a, u, l;
    for (a in r)
      s = ht.matchMedia(r[a]).matches, s && (u = 1), s !== n[a] && (n[a] = s, l = 1);
    l && (i.revert(), u && e.push(i));
  }), Be("matchMediaRevert"), e.forEach(function(i) {
    return i.onMatch(i, function(r) {
      return i.add(null, r);
    });
  }), Ii = t, Be("matchMedia"));
}, Fr = /* @__PURE__ */ function() {
  function o(e, i) {
    this.selector = i && Qe(i), this.data = [], this._r = [], this.isReverted = !1, this.id = Un++, e && this.add(e);
  }
  var t = o.prototype;
  return t.add = function(i, r, n) {
    F(i) && (n = r, r = i, i = F);
    var s = this, a = function() {
      var l = R, f = s.selector, h;
      return l && l !== s && l.data.push(s), n && (s.selector = Qe(n)), R = s, h = r.apply(s, arguments), F(h) && s._r.push(h), R = l, s.selector = f, s.isReverted = !1, h;
    };
    return s.last = a, i === F ? a(s, function(u) {
      return s.add(null, u);
    }) : i ? s[i] = a : a;
  }, t.ignore = function(i) {
    var r = R;
    R = null, i(this), R = r;
  }, t.getTweens = function() {
    var i = [];
    return this.data.forEach(function(r) {
      return r instanceof o ? i.push.apply(i, r.getTweens()) : r instanceof U && !(r.parent && r.parent.data === "nested") && i.push(r);
    }), i;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(i, r) {
    var n = this;
    if (i ? function() {
      for (var a = n.getTweens(), u = n.data.length, l; u--; )
        l = n.data[u], l.data === "isFlip" && (l.revert(), l.getChildren(!0, !0, !1).forEach(function(f) {
          return a.splice(a.indexOf(f), 1);
        }));
      for (a.map(function(f) {
        return {
          g: f._dur || f._delay || f._sat && !f._sat.vars.immediateRender ? f.globalTime(0) : -1 / 0,
          t: f
        };
      }).sort(function(f, h) {
        return h.g - f.g || -1 / 0;
      }).forEach(function(f) {
        return f.t.revert(i);
      }), u = n.data.length; u--; )
        l = n.data[u], l instanceof K ? l.data !== "nested" && (l.scrollTrigger && l.scrollTrigger.revert(), l.kill()) : !(l instanceof U) && l.revert && l.revert(i);
      n._r.forEach(function(f) {
        return f(i, n);
      }), n.isReverted = !0;
    }() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), r)
      for (var s = Ut.length; s--; )
        Ut[s].id === this.id && Ut.splice(s, 1);
  }, t.revert = function(i) {
    this.kill(i || {});
  }, o;
}(), Bn = /* @__PURE__ */ function() {
  function o(e) {
    this.contexts = [], this.scope = e, R && R.data.push(this);
  }
  var t = o.prototype;
  return t.add = function(i, r, n) {
    mt(i) || (i = {
      matches: i
    });
    var s = new Fr(0, n || this.scope), a = s.conditions = {}, u, l, f;
    R && !s.selector && (s.selector = R.selector), this.contexts.push(s), r = s.add("onMatch", r), s.queries = i;
    for (l in i)
      l === "all" ? f = 1 : (u = ht.matchMedia(i[l]), u && (Ut.indexOf(s) < 0 && Ut.push(s), (a[l] = u.matches) && (f = 1), u.addListener ? u.addListener(ei) : u.addEventListener("change", ei)));
    return f && r(s, function(h) {
      return s.add(null, h);
    }), this;
  }, t.revert = function(i) {
    this.kill(i || {});
  }, t.kill = function(i) {
    this.contexts.forEach(function(r) {
      return r.kill(i, !0);
    });
  }, o;
}(), Ee = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    e.forEach(function(r) {
      return wr(r);
    });
  },
  timeline: function(t) {
    return new K(t);
  },
  getTweensOf: function(t, e) {
    return L.getTweensOf(t, e);
  },
  getProperty: function(t, e, i, r) {
    Y(t) && (t = lt(t)[0]);
    var n = It(t || {}).get, s = i ? ur : ar;
    return i === "native" && (i = ""), t && (e ? s((et[e] && et[e].get || n)(t, e, i, r)) : function(a, u, l) {
      return s((et[a] && et[a].get || n)(t, a, u, l));
    });
  },
  quickSetter: function(t, e, i) {
    if (t = lt(t), t.length > 1) {
      var r = t.map(function(f) {
        return tt.quickSetter(f, e, i);
      }), n = r.length;
      return function(f) {
        for (var h = n; h--; )
          r[h](f);
      };
    }
    t = t[0] || {};
    var s = et[e], a = It(t), u = a.harness && (a.harness.aliases || {})[e] || e, l = s ? function(f) {
      var h = new s();
      Gt._pt = 0, h.init(t, i ? f + i : f, Gt, 0, [t]), h.render(1, h), Gt._pt && Ti(1, Gt);
    } : a.set(t, u);
    return s ? l : function(f) {
      return l(t, u, i ? f + i : f, a, 1);
    };
  },
  quickTo: function(t, e, i) {
    var r, n = tt.to(t, ot((r = {}, r[e] = "+=0.1", r.paused = !0, r.stagger = 0, r), i || {})), s = function(u, l, f) {
      return n.resetTo(e, u, l, f);
    };
    return s.tween = n, s;
  },
  isTweening: function(t) {
    return L.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = Nt(t.ease, Kt.ease)), Di(Kt, t || {});
  },
  config: function(t) {
    return Di(nt, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, i = t.effect, r = t.plugins, n = t.defaults, s = t.extendTimeline;
    (r || "").split(",").forEach(function(a) {
      return a && !et[a] && !st[a] && fe(e + " effect requires " + a + " plugin.");
    }), Ie[e] = function(a, u, l) {
      return i(lt(a), ot(u || {}, n), l);
    }, s && (K.prototype[e] = function(a, u, l) {
      return this.add(Ie[e](a, mt(u) ? u : (l = u) && {}, this), l);
    });
  },
  registerEase: function(t, e) {
    k[t] = Nt(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? Nt(t, e) : k;
  },
  getById: function(t) {
    return L.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var i = new K(t), r, n;
    for (i.smoothChildTiming = Z(t.smoothChildTiming), L.remove(i), i._dp = 0, i._time = i._tTime = L._time, r = L._first; r; )
      n = r._next, (e || !(!r._dur && r instanceof U && r.vars.onComplete === r._targets[0])) && dt(i, r, r._start - r._delay), r = n;
    return dt(L, i, 0), i;
  },
  context: function(t, e) {
    return t ? new Fr(t, e) : R;
  },
  matchMedia: function(t) {
    return new Bn(t);
  },
  matchMediaRefresh: function() {
    return Ut.forEach(function(t) {
      var e = t.conditions, i, r;
      for (r in e)
        e[r] && (e[r] = !1, i = 1);
      i && t.revert();
    }) || ei();
  },
  addEventListener: function(t, e) {
    var i = Se[t] || (Se[t] = []);
    ~i.indexOf(e) || i.push(e);
  },
  removeEventListener: function(t, e) {
    var i = Se[t], r = i && i.indexOf(e);
    r >= 0 && i.splice(r, 1);
  },
  utils: {
    wrap: vn,
    wrapYoyo: xn,
    distribute: pr,
    random: gr,
    snap: mr,
    normalize: yn,
    getUnit: $,
    clamp: dn,
    splitColor: Tr,
    toArray: lt,
    selector: Qe,
    mapRange: vr,
    pipe: mn,
    unitize: gn,
    interpolate: wn,
    shuffle: dr
  },
  install: ir,
  effects: Ie,
  ticker: it,
  updateRoot: K.updateRoot,
  plugins: et,
  globalTimeline: L,
  core: {
    PropTween: Q,
    globals: rr,
    Tween: U,
    Timeline: K,
    Animation: de,
    getCache: It,
    _removeLinkedListItem: Re,
    reverting: function() {
      return X;
    },
    context: function(t) {
      return t && R && (R.data.push(t), t._ctx = R), R;
    },
    suppressOverwrites: function(t) {
      return li = t;
    }
  }
};
H("to,from,fromTo,delayedCall,set,killTweensOf", function(o) {
  return Ee[o] = U[o];
});
it.add(K.updateRoot);
Gt = Ee.to({}, {
  duration: 0
});
var Vn = function(t, e) {
  for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
    i = i._next;
  return i;
}, Wn = function(t, e) {
  var i = t._targets, r, n, s;
  for (r in e)
    for (n = i.length; n--; )
      s = t._ptLookup[n][r], s && (s = s.d) && (s._pt && (s = Vn(s, r)), s && s.modifier && s.modifier(e[r], t, i[n], r));
}, Ve = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(r, n, s) {
      s._onInit = function(a) {
        var u, l;
        if (Y(n) && (u = {}, H(n, function(f) {
          return u[f] = 1;
        }), n = u), e) {
          u = {};
          for (l in n)
            u[l] = e(n[l]);
          n = u;
        }
        Wn(a, n);
      };
    }
  };
}, tt = Ee.registerPlugin({
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
}, Ve("roundProps", Je), Ve("modifiers"), Ve("snap", mr)) || Ee;
U.version = K.version = tt.version = "3.13.0";
er = 1;
ci() && Jt();
k.Power0;
k.Power1;
k.Power2;
k.Power3;
k.Power4;
k.Linear;
k.Quad;
k.Cubic;
k.Quart;
k.Quint;
k.Strong;
k.Elastic;
k.Back;
k.SteppedEase;
k.Bounce;
k.Sine;
k.Expo;
k.Circ;
/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var qi, bt, $t, bi, Ft, Ni, Si, Yn = function() {
  return typeof window < "u";
}, wt = {}, zt = 180 / Math.PI, jt = Math.PI / 180, Wt = Math.atan2, Ui = 1e8, Oi = /([A-Z])/g, Gn = /(left|right|width|margin|padding|x)/i, Xn = /[\s,\(]\S/, pt = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, ii = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, $n = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, jn = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, Kn = function(t, e) {
  var i = e.s + e.c * t;
  e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
}, Ir = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, qr = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, Zn = function(t, e, i) {
  return t.style[e] = i;
}, Hn = function(t, e, i) {
  return t.style.setProperty(e, i);
}, Qn = function(t, e, i) {
  return t._gsap[e] = i;
}, Jn = function(t, e, i) {
  return t._gsap.scaleX = t._gsap.scaleY = i;
}, ts = function(t, e, i, r, n) {
  var s = t._gsap;
  s.scaleX = s.scaleY = i, s.renderTransform(n, s);
}, es = function(t, e, i, r, n) {
  var s = t._gsap;
  s[e] = i, s.renderTransform(n, s);
}, z = "transform", J = z + "Origin", is = function o(t, e) {
  var i = this, r = this.target, n = r.style, s = r._gsap;
  if (t in wt && n) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = pt[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return i.tfm[a] = vt(r, a);
      }) : this.tfm[t] = s.x ? s[t] : vt(r, t), t === J && (this.tfm.zOrigin = s.zOrigin);
    else
      return pt.transform.split(",").forEach(function(a) {
        return o.call(i, a, e);
      });
    if (this.props.indexOf(z) >= 0)
      return;
    s.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(J, e, "")), t = z;
  }
  (n || e) && this.props.push(t, e, n[t]);
}, Nr = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, rs = function() {
  var t = this.props, e = this.target, i = e.style, r = e._gsap, n, s;
  for (n = 0; n < t.length; n += 3)
    t[n + 1] ? t[n + 1] === 2 ? e[t[n]](t[n + 2]) : e[t[n]] = t[n + 2] : t[n + 2] ? i[t[n]] = t[n + 2] : i.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(Oi, "-$1").toLowerCase());
  if (this.tfm) {
    for (s in this.tfm)
      r[s] = this.tfm[s];
    r.svg && (r.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), n = Si(), (!n || !n.isStart) && !i[z] && (Nr(i), r.zOrigin && i[J] && (i[J] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
  }
}, Ur = function(t, e) {
  var i = {
    target: t,
    props: [],
    revert: rs,
    save: is
  };
  return t._gsap || tt.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(r) {
    return i.save(r);
  }), i;
}, Br, ri = function(t, e) {
  var i = bt.createElementNS ? bt.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : bt.createElement(t);
  return i && i.style ? i : bt.createElement(t);
}, ft = function o(t, e, i) {
  var r = getComputedStyle(t);
  return r[e] || r.getPropertyValue(e.replace(Oi, "-$1").toLowerCase()) || r.getPropertyValue(e) || !i && o(t, te(e) || e, 1) || "";
}, Bi = "O,Moz,ms,Ms,Webkit".split(","), te = function(t, e, i) {
  var r = e || Ft, n = r.style, s = 5;
  if (t in n && !i)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(Bi[s] + t in n); )
    ;
  return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? Bi[s] : "") + t;
}, ni = function() {
  Yn() && window.document && (qi = window, bt = qi.document, $t = bt.documentElement, Ft = ri("div") || {
    style: {}
  }, ri("div"), z = te(z), J = z + "Origin", Ft.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Br = !!te("perspective"), Si = tt.core.reverting, bi = 1);
}, Vi = function(t) {
  var e = t.ownerSVGElement, i = ri("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = t.cloneNode(!0), n;
  r.style.display = "block", i.appendChild(r), $t.appendChild(i);
  try {
    n = r.getBBox();
  } catch {
  }
  return i.removeChild(r), $t.removeChild(i), n;
}, Wi = function(t, e) {
  for (var i = e.length; i--; )
    if (t.hasAttribute(e[i]))
      return t.getAttribute(e[i]);
}, Vr = function(t) {
  var e, i;
  try {
    e = t.getBBox();
  } catch {
    e = Vi(t), i = 1;
  }
  return e && (e.width || e.height) || i || (e = Vi(t)), e && !e.width && !e.x && !e.y ? {
    x: +Wi(t, ["x", "cx", "x1"]) || 0,
    y: +Wi(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, Wr = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Vr(t));
}, Bt = function(t, e) {
  if (e) {
    var i = t.style, r;
    e in wt && e !== J && (e = z), i.removeProperty ? (r = e.substr(0, 2), (r === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), i.removeProperty(r === "--" ? e : e.replace(Oi, "-$1").toLowerCase())) : i.removeAttribute(e);
  }
}, St = function(t, e, i, r, n, s) {
  var a = new Q(t._pt, e, i, 0, 1, s ? qr : Ir);
  return t._pt = a, a.b = r, a.e = n, t._props.push(i), a;
}, Yi = {
  deg: 1,
  rad: 1,
  turn: 1
}, ns = {
  grid: 1,
  flex: 1
}, Mt = function o(t, e, i, r) {
  var n = parseFloat(i) || 0, s = (i + "").trim().substr((n + "").length) || "px", a = Ft.style, u = Gn.test(e), l = t.tagName.toLowerCase() === "svg", f = (l ? "client" : "offset") + (u ? "Width" : "Height"), h = 100, _ = r === "px", d = r === "%", p, c, m, y;
  if (r === s || !n || Yi[r] || Yi[s])
    return n;
  if (s !== "px" && !_ && (n = o(t, e, i, "px")), y = t.getCTM && Wr(t), (d || s === "%") && (wt[e] || ~e.indexOf("adius")))
    return p = y ? t.getBBox()[u ? "width" : "height"] : t[f], I(d ? n / p * h : n / 100 * p);
  if (a[u ? "width" : "height"] = h + (_ ? s : r), c = r !== "rem" && ~e.indexOf("adius") || r === "em" && t.appendChild && !l ? t : t.parentNode, y && (c = (t.ownerSVGElement || {}).parentNode), (!c || c === bt || !c.appendChild) && (c = bt.body), m = c._gsap, m && d && m.width && u && m.time === it.time && !m.uncache)
    return I(n / m.width * h);
  if (d && (e === "height" || e === "width")) {
    var v = t.style[e];
    t.style[e] = h + r, p = t[f], v ? t.style[e] = v : Bt(t, e);
  } else
    (d || s === "%") && !ns[ft(c, "display")] && (a.position = ft(t, "position")), c === t && (a.position = "static"), c.appendChild(Ft), p = Ft[f], c.removeChild(Ft), a.position = "absolute";
  return u && d && (m = It(c), m.time = it.time, m.width = c[f]), I(_ ? p * n / h : p && n ? h / p * n : 0);
}, vt = function(t, e, i, r) {
  var n;
  return bi || ni(), e in pt && e !== "transform" && (e = pt[e], ~e.indexOf(",") && (e = e.split(",")[0])), wt[e] && e !== "transform" ? (n = me(t, r), n = e !== "transformOrigin" ? n[e] : n.svg ? n.origin : De(ft(t, J)) + " " + n.zOrigin + "px") : (n = t.style[e], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = Ae[e] && Ae[e](t, e, i) || ft(t, e) || sr(t, e) || (e === "opacity" ? 1 : 0))), i && !~(n + "").trim().indexOf(" ") ? Mt(t, e, n, i) + i : n;
}, ss = function(t, e, i, r) {
  if (!i || i === "none") {
    var n = te(e, t, 1), s = n && ft(t, n, 1);
    s && s !== i ? (e = n, i = s) : e === "borderColor" && (i = ft(t, "borderTopColor"));
  }
  var a = new Q(this._pt, t.style, e, 0, 1, Lr), u = 0, l = 0, f, h, _, d, p, c, m, y, v, x, w, g;
  if (a.b = i, a.e = r, i += "", r += "", r.substring(0, 6) === "var(--" && (r = ft(t, r.substring(4, r.indexOf(")")))), r === "auto" && (c = t.style[e], t.style[e] = r, r = ft(t, e) || r, c ? t.style[e] = c : Bt(t, e)), f = [i, r], Sr(f), i = f[0], r = f[1], _ = i.match(Yt) || [], g = r.match(Yt) || [], g.length) {
    for (; h = Yt.exec(r); )
      m = h[0], v = r.substring(u, h.index), p ? p = (p + 1) % 5 : (v.substr(-5) === "rgba(" || v.substr(-5) === "hsla(") && (p = 1), m !== (c = _[l++] || "") && (d = parseFloat(c) || 0, w = c.substr((d + "").length), m.charAt(1) === "=" && (m = Xt(d, m) + w), y = parseFloat(m), x = m.substr((y + "").length), u = Yt.lastIndex - x.length, x || (x = x || nt.units[e] || w, u === r.length && (r += x, a.e += x)), w !== x && (d = Mt(t, e, c, x) || 0), a._pt = {
        _next: a._pt,
        p: v || l === 1 ? v : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: d,
        c: y - d,
        m: p && p < 4 || e === "zIndex" ? Math.round : 0
      });
    a.c = u < r.length ? r.substring(u, r.length) : "";
  } else
    a.r = e === "display" && r === "none" ? qr : Ir;
  return Ji.test(r) && (a.e = 0), this._pt = a, a;
}, Gi = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, os = function(t) {
  var e = t.split(" "), i = e[0], r = e[1] || "50%";
  return (i === "top" || i === "bottom" || r === "left" || r === "right") && (t = i, i = r, r = t), e[0] = Gi[i] || i, e[1] = Gi[r] || r, e.join(" ");
}, as = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var i = e.t, r = i.style, n = e.u, s = i._gsap, a, u, l;
    if (n === "all" || n === !0)
      r.cssText = "", u = 1;
    else
      for (n = n.split(","), l = n.length; --l > -1; )
        a = n[l], wt[a] && (u = 1, a = a === "transformOrigin" ? J : z), Bt(i, a);
    u && (Bt(i, z), s && (s.svg && i.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", me(i, 1), s.uncache = 1, Nr(r)));
  }
}, Ae = {
  clearProps: function(t, e, i, r, n) {
    if (n.data !== "isFromStart") {
      var s = t._pt = new Q(t._pt, e, i, 0, 0, as);
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
}, pe = [1, 0, 0, 1, 0, 0], Yr = {}, Gr = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, Xi = function(t) {
  var e = ft(t, z);
  return Gr(e) ? pe : e.substr(7).match(Qi).map(I);
}, ki = function(t, e) {
  var i = t._gsap || It(t), r = t.style, n = Xi(t), s, a, u, l;
  return i.svg && t.getAttribute("transform") ? (u = t.transform.baseVal.consolidate().matrix, n = [u.a, u.b, u.c, u.d, u.e, u.f], n.join(",") === "1,0,0,1,0,0" ? pe : n) : (n === pe && !t.offsetParent && t !== $t && !i.svg && (u = r.display, r.display = "block", s = t.parentNode, (!s || !t.offsetParent && !t.getBoundingClientRect().width) && (l = 1, a = t.nextElementSibling, $t.appendChild(t)), n = Xi(t), u ? r.display = u : Bt(t, "display"), l && (a ? s.insertBefore(t, a) : s ? s.appendChild(t) : $t.removeChild(t))), e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, si = function(t, e, i, r, n, s) {
  var a = t._gsap, u = n || ki(t, !0), l = a.xOrigin || 0, f = a.yOrigin || 0, h = a.xOffset || 0, _ = a.yOffset || 0, d = u[0], p = u[1], c = u[2], m = u[3], y = u[4], v = u[5], x = e.split(" "), w = parseFloat(x[0]) || 0, g = parseFloat(x[1]) || 0, b, S, O, T;
  i ? u !== pe && (S = d * m - p * c) && (O = w * (m / S) + g * (-c / S) + (c * v - m * y) / S, T = w * (-p / S) + g * (d / S) - (d * v - p * y) / S, w = O, g = T) : (b = Vr(t), w = b.x + (~x[0].indexOf("%") ? w / 100 * b.width : w), g = b.y + (~(x[1] || x[0]).indexOf("%") ? g / 100 * b.height : g)), r || r !== !1 && a.smooth ? (y = w - l, v = g - f, a.xOffset = h + (y * d + v * c) - y, a.yOffset = _ + (y * p + v * m) - v) : a.xOffset = a.yOffset = 0, a.xOrigin = w, a.yOrigin = g, a.smooth = !!r, a.origin = e, a.originIsAbsolute = !!i, t.style[J] = "0px 0px", s && (St(s, a, "xOrigin", l, w), St(s, a, "yOrigin", f, g), St(s, a, "xOffset", h, a.xOffset), St(s, a, "yOffset", _, a.yOffset)), t.setAttribute("data-svg-origin", w + " " + g);
}, me = function(t, e) {
  var i = t._gsap || new Cr(t);
  if ("x" in i && !e && !i.uncache)
    return i;
  var r = t.style, n = i.scaleX < 0, s = "px", a = "deg", u = getComputedStyle(t), l = ft(t, J) || "0", f, h, _, d, p, c, m, y, v, x, w, g, b, S, O, T, P, D, E, A, G, V, N, W, ct, ve, ee, ie, At, Ei, gt, Dt;
  return f = h = _ = c = m = y = v = x = w = 0, d = p = 1, i.svg = !!(t.getCTM && Wr(t)), u.translate && ((u.translate !== "none" || u.scale !== "none" || u.rotate !== "none") && (r[z] = (u.translate !== "none" ? "translate3d(" + (u.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (u.rotate !== "none" ? "rotate(" + u.rotate + ") " : "") + (u.scale !== "none" ? "scale(" + u.scale.split(" ").join(",") + ") " : "") + (u[z] !== "none" ? u[z] : "")), r.scale = r.rotate = r.translate = "none"), S = ki(t, i.svg), i.svg && (i.uncache ? (ct = t.getBBox(), l = i.xOrigin - ct.x + "px " + (i.yOrigin - ct.y) + "px", W = "") : W = !e && t.getAttribute("data-svg-origin"), si(t, W || l, !!W || i.originIsAbsolute, i.smooth !== !1, S)), g = i.xOrigin || 0, b = i.yOrigin || 0, S !== pe && (D = S[0], E = S[1], A = S[2], G = S[3], f = V = S[4], h = N = S[5], S.length === 6 ? (d = Math.sqrt(D * D + E * E), p = Math.sqrt(G * G + A * A), c = D || E ? Wt(E, D) * zt : 0, v = A || G ? Wt(A, G) * zt + c : 0, v && (p *= Math.abs(Math.cos(v * jt))), i.svg && (f -= g - (g * D + b * A), h -= b - (g * E + b * G))) : (Dt = S[6], Ei = S[7], ee = S[8], ie = S[9], At = S[10], gt = S[11], f = S[12], h = S[13], _ = S[14], O = Wt(Dt, At), m = O * zt, O && (T = Math.cos(-O), P = Math.sin(-O), W = V * T + ee * P, ct = N * T + ie * P, ve = Dt * T + At * P, ee = V * -P + ee * T, ie = N * -P + ie * T, At = Dt * -P + At * T, gt = Ei * -P + gt * T, V = W, N = ct, Dt = ve), O = Wt(-A, At), y = O * zt, O && (T = Math.cos(-O), P = Math.sin(-O), W = D * T - ee * P, ct = E * T - ie * P, ve = A * T - At * P, gt = G * P + gt * T, D = W, E = ct, A = ve), O = Wt(E, D), c = O * zt, O && (T = Math.cos(O), P = Math.sin(O), W = D * T + E * P, ct = V * T + N * P, E = E * T - D * P, N = N * T - V * P, D = W, V = ct), m && Math.abs(m) + Math.abs(c) > 359.9 && (m = c = 0, y = 180 - y), d = I(Math.sqrt(D * D + E * E + A * A)), p = I(Math.sqrt(N * N + Dt * Dt)), O = Wt(V, N), v = Math.abs(O) > 2e-4 ? O * zt : 0, w = gt ? 1 / (gt < 0 ? -gt : gt) : 0), i.svg && (W = t.getAttribute("transform"), i.forceCSS = t.setAttribute("transform", "") || !Gr(ft(t, z)), W && t.setAttribute("transform", W))), Math.abs(v) > 90 && Math.abs(v) < 270 && (n ? (d *= -1, v += c <= 0 ? 180 : -180, c += c <= 0 ? 180 : -180) : (p *= -1, v += v <= 0 ? 180 : -180)), e = e || i.uncache, i.x = f - ((i.xPercent = f && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-f) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + s, i.y = h - ((i.yPercent = h && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + s, i.z = _ + s, i.scaleX = I(d), i.scaleY = I(p), i.rotation = I(c) + a, i.rotationX = I(m) + a, i.rotationY = I(y) + a, i.skewX = v + a, i.skewY = x + a, i.transformPerspective = w + s, (i.zOrigin = parseFloat(l.split(" ")[2]) || !e && i.zOrigin || 0) && (r[J] = De(l)), i.xOffset = i.yOffset = 0, i.force3D = nt.force3D, i.renderTransform = i.svg ? ls : Br ? Xr : us, i.uncache = 0, i;
}, De = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, We = function(t, e, i) {
  var r = $(e);
  return I(parseFloat(e) + parseFloat(Mt(t, "x", i + "px", r))) + r;
}, us = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, Xr(t, e);
}, Rt = "0deg", re = "0px", Lt = ") ", Xr = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, u = i.z, l = i.rotation, f = i.rotationY, h = i.rotationX, _ = i.skewX, d = i.skewY, p = i.scaleX, c = i.scaleY, m = i.transformPerspective, y = i.force3D, v = i.target, x = i.zOrigin, w = "", g = y === "auto" && t && t !== 1 || y === !0;
  if (x && (h !== Rt || f !== Rt)) {
    var b = parseFloat(f) * jt, S = Math.sin(b), O = Math.cos(b), T;
    b = parseFloat(h) * jt, T = Math.cos(b), s = We(v, s, S * T * -x), a = We(v, a, -Math.sin(b) * -x), u = We(v, u, O * T * -x + x);
  }
  m !== re && (w += "perspective(" + m + Lt), (r || n) && (w += "translate(" + r + "%, " + n + "%) "), (g || s !== re || a !== re || u !== re) && (w += u !== re || g ? "translate3d(" + s + ", " + a + ", " + u + ") " : "translate(" + s + ", " + a + Lt), l !== Rt && (w += "rotate(" + l + Lt), f !== Rt && (w += "rotateY(" + f + Lt), h !== Rt && (w += "rotateX(" + h + Lt), (_ !== Rt || d !== Rt) && (w += "skew(" + _ + ", " + d + Lt), (p !== 1 || c !== 1) && (w += "scale(" + p + ", " + c + Lt), v.style[z] = w || "translate(0, 0)";
}, ls = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, u = i.rotation, l = i.skewX, f = i.skewY, h = i.scaleX, _ = i.scaleY, d = i.target, p = i.xOrigin, c = i.yOrigin, m = i.xOffset, y = i.yOffset, v = i.forceCSS, x = parseFloat(s), w = parseFloat(a), g, b, S, O, T;
  u = parseFloat(u), l = parseFloat(l), f = parseFloat(f), f && (f = parseFloat(f), l += f, u += f), u || l ? (u *= jt, l *= jt, g = Math.cos(u) * h, b = Math.sin(u) * h, S = Math.sin(u - l) * -_, O = Math.cos(u - l) * _, l && (f *= jt, T = Math.tan(l - f), T = Math.sqrt(1 + T * T), S *= T, O *= T, f && (T = Math.tan(f), T = Math.sqrt(1 + T * T), g *= T, b *= T)), g = I(g), b = I(b), S = I(S), O = I(O)) : (g = h, O = _, b = S = 0), (x && !~(s + "").indexOf("px") || w && !~(a + "").indexOf("px")) && (x = Mt(d, "x", s, "px"), w = Mt(d, "y", a, "px")), (p || c || m || y) && (x = I(x + p - (p * g + c * S) + m), w = I(w + c - (p * b + c * O) + y)), (r || n) && (T = d.getBBox(), x = I(x + r / 100 * T.width), w = I(w + n / 100 * T.height)), T = "matrix(" + g + "," + b + "," + S + "," + O + "," + x + "," + w + ")", d.setAttribute("transform", T), v && (d.style[z] = T);
}, fs = function(t, e, i, r, n) {
  var s = 360, a = Y(n), u = parseFloat(n) * (a && ~n.indexOf("rad") ? zt : 1), l = u - r, f = r + l + "deg", h, _;
  return a && (h = n.split("_")[1], h === "short" && (l %= s, l !== l % (s / 2) && (l += l < 0 ? s : -s)), h === "cw" && l < 0 ? l = (l + s * Ui) % s - ~~(l / s) * s : h === "ccw" && l > 0 && (l = (l - s * Ui) % s - ~~(l / s) * s)), t._pt = _ = new Q(t._pt, e, i, r, l, $n), _.e = f, _.u = "deg", t._props.push(i), _;
}, $i = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, cs = function(t, e, i) {
  var r = $i({}, i._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", s = i.style, a, u, l, f, h, _, d, p;
  r.svg ? (l = i.getAttribute("transform"), i.setAttribute("transform", ""), s[z] = e, a = me(i, 1), Bt(i, z), i.setAttribute("transform", l)) : (l = getComputedStyle(i)[z], s[z] = e, a = me(i, 1), s[z] = l);
  for (u in wt)
    l = r[u], f = a[u], l !== f && n.indexOf(u) < 0 && (d = $(l), p = $(f), h = d !== p ? Mt(i, u, l, p) : parseFloat(l), _ = parseFloat(f), t._pt = new Q(t._pt, a, u, h, _ - h, ii), t._pt.u = p || 0, t._props.push(u));
  $i(a, r);
};
H("padding,margin,Width,Radius", function(o, t) {
  var e = "Top", i = "Right", r = "Bottom", n = "Left", s = (t < 3 ? [e, i, r, n] : [e + n, e + i, r + i, r + n]).map(function(a) {
    return t < 2 ? o + a : "border" + a + o;
  });
  Ae[t > 1 ? "border" + o : o] = function(a, u, l, f, h) {
    var _, d;
    if (arguments.length < 4)
      return _ = s.map(function(p) {
        return vt(a, p, l);
      }), d = _.join(" "), d.split(_[0]).length === 5 ? _[0] : d;
    _ = (f + "").split(" "), d = {}, s.forEach(function(p, c) {
      return d[p] = _[c] = _[c] || _[(c - 1) / 2 | 0];
    }), a.init(u, d, h);
  };
});
var $r = {
  name: "css",
  register: ni,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, i, r, n) {
    var s = this._props, a = t.style, u = i.vars.startAt, l, f, h, _, d, p, c, m, y, v, x, w, g, b, S, O;
    bi || ni(), this.styles = this.styles || Ur(t), O = this.styles.props, this.tween = i;
    for (c in e)
      if (c !== "autoRound" && (f = e[c], !(et[c] && Mr(c, e, i, r, t, n)))) {
        if (d = typeof f, p = Ae[c], d === "function" && (f = f.call(i, r, t, n), d = typeof f), d === "string" && ~f.indexOf("random(") && (f = he(f)), p)
          p(this, t, c, f, i) && (S = 1);
        else if (c.substr(0, 2) === "--")
          l = (getComputedStyle(t).getPropertyValue(c) + "").trim(), f += "", kt.lastIndex = 0, kt.test(l) || (m = $(l), y = $(f)), y ? m !== y && (l = Mt(t, c, l, y) + y) : m && (f += m), this.add(a, "setProperty", l, f, r, n, 0, 0, c), s.push(c), O.push(c, 0, a[c]);
        else if (d !== "undefined") {
          if (u && c in u ? (l = typeof u[c] == "function" ? u[c].call(i, r, t, n) : u[c], Y(l) && ~l.indexOf("random(") && (l = he(l)), $(l + "") || l === "auto" || (l += nt.units[c] || $(vt(t, c)) || ""), (l + "").charAt(1) === "=" && (l = vt(t, c))) : l = vt(t, c), _ = parseFloat(l), v = d === "string" && f.charAt(1) === "=" && f.substr(0, 2), v && (f = f.substr(2)), h = parseFloat(f), c in pt && (c === "autoAlpha" && (_ === 1 && vt(t, "visibility") === "hidden" && h && (_ = 0), O.push("visibility", 0, a.visibility), St(this, a, "visibility", _ ? "inherit" : "hidden", h ? "inherit" : "hidden", !h)), c !== "scale" && c !== "transform" && (c = pt[c], ~c.indexOf(",") && (c = c.split(",")[0]))), x = c in wt, x) {
            if (this.styles.save(c), d === "string" && f.substring(0, 6) === "var(--" && (f = ft(t, f.substring(4, f.indexOf(")"))), h = parseFloat(f)), w || (g = t._gsap, g.renderTransform && !e.parseTransform || me(t, e.parseTransform), b = e.smoothOrigin !== !1 && g.smooth, w = this._pt = new Q(this._pt, a, z, 0, 1, g.renderTransform, g, 0, -1), w.dep = 1), c === "scale")
              this._pt = new Q(this._pt, g, "scaleY", g.scaleY, (v ? Xt(g.scaleY, v + h) : h) - g.scaleY || 0, ii), this._pt.u = 0, s.push("scaleY", c), c += "X";
            else if (c === "transformOrigin") {
              O.push(J, 0, a[J]), f = os(f), g.svg ? si(t, f, 0, b, 0, this) : (y = parseFloat(f.split(" ")[2]) || 0, y !== g.zOrigin && St(this, g, "zOrigin", g.zOrigin, y), St(this, a, c, De(l), De(f)));
              continue;
            } else if (c === "svgOrigin") {
              si(t, f, 1, b, 0, this);
              continue;
            } else if (c in Yr) {
              fs(this, g, c, _, v ? Xt(_, v + f) : f);
              continue;
            } else if (c === "smoothOrigin") {
              St(this, g, "smooth", g.smooth, f);
              continue;
            } else if (c === "force3D") {
              g[c] = f;
              continue;
            } else if (c === "transform") {
              cs(this, f, t);
              continue;
            }
          } else c in a || (c = te(c) || c);
          if (x || (h || h === 0) && (_ || _ === 0) && !Xn.test(f) && c in a)
            m = (l + "").substr((_ + "").length), h || (h = 0), y = $(f) || (c in nt.units ? nt.units[c] : m), m !== y && (_ = Mt(t, c, l, y)), this._pt = new Q(this._pt, x ? g : a, c, _, (v ? Xt(_, v + h) : h) - _, !x && (y === "px" || c === "zIndex") && e.autoRound !== !1 ? Kn : ii), this._pt.u = y || 0, m !== y && y !== "%" && (this._pt.b = l, this._pt.r = jn);
          else if (c in a)
            ss.call(this, t, c, l, v ? v + f : f);
          else if (c in t)
            this.add(t, c, l || t[c], v ? v + f : f, r, n);
          else if (c !== "parseTransform") {
            _i(c, f);
            continue;
          }
          x || (c in a ? O.push(c, 0, a[c]) : typeof t[c] == "function" ? O.push(c, 2, t[c]()) : O.push(c, 1, l || t[c])), s.push(c);
        }
      }
    S && zr(this);
  },
  render: function(t, e) {
    if (e.tween._time || !Si())
      for (var i = e._pt; i; )
        i.r(t, i.d), i = i._next;
    else
      e.styles.revert();
  },
  get: vt,
  aliases: pt,
  getSetter: function(t, e, i) {
    var r = pt[e];
    return r && r.indexOf(",") < 0 && (e = r), e in wt && e !== J && (t._gsap.x || vt(t, "x")) ? i && Ni === i ? e === "scale" ? Jn : Qn : (Ni = i || {}) && (e === "scale" ? ts : es) : t.style && !fi(t.style[e]) ? Zn : ~e.indexOf("-") ? Hn : wi(t, e);
  },
  core: {
    _removeProperty: Bt,
    _getMatrix: ki
  }
};
tt.utils.checkPrefix = te;
tt.core.getStyleSaver = Ur;
(function(o, t, e, i) {
  var r = H(o + "," + t + "," + e, function(n) {
    wt[n] = 1;
  });
  H(t, function(n) {
    nt.units[n] = "deg", Yr[n] = 1;
  }), pt[r[13]] = o + "," + t, H(i, function(n) {
    var s = n.split(":");
    pt[s[1]] = r[s[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
H("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(o) {
  nt.units[o] = "px";
});
tt.registerPlugin($r);
var q = tt.registerPlugin($r) || tt;
q.core.Tween;
const ge = {
  fadeOutDuration: 0.4,
  fadeInDuration: 0.3,
  ease: "power2.out"
};
let Oe = !1, oe = !1;
function hs() {
  if (console.log("🎬 initLoadingScreen - Début de l'initialisation"), Oe)
    return console.log("ℹ️ Écran de chargement déjà initialisé"), Promise.resolve();
  const o = document.querySelector(".loadingscreen"), t = document.querySelector(".loading_logo_wrap");
  return console.log("🔍 Éléments trouvés:", {
    loadingScreen: !!o,
    logoWrap: !!t
  }), !o || !t ? (console.warn("⚠️ Éléments manquants:", {
    loadingScreen: o ? "OK" : "Non trouvé",
    logoWrap: t ? "OK" : "Non trouvé"
  }), Oe = !1, Promise.resolve(null)) : (console.log("🎨 Configuration des styles initiaux"), q.set(o, {
    opacity: 1,
    display: "flex",
    backgroundColor: "white"
  }), q.set(t, { opacity: 0, scale: 0.9 }), q.to(t, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    delay: 0.1,
    ease: ge.ease
  }), ms(), Oe = !0, console.log("✅ Écran de chargement initialisé avec succès"), Promise.resolve(o));
}
function _s() {
  if (console.log("🎬 hideLoadingScreen - Début du masquage"), !Oe) {
    console.warn("⚠️ Écran de chargement non initialisé");
    return;
  }
  if (oe) {
    console.log("ℹ️ Masquage déjà en cours");
    return;
  }
  oe = !0;
  const o = document.querySelector(".loadingscreen"), t = document.querySelector(".loading_logo_wrap");
  if (console.log("🔍 Éléments trouvés pour le masquage:", {
    loadingScreen: !!o,
    logoWrap: !!t
  }), !o || !t) {
    console.warn("⚠️ Éléments manquants pour le masquage"), oe = !1;
    return;
  }
  console.log("🎬 Démarrage de l'animation de masquage"), q.timeline({
    onComplete: () => {
      console.log("✅ Animation de masquage terminée"), q.set(o, { display: "none" }), oe = !1;
    }
  }).to(o, {
    opacity: 0,
    duration: ge.fadeOutDuration,
    ease: ge.ease
  });
}
function ds() {
  const o = document.querySelector(".loadingscreen");
  o && q.set(o, { display: "none" }), oe = !1;
}
function ps(o) {
  const t = document.querySelector(".loadingscreen");
  if (!t) {
    o();
    return;
  }
  q.timeline({ onComplete: o }).set(t, { display: "flex", opacity: 0, backgroundColor: "white" }).to(t, { opacity: 1, duration: ge.fadeInDuration, ease: ge.ease });
}
function ms() {
  document.addEventListener("click", (o) => {
    const t = o.target.closest("a");
    if (!t) return;
    const e = t.getAttribute("href"), i = t.getAttribute("target");
    !e || e.startsWith("#") || e.startsWith("http") || i === "_blank" || e.startsWith("mailto:") || e.startsWith("tel:") || (o.preventDefault(), ps(() => {
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
let we, Pi, oi = 0;
function gs() {
  oi = window.pageYOffset || document.documentElement.scrollTop, document.body.style.overflow = "hidden", document.body.style.position = "fixed", document.body.style.width = "100%", document.body.style.top = `-${oi}px`;
}
function ys() {
  document.body.style.overflow = "", document.body.style.position = "", document.body.style.width = "", document.body.style.top = "", window.scrollTo(0, oi);
}
function Ci(o) {
  o && (o.classList.add("is-open"), q.fromTo(o, { x: "100%" }, { x: "0%", duration: 0.4, ease: "power2.out" }));
}
function Mi(o, t) {
  o && q.to(o, {
    x: "100%",
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      o.classList.remove("is-open");
    }
  });
}
function ai() {
  document.querySelectorAll(_t.ALL_MENUS).forEach((o) => {
    o.classList.contains("is-open") && Mi(o);
  }), Pi.reverse(), ys();
}
function vs() {
  ai();
  const o = document.querySelector(_t.MAIN_MENU);
  Ci(o), Pi.play(), gs();
}
function xs(o) {
  const t = document.querySelector(_t.MAIN_MENU), e = document.querySelector(o);
  Mi(t), Ci(e);
}
function ws() {
  const o = document.querySelector(".is-open:not(#main-menu-mobile)"), t = document.querySelector(_t.MAIN_MENU);
  o && Mi(o), Ci(t);
}
function Ts() {
  var o;
  if (we = document.querySelector(_t.MENU_BUTTON), !!we) {
    Pi = q.timeline({ paused: !0 }).to(we, { rotation: 90, duration: 0.4, ease: "elastic.out(1, 0.5)" }), we.addEventListener("click", () => {
      document.querySelector(_t.ALL_MENUS + ".is-open") ? ai() : vs();
    });
    for (const t in _t.SUB_MENU_TRIGGERS)
      (o = document.querySelector(t)) == null || o.addEventListener("click", () => {
        xs(_t.SUB_MENU_TRIGGERS[t]);
      });
    document.querySelectorAll(_t.CLOSE_BUTTONS).forEach((t) => {
      t.addEventListener("click", ai);
    }), document.querySelectorAll(_t.BACK_BUTTONS).forEach((t) => {
      t.addEventListener("click", ws);
    });
  }
}
let Ye = !1;
async function ji(o, t) {
  if (!o || !o.classList.contains("is-open")) return;
  const e = o.querySelector(t.contentSelector), i = o.querySelector(t.arrowSelector);
  o.classList.remove("is-open");
  const r = q.timeline();
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
async function bs(o, t) {
  if (!o || o.classList.contains("is-open")) return;
  o.classList.add("is-open");
  const e = o.querySelector(t.contentSelector), i = o.querySelector(t.arrowSelector);
  q.set(e, {
    display: "block",
    height: "auto",
    opacity: 0
  });
  const r = e.scrollHeight, n = q.timeline();
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
async function Ss(o, t) {
  if (!Ye) {
    Ye = !0;
    try {
      if (o.classList.contains("is-open"))
        await ji(o, t);
      else {
        const i = document.querySelectorAll(`${t.itemSelector}.is-open`);
        await Promise.all(Array.from(i).map((n) => ji(n, t))), await bs(o, t);
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
      Ye = !1;
    }
  }
}
function jr(o) {
  const t = document.querySelectorAll(o.itemSelector);
  t.length !== 0 && t.forEach((e) => {
    const i = e.querySelector(o.triggerSelector), r = e.querySelector(o.contentSelector);
    !i || !r || (e.classList.contains("is-open") || q.set(r, { display: "none", height: 0 }), i.addEventListener("click", (n) => {
      n.preventDefault(), Ss(e, o);
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
function Os(o, t) {
  const e = t.getBoundingClientRect();
  return { x: -((o.clientX - e.left) / e.width * 2 - 1) };
}
function ks(o, t) {
  if (!t || t.classList.contains("is-open")) return;
  const i = Os(o, t).x * Pt.maxOffset;
  t.style.boxShadow = `${i}rem ${Pt.defaultVerticalOffset}rem 0 0 ${Pt.shadowColor}`;
}
function Ps(o, t) {
  !t || t.classList.contains("is-open") || q.to(t, {
    scale: Pt.scaleAmount,
    duration: Pt.scaleDuration,
    ease: Pt.scaleEase
  });
}
function Cs(o) {
  o && q.to(o, {
    scale: 1,
    duration: Pt.scaleDuration,
    ease: Pt.scaleEase,
    onComplete: () => {
      o.classList.contains("is-open") || (o.style.boxShadow = "");
    }
  });
}
function Ms(o) {
  o.addEventListener("mouseenter", (t) => Ps(t, o)), o.addEventListener("mousemove", (t) => ks(t, o)), o.addEventListener("mouseleave", () => Cs(o));
}
function Es() {
  const o = {
    itemSelector: ".centre-card_wrapper.effect-cartoon-shadow",
    triggerSelector: '.clickable_wrap[data-attribute="data-card-toggle"]',
    contentSelector: ".centre-card_scroll_wrapper",
    arrowSelector: ".svg-holder.arrow"
  };
  jr(o), document.querySelectorAll(o.itemSelector).forEach((e) => {
    Ms(e);
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
function Kr() {
  const o = document.querySelector(".span_mover");
  if (o)
    try {
      let i = function() {
        if (e) return;
        e = !0;
        const r = q.timeline({
          onComplete: () => {
            e = !1, q.to(o, {
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
        q.killTweensOf(o);
      });
    } catch (t) {
      console.error("Erreur dans l'animation de texte:", t);
    }
}
function Zr() {
  setTimeout(typeof q < "u" ? Kr : Zr, 100);
}
Zr();
console.log("🚀 faq-toggle.js v1.0.2 chargé – Système de FAQ avec animations GSAP");
async function As() {
  jr({
    itemSelector: ".faq_item.effect-cartoon-shadow",
    triggerSelector: ".faq_wrapper",
    contentSelector: ".faq_respond",
    arrowSelector: ".svg-holder.medium"
  });
}
console.log("🗺️ map-integration.js v2.0.0 chargé");
const ui = {
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
window.initGoogleMap = ui.initMap.bind(ui);
function Ds() {
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
    console.log("🗺️ Google Maps API déjà chargée."), ui.initMap();
    return;
  }
  console.log("🗺️ Chargement de l'API Google Maps...");
  const e = document.createElement("script");
  e.src = `https://maps.googleapis.com/maps/api/js?key=${t}&libraries=places,marker&callback=initGoogleMap`, e.async = !0, document.head.appendChild(e);
}
console.log("🔍 main_gsap.js - Module chargé et exécution commencée");
console.log("📦 main_gsap.js - Début du chargement");
function Rs() {
  document.querySelectorAll(".desktop_menu_wrapper, .parc_menu_desktop, .activites_menu_desktop, .offres_menu_desktop, .menu-mobile").forEach((o) => {
    o && o.classList.add("is-hidden");
  });
}
async function Ls() {
  console.log("🎬 Début de l'initialisation des modules");
  try {
    Rs(), console.log("✅ États initiaux définis via classes CSS");
    const o = await hs(), t = [
      Ts(),
      Es(),
      // initMenuDesktopHoverActivite(), // Appel commenté pour corriger l'erreur
      Kr(),
      As(),
      Ds()
    ];
    if (await Promise.all(t), console.log("✨ Tous les modules ont été initialisés"), document.getElementById("container-initial")) {
      console.log("🏝️ Page de réservation détectée, chargement du module...");
      try {
        const { SmileWorldReservation: i } = await import("./reservation-Cr334T4y.mjs");
        new i(), console.log("✅ Module de réservation chargé et initialisé.");
      } catch (i) {
        console.error("❌ Erreur lors du chargement du module de réservation:", i);
      }
    }
    o && _s();
  } catch (o) {
    console.error("❌ Erreur fatale lors de l'initialisation:", o), ds();
  }
}
window.Webflow = window.Webflow || [];
window.Webflow.push(Ls);
export {
  q as g
};
