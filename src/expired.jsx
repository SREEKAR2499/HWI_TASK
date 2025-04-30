import React from "react";
import { Link } from "react-router-dom";
import "./ExpiryPage.css"; // Make sure this path matches your folder structure

function ExpiryPage() {
  return (
    <div className="expiry-container">
      <div className="expiry-card">
        <h2>Link Expired</h2>
        <p>Oops! The password reset link you used has expired.</p>
        <p>Please request a new password reset email to continue.</p>
        <Link to="/" className="home-link">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ExpiryPage;
