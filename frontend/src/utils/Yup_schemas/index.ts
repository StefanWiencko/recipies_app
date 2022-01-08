import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password length should be at least 4 characters"),
});

export const registerSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  role: Yup.string().required("Role is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password length should be at least 4 characters"),
  passwordConfirm: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must and should match"),
});
