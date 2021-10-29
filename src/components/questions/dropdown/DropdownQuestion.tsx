import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import "./DropdownQuestion.css";

type Props = {
  question: string;
  options: string[];
};

export default function DropdownQuestion({ question, options }: Props) {
  return (
    <div className="Question">
      <span className="Title">{question}</span>
      <div>
        <FormControl fullWidth>
          <InputLabel id={question + "question"}>Antwoord</InputLabel>
          <Select labelId={question + "label"} label="Antwoord">
            {options.map((o) => {
              return <MenuItem value={o}>{o}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
