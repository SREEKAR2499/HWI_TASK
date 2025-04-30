import React, { useState, useEffect } from "react";
import './logs.css';

function Logs() {
  const routes = [
    { method: "GET", path: "/get-all-users" },
    { method: "POST", path: "/login" },
    { method: "POST", path: "/logout" },
    { method: "POST", path: "/get-user-email-and-status" },
    { method: "POST", path: "/add-user" },
    { method: "PUT", path: "/change-password" },
    { method: "PUT", path: "/update-user-profile" },
    { method: "PUT", path: "/update-user" },
    { method: "PUT", path: "/delete-selected-users" },
    { method: "POST", path: "/send-password-reset-link" },
    { method: "GET", path: "/get-all-parameters" },
    { method: "POST", path: "/get-polygon-parameters" },
    { method: "POST", path: "/add-parameter" },
    { method: "PUT", path: "/update-parameter" },
    { method: "DELETE", path: "/delete-selected-parameters" },
    { method: "GET", path: "/get-unique-values-for-string-parameters" },
    { method: "GET", path: "/get-all-polygons" },
    { method: "POST", path: "/get-polygons-for-user" },
    { method: "POST", path: "/add-polygon" },
    { method: "PUT", path: "/update-polygon" },
    { method: "DELETE", path: "/delete-selected-polygons" },
    { method: "GET", path: "/polygons" },
    { method: "POST", path: "/update-polygon-access" },
    { method: "POST", path: "/active-polygons" }
  ];

  const [currentRoute, setCurrentRoute] = useState("");
  const [logMessages, setLogMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRandomRoute = async () => {
      const { method, path } = routes[Math.floor(Math.random() * routes.length)];
      setCurrentRoute(`${method} ${path}`);

      try {
        const response = await fetch(`https://hwi-task-backend.vercel.app${path}`, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: ['POST', 'PUT', 'DELETE'].includes(method) ? JSON.stringify({}) : null
        });

        const data = await response.json();
        setLogMessages(prev => [
          `[✔️] ${method} ${path}: ${JSON.stringify(data)}`,
          ...prev
        ]);
      } catch (error) {
        setLogMessages(prev => [
          `[❌] ${method} ${path}: ${error.message}`,
          ...prev
        ]);
      }
    };

    const interval = setInterval(fetchRandomRoute, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logMessages.filter(log =>
    log.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="logs-parent">
      <h1>Logs</h1>
      <h3>Currently fetching: {currentRoute || "Starting..."}</h3>

      <input
        type="text"
        placeholder="Search logs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="log-search"
      />

      <div className="logs-container">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((msg, idx) => <p key={idx}>{msg}</p>)
        ) : (
          <p>No logs match your search.</p>
        )}
      </div>
    </div>
  );
}

export default Logs;
