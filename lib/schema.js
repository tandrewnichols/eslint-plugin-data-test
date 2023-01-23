exports.domRule = [
  {
    enum: ['always', 'never']
  },
  {
    type: 'object',
    properties: {
      domAttribute: {
        type: 'string'
      }
    },
    additionalProperties: false
  }
];

exports.handlerRule = [
  {
    enum: ['always', 'never']
  },
  {
    type: 'object',
    properties: {
      componentAttribute: {
        type: 'string'
      },
      domAttribute: {
        type: 'string'
      }
    },
    additionalProperties: false
  }
];
