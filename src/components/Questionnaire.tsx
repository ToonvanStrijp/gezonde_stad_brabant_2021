import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useRef, useState } from "react";

import data from "../data/gemeenteAkkoord.json";
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
  setTags: React.Dispatch<string[]>;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({setTags}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedWijk, setSelectedWijk] = useState("");
  const previousSelectedWijk = usePrevious(selectedWijk);

  function usePrevious(value: any) {
    const ref = useRef("");
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    // // The first time we select a wijk we only want to increase the count
    // if(selectedWijk === "")
    // {
    //   const value = tags.get(selectedWijk.toLowerCase());

    //   if(value !== undefined)
    //     tags.set(selectedWijk.toLowerCase(), value + 1);
    // }
    // else
    // {
    //   const previousValue = tags.get(previousSelectedWijk.toLowerCase());
    //   const value = tags.get(selectedWijk.toLowerCase());

    //   if(previousValue !== undefined)
    //     tags.set(previousSelectedWijk.toLowerCase(), previousValue -1);

    //   if(value !== undefined)
    //     tags.set(selectedWijk.toLowerCase(), value + 1);
    // }
    
    // // Otherwise we want to decrease the count for the previous wijk and increase it for the current
    // console.log(previousSelectedWijk, selectedWijk  );
  }, [selectedWijk])

  return (
    <div className="Questionnaire">
      <div className={currentQuestion === 0 ? "Question Active-question" : "Question"} onFocus={() => setCurrentQuestion(0)}>
        <span className="Title">Wat is de locatie van het project?</span>
        <Autocomplete
            options={wijken}
            value={selectedWijk}
            onChange={(event: any, newValue: string | null) => 
            {
              if(newValue !== null)
                setSelectedWijk(newValue);
            }}
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
        setTags(["rosmalen"])
      }} variant="contained">set tags</Button>
    </div>
  );
}

export default Questionnaire;