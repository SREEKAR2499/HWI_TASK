import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ResetPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const till = queryParams.get("till");

  const [isValid, setIsValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (till) {
      const expiryTime = Number(till);
      const currentTime = Date.now();

      if (currentTime > expiryTime) {
        setIsValid(false);
        navigate("/expired");
      }
    } else {
      navigate("/expired");
    }
  }, [till, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // TODO: Call backend API to update password
    alert("Password reset successful!");
  };

  return isValid ? (
    <div className="reset-container">
      <div className="reset-card">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  ) : null;
}

export default ResetPage;
