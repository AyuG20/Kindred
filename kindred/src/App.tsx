import { Navigate, Route, Routes } from "react-router-dom";

import { Authenticate } from "./Pages/Authenticate/Authenticate";
import { Interests } from "./Pages/Interests/Interests";
import { ProfileDetails } from "./Pages/ProfileDetails/ProfileDetails";
import { OnboardingRoute } from "./Routes/OnboardingRoute";
import Home  from "./Pages/LandingPage/Home";
import Discover from "./Pages/Discover/Discover";
import { AppShell } from "./Layout/AppShell";
import { useGetCurrentUserQuery } from "./Redux/Auth/authQueries";

const App = () => {

  return (
    <Routes>

      {/* Public */}
      <Route
        path="/auth"
        element={<Authenticate />}
      />

      <Route element={<AppShell/>}>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/discover" element={<Discover/>}/>
      </Route>

      {/* Onboarding */}
      {/* <Route element={<OnboardingRoute />}> */}

        <Route
          path="/onboarding/interests"
          element={<Interests />}
        />

        <Route
          path="/onboarding/profile-details"
          element={<ProfileDetails />}
        />

      {/* </Route> */}


      {/* Default */}
      <Route
        path="/"
        element={<Navigate to="/" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/auth" replace />}
      />

    </Routes>
  );
};

export default App;