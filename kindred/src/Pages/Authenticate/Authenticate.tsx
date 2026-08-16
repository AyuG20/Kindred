import React, { useState } from "react";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { useNavigate } from "react-router-dom";
import {
  clearError,
  finishOnboarding,
  loginUser,
  logout,
  signupUser,
  startOnboarding,
} from "../../Redux/Auth/authSlice";
import { authTexts } from "./authTexts";
import "./Authenticate.css";
import { getOnboardingRoute } from "../../Helper/GetOnboardingStatus";

export const Authenticate = () => {
  const [isRegister, setIsRegister] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, status, error } = useAppSelector(
    (state) => state.auth,
  );

  const formTitle = isRegister ? authTexts.signUpTitle : authTexts.loginTitle;

  const formCopy = isRegister ? authTexts.signUpCopy : authTexts.loginCopy;

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(clearError());

    if (isRegister) {
      const result = await dispatch(
        signupUser({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        }),
      );

      console.log("Signup result:", result);

      if (signupUser.fulfilled.match(result)) {
        const onboardingStatus = result.payload.user.onboardingStatus;
        dispatch(startOnboarding());

        const onboardingRoute = getOnboardingRoute(onboardingStatus);
        navigate(onboardingRoute, {
          replace: true,
        });
      }
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      return;
    }

    const result = await dispatch(
      loginUser({
        email: user.email,
        password: user.password,
      }),
    );

    if (loginUser.fulfilled.match(result)) {
      const onboardingStatus = result.payload.user.onboardingStatus;

      if (onboardingStatus == "COMPLETED") {
        dispatch(finishOnboarding());

        const onboardingRoute = getOnboardingRoute("COMPLETED");

        navigate(onboardingRoute, { replace: true });
      } else {
        dispatch(startOnboarding());

        const route = getOnboardingRoute(onboardingStatus);

        navigate(route, {
          replace: true,
        });
      }
    }

    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="kindered-frame">
      <div className="login-pill-toggle">
        <button
          type="button"
          className={`login-pill-toggle__item ${
            !isRegister ? "login-pill-toggle__item--active" : ""
          }`}
          onClick={() => setIsRegister(false)}
        >
          {authTexts.login}
        </button>

        <button
          type="button"
          className={`login-pill-toggle__item ${
            isRegister ? "login-pill-toggle__item--active" : ""
          }`}
          onClick={() => setIsRegister(true)}
        >
          {authTexts.signUp}
        </button>
      </div>

      <div className="login-hero">
        <p className="login-hero__eyebrow">
          {isRegister ? authTexts.getStarted : authTexts.welcomeBack}
        </p>

        <h1 className="login-hero__title">{formTitle}</h1>

        <p className="login-hero__copy">{formCopy}</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        {isRegister && (
          <Input
            label={authTexts.firstName}
            type="text"
            placeholder={authTexts.firstNamePlaceholder}
            value={user.firstName}
            onChange={(event) =>
              setUser({
                ...user,
                firstName: event.target.value,
              })
            }
          />
        )}

        {isRegister && (
          <Input
            label={authTexts.lastName}
            type="text"
            placeholder={authTexts.lastNamePlaceholder}
            value={user.lastName}
            onChange={(event) =>
              setUser({
                ...user,
                lastName: event.target.value,
              })
            }
          />
        )}

        <Input
          label={authTexts.email}
          type="email"
          placeholder={authTexts.emailPlaceholder}
          value={user.email}
          onChange={(event) =>
            setUser({
              ...user,
              email: event.target.value,
            })
          }
        />

        <Input
          label={authTexts.password}
          type="password"
          placeholder={authTexts.passwordPlaceholder}
          value={user.password}
          onChange={(event) =>
            setUser({
              ...user,
              password: event.target.value,
            })
          }
        />

        {isRegister && (
          <Input
            label={authTexts.confirmPassword}
            type="password"
            placeholder={authTexts.passwordPlaceholder}
          />
        )}

        {error && <p className="login-error">{error}</p>}

        <div className="login-form__footer">
          {!isRegister && (
            <a href="#" className="login-forgot-link">
              {authTexts.forgotPassword}
            </a>
          )}

          <Button
            type="submit"
            variant="primary"
            className="login-submit"
            onClick={() => handleSubmit}
            disabled={status === "loading"}
          >
            {status === "loading"
              ? authTexts.working
              : isRegister
                ? authTexts.signUp
                : authTexts.login}
          </Button>
        </div>
      </form>
    </div>
  );
};
