import { createConnection } from "typeorm";

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "amir",
    password: "1234",
    database: "todo",
    synchronize: drop,
    dropSchema: drop,
    logging: true,
    entities: [__dirname + "/../entity/*.*"]
  });
};
