import { Goal } from "./goal";

export type Category = {
  id: number;
  title: string;
  description: string;
  goals: Goal[];
};
