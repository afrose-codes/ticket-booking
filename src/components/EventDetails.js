import React from "react";

function EventDetails({ available }) {
  return (
    <div>
      <h2>Technical Fest</h2>
      <p><b>Department:</b> CSE-AIDS</p>
      <p><b>Date:</b> 2026-05-01</p>
      <p><b>Time:</b> 10:00 AM</p>
      <p><b>Venue:</b> Auditorium</p>
      <p><b>Ticket Price:</b> ₹500</p>
      <p><b>Available Tickets:</b> {available}</p>
    </div>
  );
}

export default EventDetails;