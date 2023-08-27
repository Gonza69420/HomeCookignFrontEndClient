import {Fragment, useEffect, useState} from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select} from "@mui/material";
import "./PayMentPopUp.css"
import {Profileimage} from '../../components/profileimage';
import {MenuChef} from "../../objects/Menu";
import {SeeMenus} from "../CreateSolicitude/SeeMenus/SeeMenus.tsx";
import {MenuAndPrice} from "../CreateSolicitude/AddMenu/AddMenu.tsx";
import {UsePostPayment} from "../../queries/PaymentQueries.tsx";
import {GetCardByMail} from "../../queries/CardQueries.tsx";
import {Card} from "../../objects/Card";
import {getIdFromDateAndHours} from "../../queries/DateQueries.tsx";

interface Props{
cardList : string[];
chefName: string;
fecha: string;
chefMenu : MenuAndPrice[];
setClose : (open : boolean) => void;
ammountPeople : number;
calendarEventID : number;
idChef : string;
open : boolean;
chefMail : string;
date : string;
hour : string;
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
    const [cardsNum , setCardsNum] = useState<String[]>([]);
    const [cards , setCards] = useState<Card[]>([]);
    const [selectedCard , setSelectedCard] = useState("")
    const [seeMenus , setSeeMenus] = useState<boolean>(false);

    const {loading , data, error} = GetCardByMail({
        onCompleted: (data) => {
            setCards(data);
            getCardsNum()
        }
    })

    const getCardsNum = () => {
        cards.map((card) => {
            cardsNum.push(card.cardNumber);
        })
    }


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

    const calculatePrice = () => {
        let price = 0.0;
        props.chefMenu.map((menu) => {
            price += menu.menu.price * menu.quantity;
        })
        return price;
    }

    const getMenusId = () => {
        let menusId : number[] = [];
        props.chefMenu.map((menu) => {
            menusId.push(menu.menu.id);
        })
        return menusId;
    }

    const [calendarEventId , setCalendarEventId] = useState<number>(0);

    useEffect(() => {
        getCalendarEventId(); // Llamar a getCalendarEventId cuando el componente se monta
    }, []); // El segundo argumento vacío [] asegura que se ejecute solo cuando el componente se monta

    const getCalendarEventId = () => {
        getIdFromDateAndHours(props.chefMail, props.date, props.hour, {
            onCompleted: (data) => {
                setCalendarEventId(data);
            }
        });
    }

    const handlePay = () => {
        UsePostPayment({
            idClient: parseInt(sessionStorage.getItem('id')),
            idChef : props.idChef,
            calendarEventId : calendarEventId,
            price :  calculatePrice(),
            menus : getMenusId()
        }, props.setClose);
    }

    return(
        <div>
            <SeeMenus open={seeMenus} setOpen={setSeeMenus} Menus={props.chefMenu} ></SeeMenus>
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
                        <Button variant={"contained"} onClick={() => setSeeMenus(true)}>Mirar menus</Button>
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
                                {cardsNum.map((card, index) => (
                                    <MenuItem value={card} key={index}> {getLast4Digits(card)}  </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div className={"cardRowDivPayment"}>
                        <h4 className={"totalAPagarPayment"}>Total a pagar: {calculatePrice()}$</h4>

                        <div className={"ButtonsPayment"}>
                            <Button variant="contained" color="success" className={"successPayment"} onClick={handlePay}>
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