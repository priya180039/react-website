import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Thread = db.define('threads', {
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
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 50]
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tags: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
            return this.getDataValue('tags').split(';');
        },
        set(tags){
            if(Array.isArray(tags)){
                const lowerCase = tags.map((tag) => tag.toLowerCase());
                this.setDataValue('tags', lowerCase.join(';'));
            }
        }
    },
    solved: {
        type: DataTypes.TEXT,
    }
}, {
    freezeTableName: true
});


User.hasMany(Thread);
Thread.belongsTo(User, { foreignKey: 'userId' });


export default Thread;