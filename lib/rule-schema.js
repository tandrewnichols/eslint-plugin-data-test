module.exports = [
  {
    enum: ['always', 'never']
  },
  {
    type: 'object',
    properties: {
      testAttribute: {
        type: [
          'string',
          'array'
        ]
      },
      ignoreReadonly: {
        type: 'boolean'
      }
    },
    additionalProperties: false
  }
];
