module.exports = {
  'central-file': {
    input: 'http://localhost:5000/swagger.json',
    output: {
      target: 'src/api/endpoints.ts',
      mode: 'split',
      schemas: 'src/api/model',
      client: 'react-query',
      prettier: true,
      tsconfig: true,
      override: {
        mutator: {
          path: 'src/api/axios-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
};
