import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import config from './config/env';

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GetFitter API',
      version: '1.0.0',
      description: 'API for GetFitter fitness tracking application',
      contact: {
        name: 'GetFitter Team',
        url: 'https://getfitter.example.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              description: 'Response data'
            },
            message: {
              type: 'string',
              example: 'Operation successful'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  example: 'ERROR_CODE'
                },
                message: {
                  type: 'string',
                  example: 'Error message'
                }
              }
            },
            data: {
              type: 'object',
              nullable: true,
              example: null
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      }
    ]
  },
  apis: [
    './src/routes/*.ts',
    './src/app.ts'
  ]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};