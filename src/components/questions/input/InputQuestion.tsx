import TextField from "@mui/material/TextField";

import "./InputQuestion.css";

type Props = {
  question: string;
};

export default function InputQuestion({ question }: Props) {
  return (
    <div className="Question">
      <span className="Title">{question}</span>

      <div>
        <TextField
          fullWidth
          id="outlined-basic"
          label={"Antwoord"}
          variant="outlined"
        />
      </div>
    </div>
  );
}
