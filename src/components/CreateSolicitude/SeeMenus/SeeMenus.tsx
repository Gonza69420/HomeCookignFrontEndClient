import {Box, Button, Modal} from "@mui/material";
import {useState} from "react";

export interface MenuInterface{
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
    open : boolean;
    setOpen? : (open : boolean) => void;
}
export const SeeMenus = (props : Props) => {

    const [menus , setMenus] = useState<MenuAndPrice[]>(props.Menus);


    const getFinalPrice = () : number => {
        let finalPrice : number = 0;
        for (let i = 0; i < menus.length; i++) {
            finalPrice += menus[i].menu.price * menus[i].quantity;
        }
        return finalPrice;
    }

    const terminar = () => {
        props.setOpen(false);
    }



    return (
        <div>
            <Modal open={props.open}>
                <Box className={"BoxAddMenu"}>
                    <div className={"divTittleAddMenu"}>
                        <h1>Menus elegidos:</h1>

                        <h1 className={"finalPriceAddMenu"}>Precio Final: $.- {getFinalPrice()}</h1>
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
                                            <h2 className={"priceMenuAddMenu"}> $.- {menu.menu.price}  .</h2>

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