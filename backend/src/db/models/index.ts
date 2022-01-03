export interface UsersTable {
  id?: number;
  email?: string;
  password?: string;
  role?: "admin" | "user";
  created_at?: Date;
}

export interface MYsqlResponse {
  affectedRows: number;
  insertId: number;
}
