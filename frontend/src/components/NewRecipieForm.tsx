import axios from "axios";
import jwt_decode from "jwt-decode";
import { FC, useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import constants from "../constants";
import { DecodedJwt } from "../utils/types";
import { DataContext } from "./DataProvider";
export const NewRecipieForm: FC = () => {
  const { setData } = useContext(DataContext);
  const [stepCount, setStepCount] = useState(1);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("recipies_app_jwt") as string;
  const decodedJwt: DecodedJwt = jwt_decode(jwt);
  const arrayOfSteps = [...Array.from({ length: stepCount }, (_, i) => i + 1)];
  const addNewStepHandler = () => setStepCount((prev) => prev + 1);
  const onFormSubmit = (data: any) => {
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
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <div>
            <label>Recipie name</label>
            <input type="text" required {...register("title")} />
          </div>
          {arrayOfSteps.map((number) => (
            <div key={number}>
              <label>Step {number}</label>
              <textarea required {...register(`step${number}`)} />
            </div>
          ))}
        </div>
        <div>
          <Link to="/">Back</Link>
          <button onClick={addNewStepHandler}>Add new step</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
