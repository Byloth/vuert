// node_modules/@byloth/exceptions/dist/exceptions.js
var d = Object.defineProperty;
var o = (n, t, e) => t in n ? d(n, t, { enumerable: true, configurable: true, writable: true, value: e }) : n[t] = e;
var a = (n, t, e) => (o(n, typeof t != "symbol" ? t + "" : t, e), e);
var i = class extends Error {
  static FromUnknown(t) {
    if (t instanceof i)
      return t;
    const e = new i("");
    return t instanceof Error ? (e.message = t.message, e.stack = t.stack, e.name = t.name) : e.message = String(t), e;
  }
  constructor(t, e, s = "Exception") {
    super(t), this.name = s, e && (e instanceof Error ? this.stack += `

Caused by ${e.stack}` : this.stack += `

Caused by ${e}`);
  }
};
var l = class extends i {
  constructor(e, s = "HandledException") {
    super("The original exception has already been handled.");
    a(this, "handled");
    this.name = s, this.stack += `

Handled ${e.stack}`, this.handled = e;
  }
};
var h = class {
  constructor(t = {}) {
    a(this, "_options");
    a(this, "_map");
    a(this, "_default");
    a(this, "_set");
    this._options = { ...h.DefaultOpts, ...t }, this._map = [], this._default = (e) => {
      throw e;
    }, this._set = false;
  }
  static get DefaultOpts() {
    return { rethrowHandled: false };
  }
  _add(t, e) {
    this._map.push({ type: t, handler: e });
  }
  on(t, e) {
    if (this._set)
      throw new i("The default handler has already been set. You cannot specify a new exception type to handle after the default handler has been set.");
    return Array.isArray(t) ? t.forEach((s) => this._add(s, e)) : this._add(t, e), this;
  }
  otherwise(t) {
    if (this._set)
      throw new i("The default handler has already been set. You cannot specify more than one default handler.");
    return this._default = t, this._set = true, this;
  }
  handle(t) {
    if (this._options.rethrowHandled && this._map.length === 0)
      return console.warn("Handling an exception this way is redundant and causes some execution overhead.\nDid you maybe miss using the `on` method to define the exception type to handle?"), this._default(t);
    if (t instanceof l)
      return console.warn(t);
    for (const { type: e, handler: s } of this._map)
      if (t instanceof e)
        return s(t);
    return this._default(t);
  }
};
var f = "2.0.0-rc.3";
export {
  i as Exception,
  l as HandledException,
  h as HandlerBuilder,
  f as VERSION
};
//# sourceMappingURL=@byloth_exceptions.js.map
