export interface AuthFormData {
  email: string;
  password: string;
  role?: string;
}
export interface DecodedJwt {
  email: string;
  exp: number;
  iat: number;
  role: string;
  userId: number;
}
