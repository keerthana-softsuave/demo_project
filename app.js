const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc= require('swagger-jsdoc')


const app = express();
app.use(express.json())
const port = 2020;


const userRoute = require("./src/routes/user");
const swagger = require('./src/swagger/doc')

const options = {
    definition: {
      info: {
        openapi: '3.0.0',
        title: 'My API',
        version: '2.0',
        description: 'API documentation using Swagger',
      },
      servers: [
        {
            url:  "http://localhost:2020/"
        }
      ]
    },
    apis: ['.']
}

const swaggerspec = swaggerJSDoc(options)
app.use('/user',userRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerspec,swagger));

app.listen(port, () => {
    console.log(`Listing in ${port}`);
});
