import {useEffect, useState} from "react";
import axios from "axios";

interface search{
    search : string;
    chef : boolean;
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
    const checkIfChef = () => {
        if(search.chef) {
            return "chef";
        } else {
            return "menu"
        }
    }

    const fetchData = () => {
        axios
            .post(
                `http://localhost:8080/filter/${checkIfChef()}`,
                {
                    search: search.search,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            .then((res) => {
                setLoading(false);
                search.onCompleted(res.data);
                setData(res.data);
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

export const useAllChefs = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = () => {
        axios.get("http://localhost:8080/api/auth/getAllChefs", {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            setLoading(false);
            setData(res.data);
        }).catch((e) => {
            setLoading(false);
            setError(e);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { loading, data, error };
};

