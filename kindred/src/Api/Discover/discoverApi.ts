import { requestInterceptor } from "../../interceptors/authInterceptor";

export interface Interest {
  _id: string;
  name: string;
  category: string;
  emoji: string;
}

export interface DiscoveredUsers {
  _id: string;
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
  profilePicture: {
    url: string;
    publicId: string;
  };
  sharedInterests: Interest[];
  matchCount: number;
  connectionStatus: "pending" | "connected" | "rejected" | null;
  requestedBy: string | null;
}

export interface DiscoverResponse {
  success: boolean;
  message: string;
  currentUserInterests: Interest[];
  users: DiscoveredUsers[];
}

export const sharedInterestDiscoveredUsers = async (
  interestId?: string,
): Promise<DiscoverResponse> => {
  const url = interestId
    ? `/discover/discoveredUsers?interestId=${interestId}`
    : `/discover/discoveredUsers`;
  const response = await requestInterceptor<{
    result: DiscoverResponse;
  }>(url, {
    method: "GET",
  });

  return response.result;
};

