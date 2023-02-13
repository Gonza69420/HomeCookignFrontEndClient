import {Fragment, useState} from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select} from "@mui/material";
import "./PayMentPopUp.css"
import {Profileimage} from '../../components/profileimage';
import {MenuChef} from "../../objects/Menu";

interface Props{
ammount : number;
cardList : string[];
chefName: string;
fecha: string;
chefMenu : MenuChef;
setClose : (open : boolean) => void;
ammountPeople : number;

open : boolean;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "900px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const PayMentPopUp = (props : Props) => {
    const [open , setOpen] = useState(props.open);
    const [ammount , setAmmount] = useState(props.ammount);
    const [cards , setCards] = useState(props.cardList);
    const [selectedCard , setSelectedCard] = useState("")

    const handleClose = () => {
        setOpen(false);
        props.setClose(false);
    }

    const handleSelectCard = (event : any) => {
        setSelectedCard(event.target.value);
    }

    const getLast4Digits = (card : string) => {
        return "****" + card.substr(card.length - 4);
    }

    return(
        <div>
            <Modal open={open} >
                <Box className={"BoxPayment"}>
                    <div className={"tituloPayment"}>
                        <h2 className={"PagoParaPayment"}>Pago para: </h2>
                        <h2 className={"ChefNamePayment"}>{props.chefName}</h2>
                    </div>

                    <div className={"fecharowPayment"}>
                        <h4 className={"FechaPaymentTitulo"}>Fecha: </h4>
                        <h4 className={"fechaPayment"}>{props.fecha}</h4>
                    </div>

                    <div className={"fecharowPayment"}>
                        <h4 className={"MenutittlePayment"}>Menu: </h4>
                        <h4 className={"MenuPayment"}>{props.chefMenu?.name}</h4>
                    </div>

                    <div className={"fecharowPayment"}>
                        <h4 className={"MenutittlePayment"}>Personas: </h4>
                        <h4 className={"MenuPayment"}>{props.ammountPeople}</h4>

                    </div>

                    <div className={"fecharowPayment"}>
                        <h4 className={"cardPaymentTittle"}> Tarjeta: </h4>
                        <FormControl className={"FormControlSelectPayment"}>
                            <InputLabel className={"SeleccionaTuTarjetaPayment"}>Selecciona tu Tarjeta</InputLabel>
                            <Select
                                value={selectedCard}
                                labelId="demo-simple-select-label"
                                label="Select Your Card"
                                onChange={handleSelectCard}
                                className={"selectCardPayment"}
                            >
                                {cards.map((card, index) => (
                                    <MenuItem value={card} key={index}> {getLast4Digits(card)}  </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div className={"cardRowDivPayment"}>
                        <h4 className={"totalAPagarPayment"}>Total a pagar: {ammount}$</h4>

                        <div className={"ButtonsPayment"}>
                            <Button variant="contained" color="success" className={"successPayment"}>
                                Pagar
                            </Button>
                            <Button variant="contained" color="error" className={"errorPayment"} onClick={handleClose}>
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}