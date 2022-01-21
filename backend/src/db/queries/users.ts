import { Query } from "../";
import { MYsqlResponse, UsersTable } from "../models";
const findUser = (column: string, value: string) =>
  Query<UsersTable[]>("SELECT * FROM users WHERE ?? = ?", [column, value]);
const insertUser = (newUser: {
  email: string;
  password: string;
  role: "user" | "admin";
}) => Query<MYsqlResponse>("INSERT INTO users SET ?", newUser);
export default { findUser, insertUser };
