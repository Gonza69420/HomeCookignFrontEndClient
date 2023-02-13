import {useState} from "react";
// @ts-ignore
import {CreateSolicitude} from "../components/CreateSolicitude/CreateSolicitude.tsx";
import {DateSolicitude} from "../objects/Date";
import {MenuChef} from "../objects/Menu";
import {Button} from "@mui/material";

export const Test = () => {
    const [open, setOpen] = useState<boolean>(false);


    const [allowedDates, setAllowedDates] = useState<DateSolicitude[]>([
        {
                    date: new Date(2023,0,26),
                    hour: ["10:00-20:30"]
        },
        {
                    date: new Date(2023,1,2),
                    hour: ["10:00-20:30"]
        },
        {
                    date: new Date(2023,1,5),
                    hour: ["10:00-12:30" , "13:00-20:30"]
        }
    ]);

    const [menus, setMenus] = useState<MenuChef[]>([
        {
            name: "Menu 1",
            price: 1000,
        },
        {
            name: "Menu 2",
            price: 2000,
        }
        ]);


    return(
        <>
            <Button onClick={()=> setOpen(true)}>Pene</Button>
            <CreateSolicitude setClose={setOpen} open={open} chefName={"Gonzalo Prongra"} allowedDates={allowedDates} menus={menus} imageURL={"https://firebasestorage.googleapis.com/v0/b/homecooking-346302.appspot.com/o/images%2Fchef%2Fchefsito%40gmail.com?alt=media&token=a540b2e2-940d-4c4e-bf1a-0ebcf3a108cc"}/>
        </>
    )
}