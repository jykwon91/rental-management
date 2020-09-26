import { Sequelize } from "sequelize";
//import config from "../../config/config";

const sequelize = new Sequelize(
  "postgres://development:development@127.0.0.1:5432/notworking"
);

sequelize.sync();

export default sequelize;
