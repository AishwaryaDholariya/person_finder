import * as jmEzMySql from "jm-ez-mysql";

export class DB {
  public static init() {
    jmEzMySql.init({
      acquireTimeout: 100 * 60 * 1000,
      connectTimeout: 100 * 60 * 1000,
      connectionLimit: 10000,
      database: process.env.DATABASE,
      dateStrings: true,
      host: process.env.DB_HOST,
      multipleStatements: true,
      password: process.env.DB_PASSWORD,
      timeout: 100 * 60 * 1000,
      timezone: "utc",
      user: process.env.DB_USER,
      charset: "utf8mb4",
      collation: "utf8mb4_unicode_ci",
    });
  }
}
