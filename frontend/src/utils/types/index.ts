export interface AuthFormData {
  email: string;
  password: string;
  passwordConfirm?: string;
  role?: string;
}
export interface DecodedJwt {
  email: string;
  exp: number;
  iat: number;
  role: string;
  userId: number;
}
export interface RecipiesInterface {
  created_at: Date;
  email: string;
  id: number;
  recipie: { [key: string]: string };
  title: string;
}
export interface DataInterface {
  data: RecipiesInterface[] | null;
  setData: React.Dispatch<React.SetStateAction<RecipiesInterface[] | null>>;
}
