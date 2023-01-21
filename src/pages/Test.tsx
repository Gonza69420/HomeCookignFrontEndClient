import {PayMentPopUp} from "../components/AcceptPayment/PayMentPopUp.tsx";
import {useState} from "react";

export const Test = () => {
    const [card, setCard] = useState<string>();
    return(
        <>
        <PayMentPopUp ammount={200} cardList={["234810583" , "34187593"]} chefMenus={"WacamoleNiggaPenis"} chefName={"Michael Scott"} selectCard={setCard} fecha={"34/32/45 20:34"} imageURL={"https://firebasestorage.googleapis.com/v0/b/homecooking-346302.appspot.com/o/images%2Fchef%2Fchefsito%40gmail.com?alt=media&token=a540b2e2-940d-4c4e-bf1a-0ebcf3a108cc"}/>
        </>
    )
}