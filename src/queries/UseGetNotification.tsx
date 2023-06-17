import axios from 'axios';
import { useEffect, useState } from 'react';

interface IOptions {
    onCompleted?: (r) => any;
    onError?: (r) => any;
}

export const UseGetUnReadNotifications = (options: IOptions) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Notification[]>([] as Notification[]);

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        axios
            .get('http://localhost:8080/notifications/unread', config)
            .then((res) => {
                setLoading(false);
                setData(res.data);
                options.onCompleted(res.data);
            })
            .catch((e) => {
                options.onError(e);
            });
    }, []);

    return {
        loading: loading,
        data: data
    };
};

export const UseGetAlreadyReadNotifications = (options: IOptions) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<Notification[]>([] as Notification[]);

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        axios
            .get('http://localhost:8080/notifications/alreadyread', config)
            .then((res) => {
                setLoading(false);
                setData(res.data);
                options.onCompleted(res.data);
            })
            .catch((e) => {
                setError(e.message);
                options.onError(e);
            });
    }, []);

    return {
        loading: loading,
        data: data,
        error: error
    };
};

export const UseGetHasUnreadNotifications = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<boolean>(false);

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        axios
            .get('http://localhost:8080/notification/hasUnread', config)
            .then((res) => {
                setLoading(false);
                setData(res.data);
            })
            .catch((e) => {
                setError(e.message);
            });
    }, []);

    return {
        loading: loading,
        data: data,
        error: error
    };
};
