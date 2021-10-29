import DropdownQuestion from "../../../components/questions/dropdown/DropdownQuestion";
import InputQuestion from "../../../components/questions/input/InputQuestion";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import "./DemographicStep.css";

import data from "../../../data/gemeenteAkkoord.json";

import { Category } from "../../../models/category";


const categories: Category[] = data;

const tags = new Set<string>();

categories.map((c) => c.goals.map((g) => g.tags.map((t) => tags.add(t))));


const questions: JSX.Element[] = [
  <InputQuestion question="Wat is uw locatie?" />,
  <DropdownQuestion
    question="Wat is de doelgroepen?"
    options={["Jongeren", "Ouderen", "Man", "Vrouw", "Nonbinary", "Loaf"]}
  />,
  <InputQuestion question="Hoeveel mensen genaamd Toon wonen er in de woonwijk?" />,
  <DropdownQuestion
    question="Hoevaak sporten de mensen in de wijk gemiddeld per week?"
    options={["45", "42", "5"]}
  />,
  <Autocomplete
            multiple
            id="project-tags"
            options={Array.from(tags.values())}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Tags"
                placeholder="Project tags"
              />
            )}
          />
];

export default function DemographicStep() {
  const [activeQuestion, setActiveQuestion] = useState(0);

  return (
    <List>
      {questions.map((q, i) => {
        return (
          <ListItem onFocus={() => setActiveQuestion(i)} className={activeQuestion == i ? "Active" : ""}>
            {q}
          </ListItem>
        );
      })}
    </List>
  );
}
