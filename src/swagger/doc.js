
 const swaggerDefinition = {
  paths: {
    '/registration': {
      get: {
        summary: 'This api is used to for registration ',
        responses: {
          '200': {
            description: 'Successful response',
            
          },
        },
      },
    },
  }
 }

module.exports = {
   swaggerDefinition 

}
