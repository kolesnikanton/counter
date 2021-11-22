const dev = require('./webpack/dev');
const prod = require('./webpack/prod');

module.exports = function config(env) {
  if (env.prod) {
    return prod;
  }

  return dev;
};
