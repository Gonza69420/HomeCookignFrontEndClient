import {Card} from "../objects/Card";
import axios from "axios";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";


interface IOptions {
    onCompleted?: (r) => any;
    onError?: (r) => any;
}
export  const addCard = async (card: Card, setOpen: (r) => any) => {

    axios.post('http://localhost:8080/payment/addPaymentMethod', {
        customerId: sessionStorage.getItem("mail")
    }).then(
        (res) => {
            toast.success(res.data);
            setOpen(false);
        }
    ).catch(
        (e) => {
            toast.error(e.message);
        }
    )

}

export const GetCardByMail = (options: IOptions) => {
    const [loading , setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Card[]>([] as Card[]);
    const [error , setError] = useState<string>('');

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.get('http://localhost:8080/creditCard/getCards/' + sessionStorage.getItem('mail'), config)
            .then((res) => {
                setLoading(false);
                options.onCompleted(res.data);
                setData(res.data);
            })
            .catch((e) => {
                setError(e.message);
                options.onError(e);
            });
    } , [])

    return {
        loading: loading,
        data: data,
        error: error
    }
}

export const deleteCard = (card : Card) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    return axios.post('http://localhost:8080/creditCard/deleteCard/' + sessionStorage.getItem("mail"),{
        cardNumber: card.cardNumber
    }, config).then(
        (res) => {
            toast.success(res.data);
        }
    ).catch(
        (e) => {
            toast.error(e.message);
        }
    )
}