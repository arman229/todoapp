
import React from 'react';
import { Box } from '@mui/material';

import 'bootstrap/dist/css/bootstrap.min.css';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { TodoData } from '../data/TodoData';
 
 
interface TodoCardProps {
  todo: TodoData,
  onComplete: () => void,
  onEdit: () => void,
  onDelete: () => void,
}


const TodoCard: React.FC<TodoCardProps> = (props) => {

  return (
    < >

 
    
      <Card
        variant="outlined"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 16,
          borderRadius: "30px",
          borderLeft: "6px solid gray",
          boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.1)'

        }}

      >
        <CardContent sx={{ flex: '1' }}>
          <Typography variant="h5" sx={{
            marginBottom: 2, color: '#333', '@media (max-width: 768px)': {
              fontSize: '20px',
              marginBottom: "1",
            },
          }}>
            {props.todo.title}
          </Typography>
          <Typography sx={{
            marginBottom: 2, color: '#555', '@media (max-width: 768px)': {
              fontSize: '14px',
            },
          }}>
            {props.todo.description}
          </Typography>
          <Typography variant="body2" style={{ fontSize: "11px" }} sx={{
            color: '#777'
          }}>
            {props.todo.date}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0 }}>
          <IconButton title={(props.todo.done ? 'Mark as Undone' : 'Mark as Done')}
            onClick={props.onComplete}>
            {props.todo.done! ? (
              <CheckCircleOutlineIcon sx={{ color: 'blue' }} />
            ) : (
              <ScheduleIcon />
            )}
          </IconButton>

          <IconButton onClick={props.onEdit} title='Edit'>
            <EditIcon sx={{ color: '#2196f3' }} />
          </IconButton>
          <IconButton title="Delete" onClick={props.onDelete}>
            <DeleteIcon sx={{ color: '#f44336' }} />
          </IconButton>
        </Box>
      </Card>

    </>
  );
}

export { TodoCard };
