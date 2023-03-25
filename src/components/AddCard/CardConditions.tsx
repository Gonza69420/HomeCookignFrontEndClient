import toast from "react-hot-toast";

export const checkIfCardIsLength = (cardNumber : string) : boolean => {
    if (cardNumber.length != 19){
        toast.error("El numero de tarjeta tiene que tener una longitud de 19 digitos");
        return true;
    }
    return false;
}

export const checkIfYearIsLength = (year : string) : boolean => {
    if (year.length != 4){
        toast.error("El año tiene que tener una longitud de 4 digitos");
        return true;
    }
    return false;
}

export const checkCVVIsLength = (cvv : string) : boolean => {
    if (cvv.length != 3){
        toast.error("El CVV tiene que tener una longitud de 3 digitos");
        return true;
    }
    return false;
}

