import React, { useState, useEffect } from 'react'
import { TodoAppbar } from './components/TodoAppbar'
import { TodoCard } from './components/TodoCard'
import { MyDrawer } from './components/MyDrawer';
import { MenuType } from './components/MyDrawer';
import { MyFab } from './components/MyFab';
import { TodoData } from './data/TodoData';
import { TodoModel } from './components/TodoModel';
 
import Snackbar from '@mui/material/Snackbar';
export const TodoApp = () => {


    const [deletedItemTitle, setDeletedItemTitle] = useState<string | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<MenuType>(MenuType.All)
    const [modelOpen, setModelOpen] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [todos, setTodos] = useState<TodoData[]>([])
    const [editTodo, setEditTodo] = useState<TodoData | undefined>()
    const [searchQuery, setSearchQuery] = useState('');
    const handleDeleteItem = (index: number) => {
        const updatedItems = todos.filter((item, i) => i !== index);
        const deletedTitle = todos[index].title;
        setTodos(updatedItems);
        setSnackbarOpen(true)
        setDeletedItemTitle(deletedTitle);
    };

    const onCompletedTask = (index: number) => {
        let upDateArray = [...todos];
        upDateArray[index].done = !upDateArray[index].done;
        setTodos(upDateArray);
    };
    const handleEditItem = (index: number) => {
        setEditTodo(todos[index])
        setModelOpen(true)
    };
    const onSave = (todo: TodoData, isNew: boolean) => {
        if (isNew) {
            setTodos([...todos, todo]);
        } else if (editTodo) {
            const updatedTodos = todos.map((item, index) => (index === todos.indexOf(editTodo) ? todo : item));
            setTodos(updatedTodos);
        }
        console.log("todos:" + todos.length)

        setEditTodo(undefined)
    }
    const handleSearchChange = (query?: string | undefined) => {

        setSearchQuery(query || '');
    };

    const filterAndSearch = () => {
        const filtered = todos.filter(item => {
            if (activeItem === MenuType.All) {
                return true;
            } else if (activeItem === MenuType.COMPLETED) {
                return item.done;
            } else if (activeItem === MenuType.PENDING) {
                return !item.done;
            }
            return false;
        })
            .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()))
        return filtered
    }


    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos))
        }
    }, []);
    
    useEffect(() => {
        if (todos.length !== 0) {
            localStorage.setItem('todos', JSON.stringify(todos));
        } else {
           localStorage.removeItem('todos');
        }
    }, [todos]);




    return (
        <>
            <TodoAppbar onMenuClick={() => setDrawerOpen(!drawerOpen)} onSearchEdit={handleSearchChange} />
            <MyDrawer drawerOpen={drawerOpen} onDrawerOutsidedClick={() => setDrawerOpen(false)} menuSelected={activeItem} onMenuSelected={(selectedMenu) => {
                setActiveItem(selectedMenu);
                setDrawerOpen(false)
            }} />
            <div style={{ marginTop: 75, marginLeft: "auto", marginRight: "auto", maxWidth: '900px', padding: "10px" }}>
                {filterAndSearch().map((item, index) => (<TodoCard onComplete={() => onCompletedTask(index)} onDelete={() => { handleDeleteItem(index) }} onEdit={() => handleEditItem(index)} todo={item} key={index} />))}
            </div>

            <TodoModel todo={editTodo} show={modelOpen} handleClose={() => setModelOpen(false)} onSave={onSave} />
            <MyFab onFabClick={() => {
                setEditTodo(undefined)
                setModelOpen(true)
            }} />
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} message={"Deleted successfully-  " + deletedItemTitle || ''} />
        </>
    )
}