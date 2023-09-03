import {Box, Button, MenuItem, Modal, Select} from "@mui/material";
import {useState} from "react";
import "./ManageCreditCard.css"
import {AddCard} from "./AddCard.tsx";
import {deleteCard, GetCardByMail} from "../../queries/CardQueries.tsx";
import {Card} from "../../objects/Card.tsx";
import {useNavigate} from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
interface Props{
    open : boolean;
    setOpen : (open : boolean) => void;
}


export const ManageCreditCard = (props : Props) => {
    const navigate = useNavigate();
const [open , setOpen] = useState(props.open);

const [addCardOpen , setAddCardOpen] = useState(false);

const [cards , setCards] = useState<String[]>([]);
const [cardIndex , setCardIndex] = useState<number>(0);

    const { data, loading, error } = GetCardByMail({
        onCompleted: (data) => {
            setCards(data);
        },
        onError: (error) => {
            // Handle errors here if needed
        }
    });

const handleEliminar = () => {
    deleteCard(cards[cardIndex]).then(r => { });
}

    function handleCardChande() {
        setCardIndex(cardIndex);
    }
    const stripePromise = loadStripe('pk_test_51LVMRHAEnETXgGVnlbySyt5cO7cFOSQz4282qKEdtZKrXXzRuGE9rzHGvvE4ekmERzpWnE6fQa3u8CErN7w9PlHJ00dXsfQ3ES');

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
                                return <MenuItem value={index}>{card}</MenuItem>
                            } )}
                        </Select>
                        <Button variant={"contained"}className={"eliminateButton"} onClick={() => handleEliminar()}>Eliminar</Button>
                    </div>

                    <Button variant={"contained"} className={"addButtonButtonManage"} onClick={() => setAddCardOpen(true)}>Agregar Nueva</Button>
                </Box>
            </Modal>
            {addCardOpen &&
                <Elements stripe={stripePromise}>

                <AddCard open={addCardOpen} setOpen={setAddCardOpen}></AddCard>
                </Elements>

            }
        </div>
    )
}