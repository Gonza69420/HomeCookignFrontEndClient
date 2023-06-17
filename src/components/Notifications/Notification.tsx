import { useState } from 'react';

interface Notification {
    text: string;
    date: string;
    hasBeenSeen: boolean;
}

export const NotificationTab = (props: Notification) => {
    const [message] = useState<string>(props.text);
    const [date] = useState<string>(props.date);
    const [hasBeenSeen] = useState<boolean>(props.hasBeenSeen);

    return (
        <div className="notification">
            <h2 className={hasBeenSeen ? 'alreadyReadMessage' : 'unseenMessage'}> {message} </h2>

            <h5 className={hasBeenSeen ? 'alreadyDate' : 'unseenDate'}> {date}</h5>
        </div>
    );
};
