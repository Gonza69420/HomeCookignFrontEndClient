import {Box, Button, Modal, TextField} from "@mui/material";
import {useState} from "react";

import "./AddCard.css"
import toast from "react-hot-toast";
import {checkCVVIsLength, checkIfCardIsLength, checkIfYearIsLength} from "./CardConditions.tsx";
import {addCard} from "../../queries/CardQueries.tsx";
import {Card} from "../../objects/Card.tsx";
import {loadStripe} from "@stripe/stripe-js";
import {CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import axios from "axios";
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


const handleSubmitt = () => {
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
/*
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

 */
    const appearance = {
        rules: {
            '.Tab': {
                border: '1px solid #E0E6EB',
                boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
            },

            '.Tab:hover': {
                color: 'var(--colorText)',
            },

            '.Tab--selected': {
                borderColor: '#E0E6EB',
                boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)',
            },

            '.Input--invalid': {
                boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)',
            },

            // See all supported class names and selector syntax below
        }
    };
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, token } = await stripe.createToken(elements.getElement(CardElement));

        if (!error) {
            console.log('Stripe 23 | token generated!', token);

            await axios.post("http://localhost:8080/payment/addPaymentMethod", {
                tokenId: token.id,
                customerId: sessionStorage.getItem("mail"),
                last4: ""
            })
        }
    }

    return (
        <Modal open={open} onClose={() => props.setOpen(false)}>
            <Box className={"BoxAddCard"}>
                <form onSubmit={handleSubmit} >
                    <div className={"tittleAddCard"}>
                        <h2 className={"addCardTittle"}> Agregar Tarjeta: </h2>
                    </div>
                    <CardElement/>
                    <button type="submit" disabled={!stripe}>
                        Pay
                    </button>
                </form>
            </Box>
        </Modal>

    );
}