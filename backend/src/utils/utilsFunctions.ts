import { RecipiesTable } from "../db/models";

export const stringToJSON = (resolut: RecipiesTable[]) =>
  resolut.map((row) => {
    const { recipie } = row;
    if (recipie !== undefined) {
      return { ...row, recipie: JSON.parse(recipie) };
    }
    return row;
  });
