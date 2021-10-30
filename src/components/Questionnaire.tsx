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

doelgroepen.set("Kinderen", ["kinderen", "vluchtelingen", "kind"]);
doelgroepen.set("Jongeren", ["jongeren"]);
doelgroepen.set("Studenten", ["studenten", "dugs", "studeren", "JADS"]);
doelgroepen.set("Volwassenen", ["volwassenen", "werk"]);
doelgroepen.set("Ouderen", ["ouderen", "mobiel", "vervoer"]);

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
  const [selectedWijk, setSelectedWijk] = useState<string>('');
  const [selectedDoelgroepen, setSelectedDoelgroepen] = useState<string[]>([]);
  const [selectedMaatschappelijkeDoelen, setSelectedMaatschappelijkeDoelen] = useState<string[]>([]);

  useEffect(() => {

    const wijkenTags = Array.from(wijken.get(selectedWijk ?? '')?.values() ?? []);

    const doelgroepenTags = selectedDoelgroepen.reduce<string[]>((r, v) => {
      r.push(...Array.from(doelgroepen.get(v)?.values() ?? []));
      return r;
    }, []);

    const maatschappelijkeTags = selectedMaatschappelijkeDoelen.reduce<string[]>((r, v) => {
      r.push(...Array.from(maatschappelijkeDoelen.get(v)?.values() ?? []));
      return r;
    }, []);

    setTags([...wijkenTags, ...doelgroepenTags, ...maatschappelijkeTags]);
  }, [selectedDoelgroepen, selectedWijk, selectedMaatschappelijkeDoelen])

  const questions = [
    <>
      <span className="Title">Wat is de locatie van het project?</span>
      <Autocomplete
        options={Array.from(wijken.keys())}
        value={selectedWijk}
        onChange={(event: any, newValue: string | null) => {
          setSelectedWijk(newValue ?? '');
        }}
        renderInput={(params) => <TextField {...params} label="Wijk" />}
      />
    </>,
    <>
      <span className="Title">Wat zijn de doelgroepen?</span>
      <Autocomplete
        multiple
        options={Array.from(doelgroepen.keys())}
        value={selectedDoelgroepen}
        renderInput={(params) => <TextField {...params} label="Doelgroepen" />}
        onChange={(event, value) => {
          setSelectedDoelgroepen(value);
        }}
      />
    </>,
    <>
      <span className="Title">Wat zijn de maatschappelijke doelen?</span>
      <Autocomplete
        multiple
        options={Array.from(maatschappelijkeDoelen.keys())}
        value={selectedMaatschappelijkeDoelen}
        renderInput={(params) => (
          <TextField {...params} label="Maatschappelijke doelen" />
        )}
        onChange={(event, value) => {
          setSelectedMaatschappelijkeDoelen(value);
        }}
      />
    </>,
    <>
      <span className="Title">Omschrijving van het project?</span>
      <TextField multiline rows={4} variant="outlined" />
    </>,
  ];

  return (
    <div className="Questionnaire">
      {questions.map((q, i) => {
        return (
          <div
            key={i}
            className={
              currentQuestion === i ? "Question Active-question" : "Question"
            }
            onFocus={() => setCurrentQuestion(i)}
          >
            {q}
          </div>
        );
      })}
    </div>
  );
};

export default Questionnaire;
