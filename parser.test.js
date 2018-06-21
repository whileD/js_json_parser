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
  describe('parseObject', () => {
    test('simple object', () => {
      const object = { a: 1, b: "c" };
      const parser = new JSONParser(JSON.stringify(object));
      const parsed = parser.parseObject();
      expect(parsed).toMatchObject(object);
    });
  });
});
