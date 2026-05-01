import React, { useState } from "react";

function BookingForm({ available, onBook }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name || !email || tickets <= 0) {
      setError("All fields are required and tickets must be positive");
      setSuccess("");
      return;
    }

    if (tickets > available) {
      setError("Not enough tickets available");
      setSuccess("");
      return;
    }

    // Booking success
    setError("");
    onBook({ name, email, tickets: Number(tickets) });
    setSuccess("Booking successful!");

    // Reset form
    setName("");
    setEmail("");
    setTickets(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Book Tickets</h3>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />

      <input
        type="number"
        value={tickets}
        onChange={(e) => setTickets(e.target.value)}
      /><br />

      <button type="submit">Book</button>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Success Message */}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}

export default BookingForm;