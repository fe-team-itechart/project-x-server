module.exports = {
  openapi: '3.0.1',
  info: {
    title: 'Project-X',
    version: '0.1',
    description: 'Project-X',
  },
  servers:[
    {
      url:"http://localhost:8080/"
    }
  ],
  apis: ['api/**/*.js'],
};
