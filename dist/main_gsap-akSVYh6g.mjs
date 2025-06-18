function yt(o) {
  if (o === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return o;
}
function nr(o, t) {
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
}, Jt = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, pi, X, R, ut = 1e8, P = 1 / ut, He = Math.PI * 2, fn = He / 4, hn = 0, sr = Math.sqrt, dn = Math.cos, _n = Math.sin, Y = function(t) {
  return typeof t == "string";
}, z = function(t) {
  return typeof t == "function";
}, wt = function(t) {
  return typeof t == "number";
}, mi = function(t) {
  return typeof t > "u";
}, mt = function(t) {
  return typeof t == "object";
}, H = function(t) {
  return t !== !1;
}, gi = function() {
  return typeof window < "u";
}, Te = function(t) {
  return z(t) || Y(t);
}, or = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, j = Array.isArray, Ze = /(?:-?\.?\d|\.)+/gi, ar = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, $t = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Ue = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, ur = /[+-]=-?[.\d]+/, lr = /[^,'"\[\]\s]+/gi, pn = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, L, ht, Qe, yi, st = {}, Ee = {}, cr, fr = function(t) {
  return (Ee = te(t, st)) && tt;
}, vi = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, _e = function(t, e) {
  return !e && console.warn(t);
}, hr = function(t, e) {
  return t && (st[t] = e) && Ee && (Ee[t] = e) || st;
}, pe = function() {
  return 0;
}, mn = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Oe = {
  suppressEvents: !0,
  kill: !1
}, gn = {
  suppressEvents: !0
}, wi = {}, kt = [], Je = {}, dr, et = {}, Ve = {}, zi = 30, Ce = [], bi = "", xi = function(t) {
  var e = t[0], i, r;
  if (mt(e) || z(e) || (t = [t]), !(i = (e._gsap || {}).harness)) {
    for (r = Ce.length; r-- && !Ce[r].targetTest(e); )
      ;
    i = Ce[r];
  }
  for (r = t.length; r--; )
    t[r] && (t[r]._gsap || (t[r]._gsap = new zr(t[r], i))) || t.splice(r, 1);
  return t;
}, qt = function(t) {
  return t._gsap || xi(lt(t))[0]._gsap;
}, _r = function(t, e, i) {
  return (i = t[e]) && z(i) ? t[e]() : mi(i) && t.getAttribute && t.getAttribute(e) || i;
}, Z = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, q = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, U = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, Kt = function(t, e) {
  var i = e.charAt(0), r = parseFloat(e.substr(2));
  return t = parseFloat(t), i === "+" ? t + r : i === "-" ? t - r : i === "*" ? t * r : t / r;
}, yn = function(t, e) {
  for (var i = e.length, r = 0; t.indexOf(e[r]) < 0 && ++r < i; )
    ;
  return r < i;
}, Ae = function() {
  var t = kt.length, e = kt.slice(0), i, r;
  for (Je = {}, kt.length = 0, i = 0; i < t; i++)
    r = e[i], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, Si = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, pr = function(t, e, i, r) {
  kt.length && !X && Ae(), t.render(e, i, !!(X && e < 0 && Si(t))), kt.length && !X && Ae();
}, mr = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(lr).length < 2 ? e : Y(t) ? t.trim() : t;
}, gr = function(t) {
  return t;
}, ot = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, vn = function(t) {
  return function(e, i) {
    for (var r in i)
      r in e || r === "duration" && t || r === "ease" || (e[r] = i[r]);
  };
}, te = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, qi = function o(t, e) {
  for (var i in e)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (t[i] = mt(e[i]) ? o(t[i] || (t[i] = {}), e[i]) : e[i]);
  return t;
}, De = function(t, e) {
  var i = {}, r;
  for (r in t)
    r in e || (i[r] = t[r]);
  return i;
}, fe = function(t) {
  var e = t.parent || L, i = t.keyframes ? vn(j(t.keyframes)) : ot;
  if (H(t.inherit))
    for (; e; )
      i(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, wn = function(t, e) {
  for (var i = t.length, r = i === e.length; r && i-- && t[i] === e[i]; )
    ;
  return i < 0;
}, yr = function(t, e, i, r, n) {
  var s = t[r], a;
  if (n)
    for (a = e[n]; s && s[n] > a; )
      s = s._prev;
  return s ? (e._next = s._next, s._next = e) : (e._next = t[i], t[i] = e), e._next ? e._next._prev = e : t[r] = e, e._prev = s, e.parent = e._dp = t, e;
}, qe = function(t, e, i, r) {
  i === void 0 && (i = "_first"), r === void 0 && (r = "_last");
  var n = e._prev, s = e._next;
  n ? n._next = s : t[i] === e && (t[i] = s), s ? s._prev = n : t[r] === e && (t[r] = n), e._next = e._prev = e.parent = null;
}, Mt = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, Nt = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var i = t; i; )
      i._dirty = 1, i = i.parent;
  return t;
}, bn = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, ti = function(t, e, i, r) {
  return t._startAt && (X ? t._startAt.revert(Oe) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, r));
}, xn = function o(t) {
  return !t || t._ts && o(t.parent);
}, Ni = function(t) {
  return t._repeat ? ee(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, ee = function(t, e) {
  var i = Math.floor(t = U(t / e));
  return t && i === t ? i - 1 : i;
}, Re = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, Ne = function(t) {
  return t._end = U(t._start + (t._tDur / Math.abs(t._ts || t._rts || P) || 0));
}, Be = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = U(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Ne(t), i._dirty || Nt(i, t)), t;
}, vr = function(t, e) {
  var i;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = Re(t.rawTime(), e), (!e._dur || xe(0, e.totalDuration(), i) - e._tTime > P) && e.render(i, !0)), Nt(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (i = t; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -P;
  }
}, _t = function(t, e, i, r) {
  return e.parent && Mt(e), e._start = U((wt(i) ? i : i || t !== L ? at(t, i, e) : t._time) + e._delay), e._end = U(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), yr(t, e, "_first", "_last", t._sort ? "_start" : 0), ei(e) || (t._recent = e), r || vr(t, e), t._ts < 0 && Be(t, t._tTime), t;
}, wr = function(t, e) {
  return (st.ScrollTrigger || vi("scrollTrigger", e)) && st.ScrollTrigger.create(e, t);
}, br = function(t, e, i, r, n) {
  if (ki(t, e, n), !t._initted)
    return 1;
  if (!i && t._pt && !X && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && dr !== it.frame)
    return kt.push(t), t._lazy = [n, r], 1;
}, Sn = function o(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || o(e));
}, ei = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, Tn = function(t, e, i, r) {
  var n = t.ratio, s = e < 0 || !e && (!t._start && Sn(t) && !(!t._initted && ei(t)) || (t._ts < 0 || t._dp._ts < 0) && !ei(t)) ? 0 : 1, a = t._rDelay, u = 0, l, c, h;
  if (a && t._repeat && (u = xe(0, t._tDur, e), c = ee(u, a), t._yoyo && c & 1 && (s = 1 - s), c !== ee(t._tTime, a) && (n = 1 - s, t.vars.repeatRefresh && t._initted && t.invalidate())), s !== n || X || r || t._zTime === P || !e && t._zTime) {
    if (!t._initted && br(t, e, r, i, u))
      return;
    for (h = t._zTime, t._zTime = e || (i ? P : 0), i || (i = e && !h), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = u, l = t._pt; l; )
      l.r(s, l.d), l = l._next;
    e < 0 && ti(t, e, i, !0), t._onUpdate && !i && rt(t, "onUpdate"), u && t._repeat && !i && t.parent && rt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === s && (s && Mt(t, 1), !i && !X && (rt(t, s ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, kn = function(t, e, i) {
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
}, ie = function(t, e, i, r) {
  var n = t._repeat, s = U(e) || 0, a = t._tTime / t._tDur;
  return a && !r && (t._time *= s / t._dur), t._dur = s, t._tDur = n ? n < 0 ? 1e10 : U(s * (n + 1) + t._rDelay * n) : s, a > 0 && !r && Be(t, t._tTime = t._tDur * a), t.parent && Ne(t), i || Nt(t.parent, t), t;
}, Bi = function(t) {
  return t instanceof K ? Nt(t) : ie(t, t._dur);
}, On = {
  _start: 0,
  endTime: pe,
  totalDuration: pe
}, at = function o(t, e, i) {
  var r = t.labels, n = t._recent || On, s = t.duration() >= ut ? n.endTime(!1) : t._dur, a, u, l;
  return Y(e) && (isNaN(e) || e in r) ? (u = e.charAt(0), l = e.substr(-1) === "%", a = e.indexOf("="), u === "<" || u === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (u === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (l ? (a < 0 ? n : i).totalDuration() / 100 : 1)) : a < 0 ? (e in r || (r[e] = s), r[e]) : (u = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), l && i && (u = u / 100 * (j(i) ? i[0] : i).totalDuration()), a > 1 ? o(t, e.substr(0, a - 1), i) + u : s + u)) : e == null ? s : +e;
}, he = function(t, e, i) {
  var r = wt(e[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), s = e[n], a, u;
  if (r && (s.duration = e[1]), s.parent = i, t) {
    for (a = s, u = i; u && !("immediateRender" in a); )
      a = u.vars.defaults || {}, u = H(u.vars.inherit) && u.parent;
    s.immediateRender = H(a.immediateRender), t < 2 ? s.runBackwards = 1 : s.startAt = e[n - 1];
  }
  return new B(e[0], s, e[n + 1]);
}, Et = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, xe = function(t, e, i) {
  return i < t ? t : i > e ? e : i;
}, $ = function(t, e) {
  return !Y(t) || !(e = pn.exec(t)) ? "" : e[1];
}, Cn = function(t, e, i) {
  return Et(i, function(r) {
    return xe(t, e, r);
  });
}, ii = [].slice, xr = function(t, e) {
  return t && mt(t) && "length" in t && (!e && !t.length || t.length - 1 in t && mt(t[0])) && !t.nodeType && t !== ht;
}, Mn = function(t, e, i) {
  return i === void 0 && (i = []), t.forEach(function(r) {
    var n;
    return Y(r) && !e || xr(r, 1) ? (n = i).push.apply(n, lt(r)) : i.push(r);
  }) || i;
}, lt = function(t, e, i) {
  return R && !e && R.selector ? R.selector(t) : Y(t) && !i && (Qe || !re()) ? ii.call((e || yi).querySelectorAll(t), 0) : j(t) ? Mn(t, i) : xr(t) ? ii.call(t, 0) : t ? [t] : [];
}, ri = function(t) {
  return t = lt(t)[0] || _e("Invalid scope") || {}, function(e) {
    var i = t.current || t.nativeElement || t;
    return lt(e, i.querySelectorAll ? i : i === t ? _e("Invalid scope") || yi.createElement("div") : t);
  };
}, Sr = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, Tr = function(t) {
  if (z(t))
    return t;
  var e = mt(t) ? t : {
    each: t
  }, i = Bt(e.ease), r = e.from || 0, n = parseFloat(e.base) || 0, s = {}, a = r > 0 && r < 1, u = isNaN(r) || a, l = e.axis, c = r, h = r;
  return Y(r) ? c = h = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !a && u && (c = r[0], h = r[1]), function(d, _, p) {
    var f = (p || e).length, m = s[f], y, v, w, b, g, S, T, k, x;
    if (!m) {
      if (x = e.grid === "auto" ? 0 : (e.grid || [1, ut])[1], !x) {
        for (T = -ut; T < (T = p[x++].getBoundingClientRect().left) && x < f; )
          ;
        x < f && x--;
      }
      for (m = s[f] = [], y = u ? Math.min(x, f) * c - 0.5 : r % x, v = x === ut ? 0 : u ? f * h / x - 0.5 : r / x | 0, T = 0, k = ut, S = 0; S < f; S++)
        w = S % x - y, b = v - (S / x | 0), m[S] = g = l ? Math.abs(l === "y" ? b : w) : sr(w * w + b * b), g > T && (T = g), g < k && (k = g);
      r === "random" && Sr(m), m.max = T - k, m.min = k, m.v = f = (parseFloat(e.amount) || parseFloat(e.each) * (x > f ? f - 1 : l ? l === "y" ? f / x : x : Math.max(x, f / x)) || 0) * (r === "edges" ? -1 : 1), m.b = f < 0 ? n - f : n, m.u = $(e.amount || e.each) || 0, i = i && f < 0 ? Lr(i) : i;
    }
    return f = (m[d] - m.min) / m.max || 0, U(m.b + (i ? i(f) : f) * m.v) + m.u;
  };
}, ni = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(i) {
    var r = U(Math.round(parseFloat(i) / t) * t * e);
    return (r - r % 1) / e + (wt(i) ? 0 : $(i));
  };
}, kr = function(t, e) {
  var i = j(t), r, n;
  return !i && mt(t) && (r = i = t.radius || ut, t.values ? (t = lt(t.values), (n = !wt(t[0])) && (r *= r)) : t = ni(t.increment)), Et(e, i ? z(t) ? function(s) {
    return n = t(s), Math.abs(n - s) <= r ? n : s;
  } : function(s) {
    for (var a = parseFloat(n ? s.x : s), u = parseFloat(n ? s.y : 0), l = ut, c = 0, h = t.length, d, _; h--; )
      n ? (d = t[h].x - a, _ = t[h].y - u, d = d * d + _ * _) : d = Math.abs(t[h] - a), d < l && (l = d, c = h);
    return c = !r || l <= r ? t[c] : s, n || c === s || wt(s) ? c : c + $(s);
  } : ni(t));
}, Or = function(t, e, i, r) {
  return Et(j(t) ? !e : i === !0 ? !!(i = 0) : !r, function() {
    return j(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + i * 0.99)) / i) * i * r) / r;
  });
}, Pn = function() {
  for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
    e[i] = arguments[i];
  return function(r) {
    return e.reduce(function(n, s) {
      return s(n);
    }, r);
  };
}, En = function(t, e) {
  return function(i) {
    return t(parseFloat(i)) + (e || $(i));
  };
}, An = function(t, e, i) {
  return Mr(t, e, 0, 1, i);
}, Cr = function(t, e, i) {
  return Et(i, function(r) {
    return t[~~e(r)];
  });
}, Dn = function o(t, e, i) {
  var r = e - t;
  return j(t) ? Cr(t, o(0, t.length), e) : Et(i, function(n) {
    return (r + (n - t) % r) % r + t;
  });
}, Rn = function o(t, e, i) {
  var r = e - t, n = r * 2;
  return j(t) ? Cr(t, o(0, t.length - 1), e) : Et(i, function(s) {
    return s = (n + (s - t) % n) % n || 0, t + (s > r ? n - s : s);
  });
}, me = function(t) {
  for (var e = 0, i = "", r, n, s, a; ~(r = t.indexOf("random(", e)); )
    s = t.indexOf(")", r), a = t.charAt(r + 7) === "[", n = t.substr(r + 7, s - r - 7).match(a ? lr : Ze), i += t.substr(e, r - e) + Or(a ? n : +n[0], a ? 0 : +n[1], +n[2] || 1e-5), e = s + 1;
  return i + t.substr(e, t.length - e);
}, Mr = function(t, e, i, r, n) {
  var s = e - t, a = r - i;
  return Et(n, function(u) {
    return i + ((u - t) / s * a || 0);
  });
}, Ln = function o(t, e, i, r) {
  var n = isNaN(t + e) ? 0 : function(_) {
    return (1 - _) * t + _ * e;
  };
  if (!n) {
    var s = Y(t), a = {}, u, l, c, h, d;
    if (i === !0 && (r = 1) && (i = null), s)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (j(t) && !j(e)) {
      for (c = [], h = t.length, d = h - 2, l = 1; l < h; l++)
        c.push(o(t[l - 1], t[l]));
      h--, n = function(p) {
        p *= h;
        var f = Math.min(d, ~~p);
        return c[f](p - f);
      }, i = e;
    } else r || (t = te(j(t) ? [] : {}, t));
    if (!c) {
      for (u in e)
        Ti.call(a, t, u, "get", e[u]);
      n = function(p) {
        return Mi(p, a) || (s ? t.p : t);
      };
    }
  }
  return Et(i, n);
}, Ui = function(t, e, i) {
  var r = t.labels, n = ut, s, a, u;
  for (s in r)
    a = r[s] - e, a < 0 == !!i && a && n > (a = Math.abs(a)) && (u = s, n = a);
  return u;
}, rt = function(t, e, i) {
  var r = t.vars, n = r[e], s = R, a = t._ctx, u, l, c;
  if (n)
    return u = r[e + "Params"], l = r.callbackScope || t, i && kt.length && Ae(), a && (R = a), c = u ? n.apply(l, u) : n.call(l), R = s, c;
}, ue = function(t) {
  return Mt(t), t.scrollTrigger && t.scrollTrigger.kill(!!X), t.progress() < 1 && rt(t, "onInterrupt"), t;
}, jt, Pr = [], Er = function(t) {
  if (t)
    if (t = !t.name && t.default || t, gi() || t.headless) {
      var e = t.name, i = z(t), r = e && !i && t.init ? function() {
        this._props = [];
      } : t, n = {
        init: pe,
        render: Mi,
        add: Ti,
        kill: Hn,
        modifier: Kn,
        rawVars: 0
      }, s = {
        targetTest: 0,
        get: 0,
        getSetter: Ci,
        aliases: {},
        register: 0
      };
      if (re(), t !== r) {
        if (et[e])
          return;
        ot(r, ot(De(t, n), s)), te(r.prototype, te(n, De(t, s))), et[r.prop = e] = r, t.targetTest && (Ce.push(r), wi[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      hr(e, r), t.register && t.register(tt, r, Q);
    } else
      Pr.push(t);
}, M = 255, le = {
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
}, We = function(t, e, i) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : t * 3 < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * M + 0.5 | 0;
}, Ar = function(t, e, i) {
  var r = t ? wt(t) ? [t >> 16, t >> 8 & M, t & M] : 0 : le.black, n, s, a, u, l, c, h, d, _, p;
  if (!r) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), le[t])
      r = le[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (n = t.charAt(1), s = t.charAt(2), a = t.charAt(3), t = "#" + n + n + s + s + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return r = parseInt(t.substr(1, 6), 16), [r >> 16, r >> 8 & M, r & M, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), r = [t >> 16, t >> 8 & M, t & M];
    } else if (t.substr(0, 3) === "hsl") {
      if (r = p = t.match(Ze), !e)
        u = +r[0] % 360 / 360, l = +r[1] / 100, c = +r[2] / 100, s = c <= 0.5 ? c * (l + 1) : c + l - c * l, n = c * 2 - s, r.length > 3 && (r[3] *= 1), r[0] = We(u + 1 / 3, n, s), r[1] = We(u, n, s), r[2] = We(u - 1 / 3, n, s);
      else if (~t.indexOf("="))
        return r = t.match(ar), i && r.length < 4 && (r[3] = 1), r;
    } else
      r = t.match(Ze) || le.transparent;
    r = r.map(Number);
  }
  return e && !p && (n = r[0] / M, s = r[1] / M, a = r[2] / M, h = Math.max(n, s, a), d = Math.min(n, s, a), c = (h + d) / 2, h === d ? u = l = 0 : (_ = h - d, l = c > 0.5 ? _ / (2 - h - d) : _ / (h + d), u = h === n ? (s - a) / _ + (s < a ? 6 : 0) : h === s ? (a - n) / _ + 2 : (n - s) / _ + 4, u *= 60), r[0] = ~~(u + 0.5), r[1] = ~~(l * 100 + 0.5), r[2] = ~~(c * 100 + 0.5)), i && r.length < 4 && (r[3] = 1), r;
}, Dr = function(t) {
  var e = [], i = [], r = -1;
  return t.split(Ot).forEach(function(n) {
    var s = n.match($t) || [];
    e.push.apply(e, s), i.push(r += s.length + 1);
  }), e.c = i, e;
}, Vi = function(t, e, i) {
  var r = "", n = (t + r).match(Ot), s = e ? "hsla(" : "rgba(", a = 0, u, l, c, h;
  if (!n)
    return t;
  if (n = n.map(function(d) {
    return (d = Ar(d, e, 1)) && s + (e ? d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : d.join(",")) + ")";
  }), i && (c = Dr(t), u = i.c, u.join(r) !== c.c.join(r)))
    for (l = t.replace(Ot, "1").split($t), h = l.length - 1; a < h; a++)
      r += l[a] + (~u.indexOf(a) ? n.shift() || s + "0,0,0,0)" : (c.length ? c : n.length ? n : i).shift());
  if (!l)
    for (l = t.split(Ot), h = l.length - 1; a < h; a++)
      r += l[a] + n[a];
  return r + l[h];
}, Ot = function() {
  var o = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in le)
    o += "|" + t + "\\b";
  return new RegExp(o + ")", "gi");
}(), In = /hsl[a]?\(/, Rr = function(t) {
  var e = t.join(" "), i;
  if (Ot.lastIndex = 0, Ot.test(e))
    return i = In.test(e), t[1] = Vi(t[1], i), t[0] = Vi(t[0], i, Dr(t[1])), !0;
}, ge, it = function() {
  var o = Date.now, t = 500, e = 33, i = o(), r = i, n = 1e3 / 240, s = n, a = [], u, l, c, h, d, _, p = function f(m) {
    var y = o() - r, v = m === !0, w, b, g, S;
    if ((y > t || y < 0) && (i += y - e), r += y, g = r - i, w = g - s, (w > 0 || v) && (S = ++h.frame, d = g - h.time * 1e3, h.time = g = g / 1e3, s += w + (w >= n ? 4 : n - w), b = 1), v || (u = l(f)), b)
      for (_ = 0; _ < a.length; _++)
        a[_](g, d, S, m);
  };
  return h = {
    time: 0,
    frame: 0,
    tick: function() {
      p(!0);
    },
    deltaRatio: function(m) {
      return d / (1e3 / (m || 60));
    },
    wake: function() {
      cr && (!Qe && gi() && (ht = Qe = window, yi = ht.document || {}, st.gsap = tt, (ht.gsapVersions || (ht.gsapVersions = [])).push(tt.version), fr(Ee || ht.GreenSockGlobals || !ht.gsap && ht || {}), Pr.forEach(Er)), c = typeof requestAnimationFrame < "u" && requestAnimationFrame, u && h.sleep(), l = c || function(m) {
        return setTimeout(m, s - h.time * 1e3 + 1 | 0);
      }, ge = 1, p(2));
    },
    sleep: function() {
      (c ? cancelAnimationFrame : clearTimeout)(u), ge = 0, l = pe;
    },
    lagSmoothing: function(m, y) {
      t = m || 1 / 0, e = Math.min(y || 33, t);
    },
    fps: function(m) {
      n = 1e3 / (m || 240), s = h.time * 1e3 + n;
    },
    add: function(m, y, v) {
      var w = y ? function(b, g, S, T) {
        m(b, g, S, T), h.remove(w);
      } : m;
      return h.remove(m), a[v ? "unshift" : "push"](w), re(), w;
    },
    remove: function(m, y) {
      ~(y = a.indexOf(m)) && a.splice(y, 1) && _ >= y && _--;
    },
    _listeners: a
  }, h;
}(), re = function() {
  return !ge && it.wake();
}, O = {}, Fn = /^[\d.\-M][\d.\-,\s]/, zn = /["']/g, qn = function(t) {
  for (var e = {}, i = t.substr(1, t.length - 3).split(":"), r = i[0], n = 1, s = i.length, a, u, l; n < s; n++)
    u = i[n], a = n !== s - 1 ? u.lastIndexOf(",") : u.length, l = u.substr(0, a), e[r] = isNaN(l) ? l.replace(zn, "").trim() : +l, r = u.substr(a + 1).trim();
  return e;
}, Nn = function(t) {
  var e = t.indexOf("(") + 1, i = t.indexOf(")"), r = t.indexOf("(", e);
  return t.substring(e, ~r && r < i ? t.indexOf(")", i + 1) : i);
}, Bn = function(t) {
  var e = (t + "").split("("), i = O[e[0]];
  return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [qn(e[1])] : Nn(t).split(",").map(mr)) : O._CE && Fn.test(t) ? O._CE("", t) : i;
}, Lr = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, Ir = function o(t, e) {
  for (var i = t._first, r; i; )
    i instanceof K ? o(i, e) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== e && (i.timeline ? o(i.timeline, e) : (r = i._ease, i._ease = i._yEase, i._yEase = r, i._yoyo = e)), i = i._next;
}, Bt = function(t, e) {
  return t && (z(t) ? t : O[t] || Bn(t)) || e;
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
}, Fr = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, Ye = function o(t, e, i) {
  var r = e >= 1 ? e : 1, n = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), s = n / He * (Math.asin(1 / r) || 0), a = function(c) {
    return c === 1 ? 1 : r * Math.pow(2, -10 * c) * _n((c - s) * n) + 1;
  }, u = t === "out" ? a : t === "in" ? function(l) {
    return 1 - a(1 - l);
  } : Fr(a);
  return n = He / n, u.config = function(l, c) {
    return o(t, l, c);
  }, u;
}, Ge = function o(t, e) {
  e === void 0 && (e = 1.70158);
  var i = function(s) {
    return s ? --s * s * ((e + 1) * s + e) + 1 : 0;
  }, r = t === "out" ? i : t === "in" ? function(n) {
    return 1 - i(1 - n);
  } : Fr(i);
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
Gt("Elastic", Ye("in"), Ye("out"), Ye());
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
  return -(sr(1 - o * o) - 1);
});
Gt("Sine", function(o) {
  return o === 1 ? 1 : -dn(o * fn) + 1;
});
Gt("Back", Ge("in"), Ge("out"), Ge());
O.SteppedEase = O.steps = st.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var i = 1 / t, r = t + (e ? 0 : 1), n = e ? 1 : 0, s = 1 - P;
    return function(a) {
      return ((r * xe(0, s, a) | 0) + n) * i;
    };
  }
};
Jt.ease = O["quad.out"];
Z("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(o) {
  return bi += o + "," + o + "Params,";
});
var zr = function(t, e) {
  this.id = hn++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : _r, this.set = e ? e.getSetter : Ci;
}, ye = /* @__PURE__ */ function() {
  function o(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, ie(this, +e.duration, 1, 1), this.data = e.data, R && (this._ctx = R, R.data.push(this)), ge || it.wake();
  }
  var t = o.prototype;
  return t.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, t.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, ie(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(i, r) {
    if (re(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (Be(this, i), !n._dp || n.parent || vr(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && _t(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !r || this._initted && Math.abs(this._zTime) === P || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), pr(this, i, r)), this;
  }, t.time = function(i, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + Ni(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), r) : this._time;
  }, t.totalProgress = function(i, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(i, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + Ni(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(i, r) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * n, r) : this._repeat ? ee(this._tTime, n) + 1 : 1;
  }, t.timeScale = function(i, r) {
    if (!arguments.length)
      return this._rts === -P ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var n = this.parent && this._ts ? Re(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -P ? 0 : this._rts, this.totalTime(xe(-Math.abs(this._delay), this.totalDuration(), n), r !== !1), Ne(this), bn(this);
  }, t.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (re(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== P && (this._tTime -= P)))), this) : this._ps;
  }, t.startTime = function(i) {
    if (arguments.length) {
      this._start = i;
      var r = this.parent || this._dp;
      return r && (r._sort || !this.parent) && _t(r, this, i - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(i) {
    return this._start + (H(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(i) {
    var r = this.parent || this._dp;
    return r ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Re(r.rawTime(i), this) : this._tTime : this._tTime;
  }, t.revert = function(i) {
    i === void 0 && (i = gn);
    var r = X;
    return X = i, Si(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), X = r, this;
  }, t.globalTime = function(i) {
    for (var r = this, n = arguments.length ? i : r.rawTime(); r; )
      n = r._start + n / (Math.abs(r._ts) || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : n;
  }, t.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, Bi(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(i) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = i, Bi(this), r ? this.time(r) : this;
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
      var s = z(i) ? i : gr, a = function() {
        var l = r.then;
        r.then = null, z(s) && (s = s(r)) && (s.then || s === r) && (r.then = l), n(s), r.then = l;
      };
      r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? a() : r._prom = a;
    });
  }, t.kill = function() {
    ue(this);
  }, o;
}();
ot(ye.prototype, {
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
  nr(t, o);
  function t(i, r) {
    var n;
    return i === void 0 && (i = {}), n = o.call(this, i) || this, n.labels = {}, n.smoothChildTiming = !!i.smoothChildTiming, n.autoRemoveChildren = !!i.autoRemoveChildren, n._sort = H(i.sortChildren), L && _t(i.parent || L, yt(n), r), i.reversed && n.reverse(), i.paused && n.paused(!0), i.scrollTrigger && wr(yt(n), i.scrollTrigger), n;
  }
  var e = t.prototype;
  return e.to = function(r, n, s) {
    return he(0, arguments, this), this;
  }, e.from = function(r, n, s) {
    return he(1, arguments, this), this;
  }, e.fromTo = function(r, n, s, a) {
    return he(2, arguments, this), this;
  }, e.set = function(r, n, s) {
    return n.duration = 0, n.parent = this, fe(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new B(r, n, at(this, s), 1), this;
  }, e.call = function(r, n, s) {
    return _t(this, B.delayedCall(0, r, n), s);
  }, e.staggerTo = function(r, n, s, a, u, l, c) {
    return s.duration = n, s.stagger = s.stagger || a, s.onComplete = l, s.onCompleteParams = c, s.parent = this, new B(r, s, at(this, u)), this;
  }, e.staggerFrom = function(r, n, s, a, u, l, c) {
    return s.runBackwards = 1, fe(s).immediateRender = H(s.immediateRender), this.staggerTo(r, n, s, a, u, l, c);
  }, e.staggerFromTo = function(r, n, s, a, u, l, c, h) {
    return a.startAt = s, fe(a).immediateRender = H(a.immediateRender), this.staggerTo(r, n, a, u, l, c, h);
  }, e.render = function(r, n, s) {
    var a = this._time, u = this._dirty ? this.totalDuration() : this._tDur, l = this._dur, c = r <= 0 ? 0 : U(r), h = this._zTime < 0 != r < 0 && (this._initted || !l), d, _, p, f, m, y, v, w, b, g, S, T;
    if (this !== L && c > u && r >= 0 && (c = u), c !== this._tTime || s || h) {
      if (a !== this._time && l && (c += this._time - a, r += this._time - a), d = c, b = this._start, w = this._ts, y = !w, h && (l || (a = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (S = this._yoyo, m = l + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(m * 100 + r, n, s);
        if (d = U(c % m), c === u ? (f = this._repeat, d = l) : (g = U(c / m), f = ~~g, f && f === g && (d = l, f--), d > l && (d = l)), g = ee(this._tTime, m), !a && this._tTime && g !== f && this._tTime - g * m - this._dur <= 0 && (g = f), S && f & 1 && (d = l - d, T = 1), f !== g && !this._lock) {
          var k = S && g & 1, x = k === (S && f & 1);
          if (f < g && (k = !k), a = k ? 0 : c % l ? l : c, this._lock = 1, this.render(a || (T ? 0 : U(f * m)), n, !l)._lock = 0, this._tTime = c, !n && this.parent && rt(this, "onRepeat"), this.vars.repeatRefresh && !T && (this.invalidate()._lock = 1), a && a !== this._time || y !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (l = this._dur, u = this._tDur, x && (this._lock = 2, a = k ? l : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !T && this.invalidate()), this._lock = 0, !this._ts && !y)
            return this;
          Ir(this, T);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (v = kn(this, U(a), U(d)), v && (c -= d - (d = v._start))), this._tTime = c, this._time = d, this._act = !w, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, a = 0), !a && c && !n && !g && (rt(this, "onStart"), this._tTime !== c))
        return this;
      if (d >= a && r >= 0)
        for (_ = this._first; _; ) {
          if (p = _._next, (_._act || d >= _._start) && _._ts && v !== _) {
            if (_.parent !== this)
              return this.render(r, n, s);
            if (_.render(_._ts > 0 ? (d - _._start) * _._ts : (_._dirty ? _.totalDuration() : _._tDur) + (d - _._start) * _._ts, n, s), d !== this._time || !this._ts && !y) {
              v = 0, p && (c += this._zTime = -P);
              break;
            }
          }
          _ = p;
        }
      else {
        _ = this._last;
        for (var C = r < 0 ? r : d; _; ) {
          if (p = _._prev, (_._act || C <= _._end) && _._ts && v !== _) {
            if (_.parent !== this)
              return this.render(r, n, s);
            if (_.render(_._ts > 0 ? (C - _._start) * _._ts : (_._dirty ? _.totalDuration() : _._tDur) + (C - _._start) * _._ts, n, s || X && Si(_)), d !== this._time || !this._ts && !y) {
              v = 0, p && (c += this._zTime = C ? -P : P);
              break;
            }
          }
          _ = p;
        }
      }
      if (v && !n && (this.pause(), v.render(d >= a ? 0 : -P)._zTime = d >= a ? 1 : -1, this._ts))
        return this._start = b, Ne(this), this.render(r, n, s);
      this._onUpdate && !n && rt(this, "onUpdate", !0), (c === u && this._tTime >= this.totalDuration() || !c && a) && (b === this._start || Math.abs(w) !== Math.abs(this._ts)) && (this._lock || ((r || !l) && (c === u && this._ts > 0 || !c && this._ts < 0) && Mt(this, 1), !n && !(r < 0 && !a) && (c || a || !u) && (rt(this, c === u && r >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(c < u && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(r, n) {
    var s = this;
    if (wt(n) || (n = at(this, n, r)), !(r instanceof ye)) {
      if (j(r))
        return r.forEach(function(a) {
          return s.add(a, n);
        }), this;
      if (Y(r))
        return this.addLabel(r, n);
      if (z(r))
        r = B.delayedCall(0, r);
      else
        return this;
    }
    return this !== r ? _t(this, r, n) : this;
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
    return Y(r) ? this.removeLabel(r) : z(r) ? this.killTweensOf(r) : (r.parent === this && qe(this, r), r === this._recent && (this._recent = this._last), Nt(this));
  }, e.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = U(it.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), o.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(r, n) {
    return this.labels[r] = at(this, n), this;
  }, e.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, e.addPause = function(r, n, s) {
    var a = B.delayedCall(0, n || pe, s);
    return a.data = "isPause", this._hasPause = 1, _t(this, a, at(this, r));
  }, e.removePause = function(r) {
    var n = this._first;
    for (r = at(this, r); n; )
      n._start === r && n.data === "isPause" && Mt(n), n = n._next;
  }, e.killTweensOf = function(r, n, s) {
    for (var a = this.getTweensOf(r, s), u = a.length; u--; )
      xt !== a[u] && a[u].kill(r, n);
    return this;
  }, e.getTweensOf = function(r, n) {
    for (var s = [], a = lt(r), u = this._first, l = wt(n), c; u; )
      u instanceof B ? yn(u._targets, a) && (l ? (!xt || u._initted && u._ts) && u.globalTime(0) <= n && u.globalTime(u.totalDuration()) > n : !n || u.isActive()) && s.push(u) : (c = u.getTweensOf(a, n)).length && s.push.apply(s, c), u = u._next;
    return s;
  }, e.tweenTo = function(r, n) {
    n = n || {};
    var s = this, a = at(s, r), u = n, l = u.startAt, c = u.onStart, h = u.onStartParams, d = u.immediateRender, _, p = B.to(s, ot({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: n.duration || Math.abs((a - (l && "time" in l ? l.time : s._time)) / s.timeScale()) || P,
      onStart: function() {
        if (s.pause(), !_) {
          var m = n.duration || Math.abs((a - (l && "time" in l ? l.time : s._time)) / s.timeScale());
          p._dur !== m && ie(p, m, 0, 1).render(p._time, !0, !0), _ = 1;
        }
        c && c.apply(p, h || []);
      }
    }, n));
    return d ? p.render(0) : p;
  }, e.tweenFromTo = function(r, n, s) {
    return this.tweenTo(n, ot({
      startAt: {
        time: at(this, r)
      }
    }, s));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(r) {
    return r === void 0 && (r = this._time), Ui(this, at(this, r));
  }, e.previousLabel = function(r) {
    return r === void 0 && (r = this._time), Ui(this, at(this, r), 1);
  }, e.currentLabel = function(r) {
    return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + P);
  }, e.shiftChildren = function(r, n, s) {
    s === void 0 && (s = 0);
    for (var a = this._first, u = this.labels, l; a; )
      a._start >= s && (a._start += r, a._end += r), a = a._next;
    if (n)
      for (l in u)
        u[l] >= s && (u[l] += r);
    return Nt(this);
  }, e.invalidate = function(r) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(r), n = n._next;
    return o.prototype.invalidate.call(this, r);
  }, e.clear = function(r) {
    r === void 0 && (r = !0);
    for (var n = this._first, s; n; )
      s = n._next, this.remove(n), n = s;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), Nt(this);
  }, e.totalDuration = function(r) {
    var n = 0, s = this, a = s._last, u = ut, l, c, h;
    if (arguments.length)
      return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -r : r));
    if (s._dirty) {
      for (h = s.parent; a; )
        l = a._prev, a._dirty && a.totalDuration(), c = a._start, c > u && s._sort && a._ts && !s._lock ? (s._lock = 1, _t(s, a, c - a._delay, 1)._lock = 0) : u = c, c < 0 && a._ts && (n -= c, (!h && !s._dp || h && h.smoothChildTiming) && (s._start += c / s._ts, s._time -= c, s._tTime -= c), s.shiftChildren(-c, !1, -1 / 0), u = 0), a._end > n && a._ts && (n = a._end), a = l;
      ie(s, s === L && s._time > n ? s._time : n, 1, 1), s._dirty = 0;
    }
    return s._tDur;
  }, t.updateRoot = function(r) {
    if (L._ts && (pr(L, Re(r, L)), dr = it.frame), it.frame >= zi) {
      zi += nt.autoSleep || 120;
      var n = L._first;
      if ((!n || !n._ts) && nt.autoSleep && it._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || it.sleep();
      }
    }
  }, t;
}(ye);
ot(K.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Un = function(t, e, i, r, n, s, a) {
  var u = new Q(this._pt, t, e, 0, 1, Wr, null, n), l = 0, c = 0, h, d, _, p, f, m, y, v;
  for (u.b = i, u.e = r, i += "", r += "", (y = ~r.indexOf("random(")) && (r = me(r)), s && (v = [i, r], s(v, t, e), i = v[0], r = v[1]), d = i.match(Ue) || []; h = Ue.exec(r); )
    p = h[0], f = r.substring(l, h.index), _ ? _ = (_ + 1) % 5 : f.substr(-5) === "rgba(" && (_ = 1), p !== d[c++] && (m = parseFloat(d[c - 1]) || 0, u._pt = {
      _next: u._pt,
      p: f || c === 1 ? f : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: m,
      c: p.charAt(1) === "=" ? Kt(m, p) - m : parseFloat(p) - m,
      m: _ && _ < 4 ? Math.round : 0
    }, l = Ue.lastIndex);
  return u.c = l < r.length ? r.substring(l, r.length) : "", u.fp = a, (ur.test(r) || y) && (u.e = 0), this._pt = u, u;
}, Ti = function(t, e, i, r, n, s, a, u, l, c) {
  z(r) && (r = r(n || 0, t, s));
  var h = t[e], d = i !== "get" ? i : z(h) ? l ? t[e.indexOf("set") || !z(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l) : t[e]() : h, _ = z(h) ? l ? Xn : Ur : Oi, p;
  if (Y(r) && (~r.indexOf("random(") && (r = me(r)), r.charAt(1) === "=" && (p = Kt(d, r) + ($(d) || 0), (p || p === 0) && (r = p))), !c || d !== r || si)
    return !isNaN(d * r) && r !== "" ? (p = new Q(this._pt, t, e, +d || 0, r - (d || 0), typeof h == "boolean" ? jn : Vr, 0, _), l && (p.fp = l), a && p.modifier(a, this, t), this._pt = p) : (!h && !(e in t) && vi(e, r), Un.call(this, t, e, d, r, _, u || nt.stringFilter, l));
}, Vn = function(t, e, i, r, n) {
  if (z(t) && (t = de(t, n, e, i, r)), !mt(t) || t.style && t.nodeType || j(t) || or(t))
    return Y(t) ? de(t, n, e, i, r) : t;
  var s = {}, a;
  for (a in t)
    s[a] = de(t[a], n, e, i, r);
  return s;
}, qr = function(t, e, i, r, n, s) {
  var a, u, l, c;
  if (et[t] && (a = new et[t]()).init(n, a.rawVars ? e[t] : Vn(e[t], r, n, s, i), i, r, s) !== !1 && (i._pt = u = new Q(i._pt, n, t, 0, 1, a.render, a, 0, a.priority), i !== jt))
    for (l = i._ptLookup[i._targets.indexOf(n)], c = a._props.length; c--; )
      l[a._props[c]] = u;
  return a;
}, xt, si, ki = function o(t, e, i) {
  var r = t.vars, n = r.ease, s = r.startAt, a = r.immediateRender, u = r.lazy, l = r.onUpdate, c = r.runBackwards, h = r.yoyoEase, d = r.keyframes, _ = r.autoRevert, p = t._dur, f = t._startAt, m = t._targets, y = t.parent, v = y && y.data === "nested" ? y.vars.targets : m, w = t._overwrite === "auto" && !pi, b = t.timeline, g, S, T, k, x, C, D, E, A, G, V, N, W;
  if (b && (!d || !n) && (n = "none"), t._ease = Bt(n, Jt.ease), t._yEase = h ? Lr(Bt(h === !0 ? n : h, Jt.ease)) : 0, h && t._yoyo && !t._repeat && (h = t._yEase, t._yEase = t._ease, t._ease = h), t._from = !b && !!r.runBackwards, !b || d && !r.stagger) {
    if (E = m[0] ? qt(m[0]).harness : 0, N = E && r[E.prop], g = De(r, wi), f && (f._zTime < 0 && f.progress(1), e < 0 && c && a && !_ ? f.render(-1, !0) : f.revert(c && p ? Oe : mn), f._lazy = 0), s) {
      if (Mt(t._startAt = B.set(m, ot({
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
      }, s))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (X || !a && !_) && t._startAt.revert(Oe), a && p && e <= 0 && i <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (c && p && !f) {
      if (e && (a = !1), T = ot({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !f && H(u),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: y
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, g), N && (T[E.prop] = N), Mt(t._startAt = B.set(m, T)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (X ? t._startAt.revert(Oe) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        o(t._startAt, P, P);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, u = p && H(u) || u && !p, S = 0; S < m.length; S++) {
      if (x = m[S], D = x._gsap || xi(m)[S]._gsap, t._ptLookup[S] = G = {}, Je[D.id] && kt.length && Ae(), V = v === m ? S : v.indexOf(x), E && (A = new E()).init(x, N || g, t, V, v) !== !1 && (t._pt = k = new Q(t._pt, x, A.name, 0, 1, A.render, A, 0, A.priority), A._props.forEach(function(ft) {
        G[ft] = k;
      }), A.priority && (C = 1)), !E || N)
        for (T in g)
          et[T] && (A = qr(T, g, t, V, x, v)) ? A.priority && (C = 1) : G[T] = k = Ti.call(t, x, T, "get", g[T], V, v, 0, r.stringFilter);
      t._op && t._op[S] && t.kill(x, t._op[S]), w && t._pt && (xt = t, L.killTweensOf(x, G, t.globalTime(e)), W = !t.parent, xt = 0), t._pt && u && (Je[D.id] = 1);
    }
    C && Yr(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = l, t._initted = (!t._op || t._pt) && !W, d && e <= 0 && b.render(ut, !0, !0);
}, Wn = function(t, e, i, r, n, s, a, u) {
  var l = (t._pt && t._ptCache || (t._ptCache = {}))[e], c, h, d, _;
  if (!l)
    for (l = t._ptCache[e] = [], d = t._ptLookup, _ = t._targets.length; _--; ) {
      if (c = d[_][e], c && c.d && c.d._pt)
        for (c = c.d._pt; c && c.p !== e && c.fp !== e; )
          c = c._next;
      if (!c)
        return si = 1, t.vars[e] = "+=0", ki(t, a), si = 0, u ? _e(e + " not eligible for reset") : 1;
      l.push(c);
    }
  for (_ = l.length; _--; )
    h = l[_], c = h._pt || h, c.s = (r || r === 0) && !n ? r : c.s + (r || 0) + s * c.c, c.c = i - c.s, h.e && (h.e = q(i) + $(h.e)), h.b && (h.b = c.s + $(h.b));
}, Yn = function(t, e) {
  var i = t[0] ? qt(t[0]).harness : 0, r = i && i.aliases, n, s, a, u;
  if (!r)
    return e;
  n = te({}, e);
  for (s in r)
    if (s in n)
      for (u = r[s].split(","), a = u.length; a--; )
        n[u[a]] = n[s];
  return n;
}, Gn = function(t, e, i, r) {
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
}, de = function(t, e, i, r, n) {
  return z(t) ? t.call(e, i, r, n) : Y(t) && ~t.indexOf("random(") ? me(t) : t;
}, Nr = bi + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Br = {};
Z(Nr + ",id,stagger,delay,duration,paused,scrollTrigger", function(o) {
  return Br[o] = 1;
});
var B = /* @__PURE__ */ function(o) {
  nr(t, o);
  function t(i, r, n, s) {
    var a;
    typeof r == "number" && (n.duration = r, r = n, n = null), a = o.call(this, s ? r : fe(r)) || this;
    var u = a.vars, l = u.duration, c = u.delay, h = u.immediateRender, d = u.stagger, _ = u.overwrite, p = u.keyframes, f = u.defaults, m = u.scrollTrigger, y = u.yoyoEase, v = r.parent || L, w = (j(i) || or(i) ? wt(i[0]) : "length" in r) ? [i] : lt(i), b, g, S, T, k, x, C, D;
    if (a._targets = w.length ? xi(w) : _e("GSAP target " + i + " not found. https://gsap.com", !nt.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = _, p || d || Te(l) || Te(c)) {
      if (r = a.vars, b = a.timeline = new K({
        data: "nested",
        defaults: f || {},
        targets: v && v.data === "nested" ? v.vars.targets : w
      }), b.kill(), b.parent = b._dp = yt(a), b._start = 0, d || Te(l) || Te(c)) {
        if (T = w.length, C = d && Tr(d), mt(d))
          for (k in d)
            ~Nr.indexOf(k) && (D || (D = {}), D[k] = d[k]);
        for (g = 0; g < T; g++)
          S = De(r, Br), S.stagger = 0, y && (S.yoyoEase = y), D && te(S, D), x = w[g], S.duration = +de(l, yt(a), g, x, w), S.delay = (+de(c, yt(a), g, x, w) || 0) - a._delay, !d && T === 1 && S.delay && (a._delay = c = S.delay, a._start += c, S.delay = 0), b.to(x, S, C ? C(g, x, w) : 0), b._ease = O.none;
        b.duration() ? l = c = 0 : a.timeline = 0;
      } else if (p) {
        fe(ot(b.vars.defaults, {
          ease: "none"
        })), b._ease = Bt(p.ease || r.ease || "none");
        var E = 0, A, G, V;
        if (j(p))
          p.forEach(function(N) {
            return b.to(w, N, ">");
          }), b.duration();
        else {
          S = {};
          for (k in p)
            k === "ease" || k === "easeEach" || Gn(k, p[k], S, p.easeEach);
          for (k in S)
            for (A = S[k].sort(function(N, W) {
              return N.t - W.t;
            }), E = 0, g = 0; g < A.length; g++)
              G = A[g], V = {
                ease: G.e,
                duration: (G.t - (g ? A[g - 1].t : 0)) / 100 * l
              }, V[k] = G.v, b.to(w, V, E), E += V.duration;
          b.duration() < l && b.to({}, {
            duration: l - b.duration()
          });
        }
      }
      l || a.duration(l = b.duration());
    } else
      a.timeline = 0;
    return _ === !0 && !pi && (xt = yt(a), L.killTweensOf(w), xt = 0), _t(v, yt(a), n), r.reversed && a.reverse(), r.paused && a.paused(!0), (h || !l && !p && a._start === U(v._time) && H(h) && xn(yt(a)) && v.data !== "nested") && (a._tTime = -P, a.render(Math.max(0, -c) || 0)), m && wr(yt(a), m), a;
  }
  var e = t.prototype;
  return e.render = function(r, n, s) {
    var a = this._time, u = this._tDur, l = this._dur, c = r < 0, h = r > u - P && !c ? u : r < P ? 0 : r, d, _, p, f, m, y, v, w, b;
    if (!l)
      Tn(this, r, n, s);
    else if (h !== this._tTime || !r || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== c || this._lazy) {
      if (d = h, w = this.timeline, this._repeat) {
        if (f = l + this._rDelay, this._repeat < -1 && c)
          return this.totalTime(f * 100 + r, n, s);
        if (d = U(h % f), h === u ? (p = this._repeat, d = l) : (m = U(h / f), p = ~~m, p && p === m ? (d = l, p--) : d > l && (d = l)), y = this._yoyo && p & 1, y && (b = this._yEase, d = l - d), m = ee(this._tTime, f), d === a && !s && this._initted && p === m)
          return this._tTime = h, this;
        p !== m && (w && this._yEase && Ir(w, y), this.vars.repeatRefresh && !y && !this._lock && d !== f && this._initted && (this._lock = s = 1, this.render(U(f * p), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (br(this, c ? r : d, s, n, h))
          return this._tTime = 0, this;
        if (a !== this._time && !(s && this.vars.repeatRefresh && p !== m))
          return this;
        if (l !== this._dur)
          return this.render(r, n, s);
      }
      if (this._tTime = h, this._time = d, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = v = (b || this._ease)(d / l), this._from && (this.ratio = v = 1 - v), !a && h && !n && !m && (rt(this, "onStart"), this._tTime !== h))
        return this;
      for (_ = this._pt; _; )
        _.r(v, _.d), _ = _._next;
      w && w.render(r < 0 ? r : w._dur * w._ease(d / this._dur), n, s) || this._startAt && (this._zTime = r), this._onUpdate && !n && (c && ti(this, r, n, s), rt(this, "onUpdate")), this._repeat && p !== m && this.vars.onRepeat && !n && this.parent && rt(this, "onRepeat"), (h === this._tDur || !h) && this._tTime === h && (c && !this._onUpdate && ti(this, r, !0, !0), (r || !l) && (h === this._tDur && this._ts > 0 || !h && this._ts < 0) && Mt(this, 1), !n && !(c && !a) && (h || a || y) && (rt(this, h === u ? "onComplete" : "onReverseComplete", !0), this._prom && !(h < u && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), o.prototype.invalidate.call(this, r);
  }, e.resetTo = function(r, n, s, a, u) {
    ge || it.wake(), this._ts || this.play();
    var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts), c;
    return this._initted || ki(this, l), c = this._ease(l / this._dur), Wn(this, r, n, s, a, c, l, u) ? this.resetTo(r, n, s, a, 1) : (Be(this, 0), this.parent || yr(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? ue(this) : this.scrollTrigger && this.scrollTrigger.kill(!!X), this;
    if (this.timeline) {
      var s = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, xt && xt.vars.overwrite !== !0)._first || ue(this), this.parent && s !== this.timeline.totalDuration() && ie(this, this._dur * this.timeline._tDur / s, 0, 1), this;
    }
    var a = this._targets, u = r ? lt(r) : a, l = this._ptLookup, c = this._pt, h, d, _, p, f, m, y;
    if ((!n || n === "all") && wn(a, u))
      return n === "all" && (this._pt = 0), ue(this);
    for (h = this._op = this._op || [], n !== "all" && (Y(n) && (f = {}, Z(n, function(v) {
      return f[v] = 1;
    }), n = f), n = Yn(a, n)), y = a.length; y--; )
      if (~u.indexOf(a[y])) {
        d = l[y], n === "all" ? (h[y] = n, p = d, _ = {}) : (_ = h[y] = h[y] || {}, p = n);
        for (f in p)
          m = d && d[f], m && ((!("kill" in m.d) || m.d.kill(f) === !0) && qe(this, m, "_pt"), delete d[f]), _ !== "all" && (_[f] = 1);
      }
    return this._initted && !this._pt && c && ue(this), this;
  }, t.to = function(r, n) {
    return new t(r, n, arguments[2]);
  }, t.from = function(r, n) {
    return he(1, arguments);
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
    return he(2, arguments);
  }, t.set = function(r, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(r, n);
  }, t.killTweensOf = function(r, n, s) {
    return L.killTweensOf(r, n, s);
  }, t;
}(ye);
ot(B.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
Z("staggerTo,staggerFrom,staggerFromTo", function(o) {
  B[o] = function() {
    var t = new K(), e = ii.call(arguments, 0);
    return e.splice(o === "staggerFromTo" ? 5 : 4, 0, 0), t[o].apply(t, e);
  };
});
var Oi = function(t, e, i) {
  return t[e] = i;
}, Ur = function(t, e, i) {
  return t[e](i);
}, Xn = function(t, e, i, r) {
  return t[e](r.fp, i);
}, $n = function(t, e, i) {
  return t.setAttribute(e, i);
}, Ci = function(t, e) {
  return z(t[e]) ? Ur : mi(t[e]) && t.setAttribute ? $n : Oi;
}, Vr = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, jn = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, Wr = function(t, e) {
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
}, Mi = function(t, e) {
  for (var i = e._pt; i; )
    i.r(t, i.d), i = i._next;
}, Kn = function(t, e, i, r) {
  for (var n = this._pt, s; n; )
    s = n._next, n.p === r && n.modifier(t, e, i), n = s;
}, Hn = function(t) {
  for (var e = this._pt, i, r; e; )
    r = e._next, e.p === t && !e.op || e.op === t ? qe(this, e, "_pt") : e.dep || (i = 1), e = r;
  return !i;
}, Zn = function(t, e, i, r) {
  r.mSet(t, e, r.m.call(r.tween, i, r.mt), r);
}, Yr = function(t) {
  for (var e = t._pt, i, r, n, s; e; ) {
    for (i = e._next, r = n; r && r.pr > e.pr; )
      r = r._next;
    (e._prev = r ? r._prev : s) ? e._prev._next = e : n = e, (e._next = r) ? r._prev = e : s = e, e = i;
  }
  t._pt = n;
}, Q = /* @__PURE__ */ function() {
  function o(e, i, r, n, s, a, u, l, c) {
    this.t = i, this.s = n, this.c = s, this.p = r, this.r = a || Vr, this.d = u || this, this.set = l || Oi, this.pr = c || 0, this._next = e, e && (e._prev = this);
  }
  var t = o.prototype;
  return t.modifier = function(i, r, n) {
    this.mSet = this.mSet || this.set, this.set = Zn, this.m = i, this.mt = n, this.tween = r;
  }, o;
}();
Z(bi + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(o) {
  return wi[o] = 1;
});
st.TweenMax = st.TweenLite = B;
st.TimelineLite = st.TimelineMax = K;
L = new K({
  sortChildren: !1,
  defaults: Jt,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
nt.stringFilter = Rr;
var Ut = [], Me = {}, Qn = [], Wi = 0, Jn = 0, Xe = function(t) {
  return (Me[t] || Qn).map(function(e) {
    return e();
  });
}, oi = function() {
  var t = Date.now(), e = [];
  t - Wi > 2 && (Xe("matchMediaInit"), Ut.forEach(function(i) {
    var r = i.queries, n = i.conditions, s, a, u, l;
    for (a in r)
      s = ht.matchMedia(r[a]).matches, s && (u = 1), s !== n[a] && (n[a] = s, l = 1);
    l && (i.revert(), u && e.push(i));
  }), Xe("matchMediaRevert"), e.forEach(function(i) {
    return i.onMatch(i, function(r) {
      return i.add(null, r);
    });
  }), Wi = t, Xe("matchMedia"));
}, Gr = /* @__PURE__ */ function() {
  function o(e, i) {
    this.selector = i && ri(i), this.data = [], this._r = [], this.isReverted = !1, this.id = Jn++, e && this.add(e);
  }
  var t = o.prototype;
  return t.add = function(i, r, n) {
    z(i) && (n = r, r = i, i = z);
    var s = this, a = function() {
      var l = R, c = s.selector, h;
      return l && l !== s && l.data.push(s), n && (s.selector = ri(n)), R = s, h = r.apply(s, arguments), z(h) && s._r.push(h), R = l, s.selector = c, s.isReverted = !1, h;
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
      for (var s = Ut.length; s--; )
        Ut[s].id === this.id && Ut.splice(s, 1);
  }, t.revert = function(i) {
    this.kill(i || {});
  }, o;
}(), ts = /* @__PURE__ */ function() {
  function o(e) {
    this.contexts = [], this.scope = e, R && R.data.push(this);
  }
  var t = o.prototype;
  return t.add = function(i, r, n) {
    mt(i) || (i = {
      matches: i
    });
    var s = new Gr(0, n || this.scope), a = s.conditions = {}, u, l, c;
    R && !s.selector && (s.selector = R.selector), this.contexts.push(s), r = s.add("onMatch", r), s.queries = i;
    for (l in i)
      l === "all" ? c = 1 : (u = ht.matchMedia(i[l]), u && (Ut.indexOf(s) < 0 && Ut.push(s), (a[l] = u.matches) && (c = 1), u.addListener ? u.addListener(oi) : u.addEventListener("change", oi)));
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
}(), Le = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    e.forEach(function(r) {
      return Er(r);
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
    var n = qt(t || {}).get, s = i ? gr : mr;
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
    var s = et[e], a = qt(t), u = a.harness && (a.harness.aliases || {})[e] || e, l = s ? function(c) {
      var h = new s();
      jt._pt = 0, h.init(t, i ? c + i : c, jt, 0, [t]), h.render(1, h), jt._pt && Mi(1, jt);
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
    return L.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = Bt(t.ease, Jt.ease)), qi(Jt, t || {});
  },
  config: function(t) {
    return qi(nt, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, i = t.effect, r = t.plugins, n = t.defaults, s = t.extendTimeline;
    (r || "").split(",").forEach(function(a) {
      return a && !et[a] && !st[a] && _e(e + " effect requires " + a + " plugin.");
    }), Ve[e] = function(a, u, l) {
      return i(lt(a), ot(u || {}, n), l);
    }, s && (K.prototype[e] = function(a, u, l) {
      return this.add(Ve[e](a, mt(u) ? u : (l = u) && {}, this), l);
    });
  },
  registerEase: function(t, e) {
    O[t] = Bt(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? Bt(t, e) : O;
  },
  getById: function(t) {
    return L.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var i = new K(t), r, n;
    for (i.smoothChildTiming = H(t.smoothChildTiming), L.remove(i), i._dp = 0, i._time = i._tTime = L._time, r = L._first; r; )
      n = r._next, (e || !(!r._dur && r instanceof B && r.vars.onComplete === r._targets[0])) && _t(i, r, r._start - r._delay), r = n;
    return _t(L, i, 0), i;
  },
  context: function(t, e) {
    return t ? new Gr(t, e) : R;
  },
  matchMedia: function(t) {
    return new ts(t);
  },
  matchMediaRefresh: function() {
    return Ut.forEach(function(t) {
      var e = t.conditions, i, r;
      for (r in e)
        e[r] && (e[r] = !1, i = 1);
      i && t.revert();
    }) || oi();
  },
  addEventListener: function(t, e) {
    var i = Me[t] || (Me[t] = []);
    ~i.indexOf(e) || i.push(e);
  },
  removeEventListener: function(t, e) {
    var i = Me[t], r = i && i.indexOf(e);
    r >= 0 && i.splice(r, 1);
  },
  utils: {
    wrap: Dn,
    wrapYoyo: Rn,
    distribute: Tr,
    random: Or,
    snap: kr,
    normalize: An,
    getUnit: $,
    clamp: Cn,
    splitColor: Ar,
    toArray: lt,
    selector: ri,
    mapRange: Mr,
    pipe: Pn,
    unitize: En,
    interpolate: Ln,
    shuffle: Sr
  },
  install: fr,
  effects: Ve,
  ticker: it,
  updateRoot: K.updateRoot,
  plugins: et,
  globalTimeline: L,
  core: {
    PropTween: Q,
    globals: hr,
    Tween: B,
    Timeline: K,
    Animation: ye,
    getCache: qt,
    _removeLinkedListItem: qe,
    reverting: function() {
      return X;
    },
    context: function(t) {
      return t && R && (R.data.push(t), t._ctx = R), R;
    },
    suppressOverwrites: function(t) {
      return pi = t;
    }
  }
};
Z("to,from,fromTo,delayedCall,set,killTweensOf", function(o) {
  return Le[o] = B[o];
});
it.add(K.updateRoot);
jt = Le.to({}, {
  duration: 0
});
var es = function(t, e) {
  for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
    i = i._next;
  return i;
}, is = function(t, e) {
  var i = t._targets, r, n, s;
  for (r in e)
    for (n = i.length; n--; )
      s = t._ptLookup[n][r], s && (s = s.d) && (s._pt && (s = es(s, r)), s && s.modifier && s.modifier(e[r], t, i[n], r));
}, $e = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(r, n, s) {
      s._onInit = function(a) {
        var u, l;
        if (Y(n) && (u = {}, Z(n, function(c) {
          return u[c] = 1;
        }), n = u), e) {
          u = {};
          for (l in n)
            u[l] = e(n[l]);
          n = u;
        }
        is(a, n);
      };
    }
  };
}, tt = Le.registerPlugin({
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
}, $e("roundProps", ni), $e("modifiers"), $e("snap", kr)) || Le;
B.version = K.version = tt.version = "3.13.0";
cr = 1;
gi() && re();
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
var Yi, St, Ht, Pi, Ft, Gi, Ei, rs = function() {
  return typeof window < "u";
}, bt = {}, It = 180 / Math.PI, Zt = Math.PI / 180, Xt = Math.atan2, Xi = 1e8, Ai = /([A-Z])/g, ns = /(left|right|width|margin|padding|x)/i, ss = /[\s,\(]\S/, pt = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, ai = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, os = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, as = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, us = function(t, e) {
  var i = e.s + e.c * t;
  e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
}, Xr = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, $r = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, ls = function(t, e, i) {
  return t.style[e] = i;
}, cs = function(t, e, i) {
  return t.style.setProperty(e, i);
}, fs = function(t, e, i) {
  return t._gsap[e] = i;
}, hs = function(t, e, i) {
  return t._gsap.scaleX = t._gsap.scaleY = i;
}, ds = function(t, e, i, r, n) {
  var s = t._gsap;
  s.scaleX = s.scaleY = i, s.renderTransform(n, s);
}, _s = function(t, e, i, r, n) {
  var s = t._gsap;
  s[e] = i, s.renderTransform(n, s);
}, I = "transform", J = I + "Origin", ps = function o(t, e) {
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
    if (this.props.indexOf(I) >= 0)
      return;
    s.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(J, e, "")), t = I;
  }
  (n || e) && this.props.push(t, e, n[t]);
}, jr = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, ms = function() {
  var t = this.props, e = this.target, i = e.style, r = e._gsap, n, s;
  for (n = 0; n < t.length; n += 3)
    t[n + 1] ? t[n + 1] === 2 ? e[t[n]](t[n + 2]) : e[t[n]] = t[n + 2] : t[n + 2] ? i[t[n]] = t[n + 2] : i.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(Ai, "-$1").toLowerCase());
  if (this.tfm) {
    for (s in this.tfm)
      r[s] = this.tfm[s];
    r.svg && (r.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), n = Ei(), (!n || !n.isStart) && !i[I] && (jr(i), r.zOrigin && i[J] && (i[J] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
  }
}, Kr = function(t, e) {
  var i = {
    target: t,
    props: [],
    revert: ms,
    save: ps
  };
  return t._gsap || tt.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(r) {
    return i.save(r);
  }), i;
}, Hr, ui = function(t, e) {
  var i = St.createElementNS ? St.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : St.createElement(t);
  return i && i.style ? i : St.createElement(t);
}, ct = function o(t, e, i) {
  var r = getComputedStyle(t);
  return r[e] || r.getPropertyValue(e.replace(Ai, "-$1").toLowerCase()) || r.getPropertyValue(e) || !i && o(t, ne(e) || e, 1) || "";
}, $i = "O,Moz,ms,Ms,Webkit".split(","), ne = function(t, e, i) {
  var r = e || Ft, n = r.style, s = 5;
  if (t in n && !i)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !($i[s] + t in n); )
    ;
  return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? $i[s] : "") + t;
}, li = function() {
  rs() && window.document && (Yi = window, St = Yi.document, Ht = St.documentElement, Ft = ui("div") || {
    style: {}
  }, ui("div"), I = ne(I), J = I + "Origin", Ft.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Hr = !!ne("perspective"), Ei = tt.core.reverting, Pi = 1);
}, ji = function(t) {
  var e = t.ownerSVGElement, i = ui("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = t.cloneNode(!0), n;
  r.style.display = "block", i.appendChild(r), Ht.appendChild(i);
  try {
    n = r.getBBox();
  } catch {
  }
  return i.removeChild(r), Ht.removeChild(i), n;
}, Ki = function(t, e) {
  for (var i = e.length; i--; )
    if (t.hasAttribute(e[i]))
      return t.getAttribute(e[i]);
}, Zr = function(t) {
  var e, i;
  try {
    e = t.getBBox();
  } catch {
    e = ji(t), i = 1;
  }
  return e && (e.width || e.height) || i || (e = ji(t)), e && !e.width && !e.x && !e.y ? {
    x: +Ki(t, ["x", "cx", "x1"]) || 0,
    y: +Ki(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, Qr = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Zr(t));
}, Yt = function(t, e) {
  if (e) {
    var i = t.style, r;
    e in bt && e !== J && (e = I), i.removeProperty ? (r = e.substr(0, 2), (r === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), i.removeProperty(r === "--" ? e : e.replace(Ai, "-$1").toLowerCase())) : i.removeAttribute(e);
  }
}, Tt = function(t, e, i, r, n, s) {
  var a = new Q(t._pt, e, i, 0, 1, s ? $r : Xr);
  return t._pt = a, a.b = r, a.e = n, t._props.push(i), a;
}, Hi = {
  deg: 1,
  rad: 1,
  turn: 1
}, gs = {
  grid: 1,
  flex: 1
}, Pt = function o(t, e, i, r) {
  var n = parseFloat(i) || 0, s = (i + "").trim().substr((n + "").length) || "px", a = Ft.style, u = ns.test(e), l = t.tagName.toLowerCase() === "svg", c = (l ? "client" : "offset") + (u ? "Width" : "Height"), h = 100, d = r === "px", _ = r === "%", p, f, m, y;
  if (r === s || !n || Hi[r] || Hi[s])
    return n;
  if (s !== "px" && !d && (n = o(t, e, i, "px")), y = t.getCTM && Qr(t), (_ || s === "%") && (bt[e] || ~e.indexOf("adius")))
    return p = y ? t.getBBox()[u ? "width" : "height"] : t[c], q(_ ? n / p * h : n / 100 * p);
  if (a[u ? "width" : "height"] = h + (d ? s : r), f = r !== "rem" && ~e.indexOf("adius") || r === "em" && t.appendChild && !l ? t : t.parentNode, y && (f = (t.ownerSVGElement || {}).parentNode), (!f || f === St || !f.appendChild) && (f = St.body), m = f._gsap, m && _ && m.width && u && m.time === it.time && !m.uncache)
    return q(n / m.width * h);
  if (_ && (e === "height" || e === "width")) {
    var v = t.style[e];
    t.style[e] = h + r, p = t[c], v ? t.style[e] = v : Yt(t, e);
  } else
    (_ || s === "%") && !gs[ct(f, "display")] && (a.position = ct(t, "position")), f === t && (a.position = "static"), f.appendChild(Ft), p = Ft[c], f.removeChild(Ft), a.position = "absolute";
  return u && _ && (m = qt(f), m.time = it.time, m.width = f[c]), q(d ? p * n / h : p && n ? h / p * n : 0);
}, vt = function(t, e, i, r) {
  var n;
  return Pi || li(), e in pt && e !== "transform" && (e = pt[e], ~e.indexOf(",") && (e = e.split(",")[0])), bt[e] && e !== "transform" ? (n = we(t, r), n = e !== "transformOrigin" ? n[e] : n.svg ? n.origin : Fe(ct(t, J)) + " " + n.zOrigin + "px") : (n = t.style[e], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = Ie[e] && Ie[e](t, e, i) || ct(t, e) || _r(t, e) || (e === "opacity" ? 1 : 0))), i && !~(n + "").trim().indexOf(" ") ? Pt(t, e, n, i) + i : n;
}, ys = function(t, e, i, r) {
  if (!i || i === "none") {
    var n = ne(e, t, 1), s = n && ct(t, n, 1);
    s && s !== i ? (e = n, i = s) : e === "borderColor" && (i = ct(t, "borderTopColor"));
  }
  var a = new Q(this._pt, t.style, e, 0, 1, Wr), u = 0, l = 0, c, h, d, _, p, f, m, y, v, w, b, g;
  if (a.b = i, a.e = r, i += "", r += "", r.substring(0, 6) === "var(--" && (r = ct(t, r.substring(4, r.indexOf(")")))), r === "auto" && (f = t.style[e], t.style[e] = r, r = ct(t, e) || r, f ? t.style[e] = f : Yt(t, e)), c = [i, r], Rr(c), i = c[0], r = c[1], d = i.match($t) || [], g = r.match($t) || [], g.length) {
    for (; h = $t.exec(r); )
      m = h[0], v = r.substring(u, h.index), p ? p = (p + 1) % 5 : (v.substr(-5) === "rgba(" || v.substr(-5) === "hsla(") && (p = 1), m !== (f = d[l++] || "") && (_ = parseFloat(f) || 0, b = f.substr((_ + "").length), m.charAt(1) === "=" && (m = Kt(_, m) + b), y = parseFloat(m), w = m.substr((y + "").length), u = $t.lastIndex - w.length, w || (w = w || nt.units[e] || b, u === r.length && (r += w, a.e += w)), b !== w && (_ = Pt(t, e, f, w) || 0), a._pt = {
        _next: a._pt,
        p: v || l === 1 ? v : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: _,
        c: y - _,
        m: p && p < 4 || e === "zIndex" ? Math.round : 0
      });
    a.c = u < r.length ? r.substring(u, r.length) : "";
  } else
    a.r = e === "display" && r === "none" ? $r : Xr;
  return ur.test(r) && (a.e = 0), this._pt = a, a;
}, Zi = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, vs = function(t) {
  var e = t.split(" "), i = e[0], r = e[1] || "50%";
  return (i === "top" || i === "bottom" || r === "left" || r === "right") && (t = i, i = r, r = t), e[0] = Zi[i] || i, e[1] = Zi[r] || r, e.join(" ");
}, ws = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var i = e.t, r = i.style, n = e.u, s = i._gsap, a, u, l;
    if (n === "all" || n === !0)
      r.cssText = "", u = 1;
    else
      for (n = n.split(","), l = n.length; --l > -1; )
        a = n[l], bt[a] && (u = 1, a = a === "transformOrigin" ? J : I), Yt(i, a);
    u && (Yt(i, I), s && (s.svg && i.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", we(i, 1), s.uncache = 1, jr(r)));
  }
}, Ie = {
  clearProps: function(t, e, i, r, n) {
    if (n.data !== "isFromStart") {
      var s = t._pt = new Q(t._pt, e, i, 0, 0, ws);
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
}, ve = [1, 0, 0, 1, 0, 0], Jr = {}, tn = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, Qi = function(t) {
  var e = ct(t, I);
  return tn(e) ? ve : e.substr(7).match(ar).map(q);
}, Di = function(t, e) {
  var i = t._gsap || qt(t), r = t.style, n = Qi(t), s, a, u, l;
  return i.svg && t.getAttribute("transform") ? (u = t.transform.baseVal.consolidate().matrix, n = [u.a, u.b, u.c, u.d, u.e, u.f], n.join(",") === "1,0,0,1,0,0" ? ve : n) : (n === ve && !t.offsetParent && t !== Ht && !i.svg && (u = r.display, r.display = "block", s = t.parentNode, (!s || !t.offsetParent && !t.getBoundingClientRect().width) && (l = 1, a = t.nextElementSibling, Ht.appendChild(t)), n = Qi(t), u ? r.display = u : Yt(t, "display"), l && (a ? s.insertBefore(t, a) : s ? s.appendChild(t) : Ht.removeChild(t))), e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, ci = function(t, e, i, r, n, s) {
  var a = t._gsap, u = n || Di(t, !0), l = a.xOrigin || 0, c = a.yOrigin || 0, h = a.xOffset || 0, d = a.yOffset || 0, _ = u[0], p = u[1], f = u[2], m = u[3], y = u[4], v = u[5], w = e.split(" "), b = parseFloat(w[0]) || 0, g = parseFloat(w[1]) || 0, S, T, k, x;
  i ? u !== ve && (T = _ * m - p * f) && (k = b * (m / T) + g * (-f / T) + (f * v - m * y) / T, x = b * (-p / T) + g * (_ / T) - (_ * v - p * y) / T, b = k, g = x) : (S = Zr(t), b = S.x + (~w[0].indexOf("%") ? b / 100 * S.width : b), g = S.y + (~(w[1] || w[0]).indexOf("%") ? g / 100 * S.height : g)), r || r !== !1 && a.smooth ? (y = b - l, v = g - c, a.xOffset = h + (y * _ + v * f) - y, a.yOffset = d + (y * p + v * m) - v) : a.xOffset = a.yOffset = 0, a.xOrigin = b, a.yOrigin = g, a.smooth = !!r, a.origin = e, a.originIsAbsolute = !!i, t.style[J] = "0px 0px", s && (Tt(s, a, "xOrigin", l, b), Tt(s, a, "yOrigin", c, g), Tt(s, a, "xOffset", h, a.xOffset), Tt(s, a, "yOffset", d, a.yOffset)), t.setAttribute("data-svg-origin", b + " " + g);
}, we = function(t, e) {
  var i = t._gsap || new zr(t);
  if ("x" in i && !e && !i.uncache)
    return i;
  var r = t.style, n = i.scaleX < 0, s = "px", a = "deg", u = getComputedStyle(t), l = ct(t, J) || "0", c, h, d, _, p, f, m, y, v, w, b, g, S, T, k, x, C, D, E, A, G, V, N, W, ft, Se, se, oe, At, Fi, gt, Dt;
  return c = h = d = f = m = y = v = w = b = 0, _ = p = 1, i.svg = !!(t.getCTM && Qr(t)), u.translate && ((u.translate !== "none" || u.scale !== "none" || u.rotate !== "none") && (r[I] = (u.translate !== "none" ? "translate3d(" + (u.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (u.rotate !== "none" ? "rotate(" + u.rotate + ") " : "") + (u.scale !== "none" ? "scale(" + u.scale.split(" ").join(",") + ") " : "") + (u[I] !== "none" ? u[I] : "")), r.scale = r.rotate = r.translate = "none"), T = Di(t, i.svg), i.svg && (i.uncache ? (ft = t.getBBox(), l = i.xOrigin - ft.x + "px " + (i.yOrigin - ft.y) + "px", W = "") : W = !e && t.getAttribute("data-svg-origin"), ci(t, W || l, !!W || i.originIsAbsolute, i.smooth !== !1, T)), g = i.xOrigin || 0, S = i.yOrigin || 0, T !== ve && (D = T[0], E = T[1], A = T[2], G = T[3], c = V = T[4], h = N = T[5], T.length === 6 ? (_ = Math.sqrt(D * D + E * E), p = Math.sqrt(G * G + A * A), f = D || E ? Xt(E, D) * It : 0, v = A || G ? Xt(A, G) * It + f : 0, v && (p *= Math.abs(Math.cos(v * Zt))), i.svg && (c -= g - (g * D + S * A), h -= S - (g * E + S * G))) : (Dt = T[6], Fi = T[7], se = T[8], oe = T[9], At = T[10], gt = T[11], c = T[12], h = T[13], d = T[14], k = Xt(Dt, At), m = k * It, k && (x = Math.cos(-k), C = Math.sin(-k), W = V * x + se * C, ft = N * x + oe * C, Se = Dt * x + At * C, se = V * -C + se * x, oe = N * -C + oe * x, At = Dt * -C + At * x, gt = Fi * -C + gt * x, V = W, N = ft, Dt = Se), k = Xt(-A, At), y = k * It, k && (x = Math.cos(-k), C = Math.sin(-k), W = D * x - se * C, ft = E * x - oe * C, Se = A * x - At * C, gt = G * C + gt * x, D = W, E = ft, A = Se), k = Xt(E, D), f = k * It, k && (x = Math.cos(k), C = Math.sin(k), W = D * x + E * C, ft = V * x + N * C, E = E * x - D * C, N = N * x - V * C, D = W, V = ft), m && Math.abs(m) + Math.abs(f) > 359.9 && (m = f = 0, y = 180 - y), _ = q(Math.sqrt(D * D + E * E + A * A)), p = q(Math.sqrt(N * N + Dt * Dt)), k = Xt(V, N), v = Math.abs(k) > 2e-4 ? k * It : 0, b = gt ? 1 / (gt < 0 ? -gt : gt) : 0), i.svg && (W = t.getAttribute("transform"), i.forceCSS = t.setAttribute("transform", "") || !tn(ct(t, I)), W && t.setAttribute("transform", W))), Math.abs(v) > 90 && Math.abs(v) < 270 && (n ? (_ *= -1, v += f <= 0 ? 180 : -180, f += f <= 0 ? 180 : -180) : (p *= -1, v += v <= 0 ? 180 : -180)), e = e || i.uncache, i.x = c - ((i.xPercent = c && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-c) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + s, i.y = h - ((i.yPercent = h && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-h) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + s, i.z = d + s, i.scaleX = q(_), i.scaleY = q(p), i.rotation = q(f) + a, i.rotationX = q(m) + a, i.rotationY = q(y) + a, i.skewX = v + a, i.skewY = w + a, i.transformPerspective = b + s, (i.zOrigin = parseFloat(l.split(" ")[2]) || !e && i.zOrigin || 0) && (r[J] = Fe(l)), i.xOffset = i.yOffset = 0, i.force3D = nt.force3D, i.renderTransform = i.svg ? xs : Hr ? en : bs, i.uncache = 0, i;
}, Fe = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, je = function(t, e, i) {
  var r = $(e);
  return q(parseFloat(e) + parseFloat(Pt(t, "x", i + "px", r))) + r;
}, bs = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, en(t, e);
}, Rt = "0deg", ae = "0px", Lt = ") ", en = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, u = i.z, l = i.rotation, c = i.rotationY, h = i.rotationX, d = i.skewX, _ = i.skewY, p = i.scaleX, f = i.scaleY, m = i.transformPerspective, y = i.force3D, v = i.target, w = i.zOrigin, b = "", g = y === "auto" && t && t !== 1 || y === !0;
  if (w && (h !== Rt || c !== Rt)) {
    var S = parseFloat(c) * Zt, T = Math.sin(S), k = Math.cos(S), x;
    S = parseFloat(h) * Zt, x = Math.cos(S), s = je(v, s, T * x * -w), a = je(v, a, -Math.sin(S) * -w), u = je(v, u, k * x * -w + w);
  }
  m !== ae && (b += "perspective(" + m + Lt), (r || n) && (b += "translate(" + r + "%, " + n + "%) "), (g || s !== ae || a !== ae || u !== ae) && (b += u !== ae || g ? "translate3d(" + s + ", " + a + ", " + u + ") " : "translate(" + s + ", " + a + Lt), l !== Rt && (b += "rotate(" + l + Lt), c !== Rt && (b += "rotateY(" + c + Lt), h !== Rt && (b += "rotateX(" + h + Lt), (d !== Rt || _ !== Rt) && (b += "skew(" + d + ", " + _ + Lt), (p !== 1 || f !== 1) && (b += "scale(" + p + ", " + f + Lt), v.style[I] = b || "translate(0, 0)";
}, xs = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, u = i.rotation, l = i.skewX, c = i.skewY, h = i.scaleX, d = i.scaleY, _ = i.target, p = i.xOrigin, f = i.yOrigin, m = i.xOffset, y = i.yOffset, v = i.forceCSS, w = parseFloat(s), b = parseFloat(a), g, S, T, k, x;
  u = parseFloat(u), l = parseFloat(l), c = parseFloat(c), c && (c = parseFloat(c), l += c, u += c), u || l ? (u *= Zt, l *= Zt, g = Math.cos(u) * h, S = Math.sin(u) * h, T = Math.sin(u - l) * -d, k = Math.cos(u - l) * d, l && (c *= Zt, x = Math.tan(l - c), x = Math.sqrt(1 + x * x), T *= x, k *= x, c && (x = Math.tan(c), x = Math.sqrt(1 + x * x), g *= x, S *= x)), g = q(g), S = q(S), T = q(T), k = q(k)) : (g = h, k = d, S = T = 0), (w && !~(s + "").indexOf("px") || b && !~(a + "").indexOf("px")) && (w = Pt(_, "x", s, "px"), b = Pt(_, "y", a, "px")), (p || f || m || y) && (w = q(w + p - (p * g + f * T) + m), b = q(b + f - (p * S + f * k) + y)), (r || n) && (x = _.getBBox(), w = q(w + r / 100 * x.width), b = q(b + n / 100 * x.height)), x = "matrix(" + g + "," + S + "," + T + "," + k + "," + w + "," + b + ")", _.setAttribute("transform", x), v && (_.style[I] = x);
}, Ss = function(t, e, i, r, n) {
  var s = 360, a = Y(n), u = parseFloat(n) * (a && ~n.indexOf("rad") ? It : 1), l = u - r, c = r + l + "deg", h, d;
  return a && (h = n.split("_")[1], h === "short" && (l %= s, l !== l % (s / 2) && (l += l < 0 ? s : -s)), h === "cw" && l < 0 ? l = (l + s * Xi) % s - ~~(l / s) * s : h === "ccw" && l > 0 && (l = (l - s * Xi) % s - ~~(l / s) * s)), t._pt = d = new Q(t._pt, e, i, r, l, os), d.e = c, d.u = "deg", t._props.push(i), d;
}, Ji = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, Ts = function(t, e, i) {
  var r = Ji({}, i._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", s = i.style, a, u, l, c, h, d, _, p;
  r.svg ? (l = i.getAttribute("transform"), i.setAttribute("transform", ""), s[I] = e, a = we(i, 1), Yt(i, I), i.setAttribute("transform", l)) : (l = getComputedStyle(i)[I], s[I] = e, a = we(i, 1), s[I] = l);
  for (u in bt)
    l = r[u], c = a[u], l !== c && n.indexOf(u) < 0 && (_ = $(l), p = $(c), h = _ !== p ? Pt(i, u, l, p) : parseFloat(l), d = parseFloat(c), t._pt = new Q(t._pt, a, u, h, d - h, ai), t._pt.u = p || 0, t._props.push(u));
  Ji(a, r);
};
Z("padding,margin,Width,Radius", function(o, t) {
  var e = "Top", i = "Right", r = "Bottom", n = "Left", s = (t < 3 ? [e, i, r, n] : [e + n, e + i, r + i, r + n]).map(function(a) {
    return t < 2 ? o + a : "border" + a + o;
  });
  Ie[t > 1 ? "border" + o : o] = function(a, u, l, c, h) {
    var d, _;
    if (arguments.length < 4)
      return d = s.map(function(p) {
        return vt(a, p, l);
      }), _ = d.join(" "), _.split(d[0]).length === 5 ? d[0] : _;
    d = (c + "").split(" "), _ = {}, s.forEach(function(p, f) {
      return _[p] = d[f] = d[f] || d[(f - 1) / 2 | 0];
    }), a.init(u, _, h);
  };
});
var rn = {
  name: "css",
  register: li,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, i, r, n) {
    var s = this._props, a = t.style, u = i.vars.startAt, l, c, h, d, _, p, f, m, y, v, w, b, g, S, T, k;
    Pi || li(), this.styles = this.styles || Kr(t), k = this.styles.props, this.tween = i;
    for (f in e)
      if (f !== "autoRound" && (c = e[f], !(et[f] && qr(f, e, i, r, t, n)))) {
        if (_ = typeof c, p = Ie[f], _ === "function" && (c = c.call(i, r, t, n), _ = typeof c), _ === "string" && ~c.indexOf("random(") && (c = me(c)), p)
          p(this, t, f, c, i) && (T = 1);
        else if (f.substr(0, 2) === "--")
          l = (getComputedStyle(t).getPropertyValue(f) + "").trim(), c += "", Ot.lastIndex = 0, Ot.test(l) || (m = $(l), y = $(c)), y ? m !== y && (l = Pt(t, f, l, y) + y) : m && (c += m), this.add(a, "setProperty", l, c, r, n, 0, 0, f), s.push(f), k.push(f, 0, a[f]);
        else if (_ !== "undefined") {
          if (u && f in u ? (l = typeof u[f] == "function" ? u[f].call(i, r, t, n) : u[f], Y(l) && ~l.indexOf("random(") && (l = me(l)), $(l + "") || l === "auto" || (l += nt.units[f] || $(vt(t, f)) || ""), (l + "").charAt(1) === "=" && (l = vt(t, f))) : l = vt(t, f), d = parseFloat(l), v = _ === "string" && c.charAt(1) === "=" && c.substr(0, 2), v && (c = c.substr(2)), h = parseFloat(c), f in pt && (f === "autoAlpha" && (d === 1 && vt(t, "visibility") === "hidden" && h && (d = 0), k.push("visibility", 0, a.visibility), Tt(this, a, "visibility", d ? "inherit" : "hidden", h ? "inherit" : "hidden", !h)), f !== "scale" && f !== "transform" && (f = pt[f], ~f.indexOf(",") && (f = f.split(",")[0]))), w = f in bt, w) {
            if (this.styles.save(f), _ === "string" && c.substring(0, 6) === "var(--" && (c = ct(t, c.substring(4, c.indexOf(")"))), h = parseFloat(c)), b || (g = t._gsap, g.renderTransform && !e.parseTransform || we(t, e.parseTransform), S = e.smoothOrigin !== !1 && g.smooth, b = this._pt = new Q(this._pt, a, I, 0, 1, g.renderTransform, g, 0, -1), b.dep = 1), f === "scale")
              this._pt = new Q(this._pt, g, "scaleY", g.scaleY, (v ? Kt(g.scaleY, v + h) : h) - g.scaleY || 0, ai), this._pt.u = 0, s.push("scaleY", f), f += "X";
            else if (f === "transformOrigin") {
              k.push(J, 0, a[J]), c = vs(c), g.svg ? ci(t, c, 0, S, 0, this) : (y = parseFloat(c.split(" ")[2]) || 0, y !== g.zOrigin && Tt(this, g, "zOrigin", g.zOrigin, y), Tt(this, a, f, Fe(l), Fe(c)));
              continue;
            } else if (f === "svgOrigin") {
              ci(t, c, 1, S, 0, this);
              continue;
            } else if (f in Jr) {
              Ss(this, g, f, d, v ? Kt(d, v + c) : c);
              continue;
            } else if (f === "smoothOrigin") {
              Tt(this, g, "smooth", g.smooth, c);
              continue;
            } else if (f === "force3D") {
              g[f] = c;
              continue;
            } else if (f === "transform") {
              Ts(this, c, t);
              continue;
            }
          } else f in a || (f = ne(f) || f);
          if (w || (h || h === 0) && (d || d === 0) && !ss.test(c) && f in a)
            m = (l + "").substr((d + "").length), h || (h = 0), y = $(c) || (f in nt.units ? nt.units[f] : m), m !== y && (d = Pt(t, f, l, y)), this._pt = new Q(this._pt, w ? g : a, f, d, (v ? Kt(d, v + h) : h) - d, !w && (y === "px" || f === "zIndex") && e.autoRound !== !1 ? us : ai), this._pt.u = y || 0, m !== y && y !== "%" && (this._pt.b = l, this._pt.r = as);
          else if (f in a)
            ys.call(this, t, f, l, v ? v + c : c);
          else if (f in t)
            this.add(t, f, l || t[f], v ? v + c : c, r, n);
          else if (f !== "parseTransform") {
            vi(f, c);
            continue;
          }
          w || (f in a ? k.push(f, 0, a[f]) : typeof t[f] == "function" ? k.push(f, 2, t[f]()) : k.push(f, 1, l || t[f])), s.push(f);
        }
      }
    T && Yr(this);
  },
  render: function(t, e) {
    if (e.tween._time || !Ei())
      for (var i = e._pt; i; )
        i.r(t, i.d), i = i._next;
    else
      e.styles.revert();
  },
  get: vt,
  aliases: pt,
  getSetter: function(t, e, i) {
    var r = pt[e];
    return r && r.indexOf(",") < 0 && (e = r), e in bt && e !== J && (t._gsap.x || vt(t, "x")) ? i && Gi === i ? e === "scale" ? hs : fs : (Gi = i || {}) && (e === "scale" ? ds : _s) : t.style && !mi(t.style[e]) ? ls : ~e.indexOf("-") ? cs : Ci(t, e);
  },
  core: {
    _removeProperty: Yt,
    _getMatrix: Di
  }
};
tt.utils.checkPrefix = ne;
tt.core.getStyleSaver = Kr;
(function(o, t, e, i) {
  var r = Z(o + "," + t + "," + e, function(n) {
    bt[n] = 1;
  });
  Z(t, function(n) {
    nt.units[n] = "deg", Jr[n] = 1;
  }), pt[r[13]] = o + "," + t, Z(i, function(n) {
    var s = n.split(":");
    pt[s[1]] = r[s[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Z("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(o) {
  nt.units[o] = "px";
});
tt.registerPlugin(rn);
var F = tt.registerPlugin(rn) || tt;
F.core.Tween;
const be = {
  fadeOutDuration: 0.4,
  fadeInDuration: 0.3,
  ease: "power2.out"
};
let Pe = !1, ce = !1;
function ks() {
  if (console.log("🎬 initLoadingScreen - Début de l'initialisation"), Pe)
    return console.log("ℹ️ Écran de chargement déjà initialisé"), Promise.resolve();
  const o = document.querySelector(".loadingscreen"), t = document.querySelector(".loading_logo_wrap");
  return console.log("🔍 Éléments trouvés:", {
    loadingScreen: !!o,
    logoWrap: !!t
  }), !o || !t ? (console.warn("⚠️ Éléments manquants:", {
    loadingScreen: o ? "OK" : "Non trouvé",
    logoWrap: t ? "OK" : "Non trouvé"
  }), Pe = !1, Promise.resolve(null)) : (console.log("🎨 Configuration des styles initiaux"), F.set(o, {
    opacity: 1,
    display: "flex",
    backgroundColor: "white"
  }), F.set(t, { opacity: 0, scale: 0.9 }), F.to(t, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    delay: 0.1,
    ease: be.ease
  }), Ps(), Pe = !0, console.log("✅ Écran de chargement initialisé avec succès"), Promise.resolve(o));
}
function Os() {
  if (console.log("🎬 hideLoadingScreen - Début du masquage"), !Pe) {
    console.warn("⚠️ Écran de chargement non initialisé");
    return;
  }
  if (ce) {
    console.log("ℹ️ Masquage déjà en cours");
    return;
  }
  ce = !0;
  const o = document.querySelector(".loadingscreen"), t = document.querySelector(".loading_logo_wrap");
  if (console.log("🔍 Éléments trouvés pour le masquage:", {
    loadingScreen: !!o,
    logoWrap: !!t
  }), !o || !t) {
    console.warn("⚠️ Éléments manquants pour le masquage"), ce = !1;
    return;
  }
  console.log("🎬 Démarrage de l'animation de masquage"), F.timeline({
    onComplete: () => {
      console.log("✅ Animation de masquage terminée"), F.set(o, { display: "none" }), ce = !1;
    }
  }).to(o, {
    opacity: 0,
    duration: be.fadeOutDuration,
    ease: be.ease
  });
}
function Cs() {
  const o = document.querySelector(".loadingscreen");
  o && F.set(o, { display: "none" }), ce = !1;
}
function Ms(o) {
  const t = document.querySelector(".loadingscreen");
  if (!t) {
    o();
    return;
  }
  F.timeline({ onComplete: o }).set(t, { display: "flex", opacity: 0, backgroundColor: "white" }).to(t, { opacity: 1, duration: be.fadeInDuration, ease: be.ease });
}
function Ps() {
  document.addEventListener("click", (o) => {
    const t = o.target.closest("a");
    if (!t) return;
    const e = t.getAttribute("href"), i = t.getAttribute("target");
    !e || e.startsWith("#") || e.startsWith("http") || i === "_blank" || e.startsWith("mailto:") || e.startsWith("tel:") || (o.preventDefault(), Ms(() => {
      window.location.href = e;
    }));
  }, !0);
}
const dt = {
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
let ke, Ri, fi = 0;
function Es() {
  fi = window.pageYOffset || document.documentElement.scrollTop, document.body.style.overflow = "hidden", document.body.style.position = "fixed", document.body.style.width = "100%", document.body.style.top = `-${fi}px`;
}
function As() {
  document.body.style.overflow = "", document.body.style.position = "", document.body.style.width = "", document.body.style.top = "", window.scrollTo(0, fi);
}
function Li(o) {
  o && (o.classList.add("is-open"), F.fromTo(o, { x: "100%" }, { x: "0%", duration: 0.4, ease: "power2.out" }));
}
function Ii(o, t) {
  o && F.to(o, {
    x: "100%",
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      o.classList.remove("is-open");
    }
  });
}
function hi() {
  document.querySelectorAll(dt.ALL_MENUS).forEach((o) => {
    o.classList.contains("is-open") && Ii(o);
  }), Ri.reverse(), As();
}
function Ds() {
  hi();
  const o = document.querySelector(dt.MAIN_MENU);
  Li(o), Ri.play(), Es();
}
function Rs(o) {
  const t = document.querySelector(dt.MAIN_MENU), e = document.querySelector(o);
  Ii(t), Li(e);
}
function Ls() {
  const o = document.querySelector(".is-open:not(#main-menu-mobile)"), t = document.querySelector(dt.MAIN_MENU);
  o && Ii(o), Li(t);
}
function Is() {
  var o;
  if (ke = document.querySelector(dt.MENU_BUTTON), !!ke) {
    Ri = F.timeline({ paused: !0 }).to(ke, { rotation: 90, duration: 0.4, ease: "elastic.out(1, 0.5)" }), ke.addEventListener("click", () => {
      document.querySelector(dt.ALL_MENUS + ".is-open") ? hi() : Ds();
    });
    for (const t in dt.SUB_MENU_TRIGGERS)
      (o = document.querySelector(t)) == null || o.addEventListener("click", () => {
        Rs(dt.SUB_MENU_TRIGGERS[t]);
      });
    document.querySelectorAll(dt.CLOSE_BUTTONS).forEach((t) => {
      t.addEventListener("click", hi);
    }), document.querySelectorAll(dt.BACK_BUTTONS).forEach((t) => {
      t.addEventListener("click", Ls);
    });
  }
}
let tr = !1, ze = !1, Vt = !1, nn = /* @__PURE__ */ new Map(), zt = null, er = "";
const Wt = [
  {
    buttonId: "nav-link-desktop-parcs",
    containerSelector: ".parc_menu_desktop",
    isOpen: !1
  },
  {
    buttonId: "nav-link-desktop-activites",
    containerSelector: ".activites_menu_desktop",
    isOpen: !1
  },
  {
    buttonId: "nav-link-desktop-offres",
    containerSelector: ".offres_menu_desktop",
    isOpen: !1
  }
];
function sn(o) {
  o ? (er = document.body.style.overflow, document.body.style.overflow = "hidden") : document.body.style.overflow = er;
}
function Fs() {
  console.log("🔄 Initialisation des boutons de menu..."), Wt.forEach((o) => {
    const t = document.getElementById(o.buttonId);
    t ? (nn.set(o.buttonId, t), console.log(`✅ Bouton trouvé: ${o.buttonId}`)) : console.log(`❌ Bouton non trouvé: ${o.buttonId}`);
  });
}
function di(o) {
  return nn.get(o);
}
function Qt(o) {
  if (!o) return !1;
  const t = window.getComputedStyle(o);
  return t.display !== "none" && t.visibility !== "hidden" && t.opacity !== "0";
}
function on(o) {
  if (!o || Vt) return;
  Vt = !0;
  const t = F.timeline({
    onComplete: () => {
      o && o.setAttribute("style", "display: none !important;"), ze = !1, Vt = !1, sn(!1);
    }
  });
  Wt.forEach((e) => {
    const i = document.querySelector(e.containerSelector);
    i && Qt(i) && t.to(i, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        i.setAttribute("style", "display: none !important;"), e.isOpen = !1;
      }
    }, 0);
  }), Qt(o) && t.to(o, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.inOut"
  }, 0);
}
function zs(o) {
  zt && document.removeEventListener("click", zt), zt = (t) => {
    if (Vt) return;
    !Wt.some((i) => {
      const r = di(i.buttonId), n = document.querySelector(i.containerSelector);
      return r && t.target === r || n && t.target.closest(i.containerSelector);
    }) && !t.target.closest(".desktop_menu_wrapper") && ze && Qt(o) && (on(o), an());
  }, document.addEventListener("click", zt);
}
function an() {
  zt && (document.removeEventListener("click", zt), zt = null);
}
function qs() {
  Wt.forEach((o) => {
    const t = document.querySelector(o.containerSelector);
    t && (t.style.transition = "width 0.4s ease-in-out", t.style.overflow = "hidden");
  });
}
function ir() {
  if (console.log("🚀 Démarrage de l'initialisation du menu desktop"), tr) {
    console.log("⚠️ Le menu desktop est déjà initialisé");
    return;
  }
  qs(), console.log("🔍 Recherche des éléments du menu..."), Fs();
  const o = document.querySelector(".desktop_menu_wrapper");
  if (!o) {
    console.log("❌ Menu wrapper non trouvé");
    return;
  }
  console.log("✅ Menu wrapper trouvé"), Wt.forEach((t) => {
    const e = di(t.buttonId), i = document.querySelector(t.containerSelector);
    !e || !i || (i.style.display = "none", i.style.opacity = "0", e.addEventListener("click", (r) => {
      if (r.preventDefault(), r.stopPropagation(), !Vt)
        if (t.isOpen)
          on(o), an();
        else {
          Vt = !0;
          const n = F.timeline({
            onComplete: () => {
              Vt = !1;
            }
          });
          ze || (o.style.display = "flex", o.style.height = "auto", console.log("🎯 Affichage du wrapper:", o.style.display), n.to(o, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          }), ze = !0, zs(o), sn(!0)), Wt.forEach((a) => {
            if (a !== t) {
              const u = document.querySelector(a.containerSelector), l = di(a.buttonId);
              u && Qt(u) && (console.log("🔒 Fermeture du menu:", a.containerSelector), n.to(u, {
                width: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power2.inOut",
                onComplete: () => {
                  u.setAttribute("style", "display: none !important; width: auto;"), a.isOpen = !1;
                }
              }, 0)), l && Qt(l) && n.to(l, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.out"
              }, 0);
            }
          }), Wt.forEach((a) => {
            if (a !== t) {
              const u = document.querySelector(a.containerSelector);
              u && Qt(u) && n.to(u, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.inOut",
                onComplete: () => {
                  u.setAttribute("style", "display: none !important;"), a.isOpen = !1;
                }
              }, 0);
            }
          });
          const s = document.querySelector(t.containerSelector);
          n.to({}, {
            duration: 0.1,
            // Petit délai avant d'afficher le nouveau menu
            onComplete: () => {
              s.setAttribute("style", "display: flex !important; opacity: 0;"), n.to(s, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.inOut"
              });
            }
          }, ">0.1"), t.isOpen = !0;
        }
    }));
  }), console.log("Menu Wrapper:", document.querySelector(".desktop_menu_wrapper")), console.log("Boutons de menu:", {
    parcs: document.getElementById("nav-link-desktop-parcs"),
    activites: document.getElementById("nav-link-desktop-activites"),
    offres: document.getElementById("nav-link-desktop-offres")
  }), console.log("Conteneurs de menu:", {
    parcs: document.querySelector(".parc_menu_desktop"),
    activites: document.querySelector(".activites_menu_desktop"),
    offres: document.querySelector(".offres_menu_desktop")
  }), tr = !0;
}
let Ke = !1;
async function rr(o, t) {
  if (!o || !o.classList.contains("is-open")) return;
  const e = o.querySelector(t.contentSelector), i = o.querySelector(t.arrowSelector);
  o.classList.remove("is-open");
  const r = F.timeline();
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
async function Ns(o, t) {
  if (!o || o.classList.contains("is-open")) return;
  o.classList.add("is-open");
  const e = o.querySelector(t.contentSelector), i = o.querySelector(t.arrowSelector);
  F.set(e, {
    display: "block",
    height: "auto",
    opacity: 0
  });
  const r = e.scrollHeight, n = F.timeline();
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
async function Bs(o, t) {
  if (!Ke) {
    Ke = !0;
    try {
      if (o.classList.contains("is-open"))
        await rr(o, t);
      else {
        const i = document.querySelectorAll(`${t.itemSelector}.is-open`);
        await Promise.all(Array.from(i).map((n) => rr(n, t))), await Ns(o, t);
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
      Ke = !1;
    }
  }
}
function un(o) {
  const t = document.querySelectorAll(o.itemSelector);
  t.length !== 0 && t.forEach((e) => {
    const i = e.querySelector(o.triggerSelector), r = e.querySelector(o.contentSelector);
    !i || !r || (e.classList.contains("is-open") || F.set(r, { display: "none", height: 0 }), i.addEventListener("click", (n) => {
      n.preventDefault(), Bs(e, o);
    }));
  });
}
console.log("🚀 centre-card.js v4.0.0 chargé – Refactorisé avec Accordion et Events");
const Ct = {
  maxOffset: 0.1875,
  defaultVerticalOffset: 0.1875,
  shadowColor: "var(--colors--black)",
  scaleAmount: 1.05,
  scaleDuration: 0.15,
  scaleEase: "elastic.out(1, 0.3)"
};
function Us(o, t) {
  const e = t.getBoundingClientRect();
  return { x: -((o.clientX - e.left) / e.width * 2 - 1) };
}
function Vs(o, t) {
  if (!t || t.classList.contains("is-open")) return;
  const i = Us(o, t).x * Ct.maxOffset;
  t.style.boxShadow = `${i}rem ${Ct.defaultVerticalOffset}rem 0 0 ${Ct.shadowColor}`;
}
function Ws(o, t) {
  !t || t.classList.contains("is-open") || F.to(t, {
    scale: Ct.scaleAmount,
    duration: Ct.scaleDuration,
    ease: Ct.scaleEase
  });
}
function Ys(o) {
  o && F.to(o, {
    scale: 1,
    duration: Ct.scaleDuration,
    ease: Ct.scaleEase,
    onComplete: () => {
      o.classList.contains("is-open") || (o.style.boxShadow = "");
    }
  });
}
function Gs(o) {
  o.addEventListener("mouseenter", (t) => Ws(t, o)), o.addEventListener("mousemove", (t) => Vs(t, o)), o.addEventListener("mouseleave", () => Ys(o));
}
function Xs() {
  const o = {
    itemSelector: ".centre-card_wrapper.effect-cartoon-shadow",
    triggerSelector: '.clickable_wrap[data-attribute="data-card-toggle"]',
    contentSelector: ".centre-card_scroll_wrapper",
    arrowSelector: ".svg-holder.arrow"
  };
  un(o), document.querySelectorAll(o.itemSelector).forEach((e) => {
    Gs(e);
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
const $s = () => {
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
function ln() {
  const o = document.querySelector(".span_mover");
  if (o)
    try {
      let i = function() {
        if (e) return;
        e = !0;
        const r = F.timeline({
          onComplete: () => {
            e = !1, F.to(o, {
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
        F.killTweensOf(o);
      });
    } catch (t) {
      console.error("Erreur dans l'animation de texte:", t);
    }
}
function cn() {
  setTimeout(typeof F < "u" ? ln : cn, 100);
}
cn();
console.log("🚀 faq-toggle.js v1.0.2 chargé – Système de FAQ avec animations GSAP");
async function js() {
  un({
    itemSelector: ".faq_item.effect-cartoon-shadow",
    triggerSelector: ".faq_wrapper",
    contentSelector: ".faq_respond",
    arrowSelector: ".svg-holder.medium"
  });
}
console.log("🗺️ map-integration.js v2.0.0 chargé");
const _i = {
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
window.initGoogleMap = _i.initMap.bind(_i);
function Ks() {
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
    console.log("🗺️ Google Maps API déjà chargée."), _i.initMap();
    return;
  }
  console.log("🗺️ Chargement de l'API Google Maps...");
  const e = document.createElement("script");
  e.src = `https://maps.googleapis.com/maps/api/js?key=${t}&libraries=places,marker&callback=initGoogleMap`, e.async = !0, document.head.appendChild(e);
}
console.log("🔍 main_gsap.js - Module chargé et exécution commencée");
console.log("📦 main_gsap.js - Début du chargement");
function Hs() {
  document.querySelectorAll(".desktop_menu_wrapper, .parc_menu_desktop, .activites_menu_desktop, .offres_menu_desktop, .menu-mobile").forEach((o) => {
    o && o.classList.add("is-hidden");
  });
}
function Zs() {
  document.querySelector(".desktop_menu_wrapper") ? (console.log("✅ Menu wrapper trouvé immédiatement. Initialisation..."), ir()) : (console.log("⏳ Menu wrapper non trouvé. Mise en place d'un observateur..."), new MutationObserver((e, i) => {
    document.querySelector(".desktop_menu_wrapper") && (console.log("👀 L'observateur a détecté le menu wrapper. Initialisation..."), ir(), i.disconnect());
  }).observe(document.body, {
    childList: !0,
    subtree: !0
  }));
}
async function Qs() {
  console.log("🎬 Début de l'initialisation des modules");
  try {
    Hs(), console.log("✅ États initiaux définis via classes CSS");
    const o = await ks();
    Zs();
    const t = [
      Is(),
      Xs(),
      $s(),
      ln(),
      js(),
      Ks()
    ];
    if (await Promise.all(t), console.log("✨ Tous les modules ont été initialisés"), document.getElementById("container-initial")) {
      console.log("🏝️ Page de réservation détectée, chargement du module...");
      try {
        const { SmileWorldReservation: i } = await import("./reservation-C7Dyd_rz.mjs");
        new i(), console.log("✅ Module de réservation chargé et initialisé.");
      } catch (i) {
        console.error("❌ Erreur lors du chargement du module de réservation:", i);
      }
    }
    o && Os();
  } catch (o) {
    console.error("❌ Erreur fatale lors de l'initialisation:", o), Cs();
  }
}
window.Webflow = window.Webflow || [];
window.Webflow.push(Qs);
export {
  F as g
};
