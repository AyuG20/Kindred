import { requestInterceptor } from "../../interceptors/authInterceptor";

export interface Interest{
    _id: string;
    name: string;
    category: string;
    emoji: string;
}

export interface SelectInterestsResponse {
  success: boolean;
  message: string;
  onboardingStatus: string;
  interests: Interest[];
}


export const selectInterests = async(interestIds: string[]) : Promise<SelectInterestsResponse> => {
        return requestInterceptor<SelectInterestsResponse>('/interests/select', {
            method: 'PUT',
            data: { interestIds },
        });
}

// export const fetchUserInterests = async(userId:string): Promise<Interest> =>{
//     return requestInterceptor<Interest>('/interests/me',{
//         method: 'GET'
//     })
// }
export const listInterests = async(): Promise<Interest[]> =>{
    return requestInterceptor<Interest[]>('/interests/',{
        method: 'GET'
    })
}