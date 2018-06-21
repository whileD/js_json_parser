module.exports = class JSONPaser {
  constructor(src) {
    this.source = new Source(src);
  }

  static parse(src) {
    const parser = new JSONPaser(src);
    return parser.parseJSON();
  }

  parseJSON() {
  }
}

class Source {
  constructor(src) {
    this.src = src;
    this.p = 0;
  }

  next() {
    p++;
    while (!this.empty && this.at == ' ')  p++;
  }

  get empty() {
    return this.src.length <= this.p;
  }

  get at() {
    return this.src.charAt(this.p);
  }
}
