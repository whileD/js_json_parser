const JSONParser = require('./parser.js');

const jsonObject = {
  number : 1,
  float : 1.44,
  string: "string",
  n: null,
  array : [1, "string", {name: "name", age: 19.0}],
  object: {
    name: "name",
    age: 20
  },
  bool: false
};

const jsonArray = [jsonObject, jsonObject];

describe('JSONParser', () => {
  /*
  describe('parseObject', () => {
    test('simple object', () => {
      const object = { a: 1, b: "c" };
      const parser = new JSONParser(JSON.stringify(object));
      const parsed = parser.parseObject();
      expect(parsed).toMatchObject(object);
    });
  });
  */

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
});
