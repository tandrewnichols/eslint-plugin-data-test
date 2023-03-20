exports.domRule = [
  {
    enum: ['always', 'never']
  },
  {
    type: 'object',
    properties: {
      domAttribute: {
        type: 'string'
      },
      ignore: {
        oneOf: [
          { type: 'string' },
          {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        ]
      },
      ignorePattern: {
        oneOf: [
          { type: 'string' },
          {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        ]
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
      },
      ignore: {
        oneOf: [
          { type: 'string' },
          {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        ]
      },
      ignorePattern: {
        oneOf: [
          { type: 'string' },
          {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        ]
      }
    },
    additionalProperties: false
  }
];
