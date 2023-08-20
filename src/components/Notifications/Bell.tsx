import {useEffect, useState} from 'react';
import { AiFillBell } from 'react-icons/ai';
import { NotificationContainer } from './NotificationContainer.tsx';
import './Bell.css';
import {
    UseGetAlreadyReadNotifications,
    UseGetUnReadNotifications,
    UseMarkNotificationAsRead
} from "../../queries/UseGetNotification.tsx";
import toast from 'react-hot-toast';
var stompClient = null;

export const Bell = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [hasNotification, setHasNotification] = useState<boolean>(false);
    const [UnRead, setUnRead] = useState<Notification[]>([] as Notification[]);
    const [AlreadyRead, setAlreadyRead] = useState<Notification[]>([] as Notification[]);

    const showSubmitError = (message) => {
        toast.error(message);
    };


    useEffect(() => {
        if (UnRead.length == 0){
            setHasNotification(false);
        } else{
            setHasNotification(true);
        }
    } , [UnRead]);

    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, onConnected, onError);
    };

    const { loading: unReadLoading, data: unReadData } = UseGetUnReadNotifications({
        onCompleted: (data) => {
            console.log(data)
            setUnRead([...UnRead, ...data]);
        },
        onError: (error) => {
            console.error('Error fetching unread notifications:', error);
        }
    });

    const { loading: alreadyReadLoading, data: alreadyReadData } = UseGetAlreadyReadNotifications({
        onCompleted: (data) => {
            console.log(data)
            setAlreadyRead([...AlreadyRead, ...data]);
        },
        onError: (error) => {
            console.error('Error fetching unread notifications:', error);
        }
    });



    const onConnected = () => {
        console.log("connected");
        stompClient.subscribe(
            "/user/" + sessionStorage.getItem("id") + "/queue/events",
            onNotificationReceived
        );
    };

    useEffect(() => {
        connect();
    }, []);

    const onError = (err) => {
        console.log(err);
    };

    const AreadyReadNotification = (payload) => {
        const notification = JSON.parse(payload.body);
        setAlreadyRead([...AlreadyRead, notification]);
    }

    const onNotificationReceived = (payload) => {
        const notification = JSON.parse(payload.body);
        setUnRead([...UnRead, notification]);
    }

    const openBell = () => {
        if (open) {
            setUnRead([]);
            setAlreadyRead([...UnRead , ...AlreadyRead]);
        }
        setOpen(!open)
        UseMarkNotificationAsRead({
            onCompleted: (data) => {

            } ,
            onError: (error) => {

            }
        })
    }

    return (
        <div className={'centerBell'}>
            <div className="bell" onClick={() =>
                openBell()
            }>
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
                                alreadyReadNotifications={AlreadyRead}
                                setAlreadyRead={setAlreadyRead}
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
