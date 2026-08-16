import { Navigate, Route, Routes } from "react-router-dom";

import { Authenticate } from "./Pages/Authenticate/Authenticate";
import { Interests } from "./Pages/Interests/Interests";
import { ProfileDetails } from "./Pages/ProfileDetails/ProfileDetails";


import { OnboardingRoute } from "./Routes/OnboardingRoute";

const App = () => {
  return (
    <Routes>

      {/* Public */}
      <Route
        path="/auth"
        element={<Authenticate />}
      />

      {/* Onboarding */}
      <Route element={<OnboardingRoute />}>

        <Route
          path="/onboarding/interests"
          element={<Interests />}
        />

        <Route
          path="/onboarding/profile-details"
          element={<ProfileDetails />}
        />

      </Route>


      {/* Default */}
      <Route
        path="/"
        element={<Navigate to="/auth" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/auth" replace />}
      />

    </Routes>
  );
};

export default App;