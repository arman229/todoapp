import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
interface MyFabProps {
    onFabClick: () => void
}
const MyFab: React.FC<MyFabProps> = (props) => {
    return (
        <>
            <Fab type="button"
                style={{ position: 'fixed', bottom: 36, right: 36, color:"black",backgroundColor:"#1976d2" }} onClick={props.onFabClick}>
                <AddIcon />
            </Fab>
        </>
    )
}
export { MyFab }