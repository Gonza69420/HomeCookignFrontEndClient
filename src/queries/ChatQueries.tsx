import axios from "axios";
import toast from "react-hot-toast";

interface IOptions {
    onCompleted?: (r) => any;
    onError?: (r) => any;
}
export const GetContacts = async (id: number) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`http://localhost:8080/chat/messages/client/contacts/${id}`, config);
        return res.data;
    } catch (e) {
        throw new Error(e.message);
    }
};