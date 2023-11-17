const express = require("express");
const middleware = require('swagger-express-middleware');
const swaggerUi = require('swagger-ui-express');

const YAML = require ("yamljs")
const doc = YAML.load("./src/doc.yaml")


const app = express();
app.use(express.json())
const port = 2020;


const userRoute = require("./src/routes/user");


// middleware(doc, app, (err, middleware) => {
//   // app.use(
//   //   middleware.files(app, {
//   //     apiPath: '/swagger',
//   //   })
//   // );
//   app.use(
//     middleware.metadata()
//   );
//   app.use(
//     middleware.CORS(),
//     middleware.validateRequest()
//   );


app.use('/user',userRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));


app.listen(port, () => {
    console.log(`Listing in ${port}`);

})

