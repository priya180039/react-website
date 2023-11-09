import { Sequelize } from "sequelize";

const db = new Sequelize('fordis_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;