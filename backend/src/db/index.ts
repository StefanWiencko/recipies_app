import mysql from "mysql";
import config from "../config";
const pool = mysql.createPool(config.db);
export const Query = <T = any>(query: string, values?: any) => {
  return new Promise<T>((resolve, reject) => {
    pool.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
const tableInit = async () => {
  const findTable = (name: string) => Query<any>("SHOW TABLES LIKE ?;", [name]);
  const recipies = await findTable("recipies");
  const users = await findTable("users");
  if (recipies[0] === undefined) {
    const newRecipiesTable = await Query<any>(
      "create table recipies (id int auto_increment,title varchar(255),recipie text(65535),email varchar(60),created_at timestamp default now(),primary key(id));"
    );
  }
  if (users[0] === undefined) {
    const newUsersTable = await Query<any>(
      "create table users (id int auto_increment,email varchar(60) not null unique,password varchar(60) not null,role varchar(60) not null,created_at timestamp default now(),primary key(id));"
    );
  }
};
tableInit();
import users from "./queries/users";
import recipies from "./queries/recipies";
export default {
  users,
  recipies,
};
