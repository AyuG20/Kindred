export const getOnboardingRoute = (
  status:
    | "PROFILE"
    | "INTERESTS"
    | "COMPLETED"
) => {
  switch (status) {
  case "INTERESTS":
      return "/onboarding/interests";

    case "PROFILE":
      return "/onboarding/profile-details";

    case "COMPLETED":
      return "/discover";

    default:
      return "/auth";
  }
};