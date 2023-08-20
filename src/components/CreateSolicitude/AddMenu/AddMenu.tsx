import {Box, Button, Modal} from "@mui/material";
import {useState} from "react";
import "./AddMenu.css"
export interface MenuInterface{
    id : number;
    name : string;
    price : number;
    imageURL : string;
}
export interface MenuAndPrice{
    menu : MenuInterface;
    quantity : number;
}
interface Props{
    Menus : MenuAndPrice[];
    setMenus : (menus : MenuAndPrice[]) => void;
    setPrice : (price : number) => void;
    open : boolean;
    setOpen? : (open : boolean) => void;
}
export const AddMenu = (props : Props) => {



const [menus , setMenus] = useState<MenuAndPrice[]>(props.Menus);

    const increaseQuantity = (menu : MenuInterface) => {
        const updatedMenus = menus.map((m) =>
                m.menu === menu ? { ...m, quantity: m.quantity + 1 } : m
            );
            setMenus(updatedMenus);
            props.setMenus(updatedMenus);
    }

    const decreaseQuantity = (menu) => {
        const updatedMenus = menus.map((m) =>
            m.menu === menu && m.quantity > 0 ? { ...m, quantity: m.quantity - 1 } : m
        );
        setMenus(updatedMenus);
        props.setMenus(updatedMenus);
    }


    const terminar = () => {
        props.setOpen(false);
    }

    const getFinalPrice = () : number => {
        let finalPrice : number = 0;
        for (let i = 0; i < menus.length; i++) {
            finalPrice += menus[i].menu.price * menus[i].quantity;
        }
        props.setPrice(finalPrice);
        return finalPrice;
    }


    return (
        <div>
            <Modal open={props.open}>
                <Box className={"BoxAddMenu"}>
                    <div className={"divTittleAddMenu"}>
                        <h1>Elegi el Menu</h1>

                        <h1 className={"finalPriceAddMenu"}>Precio: $.- {getFinalPrice()}</h1>
                    </div>

                    <div className={"divMenusAddMenu"}>
                        {menus.map((menu) => {
                            return (
                                <div className={"divAddMenu"}>
                                    <img className={"imagenAddMenu"} src={menu.menu.imageURL}/>

                                    <div className={"divTextButtonAddMenu"}>

                                        <div>
                                            <h2 className={"nameMenuAddMenu"}> {menu.menu.name}</h2>
                                        </div>

                                        <div className={"divpriceMenuAddMenu"}>
                                            <h2 className={"priceMenuAddMenu"}> $.- {menu.menu.price}</h2>
                                        </div>

                                        <div className={"divButtonsAddMenu"}>
                                            <Button variant={"contained"} className={"plusAddMenu"} onClick={() => increaseQuantity(menu.menu)}>+</Button>
                                            <Button variant={"contained"} className={"decreaseAddMenu"} onClick={() => decreaseQuantity(menu.menu)}>-</Button>
                                            <h2 className={"priceMenuAddMenu"}> x{menu.quantity}</h2>

                                        </div>
                                    </div>
                                </div>
                            )}
                        )}
                    </div>

                    <div className={"AcceptCancelButtonAddMenuDiv"}>
                        <Button variant={"contained"} className={"TerminarAddMenu"} onClick={() => terminar()}>TERMINAR</Button>

                    </div>
                </Box>
            </Modal>
        </div>
    )
}