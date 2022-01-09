import { RecipiesTable, MYsqlResponse } from "../models";
import { Query } from "../";

const findAllRecipies = () => Query<RecipiesTable[]>("SELECT * FROM recipies");
const insertRecipie = (newRecipie: {
  title: string;
  email: string;
  recipie: string;
}) => Query<MYsqlResponse>("INSERT INTO recipies SET ?", newRecipie);
export default { findAllRecipies, insertRecipie };
