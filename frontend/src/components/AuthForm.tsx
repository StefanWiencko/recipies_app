import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import axios from "axios";
import constants from "../constants";
import { loginSchema, registerSchema } from "../utils/Yup_schemas";
import { AuthFormData } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./DataProvider";

export const AuthForm = () => {
  const [registerFlag, setRegisterFlag] = useState(false);
  const [duplicateEntry, setDuplicateEntry] = useState<null | boolean>(null);
  const { setData } = useContext(DataContext);
  const navigate = useNavigate();
  const validationOpt = {
    resolver: yupResolver(registerFlag ? registerSchema : loginSchema),
  };

  const { register, handleSubmit, reset, formState } = useForm(validationOpt);
  const { errors } = formState;

  const onFormSubmit = (data: AuthFormData) => {
    const endpoint = registerFlag ? "/auth/register" : "/auth/login";
    if (data.passwordConfirm) {
      delete data.passwordConfirm;
    }
    axios
      .post(constants.baseUrl + endpoint, data)
      .then((res) => {
        localStorage.setItem("recipies_app_jwt", res.data.token);
        setDuplicateEntry(null);
        setData(res.data.data);
        navigate("/");
        reset();
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 409) {
          setDuplicateEntry(true);
        }
      });
  };
  const toggleRegisterFlag = () => setRegisterFlag((prev) => !prev);

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <h2>{registerFlag ? "Register" : "Login"}</h2>
        <div className="">
          {registerFlag === true && (
            <button className="ternaryBtn btn" onClick={toggleRegisterFlag}>
              Back to login
            </button>
          )}
          <div className="formGroup">
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
            <div className="formGroup">
              <label>
                <strong>Role</strong>
              </label>
              <select
                {...register("role")}
                className={`form-control ${errors.role ? "is-invalid" : ""}`}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="invalid-feedback">{errors.role?.message}</div>
            </div>
          )}
          <div className="formGroup">
            <label>
              <strong>Password</strong>
            </label>
            <input
              type="password"
              {...register("password")}
              className={`form-control ${
                registerFlag && errors.password ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {registerFlag && errors.password?.message}
            </div>
          </div>
          {registerFlag && (
            <div className="formGroup">
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
              <div className="invalid-feedback">
                {duplicateEntry &&
                  "You are already registered. Please login instead."}
              </div>
            </div>
          )}
        </div>
        <div className="buttonsContainer">
          <button type="submit" className="btn mainBtn">
            Send
          </button>
          {registerFlag === false && (
            <button className="ternaryBtn btn" onClick={toggleRegisterFlag}>
              <span>Not registered ?</span>
              Create an account
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
