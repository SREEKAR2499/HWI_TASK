import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

function HomePage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const handleGenerateLink = () => {
    if (!date || !time) {
      alert("Please select both date and time!");
      return;
    }

    // Combine date and time into a single string
    const dateTimeString = `${date}T${time}:00`; // "2025-04-26T18:00:00"
    const timestamp = new Date(dateTimeString).getTime();

    if (isNaN(timestamp)) {
      alert("Invalid date or time");
      return;
    }

    navigate(`/reset?till=${timestamp}`);
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Generate Reset Link</h1>
        <div className="form-group">
          <label>Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Select Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <button onClick={handleGenerateLink}>Generate Link</button>
      </div>
    </div>
  );
}

export default HomePage;
