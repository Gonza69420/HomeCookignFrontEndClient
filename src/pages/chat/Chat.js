import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import {
    getUsers,
    countNewMessages,
    findChatMessages,
    findChatMessage,
} from "./util/ApiUtil.js";
//import { useRecoilValue, useRecoilState } from "recoil";
import ScrollToBottom from "react-scroll-to-bottom";
import {GetContacts} from "../../queries/ChatQueries.tsx";
import {GetUserData} from "../../queries/ClientQuerries.tsx";
import toast from "react-hot-toast";
import "./Chat.css";
var stompClient = null;


export const Chat = (props) => {
    const [text, setText] = useState("");
    const [contacts, setContacts] = useState([]);
    const [activeContact, setActiveContact] = useState({
        id: -1,
        name: "",
        profilePicture: "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=",
    })
    const [messages, setMessages] = useState([])
    const [activeContactIndex , setActiveContactIndex] = useState(0)
    const [currentUser , setClientData] = useState({
        id: 0,
        name: "",
        profilePicture: "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=",
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await GetUserData();
            setClientData({
                id: data.id,
                name: data.fullName,
                profilePicture: data.clientProfile.imageURL,
            });
        };

        fetchData();
    }, []);


    useEffect(() => {
        if (sessionStorage.getItem("token") === null) {
            props.history.push("/login");
        }
        connect();
        loadContacts();
    }, [currentUser]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetContacts(currentUser.id);
                setContacts(data);
            } catch (e) {
                toast.error(e.message);
                console.log(e);
            }
        };
        fetchData();
    }, [currentUser.id]);


    useEffect(() => {
        if (activeContact.id === -1) return;
        findChatMessages(activeContact.id, currentUser.id).then((msgs) => {
                setMessages(msgs)
            }
        );
        loadContacts();
    }, [activeContact]);

    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        console.log("connected");
        stompClient.subscribe(
            "/user/" + currentUser.id + "/queue/messages",
            onMessageReceived
        );
    };

    const onError = (err) => {
        console.log(err);
    };

    const onMessageReceived = (msg) => {
        const notification = JSON.parse(msg.body);
        if (activeContact.id === notification.senderId) {
            findChatMessage( notification.id).then((msgs) => {
                const newMessages = [...messages];
                newMessages.push(msgs);
                setMessages(newMessages);
            });
        }

        loadContacts();
    };

    const sendMessage = (msg) => {
        if (msg.trim() !== "") {
            const message = {
                senderId: currentUser.id,
                recipientId: activeContact.id,
                senderName: currentUser.name,
                recipientName: activeContact.name,
                content: msg,
                timestamp: new Date(),
            };
            stompClient.send("/app/chat", {}, JSON.stringify(message));
            const newMessages = [...messages];
            newMessages.push(message);
            setMessages(newMessages);
        }
    };

    const loadContacts = () => {
        const promise = getUsers(currentUser.id).then((users) =>
            users.map((contact) =>
                countNewMessages(contact.id, currentUser.id).then((count) => {
                    contact.newMessages = count;
                    return contact;
                })
            )
        );

        promise.then((promises) =>
            Promise.all(promises).then((users) => {
                setContacts(users);
                if (activeContact.id === -1 && users.length > 0) {
                    console.log(users[activeContactIndex])
                    setActiveContact({
                        id: users[activeContactIndex].id,
                        name: users[activeContactIndex].fullNameChef,
                        profilePicture: users[activeContactIndex].chefProfile.imageURL,
                    });
                }
            })
        );
    };

    return (
        <div id="frame">
            <div id="sidepanel">
                <div id="profile">
                    <div class="wrap">
                        <img
                            id="profile-img"
                            src={currentUser.profilePicture}
                            class="online"
                            alt=""
                        />
                        <p>{currentUser.name}</p>
                        <div id="status-options">
                            <ul>
                                <li id="status-online" class="active">
                                    <span class="status-circle"></span> <p>Online</p>
                                </li>
                                <li id="status-away">
                                    <span class="status-circle"></span> <p>Away</p>
                                </li>
                                <li id="status-busy">
                                    <span class="status-circle"></span> <p>Busy</p>
                                </li>
                                <li id="status-offline">
                                    <span class="status-circle"></span> <p>Offline</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="contacts">
                    <ul className={"contactsList"}>
                        {contacts.map((contact, index) => (
                            <li
                                onClick={() => {
                                    setActiveContact({
                                        id: contact.id,
                                        name: contact.fullNameChef,
                                        profilePicture: contact.chefProfile.imageURL,
                                    })
                                    setActiveContactIndex(index)
                                }}
                                class={
                                    activeContact && contact.id === activeContact.id
                                        ? "contact active"
                                        : "contact"
                                }
                            >
                                <div class="wrap">
                                    <span class="contact-status online"></span>
                                    <img id={contact.id} src={contact.chefProfile.imageURL} alt="" />
                                    <div class="meta">
                                        <p class="name">{contact.fullNameChef}</p>
                                        {contact.newMessages !== undefined &&
                                            contact.newMessages > 0 && (
                                                <p class="preview">
                                                    {contact.newMessages} new messages
                                                </p>
                                            )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            <div class="content">
                <div class="contact-profile">
                    { activeContact.id !== -1 &&
                        <>
                            <img src={activeContact && activeContact.profilePicture} alt="" />
                            <p>{activeContact && activeContact.name}</p>
                        </>
                    }
                </div>
                <ScrollToBottom className="messages">
                    <ul>
                        {messages.map((msg) => (
                            <li class={msg.senderId.toString() === currentUser.id.toString() ? "sent" : "replies"}>
                                {msg.senderId.toString() !== currentUser.id.toString() && (
                                    <img src={activeContact.profilePicture} alt="" />
                                )}
                                <p>{msg.content}</p>
                            </li>
                        ))}
                    </ul>
                </ScrollToBottom>
                {activeContact.id !== -1 &&
                    <div class="message-input">
                        <div class="wrap">
                            <input
                                name="user_input"
                                size="large"
                                placeholder="Write your message..."
                                value={text}
                                onChange={(event) => setText(event.target.value)}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        sendMessage(text);
                                        setText("");
                                    }
                                }}
                            />

                            <Button
                                icon={<i class="fa fa-paper-plane" aria-hidden="true"></i>}
                                onClick={() => {
                                    sendMessage(text);
                                    setText("");
                                }}
                            />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};