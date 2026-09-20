import { requestInterceptor } from '../../interceptors/authInterceptor'

export type AuthUser = {
  _id: string
  name: string
  email: string
  role: 'user' | 'admin'
  onboardingStatus: 'INTERESTS' | 'PROFILE' | 'COMPLETED'
}

export type CurrentUserResponse = {
  user: AuthUser;
};

export interface AuthResponse {
  isAuthenticated: boolean;
  message: string;
  status: number;
  success: boolean;
  token: string;
  user: AuthUser;
}

export type LoginPayload = {
  email: string
  password: string
}

export type SignupPayload = {
  firstName: string
  lastName: string
  email: string
  password: string
}

// This is the only place that knows how to talk to the auth backend.
// Keep credentials out of the UI layer and avoid storing passwords in state.
export const loginAuth = async ({ email, password }: LoginPayload): Promise<AuthResponse> => {
  try {
    return await requestInterceptor<AuthResponse>('/auth/login', {
      method: 'POST',
      data: JSON.stringify({ email, password }),
    })
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Invalid email or password')
  }
}

export const signupAuth = async ({ firstName, lastName, email, password }: SignupPayload): Promise<AuthResponse> => {
  try {
    return await requestInterceptor<AuthResponse>('/auth/register', {
      method: 'POST',
      data: JSON.stringify({ firstName, lastName, email, password }),
    })
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Signup failed')
  }
}

export const testCookie = async () => {
  return requestInterceptor("/auth/test-cookie");
};

export const logoutAuth = async (): Promise<void> => {
  await requestInterceptor('/auth/logout', {
    method: 'POST',
  })
}

export const getCurrentUser = async (): Promise<CurrentUserResponse> => {
  const response = await requestInterceptor<CurrentUserResponse>("/auth/me", {
    method: "GET",
  });
  return response;
};
