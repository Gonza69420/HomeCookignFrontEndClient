import Navbar from "../../components/Navbar";
import {Chat} from "./Chat";
import "./ChatPage.css";
import {useState} from "react";


interface Contact{
    name : string;
    id : number;
    profilePicture : string;
}
export const ChatPage = () => {
const [activeContact, setActiveContact] = useState<Contact>({
    name : "",
    id : -1,
    profilePicture : ""
});



    return(
        <div className="backgroundChatPage">
            <Navbar/>
            <div className="containerChatPage">
                <Chat/>
            </div>
        </div>
    )
}