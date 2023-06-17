import { useState } from 'react';
import { AiFillBell } from 'react-icons/ai';
import { NotificationContainer } from './NotificationContainer.tsx';
import './Bell.css';
import {
    UseGetUnReadNotifications
} from '../../queries/UseGetNotification.tsx';
import toast from 'react-hot-toast';

export const Bell = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [hasNotification, setHasNotification] = useState<boolean>(false);
    UseGetUnReadNotifications({
        onCompleted: (r) => {
            if (r.length > 0) {
                setHasNotification(true);
            }
        },
        onError: (e) => {
            showSubmitError(e.message);
        }
    });

    const showSubmitError = (message) => {
        toast.error(message);
    };

    return (
        <div className={'centerBell'}>
            <div className="bell" onClick={() => setOpen(!open)}>
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
                                setHasNotification={setHasNotification}
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
