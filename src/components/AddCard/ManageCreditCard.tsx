import {Box, Button, Modal, Select} from "@mui/material";
import {useState} from "react";
import "./ManageCreditCard.css"
import {AddCard} from "./AddCard.tsx";
interface Props{
    open : boolean;
    setOpen : (open : boolean) => void;
}
export const ManageCreditCard = (props : Props) => {
const [open , setOpen] = useState(props.open);

const [addCardOpen , setAddCardOpen] = useState(false);

    return(
        <div>
            <Modal open={open} onClose={() => props.setOpen(false)}>
                <Box className={"ManageCardBox"}>
                    <div className={"ManageCardTittleDiv"}>
                        <h2>Opciones</h2>
                    </div>

                    <h3>Tarjetas:</h3>
                    <div className={"manageSelectCardDiv"}>

                        <Select className={"manageSelectCard"} label={"Cards"}>

                        </Select>
                        <Button variant={"contained"}className={"eliminateButton"}>Eliminar</Button>
                    </div>

                    <Button variant={"contained"} className={"addButtonButtonManage"} onClick={() => setAddCardOpen(true)}>Agregar Nueva</Button>
                </Box>
            </Modal>
            {addCardOpen &&
            <AddCard open={addCardOpen} setOpen={setAddCardOpen}></AddCard>
            }
        </div>
    )
}