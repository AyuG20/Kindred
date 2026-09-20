import { useQueries, useQuery } from "@tanstack/react-query";
import { listInterests, type Interest } from "./interestApi";

export const useListInterest = ()=>{
    return useQuery<Interest[],Error>({
        queryKey:['interests'],
        queryFn: listInterests
    })
}
