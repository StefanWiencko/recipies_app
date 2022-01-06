import { Query } from "../";
import { MYsqlResponse, UsersTable } from "../models";
const find = (column: string, value: string) =>
  Query<UsersTable[]>("SELECT * FROM users WHERE ?? = ?", [column, value]);
const insert = (newUser: {
  email: string;
  password: string;
  role: "user" | "admin";
}) => Query<MYsqlResponse>("INSERT INTO users SET ?", newUser);
export default { find, insert };
