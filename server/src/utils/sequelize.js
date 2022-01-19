import { Sequelize } from "sequelize";
import config from "../config";

const {
  DATABASE: { HOST, PASSWORD, PORT, USERNAME, DIALECT, NAME },
} = config;
const sequelize = new Sequelize({
  host: HOST,
  password: PASSWORD,
  username: USERNAME,
  port: PORT,
  dialect: DIALECT,
  database: NAME,
  define: { freezeTableName: true },
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;
