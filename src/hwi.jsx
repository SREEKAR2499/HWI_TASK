import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ResetPage from "./reset";
import ExpiryPage from "./expired";
import Header from "./Header";
import LoginPage from "./login";
import { useEffect } from "react";
import ReleaseTimer from "./release-timer";
import HomePage from "./homepage";
import Logs from "./logs";
import MaintenancePage from "./maintenance";

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    console.log("Route changed to:", location.pathname);
  }, [location]);

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/under-maintenance' && (
        <>
          <Header />
          <ReleaseTimer />
        </>
      )}
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/reset" element={<ResetPage />} />
        <Route path="/expired" element={<ExpiryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logs" element={<Logs />}/>
        <Route path="/under-maintenance" element={<MaintenancePage />}/>

      </Routes>
    </>
  );
}

function Home() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default Home;