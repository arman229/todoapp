import React, { useState } from "react"; 
import MenuIcon from '@mui/icons-material/Menu';
import { Toolbar, AppBar, IconButton, Typography } from '@mui/material'
interface TodoAppbarInterface {
    onMenuClick: () => void,
    onSearchEdit: (query?: string|undefined) => void
}
const TodoAppbar: React.FC<TodoAppbarInterface> = (props) => {
    const [isFocused, setIsFocused] = useState(false);

    const { onMenuClick, onSearchEdit } = props
    const [query, setQuery] = useState("")
    const inputStyle = {
    minWidth:"103px",
    maxWidth:"163px",
        padding: '6px',
        border: '3px solid #9763f6',
        borderRadius: '8px',
        outline: 'none',
        boxShadow: 'none', 
        transition: 'border-color 0.3s, box-shadow 0.3s',
      };
    
      const focusStyle = {
        border: '2px solid red',
        boxShadow: '0 0 10px black',
      };
    return (
        <>
            <AppBar position="fixed"   >
                <Toolbar sx={{ padding: "2px" }} style={{ display: "flex", zIndex: "222233" }}>
                    <IconButton color="inherit" onClick={onMenuClick} >
                        <MenuIcon />
                    </IconButton>
                    <Typography style={{ flexGrow: 1 }} variant="subtitle1"> To Do App</Typography>
                    <input type="search" id="form1" value={query} onChange={(e) => {
                        setQuery(e.target.value)
                        onSearchEdit(e.target.value)
                    }} 
                    
                    placeholder="Search "  
                    required
                    style={{
                        ...inputStyle,
                        borderColor: isFocused ? focusStyle.border : inputStyle.border,
                        boxShadow: isFocused ? focusStyle.boxShadow : inputStyle.boxShadow,
                      }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    />
                    
                </Toolbar>


            </AppBar>
        </>
    )
}


export { TodoAppbar }
