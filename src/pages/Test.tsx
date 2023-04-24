import {useState} from "react";
// @ts-ignore
import {CreateSolicitude} from "../components/CreateSolicitude/CreateSolicitude.tsx";
import {DateSolicitude} from "../objects/Date";
import {MenuChef} from "../objects/Menu";
import {Button} from "@mui/material";
import { Chat } from './chat/Chat';
import {RecoilRoot} from "recoil";
export const Test = () => {
    const [open, setOpen] = useState<boolean>(false);

    return(
        <>
            <h1>afdsadsf</h1>
            <RecoilRoot>
                <Chat></Chat>
            </RecoilRoot>
        </>
    )
}