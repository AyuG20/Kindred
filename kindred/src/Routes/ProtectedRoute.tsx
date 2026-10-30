import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { useGetCurrentUserQuery } from "../Redux/Auth/authQueries";
import { logout, setAuthUser } from "../Redux/Auth/authSlice";

export const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const { data, isLoading, isError, isSuccess } = useGetCurrentUserQuery();

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setAuthUser(data.user));
    }

    if (isError) {
      dispatch(logout());
    }
  }, [data, dispatch, isError, isSuccess]);

  if (isLoading) {
    return null;
  }

  if (isError || (!isAuthenticated && !isSuccess)) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
