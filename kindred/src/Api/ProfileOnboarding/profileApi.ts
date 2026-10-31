import { requestInterceptor } from "../../interceptors/authInterceptor";

export interface ProfilePictureResponse {
  success: boolean;
  message: string;
  profilePicture: {
    url: string;
    publicId: string;
  };
  bio: string;
  location: string;
  onboardingStatus: string;
}

export const updateProfile = async (
  file: File,
  bio: string,
  location: string,
): Promise<ProfilePictureResponse> => {
  const formData = new FormData();
  formData.append("profilePicture", file);
  formData.append("bio", bio);
  formData.append("location", location);
  return requestInterceptor<ProfilePictureResponse>(
    "/auth/user/profile",
    {
      method: "PUT",
      data: formData,
    },
  );
};
