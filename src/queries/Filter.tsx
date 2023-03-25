import {useState} from "react";
import axios from "axios";

interface search{
    chefName : string;
    menuName : string;

    onCompleted? : (res) => any;
    onError? : (err) => any;
    updateQuery? : any;
}

interface Chef {
    id : string;
    imageURL : string;
    firstName : string;
    lastName : string;

}


export const useSearchChef = (search : search) => {
    const [loading , setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Chef[]>([]);
    const [first , setFirst] = useState<boolean>(false);
    const [last , setLast] = useState<boolean>(false);
    const [lastPage , setLastPage] = useState<number>(0);
    const [menuOrChef , setMenuOrChef] = useState<string>("");
    const checkIfChef = () => {
        if(search.chefName != ""){
            setMenuOrChef("menu");
            return menuOrChef;
        }
        setMenuOrChef("chef")
        return menuOrChef;
    }

    const fetchData = () => {
        axios
            .post(
                `http://localhost:8080/filter/${checkIfChef()}?page=0`,
                {
                    chefName: search.chefName,
                    menuName : search.menuName,
                    category : search.menuName,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            .then((res) => {
                setLoading(false);
                search.onCompleted(res.data.content);
                setData(res.data.content);
                setData(res.data.content);
                setFirst(res.data.first);
                setLast(res.data.last);
                setLastPage(res.data.totalPages - 1);
            })
            .catch((e) => {
                search.onError(e);
            });
    };

    return {
        loading: loading,
        data: data,
        first: first,
        last: last,
        lastPage: lastPage,
        refetch: fetchData
    };
}


