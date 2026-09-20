import { useMutation, useQuery } from "@tanstack/react-query";
import { sharedInterestDiscoveredUsers, type DiscoverResponse } from "./discoverApi";

export const useDiscoveredUsers = (interestId?: string) => {
    return useQuery<DiscoverResponse,Error>(
        {
            queryKey:['discoveredUsers',interestId],
            queryFn: () => sharedInterestDiscoveredUsers(interestId) 
        }
    )
} 
