import axios from "axios";
import jwt_decode from "jwt-decode";
import { FC, useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import constants from "../constants";
import { DecodedJwt, Recipies } from "../utils/types";
import { DataContext } from "./DataProvider";
export const NewRecipieForm: FC = () => {
  const { setData } = useContext(DataContext);
  const [stepCount, setStepCount] = useState(1);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("recipies_app_jwt") as string;
  const decodedJwt: DecodedJwt = jwt_decode(jwt);
  const arrayOfSteps = [...Array.from({ length: stepCount }, (_, i) => i + 1)];
  const addNewStepHandler = () => setStepCount((prev) => prev + 1);
  const onFormSubmit = (data: Recipies) => {
    axios
      .post(
        constants.baseUrl + "/api/new",
        { ...data, email: decodedJwt.email },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => setData(res.data))
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
    reset();
  };
  return (
    <div className="newRecipieWrapper">
      <form className="newRecipeForm" onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <Link className="ternaryBtn btn" to="/">
            Back
          </Link>
          <div className="inputWrapper">
            <label>Recipie name</label>
            <input
              type="text"
              className="input"
              required
              {...register("title")}
            />
          </div>
          {arrayOfSteps.map((number) => (
            <div className="inputWrapper" key={number}>
              <label>Step {number}</label>
              <textarea
                className="input"
                required
                {...register(`step${number}`)}
              />
            </div>
          ))}
        </div>
        <div className="buttonWrapper">
          <button className="secondaryBtn btn" onClick={addNewStepHandler}>
            Add new step
          </button>
          <button className="mainBtn btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
