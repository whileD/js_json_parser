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

  /*
  parseObject() {
    if (this.source.at == '{') this.source.next();
    else throw new Error('Error: object parse error');

    const object = {};

    while(!this.source.empty && this.source.at != '}') {
      this.source.next();
    }

    if (this.source.at == '}') {
      this.source.next();
      return object;
    } else throw new Error('Error: object parse error');
  }
  */

  parseString() {
    if (this.source.at != '"') throw new Error('SyntaxError: Not String');

    this.source.next();
    let str = "";

    while(this.source.at != '"' && !this.source.empty) {
      str += this.source.at;
      this.source.next();
    }

    if (this.source.at !== '"') throw new Error('SyntaxError: Not String');
    else {
      this.source.next();
      return str;
    }
  }

  parseNumber() {
    let num = '';

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
}

const NUMERIC = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];

class Source {
  constructor(src) {
    this.src = src;
    this.p = 0;
  }

  next() {
    this.p++;
    while (!this.empty && this.at == ' ')  p++;
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
