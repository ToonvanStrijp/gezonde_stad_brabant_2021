import "./App.css";

import Questionnaire from "./components/Questionnaire";
import Results from "./components/results/Results";

function App() {
  return (
    <div className="Container">
      <div className="Content">
        <Questionnaire />
        <Results />
      </div>
    </div>
  );
}

export default App;
