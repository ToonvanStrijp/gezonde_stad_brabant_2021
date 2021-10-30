import { Category } from "../../models/category";
import data from "../../data/gemeenteAkkoord.json";

import { Box, Chip, Paper, Skeleton, Typography } from "@mui/material";
import "./Results.css";
import { Goal } from "../../models/goal";
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";

type GoalExtended = Goal & { color: string, category: Category };

const categories: Category[] = data;
const goals: GoalExtended[] = categories.reduce<GoalExtended[]>((result, category) => {
  const data = category.goals.map(g => ({...g, color: category.color, category}));
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
      
      setLoading(false);
    }, 2000);
  }, [tags, setLoading])


  const LoadingItems = () => {
    return Array(4).fill('').map((value, index) => (
      <Paper 
            className="Item"
            elevation={3}>
        <Box key={index} sx={{ width: 300 }}>
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
        {loading && LoadingItems()}
        {!loading && goals.map(goal => 
          (<Paper 
            className="Item"
            elevation={3}>
              <Typography variant="h5">{goal.category.title}</Typography>
              {goal.description}
              <br/>
              {goal.tags.map(tag => (<Chip label={tag} style={{marginTop: '10px', color: 'white', marginLeft: '5px', backgroundColor: goal.color}} />))}
          </Paper>)
        )}
      </div>
    </div>
  );
}

export default Results;