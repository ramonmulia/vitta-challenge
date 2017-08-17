const exportConfig = require('export-config');

const config = {
  default: {
    PORT: 3000
  },
  development: {
    PORT: 3000
  },
  staging: {
    PORT: 3000
  },
  production: {
    PORT: process.env.PORT
  },
  required: ['PORT']
};

module.exports = exportConfig(config);
