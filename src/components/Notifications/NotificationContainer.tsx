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
    unReadNotifications: Notification[];
    alreadtReadNotifications: Notification[];
    setUnRead: (r: Notification[]) => any;
    setAlreadyRead: (r: Notification[]) => any;
}

export const NotificationContainer = (props: NotificationContainer) => {
    const [showUnRead, setShowUnRead] = useState<boolean>(false);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState<boolean>(false);
    const [unReadDateWasTrimmed, setUnReadDateWasTrimmed] = useState<boolean>(false);
    const [alreadyReadDateWasTrimmed, setAlreadyReadDateWasTrimmed] = useState<boolean>(false);

    useEffect(() => {
        if (props.unReadNotifications.length >= 1 && !unReadDateWasTrimmed) {
            props.unReadNotifications.length >= 1 ? setHasUnreadNotifications(true) : setHasUnreadNotifications(false);
            const newUnread = props.unReadNotifications.map((notification) => {
                return { ...notification, date: notification.date.split('T')[0] };
            });

            props.setUnRead(newUnread);
            setUnReadDateWasTrimmed(true);
        }
    }, [props.unReadNotifications]);

    useEffect(() => {
        if (props.alreadtReadNotifications.length >= 1 && !alreadyReadDateWasTrimmed) {
            const newAlreadyRead = props.alreadtReadNotifications.map((notification) => {
                return { ...notification, date: notification.date.split('T')[0] };
            });

            props.setAlreadyRead(newAlreadyRead);
            setAlreadyReadDateWasTrimmed(true);
        }
    }, [props.alreadtReadNotifications]);

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
                <>
                    {!hasUnreadNotifications ? (
                        <>
                            <NotificationTab text="No hay nuevas notificaciones." date={''} hasBeenSeen={false} />
                        </>
                    ) : (
                        <>
                            {props.unReadNotifications.map((notification) => {
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
            {showUnRead ? (
                <>
                    <>
                        {props.alreadtReadNotifications.map((notification) => {
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
