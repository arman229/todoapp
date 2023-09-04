import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Box } from '@mui/material';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { TodoData } from '../data/TodoData';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import './style.css';

interface TodoModelProps {
    todo?: TodoData,
    show: boolean,
    handleClose: () => void,
    onSave: (todoData: TodoData, isNew: boolean,) => void
}
const TodoModel: React.FC<TodoModelProps> = (props) => {
    const [inputValueTitle, setInputValueTitle] = useState<string | undefined>(props.todo?.title);
    const [inputValueDescription, setInputValueDescription] = useState<string | undefined>(props.todo?.description);
    const [dueDate, setDueDate] = React.useState<Dayjs | null>(null);
    useEffect(() => {
        setInputValueTitle(props.todo?.title)
        setInputValueDescription(props.todo?.description);
        setDueDate(dayjs(props.todo?.date));
    }, [props.todo]);

    const handleAddItem = () => {
        if (dueDate && inputValueTitle && inputValueTitle?.trim() !== '' && inputValueDescription && inputValueDescription?.trim() !== "") {
            if (props.todo) {//edit mode
                let newTodoData = { ...props.todo, title: inputValueTitle, date: dueDate.format('YYYY-MM-DD'), description: inputValueDescription };
                props.onSave(newTodoData, false)
            } else {
                let newTodoData = { title: inputValueTitle, description: inputValueDescription, date: dueDate.format('YYYY-MM-DD'), done: false };
                props.onSave(newTodoData, true)
            }

            props.handleClose()
            setInputValueTitle('');
            setInputValueDescription('');
            setDueDate(null)
        }

    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} style={{ marginTop: 50, }}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Task Name:</Form.Label>
                            <Form.Control type="text" autoFocus
                                value={inputValueTitle}
                                onChange={(e) => { 
                                    setInputValueTitle(e.target.value)
                                }}
                                placeholder="Enter title" />
                        </Form.Group>
                        <Box mt={2} />
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                value={inputValueDescription}
                                onChange={(e) => setInputValueDescription(e.target.value)}
                                placeholder="Enter Description"
                            />
                        </Form.Group>
                        <Box mt={2} />
                        <Form.Group controlId="exampleForm.ControlTextarea1"  >
                            <Form.Label>Due Date:</Form.Label>
                           
                            <LocalizationProvider  dateAdapter={AdapterDayjs}  >
                                <DemoContainer  components={['DatePicker']}>
                                  
                                <div className="myContainer">
                                    <DatePicker    className="myDatePicker" label=""
                                        value={dueDate}
                                        onChange={newValue =>
                                            setDueDate(newValue)
                                          
                                        }  
                                      
                                    /></div>
                                </DemoContainer>
                            </LocalizationProvider>
                          
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose} >
                        Close
                    </Button>
                    <Button onClick={handleAddItem}> Save</Button>
                </Modal.Footer>
            </Modal>
        </>

    )

}

export { TodoModel }