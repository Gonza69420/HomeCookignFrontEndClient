import {useState} from "react";
import {Box, MenuItem, Modal, Select} from "@mui/material";

interface Props{
ammount : number;
cardList : string[];
chefName: string;
fecha: string;
selectCard : (string) => void;

chefMenus : string;
}
export const PayMentPopUp = (props : Props) => {
    const [open , setOpen] = useState(false);
    const [ammount , setAmmount] = useState(props.ammount);
    const [cards , setCards] = useState(props.cardList);

    const handleClode = () => {
        setOpen(false);
    }

    const handleSelectCard = (event : any) => {
        props.selectCard(event.target.value);
    }

    const getLast4Digits = (card : string) => {
        return card.substr(card.length - 4);
    }

    return(
        <>
            <Modal open={open} onClose={handleClode}>
                <Box>
                    <div>
                        <h2>Pago para: </h2>
                        <h2>{props.chefName}</h2>
                    </div>

                    <div>
                        <h4>Fecha: </h4>
                        <h4>{props.fecha}</h4>
                    </div>

                    <div>
                        <Select
                            value={""}
                            label="Select Your Card"
                            onChange={handleSelectCard}
                        >
                            {cards.map((card) => (
                                <MenuItem value={card}> {getLast4Digits(card)}  </MenuItem>
                            ))}
                        </Select>

                        <h4>{ammount}</h4>
                    </div>



                </Box>
            </Modal>
        </>
    )
}