module.exports = class JSONPaser {
  constructor(src) {
    this.source = new Source(src);
  }

  static parse(src) {
    const parser = new JSONPaser(src);
    return parser.parseValue();
  }

  parseString() {
    if (this.source.at != '"') throw new SyntaxError();

    this.source.next();
    let str = '';

    while(this.source.at !== '"' && !this.source.empty) {
      if (this.source.at === '\\') this.source.inc();
      str += this.source.at;
      this.source.inc();
    }

    if (this.source.at !== '"') throw new SyntaxError();
    else {
      this.source.next();
      return str;
    }
  }

  parseNumber() {
    let num = '';

    if (this.source.at === '-') {
      num += this.source.at;
      this.source.next();
    }

    while(!this.source.empty && NUMERIC.includes(this.source.at)) {
      num += this.source.at;
      this.source.next();
    }

    if (this.source.at !== '.') {
      return parseInt(num);
    }

    num += '.';
    this.source.next();

    while(!this.source.empty && NUMERIC.includes(this.source.at)) {
      num += this.source.at;
      this.source.next();
    }
    
    return parseFloat(num);
  }

  parseBool() {
    let bool = '';
    switch(this.source.at) {
      case 'f': {
        bool = this.source.skip(5);
        if (bool === 'false') return false;
        else return new Error();
      }
      case 't': {
        bool = this.source.skip(4);
        if (bool === 'true') return true;
        else return new Error();
      }
      default: return new Error();
    }
  }

  parseNull() {
    if (this.source.at !== 'n') throw new Error();

    const str = this.source.skip(4);
    if (str === 'null') return null;
    else throw new Error();
  }

  parseArray() {
    if (this.source.at !== '[') throw new Error();
    this.source.next();
    const array = [];
    
    while (!this.source.empty && this.source.at !== ']') {
      if (this.source.at === ',') this.source.next();
      array.push(this.parseValue());
    }

    this.source.next();
    return array;
  }

  parseObject() {
    if (this.source.at !== '{') throw new Error();
    this.source.next();

    const object = {};

    while (!this.source.empty && this.source.at !== '}') {
      if (this.source.at === ',') this.source.next();
      const key = this.parseString();
      if (this.source.at === ':') this.source.next();
      const value = this.parseValue();
      object[key] = value;
    }

    this.source.next();

    return object;
  }

  parseValue() {
    if (this.source.at === '"') return this.parseString();
    else if (NUMERIC.includes(this.source.at)) return this.parseNumber();
    else if (['t', 'f'].includes(this.source.at)) return this.parseBool();
    else if (this.source.at === 'n') return this.parseNull();
    else if (this.source.at === '{') return this.parseObject();
    else if (this.source.at === '[') return this.parseArray();

    console.log(this.source.skip(10));
    throw new Error();
  }
}

 
const NUMERIC = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];

class Source {
  constructor(src) {
    this.src = src;
    this.p = 0;
  }

  inc() {
    this.p++;
  }

  next() {
    this.p++;
    while (!this.empty && this.at == ' ')  this.p++;
  }

  skip(num) {
    let str = '';
    for (let i=0; i<num; i++) {
      str += this.at;
      this.next();
    }
    return str;
  }

  get empty() {
    return this.src.length <= this.p;
  }

  get at() {
    return this.src.charAt(this.p);
  }
}
