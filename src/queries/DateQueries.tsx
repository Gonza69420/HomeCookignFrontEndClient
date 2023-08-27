import axios from "axios";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import {EventCalendar} from "../objects/EventCalendar";
interface EventChef {
    date : Date;
    minHour : Date;
    maxHour : Date;

    onCompleted?: (r) => any;
    onError?: (r) => any;
}

interface IOptions {
    onCompleted?: (r) => any;
    onError?: (r) => any;
}

export const GetAvailableDates = (chefMail : string, options : IOptions) => {
    const [loading , setLoading] = useState<boolean>(true);
    const [data, setData] = useState<EventCalendar[]>([] as EventCalendar[]);
    const [error , setError] = useState<string>('');

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        axios.get('http://localhost:8080/calendar/getAvailableDates/' + chefMail, config).then(
            (res) => {
                setLoading(false);
                options.onCompleted(res.data);
                setData(res.data);
            }
        ).catch(
            (e) => {
                options.onError(e);
                toast.error(e.message);
                setError(e.message);
            }
        )

    } , [])

    return {
        loading: loading,
        data: data,
        error: error
    }
}

export const GetHoursFromDate = (chefMail : string , date : string, options : IOptions) => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return axios.post('http://localhost:8080/calendar/getHoursFromDate/client/' + chefMail, {
        date: date
    }, config).then((res) => {
        options.onCompleted(res.data);
    }) .catch((e) => {
        options.onError(e);
    } );

}

export const getIdFromDateAndHours = (chefMail : string , date : string, hour : string, option : IOptions): void => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    axios.post('http://localhost:8080/calendar/getDateIdFromDayAndHour/' + chefMail, {
        date: date,
        hourRange: hour
    }, config).then((res) => {
        option.onCompleted(res.data);
    }).catch((e) => {
        toast.error(e.message);
    });
}