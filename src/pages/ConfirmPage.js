import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return (
      <div className="container">
        <h2>Error</h2>
        <p>No booking data found</p>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Booking Confirmed 🎉</h2>

      <p><b>Name:</b> {data.name}</p>
      <p><b>Email:</b> {data.email}</p>
      <p><b>Event:</b> {data.eventName}</p>
      <p><b>Tickets:</b> {data.tickets}</p>
      <p><b>Total Amount:</b> ₹{data.total}</p>

      <button onClick={() => navigate("/home")}>
        Back to Home
      </button>
    </div>
  );
}

export default ConfirmPage;