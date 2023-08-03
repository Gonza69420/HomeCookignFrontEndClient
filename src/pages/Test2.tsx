import {useState} from "react";
// @ts-ignore
import {PayMentPopUp} from "../components/AcceptPayment/PayMentPopUp.tsx";
import {AddMenu, MenuInterface} from "../components/CreateSolicitude/AddMenu/AddMenu.tsx";
import {Button} from "@mui/material";
export const Test2 = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [card , setCard]  = useState<string>("");
    const [menu, setMenu] = useState<MenuInterface>([{
        name: "Menu 1",
        price : 1000,
        imageURL : "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Platos-de-comida-que-pides-a-domicilio-y-puedes-hacer-en-casa-945x630.jpg"
    }]);

    return (
        <div>
            <h1>Test2</h1>
            <Button onClick={() => setOpen(true)}>OPEN</Button>
            <AddMenu Menus={menu} open={open} ></AddMenu>
        </div>
    )
}