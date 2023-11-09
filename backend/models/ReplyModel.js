import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
import Thread from "./ThreadModel.js";

const { DataTypes } = Sequelize;

const Reply = db.define('replies', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    threadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    reply: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});


User.hasMany(Reply);
Reply.belongsTo(User, { foreignKey: 'userId' });
Thread.hasMany(Reply);
Reply.belongsTo(Thread, { foreignKey: 'threadId' });


export default Reply;