import { Category } from "../../models/category";
import data from "../../data/gemeenteAkkoord.json";

import { Box, Chip, Paper, Skeleton, Typography } from "@mui/material";
import "./Results.css";
import { Goal } from "../../models/goal";
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";

type GoalExtended = Goal & { color: string, category: Category, score: number };

const categories: Category[] = data;
const goals: GoalExtended[] = categories.reduce<GoalExtended[]>((result, category) => {
  const data = category.goals.map(g => ({...g, color: category.color, category, score: 0}));
  result.push(...data);
  return result;
}, [])

type ResultsProps = {
  tags: string[];
}

const Results: React.FC<ResultsProps> = ({tags}) => {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if(tags.length <= 0) return;
    setLoading(true);
    setTimeout(() => {
      goals.map(goal => {
        const score = goal.tags.reduce((s, t) => {
          if(tags.indexOf(t) !== -1) {
            s++;
          }
          return s;
        }, 0);
        goal.score = score;
      });
      setLoading(false);
    }, 1000);
  }, [tags, setLoading])

  const LoadingItems = () => {
    return Array(4).fill('').map((value, index) => (
      <Paper 
            key={index}
            className="Item"
            elevation={3}>
        <Box sx={{ width: 300 }}>
          <Skeleton sx={{width: 100}} />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Box>
      </Paper>
    ));
  }

  return (
    <div className="Results">
      <div className="Title">
        <h1>RESULTATEN</h1>
        {loading && (<LinearProgress className="Progress" />)}
      </div>
      <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
        {tags.length > 0 && (
          <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
          <div style={{marginTop: '10px'}}>tags: </div>
          {tags.map((tag, index) => (<Chip key={index} label={tag} style={{marginTop: '10px', color: 'black', marginLeft: '5px'}} />))}
          </div>
        )}
        {loading && LoadingItems()}
        {!loading && goals.sort((a, b) => b.score - a.score).map((goal, index) => 
          (<Paper 
            key={index}
            className="Item"
            elevation={3}>
              <Typography variant="h5">{goal.category.title}</Typography>
              {goal.description}
              {tags.length > 0 && (
                <>
                  <br/>
                  {goal.tags.map((tag, index) => (<Chip key={index} className={tags.indexOf(tag) === -1 ? 'Chip Opacity' : 'Chip'} label={tag} style={{marginTop: '10px', color: 'white', marginLeft: '5px', backgroundColor: goal.color}} />))}
                </>
              )}
          </Paper>)
        )}
      </div>
    </div>
  );
}

export default Results;