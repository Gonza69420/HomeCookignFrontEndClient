import Navbar from "../../components/Navbar";
import React, { useEffect, useState } from "react";
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import "./Chat.css";
var stompClient = null;
export const Chat = () => {
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab, setTab] = useState("CHATROOM")
    const[userData , setuserData] = useState({
        message: "",
        recievername:'',
        username: sessionStorage.getItem("mail")
    })

    useEffect(() => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }, [])

    const onConnected = () => { // when connected
        stompClient.subscribe('/user' + userData.username , onMessageReceived, onPrivateMesasgeReceived);

        let chatMessage ={
            senderName: userData.username,
            reverName:tab,
            message: userData.message,
            status: "JOIN"
        };
        
        stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));

    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            
        }
    }

    const onError = (err) => {
        console.log(err);
        
    }

    const onPrivateMesasgeReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);

        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list= [];
            list.push(payloadData);

            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    
    const handleMessageChange = (e) => {
        setuserData({
            ...userData,
            message: e.target.value
        })
    }

    const sendPrivateMessage = () => {
        if(stompClient){
            let chatMessage ={
                senderName: userData.username,
                reverName:tab,
                message: userData.message,
                status: "MESSAGE"
            };
            if(userData.username !== tab){
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
            setuserData({...userData, message: ""});
        }
    }

    return(
        <div>
            <Navbar/>
            <div className="container">
                <div className="member-list">
                    <ul>
                        <li onClick={() =>{setTab("CHATROOM")} } className={`member ${tab=="CHATROOM" && "active"}`}>Chat</li>
                        {[...privateChats.keys()].map((name, index) => {
                            <li onClick={() => {setTab(name)}} className={`member ${tab==name && "active"} `} key={index}>
                                {name}
                            </li>

                        })}
                    </ul>
                </div >
            </div>
            {tab!=="CHATROOM" && <div className="chat-container">
                <ul className="chat-messages">
                {[...privateChats.get(tab)].map((chat,index) => {
                    <li className="message" key={index}>
                        {chat.senderName !== userData.username && <div className="avatar"> {chat.senderName} </div>}
                        <div className="message-data">{chat.message}</div>
                        {chat.senderName === userData.username && <div className="avatar self"> {chat.senderName} </div>}
                    </li>

                })}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="Type your message" value={userData.message} onChange={handleMessageChange}/>
                    <button type='button' className="send-button" onClick={sendPrivateMessage}> send</button>
                </div>
                </div>}
        </div>
    )
}