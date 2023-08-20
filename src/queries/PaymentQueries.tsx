import axios from "axios/index";
import toast from "react-hot-toast";

interface IOptions {
    onCompleted?: (r) => any;
    onError?: (r) => any;
}

interface PaymentDTO {
    idClient : string,
    idChef : string,
    calendarEventId : number,
    price: number,
    menus : number[]
}



export const UsePostPayment = ( paymentData : PaymentDTO, setOpen : (r) => any) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    return axios.post('http://localhost:8080/creditCard/addCard/' + sessionStorage.getItem("mail"), paymentData, config).then(
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

