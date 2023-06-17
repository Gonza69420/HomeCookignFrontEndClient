import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import {
    UseGetAlreadyReadNotifications,
    UseGetUnReadNotifications
} from '../../queries/UseGetNotification.tsx';
import { NotificationTab } from './Notification.tsx';
import Spinner from '../Spinner/Spinner.tsx';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Notification {
    text: string;
    date: string;
    hasBeenSeen: boolean;
}

interface NotificationContainer {
    setHasNotification: (r: boolean) => any;
}

export const NotificationContainer = (props: NotificationContainer) => {
    const [AlreadyRead, setAlreadyRead] = useState<Notification[]>([] as Notification[]);
    const [UnRead, setUnRead] = useState<Notification[]>([] as Notification[]);
    const [showUnRead, setShowUnRead] = useState<boolean>(false);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState<boolean>(false);
    const [unReadDateWasTrimmed, setUnReadDateWasTrimmed] = useState<boolean>(false);
    const [alreadyReadDateWasTrimmed, setAlreadyReadDateWasTrimmed] = useState<boolean>(false);
    const { loading } = UseGetAlreadyReadNotifications({
        onCompleted: (r) => {
            setAlreadyRead(r);
        },
        onError: (e) => {
            showSubmitError(e.message);
        }
    });
    const { loading: loading2 } = UseGetUnReadNotifications({
        onCompleted: (r) => {
            setUnRead(r);
            markNotificationAsRead();
            props.setHasNotification(false);
        },
        onError: (e) => {
            showSubmitError(e.message);
        }
    });

    useEffect(() => {
        if (UnRead.length >= 1 && !unReadDateWasTrimmed) {
            UnRead.length >= 1 ? setHasUnreadNotifications(true) : setHasUnreadNotifications(false);
            const newUnread = UnRead.map((notification) => {
                return { ...notification, date: notification.date.split('T')[0] };
            });

            setUnRead(newUnread);
            setUnReadDateWasTrimmed(true);
        }
    }, [UnRead]);

    useEffect(() => {
        if (AlreadyRead.length >= 1 && !alreadyReadDateWasTrimmed) {
            const newAlreadyRead = AlreadyRead.map((notification) => {
                return { ...notification, date: notification.date.split('T')[0] };
            });

            setAlreadyRead(newAlreadyRead);
            setAlreadyReadDateWasTrimmed(true);
        }
    }, [AlreadyRead]);

    const markNotificationAsRead = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        await axios.put('http://localhost:8080/notifications', {}, config);
    };

    const showSubmitError = (message) => {
        toast.error(message);
    };

    return (
        <div>
            {loading ? (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        margin: '20px'
                    }}
                >
                    <Spinner></Spinner>
                </div>
            ) : (
                <>
                    {!hasUnreadNotifications ? (
                        <>
                            <NotificationTab text="No hay nuevas notificaciones." date={''} hasBeenSeen={false} />
                        </>
                    ) : (
                        <>
                            {UnRead.map((notification) => {
                                return (
                                    <>
                                        <NotificationTab
                                            text={notification.text}
                                            date={notification.date}
                                            hasBeenSeen={false}
                                        />
                                    </>
                                );
                            })}
                        </>
                    )}
                </>
            )}
            {showUnRead ? (
                <>
                    {loading2 ? (
                        <>
                            <Spinner></Spinner>
                        </>
                    ) : (
                        <>
                            {AlreadyRead.map((notification) => {
                                return (
                                    <>
                                        <NotificationTab
                                            text={notification.text}
                                            date={notification.date}
                                            hasBeenSeen={true}
                                        />
                                    </>
                                );
                            })}
                        </>
                    )}
                </>
            ) : (
                <>
                    <Button
                        variant="contained"
                        className={'loadOldNotifications'}
                        onClick={() => {
                            setShowUnRead(true);
                        }}
                    >
                        {' '}
                        Cargar Notificaciones Viejas{' '}
                    </Button>
                </>
            )}
        </div>
    );
};
