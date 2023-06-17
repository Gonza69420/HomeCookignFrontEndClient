import Navbar from "../../components/Navbar";
import {Chat} from "./Chat";
import "./ChatPage.css";
export const ChatPage = () => {




    return(
        <div className="backgroundChatPage">
            <Navbar/>
            <div className="containerChatPage">
                <Chat/>
            </div>
        </div>
    )
}