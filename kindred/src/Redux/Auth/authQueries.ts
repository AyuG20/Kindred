import { useMutation } from "@tanstack/react-query";
import {
  loginAuth,
  signupAuth,
  type AuthUser,
  type AuthResponse,
  type LoginPayload,
  type SignupPayload,
} from "./authApi";

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

