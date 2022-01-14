// eslint-disable-next-line import/no-extraneous-dependencies
require("babel-core/register");
const config = require("../config");

const {
  DATABASE: { HOST, PASSWORD, PORT, USERNAME, DIALECT, NAME },
  ENVIRONMENT,
} = config;

module.exports = {
  [ENVIRONMENT]: {
    username: USERNAME,
    password: PASSWORD,
    port: PORT,
    database: NAME,
    dialect: DIALECT,
    host: HOST,
  },
};
