import {Box, Button, MenuItem, Modal, Select} from "@mui/material";
import {useState} from "react";
import "./ManageCreditCard.css"
import {AddCard} from "./AddCard.tsx";
import {deleteCard, GetCardByMail} from "../../queries/CardQueries.tsx";
import {Card} from "../../objects/Card.tsx";
import {useNavigate} from "react-router-dom";
interface Props{
    open : boolean;
    setOpen : (open : boolean) => void;
}


export const ManageCreditCard = (props : Props) => {
    const navigate = useNavigate();
const [open , setOpen] = useState(props.open);

const [addCardOpen , setAddCardOpen] = useState(false);

const [cards , setCards] = useState<Card[]>([]);
const [cardIndex , setCardIndex] = useState<number>(0);

const {data , loading , error } = GetCardByMail(
    {
        onCompleted: (data) => {
            setCards(data);
            console.log(data)
        },
        onError: (error) => {

        }
    }
);

const handleEliminar = () => {
    deleteCard(cards[cardIndex]).then(r => { navigate(0)});
}

    function handleCardChande() {
        setCardIndex(cardIndex);
    }

    return(
        <div>
            <Modal open={open} onClose={() => props.setOpen(false)}>
                <Box className={"ManageCardBox"}>
                    {loading &&
                    <img className={"loadingGif"} src={"../../assets/loading.gif"}></img>
                    }
                    <div className={"ManageCardTittleDiv"}>
                        <h2>Opciones</h2>
                    </div>

                    <h3>Tarjetas:</h3>
                    <div className={"manageSelectCardDiv"}>

                        <Select className={"manageSelectCard"} label={"Cards"} onChange={(e) => handleCardChande() }>
                            {cards.map((card, index) => {
                                return <MenuItem value={index}>{card.cardNumber}</MenuItem>
                            } )}
                        </Select>
                        <Button variant={"contained"}className={"eliminateButton"} onClick={() => handleEliminar()}>Eliminar</Button>
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