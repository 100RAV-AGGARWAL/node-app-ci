const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Lilly Scout API',
    version: '1.0.0',
    description: 'Server-only REST API documentation for Lilly Scout.',
  },
  tags: [
    {
      name: 'Health',
      description: 'Service health endpoints.',
    },
    {
      name: 'Users',
      description: 'User management endpoints.',
    },
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Check server health',
        responses: {
          '200': {
            description: 'Server is running.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'ok',
                    },
                  },
                  required: ['status'],
                },
              },
            },
          },
        },
      },
    },
    '/api/users/all': {
      get: {
        tags: ['Users'],
        summary: 'Get all users',
        responses: {
          '200': {
            description: 'List of users.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    users: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/User',
                      },
                    },
                  },
                  required: ['users'],
                },
              },
            },
          },
        },
      },
    },
    '/api/users/add': {
      post: {
        tags: ['Users'],
        summary: 'Add a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  user: {
                    $ref: '#/components/schemas/User',
                  },
                },
                required: ['user'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User created.',
          },
          '400': {
            $ref: '#/components/responses/BadRequest',
          },
        },
      },
    },
    '/api/users/update': {
      put: {
        tags: ['Users'],
        summary: 'Update a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  user: {
                    $ref: '#/components/schemas/User',
                  },
                },
                required: ['user'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User updated.',
          },
          '400': {
            $ref: '#/components/responses/BadRequest',
          },
          '404': {
            $ref: '#/components/responses/NotFound',
          },
        },
      },
    },
    '/api/users/delete/{id}': {
      delete: {
        tags: ['Users'],
        summary: 'Delete a user',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              minimum: 0,
            },
            example: 1,
          },
        ],
        responses: {
          '200': {
            description: 'User deleted.',
          },
          '400': {
            $ref: '#/components/responses/BadRequest',
          },
          '404': {
            $ref: '#/components/responses/NotFound',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            minimum: 0,
            example: 1,
          },
          name: {
            type: 'string',
            example: 'John Smith',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'john.smith@example.com',
          },
          created: {
            type: 'string',
            format: 'date-time',
            example: '2026-05-12T00:00:00.000Z',
          },
        },
        required: ['id', 'name', 'email', 'created'],
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            oneOf: [
              {
                type: 'string',
              },
              {
                type: 'object',
              },
            ],
          },
        },
        required: ['error'],
      },
    },
    responses: {
      BadRequest: {
        description: 'Invalid request payload or parameters.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
          },
        },
      },
      NotFound: {
        description: 'Requested resource was not found.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
          },
        },
      },
    },
  },
};

export default swaggerSpec;
