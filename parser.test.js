const JSONParser = require('./parser.js');

const jsonObject = {
  number : 1,
  float : 1.44,
  string: "string",
  n: null,
  array : [1, "string", {name: "name", age: 19.01}],
  object: {
    name: "name",
    age: 20
  },
  bool: false
};

const jsonArray = [jsonObject, jsonObject];

describe('JSONParser', () => {
  describe('parseString', () => {
    test('simple string', () => {
      const str = "string";
      const parser = new JSONParser(JSON.stringify(str));
      const parsed = parser.parseString();
      expect(parsed).toBe(str);
    });
  });

  describe('parseNumber', () => {
    test('integer number', () => {
      const number = 1111;
      const parser = new JSONParser(JSON.stringify(number));
      const parsed = parser.parseNumber();
      expect(parsed).toBe(number);
    });
    
    test('floating number', () => {
      const number = 11.11;
      const parser = new JSONParser(JSON.stringify(number));
      const parsed = parser.parseNumber();
      expect(parsed).toBe(number);
    });
  });

  describe('parseBool', () => {
    test('true', () => {
      const bool = true;
      const parser = new JSONParser(JSON.stringify(bool));
      const parsed = parser.parseBool();
      expect(parsed).toBe(bool);
    });

    test('false', () => {
      const bool = false;
      const parser = new JSONParser(JSON.stringify(bool));
      const parsed = parser.parseBool();
      expect(parsed).toBe(bool);
    });
  });

  describe('parseNull', () => {
    test('false', () => {
      const isNull = null;
      const parser = new JSONParser(JSON.stringify(isNull));
      const parsed = parser.parseNull();
      expect(parsed).toBe(isNull);
    });
  });

  describe('parseArray', () => {
    test('simple array', () => {
      const array = [1, 11.1, "string", false, null];
      const parser = new JSONParser(JSON.stringify(array));
      const parsed = parser.parseArray();
      expect(parsed).toEqual(array);
    });
  });

  describe('parseObject', () => {
    test('simple object', () => {
      const object = {a: 11, b: 11.1, c: "string", d: false, e: null};
      const parser = new JSONParser(JSON.stringify(object));
      const parsed = parser.parseObject();
      expect(parsed).toEqual(object);
    });
  });

  describe('parse', () => {
    test('json', () => {
      const parsed = JSONParser.parse(JSON.stringify(jsonObject));
      expect(parsed).toEqual(jsonObject);
    });
  });
});
