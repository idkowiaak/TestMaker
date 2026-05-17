import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsVerifying(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.role === requiredRole) {
          setIsValid(true);
        }
      } catch (error) {
        setIsValid(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [token, requiredRole]);

  if (isVerifying) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Weryfikacja uprawnień...
      </div>
    );
  }

  return isValid ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
