import {Box, Button, Modal, TextField} from "@mui/material";
import {useState} from "react";

import "./AddCard.css"
import toast from "react-hot-toast";
interface Props{
open : boolean;
setOpen : (open : boolean) => void;
}
export const AddCard = (props : Props) => {
const [open , setOpen] = useState(props.open);

const [cardNumber , setCardNumber] = useState<string>("");
const [month , setMonth] = useState<string>("");
const [year , setYear] = useState<string>("");
const [cvv , setCvv] = useState<string>("");

const handleCardNumberChange = (event : any) => {
    if(event.target.value as Number){
        if((event.target.value.length +1) % 5 == 0 && event.target.value.length < 19){
            event.target.value += "-";
        }
        if (event.target.value.length <= 19) {
            setCardNumber(event.target.value);
        }
        }else if (event.target.value.length.equal('\b')){
            setCardNumber(event.target.value);
        }
    }

const handleMonthChange = (event : any) => {
    if(event.target.value <= 12 && event.target.value >= 1){
        setMonth(event.target.value);
    }
}

const handleYearChange = (event : any) => {
    if(event.target.value.length <= 4){
        setYear(event.target.value);
    }
}

const handleCVVChange = (event : any) => {
    if(event.target.value.length <= 3){
        setCvv(event.target.value);
    }
}

    return(
        <Modal open={open} onClose={() => props.setOpen(false)}>
            <Box className={"BoxAddCard"}>
                <div className={"tittleAddCard"}>
                    <h2 className={"addCardTittle"}> Agregar Tarjeta: </h2>
                </div>

                <div className={"cardInfo"}>
                    <TextField variant={"outlined"}  onChange={(e) => handleCardNumberChange(e)} value={cardNumber} label={"Card"}/>

                    <TextField variant={"outlined"} type={"number"} onChange={(e) => handleMonthChange(e)} value={month} label={"Mes de Vencimiento"}/>

                    <TextField variant={"outlined"} type={"number"} onChange={(e) => handleYearChange(e)} label={"Año de Vencimiento"}/>

                    <TextField variant={"outlined"} type={"number"} onChange={(e) => handleCVVChange(e)} label={"CVV"}/>

                    <Button variant={"contained"} className={"addCardButton"}>Agregar</Button>
                </div>
            </Box>
        </Modal>
    )
}