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
}
export const AddMenu = (props : Props) => {
const [open, setOpen] = useState<boolean>(false);

    const createMenuAndPrice = () : MenuAndPrice[] => {
        let menuAndPrice : MenuAndPrice[] = [];
        for (let i = 0; i < props.Menus.length; i++) {
            menuAndPrice.push({menu : props.Menus[i], quantity : 0})
        }
        return menuAndPrice;
    }

let menus = createMenuAndPrice();

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
            if(menus[i].quantity > 0){
                menusArray.push(menus[i].menu);
            }
        }
        return menusArray;
    }

    const increaseQuantity = (menu : MenuInterface) => {
        let index = busquedaLineal<MenuInterface>(getMenusArray(), menu);
        menus[index].quantity++;
    }

    const decreaseQuantity = (menu : MenuInterface) => {
        let index = busquedaLineal<MenuInterface>(getMenusArray(), menu);
        menus[index].quantity--;
    }


    return (
        <div>
            <Modal open={props.open}>
                <Box className={"BoxAddMenu"}>
                    <div className={"divTittleAddMenu"}>
                        <h1>Elegi el Menu</h1>
                    </div>

                    <div className={"divMenusAddMenu"}>
                        {menus.map((menu) => {
                            return (
                                <div className={"divAddMenu"}>
                                    <img className={"imagenAddMenu"} src={menu.menu.imageURL}/>

                                    <div>
                                        <h2> {menu.menu.name}</h2>
                                    </div>

                                    <div>
                                        <h2> {menu.menu.price}</h2>
                                    </div>

                                    <div className={"divButtonsAddMenu"}>
                                        <Button variant={"contained"} className={"plusAddMenu"} onClick={() => increaseQuantity(menu.menu)}>+</Button>
                                        <Button variant={"contained"} className={"decreaseAddMenu"} onClick={() => decreaseQuantity(menu.menu)}>-</Button>
                                    </div>
                                </div>
                            )}
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    )
}