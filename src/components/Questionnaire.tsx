import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useRef, useState } from "react";
import data from "../data/gemeenteAkkoord.json";

import "./Questionnaire.css";
import useDebounce from "./debounce";

const tags = Array.from(data.reduce((set, category) => {
  category.goals.reduce<string[]>((tags, goal) => {
    tags.push(...goal.tags);
    return tags;
  }, []).forEach(tag => {
    set.add(tag);
  });
  return set;
}, new Set<string>()));

const wijken = new Map<string, string[]>();

wijken.set("Binnenstad", [
  "centrum",
  "wijk",
  "hertogenbosch",
  "denbosch",
  "stad",
]);
wijken.set("De Groote Wielen", ["jongeren", "denbosch"]);
wijken.set("Empel", ["jongeren", "denbosch"]);
wijken.set("Engelen", ["buurt", "activiteiten", "bewoner"]);
wijken.set("Graafsepoort", ["jongeren", "denbosch"]);
wijken.set("Maaspoort", ["burger", "denbosch"]);
wijken.set("Muntel / Vliert", ["jongeren", "denbosch"]);
wijken.set("Noord", ["jongeren", "vluchtelingen"]);
wijken.set("Nuland", ["gemeente", "denbosch"]);
wijken.set("Rosmalen Noord", ["jongeren", "denbosch", "nieuwkomer"]);
wijken.set("Rosmalen Zuid", ["werk", "denbosch", "wonen"]);
wijken.set("Vinkel", ["jongeren", "denbosch"]);
wijken.set("West", ["eenzaamheid", "organisatie"]);
wijken.set("Zuidoost", ["jongeren", "denbosch"]);

const doelgroepen = new Map<string, string[]>();

doelgroepen.set("Kinderen", ["kinderen", "kind"]);
doelgroepen.set("Jongeren", ["jongeren", "geld", "schuld", "studeren"]);
doelgroepen.set("Studenten", ["studenten", "dugs", "studeren", "JADS", "geld", "studieschuld"]);
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
  const [description, setDescription] = useState('');
  const debouncedSearchTerm = useDebounce(description, 500);

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

    
    const extraTags = tags.filter(tag => debouncedSearchTerm.indexOf(tag) !== -1);

    setTags([...wijkenTags, ...doelgroepenTags, ...maatschappelijkeTags, ...extraTags]);
  }, [selectedDoelgroepen, selectedWijk, selectedMaatschappelijkeDoelen, debouncedSearchTerm]);

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
      <TextField multiline rows={4} value={description} onChange={(event) => {
        setDescription(event.target.value)
      }} variant="outlined" />
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
