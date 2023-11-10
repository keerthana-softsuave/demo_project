const swaggerUi = require('swagger-ui-express');
const YAML = require ("yamljs")
//const swaggerJSDocs = YAML.load("doc.yaml")

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        openapi: '3.0.0',
        title: 'My API',
        version: '2.0',
        description: 'API documentation using Swagger',
      },
    },
}



