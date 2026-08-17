import { requestInterceptor } from "../../interceptors/authInterceptor";

export interface Interest{
    id: string;
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