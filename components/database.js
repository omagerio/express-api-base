const { Sequelize, DataTypes } = require("sequelize");

class Database {

    connect() {
        this.connection = new Sequelize({
            dialect: "mysql",
            username: "omar4",
            password: "omar",
            host: "127.0.0.1",
            database: "impulso_ai_planner_2",
            port: 3306,
            logging: true
        });
    }

    async initialize() {

        /*
        this.connection.define("project",
            {
                id: { type: DataTypes.CHAR, primaryKey: true },
                name: { type: DataTypes.CHAR }
            }
        );
        */

        await this.connection.sync({alter: true});
    }
}

const database = new Database();
database.connect();
module.exports = database;