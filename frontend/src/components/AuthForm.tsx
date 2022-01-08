import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext } from "react";
import axios from "axios";
import constants from "../constants";
import { loginSchema, registerSchema } from "../utils/Yup_schemas";
import { AuthFormData } from "../utils/types";
import { DataContext } from "./DataProvider";
import { Navigate } from "react-router-dom";

export function Auth() {
  const [registerFlag, setRegisterFlag] = useState(false);
  const { data } = useContext(DataContext);

  const validationOpt = {
    resolver: yupResolver(registerFlag ? registerSchema : loginSchema),
  };

  const { register, handleSubmit, formState } = useForm(validationOpt);

  const { errors } = formState;

  const onFormSubmit = (data: AuthFormData) => {
    const endpoint = registerFlag ? "/auth/register" : "/auth/login";
    axios
      .post(constants.baseUrl + endpoint, data)
      .then((res) => {
        localStorage.setItem("recipies_app_jwt", res.data);
      })
      .catch((err) => console.log(err));
  };
  console.log(localStorage.getItem("recipies_app_jwt") && data);
  const toggleRegisterFlag = () => setRegisterFlag((prev) => !prev);
  if (localStorage.getItem("recipies_app_jwt") && data) {
    return <Navigate to="/" />;
  }
  return (
    <div className="m-4">
      <h2>{registerFlag ? "Register" : "Login"}</h2>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="form-row">
          <div className="form-group">
            <label>
              <strong>Email</strong>
            </label>
            <input
              type="email"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
          {registerFlag && (
            <div className="form-group">
              <label>
                <strong>Role</strong>
              </label>
              <select
                {...register("role")}
                className={`form-control ${
                  errors.passwordConfirm ? "is-invalid" : ""
                }`}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="invalid-feedback">
                {errors.passwordConfirm?.message}
              </div>
            </div>
          )}
          <div className="form-group">
            <label>
              <strong>Password</strong>
            </label>
            <input
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          {registerFlag && (
            <div className="form-group">
              <label>
                <strong>Confirm Password</strong>
              </label>
              <input
                type="password"
                {...register("passwordConfirm")}
                className={`form-control ${
                  errors.passwordConfirm ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.passwordConfirm?.message}
              </div>
            </div>
          )}
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-dark mt-3">
            Send
          </button>
        </div>
      </form>
      <button onClick={toggleRegisterFlag}>Register</button>
    </div>
  );
}
