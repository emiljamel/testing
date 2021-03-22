import { createConnection } from "typeorm";

const database = async () => {
  return await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "test",
    entities: [
      "models/*.js"
    ],
    synchronize: true,
  });
}

export default database;