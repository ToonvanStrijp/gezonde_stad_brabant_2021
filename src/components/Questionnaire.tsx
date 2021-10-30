import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";

import "./Questionnaire.css";

const wijken = [
  "Binnenstad", "De Groote Wielen", "Empel", "Engelen", "Graafsepoort", "Maaspoort", "Muntel / Vliert", "Noord", "Nuland", "Rosmalen Noord", "Rosmalen Zuid", "Vinkel", "West", "Zuidoost"
]

export default function Questionnare() {
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
        <TextField label="Outlined" variant="outlined" />
      </div>

      <div className={currentQuestion === 2 ? "Question Active-question" : "Question"} onFocus={() => setCurrentQuestion(2)}>
        <span className="Title">Wat zijn de maatschappelijke doelen?</span>
        <TextField label="Outlined" variant="outlined" />
      </div>

      <div className={currentQuestion === 3 ? "Question Active-question" : "Question"} onFocus={() => setCurrentQuestion(3)}>
        <span className="Title">Wat is de omschrijving van het project?</span>
        <TextField multiline rows={4} label="Outlined" variant="outlined" />
      </div>
    </div>
  );
}
