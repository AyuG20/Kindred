import { Navigate, Route, Routes } from "react-router-dom";

import { Authenticate } from "./Pages/Authenticate/Authenticate";
import { Interests } from "./Pages/Interests/Interests";
import { ProfileDetails } from "./Pages/ProfileDetails/ProfileDetails";
import Home  from "./Pages/LandingPage/Home";
import Discover from "./Pages/Discover/Discover";
import { AppShell } from "./Layout/AppShell";
import Connections from "./Pages/Connections/Connections";
import { ProtectedRoute } from "./Routes/ProtectedRoute";
import Messages from "./Pages/Messages/Messages";

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
        <Route element={<ProtectedRoute />}>
          <Route path="/connections" element={<Connections/>}/>
           <Route path="/messages" element={<div><Messages/></div>}/>
        </Route>
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
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
};

export default App;