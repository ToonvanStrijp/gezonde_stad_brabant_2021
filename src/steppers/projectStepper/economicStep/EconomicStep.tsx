import DropdownQuestion from "../../../components/questions/dropdown/DropdownQuestion";
import InputQuestion from "../../../components/questions/input/InputQuestion";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";
import "./EconomicStep.css";

const questions: JSX.Element[] = [
  <InputQuestion question="Hoeveel inwoners ouder dan 65 jaar leven er in de woonwijk?" />,
  <DropdownQuestion
    question="Wat is de overheersende leeftijdsgroep in de woonwijk?"
    options={["45", "42", "5"]}
  />,
  <InputQuestion question="Hoeveel mensen genaamd Toon wonen er in de woonwijk?" />,
  <DropdownQuestion
    question="Hoevaak sporten de mensen in de wijk gemiddeld per week?"
    options={["45", "42", "5"]}
  />,
  <DropdownQuestion
    question="Wat voor type woonwijk is het?"
    options={["45", "42", "5"]}
  />,
  <DropdownQuestion
    question="Welk soort mensen wonen er?"
    options={["45", "42", "5"]}
  />,
  <DropdownQuestion
    question="Welke cateogry valt deze vraag onder?"
    options={["45", "42", "5"]}
  />,
];

export default function EconomicStep() {
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
