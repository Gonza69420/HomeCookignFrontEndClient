import {useEffect, useState} from 'react';
import { AiFillBell } from 'react-icons/ai';
import { NotificationContainer } from './NotificationContainer.tsx';
import './Bell.css';
import {
    UseGetUnReadNotifications
} from '../../queries/UseGetNotification.tsx';
import toast from 'react-hot-toast';
var stompClient = null;

export const Bell = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [hasNotification, setHasNotification] = useState<boolean>(false);
    const [UnRead, setUnRead] = useState<Notification[]>([] as Notification[]);
    const [AreadyRead, setAreadyRead] = useState<Notification[]>([] as Notification[]);

    useEffect(() => {
        connect();
    }, []);

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
            "/get/unread/" + sessionStorage.getItem("mail") ,
            onNotificationReceived
        );
        stompClient.subscribe(
            "/get/seen/" + sessionStorage.getItem("mail") ,
            AreadyReadNotification
        );
    };

    const onError = (err) => {
        console.log(err);
    };

    const AreadyReadNotification = (payload) => {
        const notification = JSON.parse(payload.body);
        setAreadyRead([...AreadyRead, notification]);
    }

    const onNotificationReceived = (payload) => {
        const notification = JSON.parse(payload.body);
        setUnRead([...UnRead, notification]);
    }

    const openBell = () => {
        setOpen(!open)
        stompClient.send("/mark/" + sessionStorage.getItem("mail") , {})
    }

    const showSubmitError = (message) => {
        toast.error(message);
    };

    return (
        <div className={'centerBell'}>
            <div className="bell" onClick={() => openBell()}>
                {hasNotification ? <div className={'redCircle'}></div> : <></>}
                <AiFillBell
                    style={{
                        fontSize: '30px',
                        marginTop: '3px',
                        background: '#ffffff',
                        borderRadius: '100%',
                        padding: '5px',
                        cursor: 'pointer'
                    }}
                />
            </div>
            {open ? (
                <div className={'column'}>
                    <div className={'arrow-up'}></div>
                    <div className="divposition">
                        <div className={'notificationContainer'}>
                            <NotificationContainer
                                unReadNotifications={UnRead}
                                setUnRead={setUnRead}
                                areadyReadNotifications={AreadyRead}
                                setAreadyRead={setAreadyRead}
                            ></NotificationContainer>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
