import { Category } from "../../models/category";
import data from "../../data/gemeenteAkkoord.json";

import { Chip, Paper } from "@mui/material";
import "./Results.css";
import { Goal } from "../../models/goal";

type GoalWithColor = Goal & { color: string };

const categories: Category[] = data;
const goals: GoalWithColor[] = categories.reduce<GoalWithColor[]>((result, category) => {
  const data = category.goals.map(g => ({...g, color: category.color}));
  result.push(...data);
  return result;
}, [])

export default function Results() {
  return (
    <div className="Results">
      <div className="Title">
        <h1>RESULTATEN</h1>
      </div>
      <div style={{paddingLeft: '20px', paddingRight: '20px'}} >
        {goals.map(goal => 
          (<Paper 
            style={{boxSizing: 'border-box', width: '100%', marginBottom: '10px', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', padding: '20px'}} 
            elevation={3}>
              {goal.description}
              <br/>
              {goal.tags.map(tag => (<Chip label={tag} style={{marginTop: '10px', color: 'white', marginLeft: '5px', backgroundColor: goal.color}} />))}
          </Paper>)
        )}
      </div>
    </div>
  );
}
