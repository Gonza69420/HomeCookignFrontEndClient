import axios from "axios";
import toast from "react-hot-toast";

interface IOptions {
    onCompleted?: (r) => any;
    onError?: (r) => any;
}
export const GetUserData = async () => {
    const res = await axios.get(`http://localhost:8080/api/auth/getClient/` + sessionStorage.getItem("mail"));
    return res.data;
};