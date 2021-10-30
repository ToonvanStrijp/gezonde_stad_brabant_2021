import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState } from "react";
import Button from '@mui/material/Button';

import "./Questionnaire.css";

const wijken = [
  "Binnenstad", "De Groote Wielen", "Empel", "Engelen", "Graafsepoort", "Maaspoort", "Muntel / Vliert", "Noord", "Nuland", "Rosmalen Noord", "Rosmalen Zuid", "Vinkel", "West", "Zuidoost"
]

const doelgroepen = [
  "Kinderen", "Jongeren", "Studenten", "Volwassenen", "Ouderen", 
]

const maatschappelijkeDoelen = [
  "Economie en arbeidsmarkt", "Talentontwikkeling", "Sociale kwaliteit", "Gezondheid en vitaliteit", "Cultuur en sport", "Energie & klimaatadaptie", "Leven en wonen", "Verkeer en mobiliteit", "Openbare orde en veiligheid", "Partnership voor doelen", "Financiën"
]

type QuestionnaireProps = {
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({setTags}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <div className="Questionnaire">
      <div className={currentQuestion === 0 ? "Question Active-question" : "Question"} onFocus={() => setCurrentQuestion(0)}>
        <span className="Title">Wat is de locatie van het project?</span>
        <Autocomplete
            options={wijken}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Wijk"
              />
            )}
          />
      </div>

      <div className={currentQuestion === 1 ? "Question Active-question" : "Question"} onFocus={() => setCurrentQuestion(1)}>
        <span className="Title">Wat zijn de doelgroepen?</span>
        <Autocomplete
          multiple
            options={doelgroepen}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Doelgroepen"
              />
            )}
          />
      </div>

      <div className={currentQuestion === 2 ? "Question Active-question" : "Question"} onFocus={() => setCurrentQuestion(2)}>
        <span className="Title">Wat zijn de maatschappelijke doelen?</span>
        <Autocomplete
          multiple
            options={maatschappelijkeDoelen}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Maatschappelijke doelen"
              />
            )}
          />
      </div>

      <div className={currentQuestion === 3 ? "Question Active-question" : "Question"} onFocus={() => setCurrentQuestion(3)}>
        <span className="Title">Wat is de omschrijving van het project?</span>
        <TextField multiline rows={4} label="Outlined" variant="outlined" />
      </div>

      <Button onClick={() => {
      }} variant="contained">set tags</Button>
    </div>
  );
}

export default Questionnaire;