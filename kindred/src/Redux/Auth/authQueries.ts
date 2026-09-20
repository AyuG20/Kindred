import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCurrentUser,
  loginAuth,
  signupAuth,
  type AuthResponse,
  type CurrentUserResponse,
  type AuthUser,
  type LoginPayload,
  type SignupPayload,
} from "./authApi.ts";

export const useLoginMutation = () => {
    return useMutation<AuthResponse, Error, LoginPayload>({
        mutationFn: loginAuth,
    });
}

export const useSignupMutation = () => {
    return useMutation<AuthResponse, Error, SignupPayload>({
        mutationFn: signupAuth,
    });
}

export const useGetCurrentUserQuery = () => {
    return useQuery<CurrentUserResponse, Error>({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        retry: false, // Do not retry on failure
    });
}

