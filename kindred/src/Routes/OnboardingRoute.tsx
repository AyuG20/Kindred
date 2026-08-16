import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../Redux/hooks";

export const OnboardingRoute = () => {
  const { isAuthenticated, isOnboarding, user } = useAppSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (!isOnboarding) {
    return <Navigate to="/" replace />;
  }

  if (user?.onboardingStatus === "COMPLETED") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};