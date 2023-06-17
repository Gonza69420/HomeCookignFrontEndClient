import axios from "axios/index";
import toast from "react-hot-toast";

interface IOptions {
    onCompleted?: (r) => any;
    onError?: (r) => any;
}

interface PaymentDTO {
}

interface SolicitudeDTO {
}

const UsePostPayment = (options: IOptions, paymentData : PaymentDTO, solicitudeDTO : SolicitudeDTO) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    return axios.post('http://localhost:8080/creditCard/addCard/' + sessionStorage.getItem("mail"), card, config).then(
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

}