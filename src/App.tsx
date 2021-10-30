import { useState } from "react";
import "./App.css";

import Questionnaire from "./components/Questionnaire";
import Results from "./components/results/Results";

function App() {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <div className="Container">
      <div className="Content">
        <Questionnaire setTags={setTags} />
        <Results tags={tags} />
      </div>
    </div>
  );
}

export default App;
