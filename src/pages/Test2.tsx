import {useState} from "react";
// @ts-ignore
import {PayMentPopUp} from "../components/AcceptPayment/PayMentPopUp.tsx";

export const Test2 = () => {
    const [open, setOpen] = useState<boolean>(true);
    const [card , setCard]  = useState<string>("");

    return (
        <div>
            <h1>Test2</h1>
            <PayMentPopUp ammountPeople={3} chefName={"Jorge Momo"} ammount={32.334} chefMenus={"WacamoleNiggaPenis"} fecha={"2023-02-01"} cardList={["123098734978","123409823","3214986723"]} selectCard={setCard} setClose={setOpen} imageURL={"https://firebasestorage.googleapis.com/v0/b/homecooking-346302.appspot.com/o/images%2Fchef%2Fchefsito%40gmail.com?alt=media&token=a540b2e2-940d-4c4e-bf1a-0ebcf3a108cc"}></PayMentPopUp>
        </div>
    )
}