import {Box, Button, Modal} from "@mui/material";
import {useState} from "react";
import "./AddMenu.css"
export interface MenuInterface{
    name : string;
    price : number;
    imageURL : string;
}
interface MenuAndPrice{
    menu : MenuInterface;
    quantity : number;
}
interface Props{
    Menus : MenuInterface[];
    open : boolean;
    setOpen? : (open : boolean) => void;
}
export const AddMenu = (props : Props) => {

    const createMenuAndPrice = () : MenuAndPrice[] => {
        let menuAndPrice : MenuAndPrice[] = [];
        for (let i = 0; i < props.Menus.length; i++) {
            menuAndPrice.push({menu : props.Menus[i], quantity : 0})
        }
        return menuAndPrice;
    }

const [menus , setMenus] = useState<MenuAndPrice[]>(createMenuAndPrice());
    function busquedaLineal<T>(array: T[], elementoBuscado: T): number {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === elementoBuscado) {
                return i; // Retorna la posición del elemento encontrado
            }
        }
        return -1; // Retorna -1 si el elemento no fue encontrado en el array
    }

    const getMenusArray = () : MenuInterface[] => {
        let menusArray : MenuInterface[] = [];
        for (let i = 0; i < menus.length; i++) {
                menusArray.push(menus[i].menu);
        }
        return menusArray;
    }

    const increaseQuantity = (menu : MenuInterface) => {
        const updatedMenus = menus.map((m) =>
                m.menu === menu ? { ...m, quantity: m.quantity + 1 } : m
            );
            setMenus(updatedMenus);
    }

    const decreaseQuantity = (menu) => {
        const updatedMenus = menus.map((m) =>
            m.menu === menu && m.quantity > 0 ? { ...m, quantity: m.quantity - 1 } : m
        );
        setMenus(updatedMenus);
    }


    const terminar = () => {
        props.setOpen(false);
    }

    const getFinalPrice = () : number => {
        let finalPrice : number = 0;
        for (let i = 0; i < menus.length; i++) {
            finalPrice += menus[i].menu.price * menus[i].quantity;
        }
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