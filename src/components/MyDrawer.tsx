import React     from "react";
 
import { Drawer } from "@mui/material"
import { ListItemText } from '@mui/material'
import { ListItemIcon } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ViewListIcon from '@mui/icons-material/ViewList';
 
import { List, ListItemButton } from '@mui/material'
import ScheduleIcon from '@mui/icons-material/Schedule';
export enum MenuType { "All", "COMPLETED", "PENDING" }
interface MyDrawerProps {
    drawerOpen: boolean,
    onDrawerOutsidedClick: () => void,
    menuSelected: MenuType,
    onMenuSelected: (menuSelected: MenuType) => void
}

const MyDrawer: React.FC<MyDrawerProps> = (props) => {
                                 const {drawerOpen,onDrawerOutsidedClick,menuSelected,onMenuSelected}=props
    return (
        <>
            <Drawer style={{ display: "flex", zIndex: "0" }} anchor="left" open={drawerOpen} onClose={onDrawerOutsidedClick}>
                <List style={{ width: "220px", marginTop: "55px" }}>
                    <ListItemButton selected={menuSelected === MenuType.All} onClick={(e) => onMenuSelected(MenuType.All)}>
                        <ListItemIcon  >
                            <ViewListIcon />
                        </ListItemIcon>
                        <ListItemText primary="View All" />
                    </ListItemButton >
                    <ListItemButton selected={menuSelected === MenuType.COMPLETED} onClick={(e) =>  onMenuSelected(MenuType.COMPLETED)}>
                        <ListItemIcon>
                            <DoneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Completed" />
                    </ListItemButton >
                    <ListItemButton selected={menuSelected === MenuType.PENDING} onClick={(e) =>  onMenuSelected(MenuType.PENDING)}>
                        <ListItemIcon>
                        <ScheduleIcon   />
                        </ListItemIcon>
                        <ListItemText primary="Pending" />
                    </ListItemButton >
                </List>
            </Drawer>

        </>
    )
}
export { MyDrawer }

