import { Query } from "../";
import { MYsqlResponse, UsersTable } from "../models";
const find = (column: string, value: string) =>
  Query<UsersTable[]>("SELECT * FROM users WHERE ?? = ?", [column, value]);
const insert = () => Query<MYsqlResponse>("");
export default { find, insert };
