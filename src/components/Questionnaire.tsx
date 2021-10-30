import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useRef, useState } from "react";

import "./Questionnaire.css";

const wijken = new Map<string, string[]>();

wijken.set("Binnenstad", [
  "centrum",
  "wijk",
  "hertogenbosch",
  "denbosch",
  "stad",
]);
wijken.set("De Groote Wielen", ["jongeren", "denbosch", "betrokken"]);
wijken.set("Empel", ["jongeren", "denbosch", "betrokken"]);
wijken.set("Engelen", ["buurt", "activiteiten", "bewoner"]);
wijken.set("Graafsepoort", ["jongeren", "denbosch", "betrokken"]);
wijken.set("Maaspoort", ["burger", "denbosch", "betrokken"]);
wijken.set("Muntel / Vliert", ["jongeren", "denbosch", "betrokken"]);
wijken.set("Noord", ["jongeren", "vluchtelingen", "betrokken"]);
wijken.set("Nuland", ["gemeente", "denbosch", "betrokken"]);
wijken.set("Rosmalen Noord", ["jongeren", "denbosch", "nieuwkomer"]);
wijken.set("Rosmalen Zuid", ["werk", "denbosch", "betrokken", "wonen"]);
wijken.set("Vinkel", ["jongeren", "denbosch", "betrokken"]);
wijken.set("West", ["eenzaamheid", "organisatie", "betrokken"]);
wijken.set("Zuidoost", ["jongeren", "denbosch", "betrokken"]);

const doelgroepen = new Map<string, string[]>();

doelgroepen.set("Kinderen", ["kinderen"]);
doelgroepen.set("Jongeren", ["jongeren"]);
doelgroepen.set("Studenten", ["studenten"]);
doelgroepen.set("Volwassenen", ["volwassenen"]);
doelgroepen.set("Ouderen", ["oudereen"]);

const maatschappelijkeDoelen = new Map<string, string[]>();

maatschappelijkeDoelen.set("Economie en arbeidsmarkt", [
  "economie",
  "begroting",
  "milieueducatie",
  "financiën",
]);
maatschappelijkeDoelen.set("Talentontwikkeling", [
  "onderwijs",
  "educatieve",
  "innovatie",
  "campus",
]);
maatschappelijkeDoelen.set("Sociale kwaliteit", [
  "studenten",
  "sociaal",
  "zorgketen",
  "zorg",
  "initiatieven",
]);
maatschappelijkeDoelen.set("Gezondheid en vitaliteit", [
  "positief",
  "focus",
  "gezondheid",
]);
maatschappelijkeDoelen.set("Cultuur en sport", [
  "bouw",
  "theater",
  "parade",
  "bibliotheek",
  "culturele",
]);
maatschappelijkeDoelen.set("Energie & klimaatadaptie", [
  "toekomst",
  "proeftuin",
  "klimaat",
  "neutraal",
]);
maatschappelijkeDoelen.set("Leven en wonen", [
  "centrum",
  "wonen",
  "historisch",
  "nieuw",
]);
maatschappelijkeDoelen.set("Verkeer en mobiliteit", [
  "autoluwe",
  "milieu",
  "garage",
  "parkeren",
]);
maatschappelijkeDoelen.set("Openbare orde en veiligheid", [
  "veiligheid",
  "ouderen",
  "gevoel",
  "wijk",
  "wijkfoto",
  "taskforce",
]);
maatschappelijkeDoelen.set("Partnership voor doelen", [
  "burgerbegroting",
  "inwoner",
  "G1000",
  "right",
  "challenge",
  "grenzen",
  "centrum",
]);
maatschappelijkeDoelen.set("Financiën", [
  "begroting",
  "financieel",
  "gemeente",
  "reserve",
  "woonlasten",
]);

type QuestionnaireProps = {
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const Questionnaire: React.FC<QuestionnaireProps> = ({ setTags }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedWijk, setSelectedWijk] = useState("");
  const previousSelectedWijk = usePrevious("");

  function usePrevious(value: any) {
    const ref = useRef("");
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    if (selectedWijk !== previousSelectedWijk) {
      setTags((t) => {
        const index = t.indexOf(previousSelectedWijk);
        if (index !== -1) {
          t.splice(index, 1);
        }
        t.push(selectedWijk);
        return t;
      });
    }
  }, [selectedWijk]);

  return (
    <div className="Questionnaire">
      <div
        className={
          currentQuestion === 0 ? "Question Active-question" : "Question"
        }
        onFocus={() => setCurrentQuestion(0)}
      >
        <span className="Title">Wat is de locatie van het project?</span>
        <Autocomplete
          options={Array.from(wijken.keys())}
          value={selectedWijk}
          onChange={(event: any, newValue: string | null) => {
            if (newValue !== null) setSelectedWijk(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Wijk" />}
        />
      </div>

      <div
        className={
          currentQuestion === 1 ? "Question Active-question" : "Question"
        }
        onFocus={() => setCurrentQuestion(1)}
      >
        <span className="Title">Wat zijn de doelgroepen?</span>
        <Autocomplete
          multiple
          options={Array.from(doelgroepen.keys())}
          renderInput={(params) => (
            <TextField {...params} label="Doelgroepen" />
          )}
        />
      </div>

      <div
        className={
          currentQuestion === 2 ? "Question Active-question" : "Question"
        }
        onFocus={() => setCurrentQuestion(2)}
      >
        <span className="Title">Wat zijn de maatschappelijke doelen?</span>
        <Autocomplete
          multiple
          options={Array.from(maatschappelijkeDoelen.keys())}
          renderInput={(params) => (
            <TextField {...params} label="Maatschappelijke doelen" />
          )}
        />
      </div>

      <div
        className={
          currentQuestion === 3 ? "Question Active-question" : "Question"
        }
        onFocus={() => setCurrentQuestion(3)}
      >
        <span className="Title">Wat is de omschrijving van het project?</span>
        <TextField multiline rows={4} label="Outlined" variant="outlined" />
      </div>
    </div>
  );
};

export default Questionnaire;
