import "./App.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import data from "./data/gemeenteAkkoord.json";

import { Category } from "./models/category";

import Questionnaire from "./components/Questionnaire";
import Results from "./components/results/Results";

const categories: Category[] = data;

const tags = new Set<string>();

categories.map((c) => c.goals.map((g) => g.tags.map((t) => tags.add(t))));

function App() {
  return (
    <div className="Container">
      <nav className="Navbar">
        <h1 className="Title">RUIMTEMEESTERS PROJECTKWALIFICATIE</h1>
      </nav>
      <div className="Content">
        <Questionnaire />
        <Results />
      </div>
    </div>
  );
}

export default App;
