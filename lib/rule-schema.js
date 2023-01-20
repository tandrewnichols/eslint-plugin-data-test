module.exports = [
  {
    "enum": ["always", "never"]
  },
  {
    "type": "object",
    "properties": {
      "testAttribute": {
        "type": "string"
      },
      "ignoreReadonly": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  }
];
