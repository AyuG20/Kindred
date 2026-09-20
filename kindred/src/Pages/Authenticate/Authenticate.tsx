import React, { useState } from "react";
import { Button } from "../../Components/Button/Button";
import { Input } from "../../Components/Input/Input";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { useNavigate } from "react-router-dom";
import { finishOnboarding, setAuthUser, startOnboarding } from "../../Redux/Auth/authSlice";
import { authTexts } from "./authTexts";
import "./Authenticate.css";
import { getOnboardingRoute } from "../../Helper/GetOnboardingStatus.ts";
import {
  useLoginMutation,
  useSignupMutation,
} from "../../Redux/Auth/authQueries";

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
  const loginMutation = useLoginMutation();
  const registerMutation = useSignupMutation();
  const formTitle = isRegister ? authTexts.signUpTitle : authTexts.loginTitle;

  const formCopy = isRegister ? authTexts.signUpCopy : authTexts.loginCopy;

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isRegister) {
      try {
        const result = await registerMutation.mutateAsync({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        });

        dispatch(setAuthUser(result.user));
        console.log("Signup result:", result);

        const onboardingStatus = result.user.onboardingStatus;

        dispatch(startOnboarding());

        const onboardingRoute = getOnboardingRoute(onboardingStatus);

        navigate(onboardingRoute, {
          replace: true,
        });

        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Signup failed:", error);
      }

      return;
    }

    try {
      const result = await loginMutation.mutateAsync({
        email: user.email,
        password: user.password,
      });

      dispatch(setAuthUser(result.user));

      const onboardingStatus = result.user.onboardingStatus;

      if (onboardingStatus === "COMPLETED") {
        dispatch(finishOnboarding());

        const onboardingRoute = getOnboardingRoute("COMPLETED");

        navigate(onboardingRoute, {
          replace: true,
        });
      } else {
        dispatch(startOnboarding());

        const route = getOnboardingRoute(onboardingStatus);

        navigate(route, {
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
    } catch (error) {
      console.error("Login failed:", error);
    }
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

        {isRegister
          ? registerMutation.isError && (
              <p className="login-error">{registerMutation.error?.message}</p>
            )
          : loginMutation.isError && (
              <p className="login-error">{loginMutation.error?.message}</p>
            )}

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
