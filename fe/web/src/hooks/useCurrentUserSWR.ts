import useSWR from "swr";
import fetcher from "../libs/fetcher";

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('http://localhost:4000/api/currnet', fetcher);

    return {
        data, 
        error, 
        isLoading, 
        mutate
    }
}

export default useCurrentUser