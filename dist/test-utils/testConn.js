"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
exports.testConn = (drop = false) => {
    return typeorm_1.createConnection({
        name: "default",
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "amir",
        password: "1234",
        database: "todo-test",
        synchronize: drop,
        dropSchema: drop,
        entities: [__dirname + "/../entity/*.*"]
    });
};
//# sourceMappingURL=testConn.js.map