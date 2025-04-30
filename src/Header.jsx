import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [inactiveTime, setInactiveTime] = useState(0);
  const [sessionShouldEnd, setSessionShouldEnd] = useState(false);
  const [maxInactiveTime] = useState(10); // 10 seconds
  const navigate = useNavigate();

  useEffect(() => {
    const resetTimer = () => setInactiveTime(0);
    const events = ['mousemove', 'keypress', 'touchstart', 'scroll'];
    const handleActivity = () => {
      resetTimer();
      setSessionShouldEnd(false);
    };

    events.forEach((event) => window.addEventListener(event, handleActivity));
    const interval = setInterval(() => {
      setInactiveTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      events.forEach((event) => window.removeEventListener(event, handleActivity));
    };
  }, []);

  useEffect(() => {
    if (inactiveTime === maxInactiveTime - 60 && !sessionShouldEnd) {
      setSessionShouldEnd(true);
      console.warn("You will be logged out in 60 seconds due to inactivity.");
    }

    if (inactiveTime >= maxInactiveTime) {
      alert("Session expired due to inactivity");
      navigate("/login");
    }
  }, [inactiveTime, maxInactiveTime, sessionShouldEnd, navigate]);

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">HWI</h1>
      </div>
      <nav className="header-right">
        <p>{inactiveTime}</p>
        <a href="/" className="nav-link">Home</a>
        <a href="/logs" className="nav-link">Logs</a>
        <a href="/login" className="nav-link logout">Logout</a>
      </nav>
    </header>
  );
}

export default Header;
