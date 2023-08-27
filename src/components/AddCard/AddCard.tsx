import {Box, Button, Modal, TextField} from "@mui/material";
import {useState} from "react";

import "./AddCard.css"
import toast from "react-hot-toast";
import {checkCVVIsLength, checkIfCardIsLength, checkIfYearIsLength} from "./CardConditions.tsx";
import {addCard} from "../../queries/CardQueries.tsx";
import {Card} from "../../objects/Card.tsx";
interface Props{
open : boolean;
setOpen : (open : boolean) => void;
}
export const AddCard = (props : Props) => {
const [open , setOpen] = useState(props.open);
const [numberCard , setNumberCard] = useState<string>("");
const [displaycardNumber , setDisplaycardNumber] = useState<string>("");
const [month , setMonth] = useState<string>("");
const [year , setYear] = useState<string>("");
const [cvv , setCvv] = useState<string>("");

const handleDisplayCardNumberChange = (event : any) => {
    if(event.target.value as Number || event.target.value == ""){
        if((event.target.value.length +1) % 5 == 0 && event.target.value.length < 19){
            event.target.value += "-";
        }
        if (event.target.value.length <= 19) {
            setDisplaycardNumber(event.target.value);
        }
        }else if (event.target.value.length.equal('\b')){
            setDisplaycardNumber(event.target.value);
        }
    }

    const handleCardNumberChange = (event : any) => {
        if(event.target.value as Number || event.target.value == ""){
            if (event.target.value.length <= 19) {
                setNumberCard(event.target.value);
            }
        }else if (event.target.value.length.equal('\b')){
            setNumberCard(event.target.value);
        }
}

const handleMonthChange = (event : any) => {
    if(event.target.value <= 12 && event.target.value >= 1 || event.target.value == ""){
        setMonth(event.target.value);
    }
}

const handleYearChange = (event : any) => {
    if(event.target.value <= 9999 && event.target.value >= 1 || event.target.value == ""){
        setYear(event.target.value);
    }
}

const handleCVVChange = (event : any) => {
    if(event.target.value.length <= 3){
        setCvv(event.target.value);
    }
}


const handleSubmit = () => {
    if(displaycardNumber == "" || month == "" || year == "" || cvv == ""){
        toast.error("Por favor llene todos los campos");
    }
    if (checkCVVIsLength(cvv) && checkIfCardIsLength(displaycardNumber) && checkIfYearIsLength(year)){
        return;
    }
    const card : Card = {
        cardNumber : numberCard,
        expirationMonth : parseInt(month),
        expirationYear : parseInt(year),
        CVV : parseInt(cvv)
    }
    addCard(card, props.setOpen)


}

    return(
        <Modal open={open} onClose={() => props.setOpen(false)}>
            <Box className={"BoxAddCard"}>
                <div className={"tittleAddCard"}>
                    <h2 className={"addCardTittle"}> Agregar Tarjeta: </h2>
                </div>

                <div className={"cardInfo"}>
                    <TextField variant={"outlined"}  onChange={(e) => {
                        handleCardNumberChange(e)
                        handleDisplayCardNumberChange(e)
                    }
                    } value={displaycardNumber} label={"Card"}/>

                    <TextField variant={"outlined"} type={"number"} onChange={(e) => handleMonthChange(e)} value={month} label={"Mes de Vencimiento"}/>

                    <TextField variant={"outlined"} type={"number"} onChange={(e) => handleYearChange(e)} value={year} label={"Año de Vencimiento"}/>

                    <TextField variant={"outlined"} type={"number"} onChange={(e) => handleCVVChange(e)} value={cvv} label={"CVV"}/>

                    <Button variant={"contained"} className={"addCardButton"} onClick={() => handleSubmit()}>Agregar</Button>
                </div>
            </Box>
        </Modal>
    )
}