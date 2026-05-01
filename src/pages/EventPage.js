import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Event data
  const events = {
    1: {
      name: "Technical Fest 2026",
      dept: "CSE-AIDS Department",
      date: "10 May 2026",
      time: "10:00 AM - 4:00 PM",
      venue: "Innovation Lab, Block B",
      price: 500,
      available: 50,
    },
    2: {
      name: "AI & ML Seminar",
      dept: "Information Technology Department",
      date: "15 May 2026",
      time: "11:00 AM - 2:00 PM",
      venue: "Seminar Hall 3, Tech Block",
      price: 300,
      available: 40,
    },
  };

  const event = events[id];

  // Dynamic tickets
  const [availableTickets, setAvailableTickets] = useState(event.available);

  // Booking states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState(1);
  const [message, setMessage] = useState("");

  const handleBooking = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || tickets <= 0) {
      setMessage("Please fill all fields correctly");
      return;
    }

    if (!emailPattern.test(email)) {
      setMessage("Invalid email format");
      return;
    }

    if (tickets > availableTickets) {
      setMessage("Not enough tickets available");
      return;
    }

    // Reduce tickets
    setAvailableTickets(availableTickets - tickets);

    const total = tickets * event.price;

    // 🔥 SEND DATA TO DATABASE
    fetch("http://localhost:3001/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        eventName: event.name,
        tickets,
        total,
      }),
    })
      .then((res) => res.text())
      .then((data) => console.log("Server:", data))
      .catch((err) => console.log("Error:", err));

    // Navigate to confirmation page
    navigate("/confirm", {
      state: {
        name,
        email,
        tickets,
        eventName: event.name,
        total,
      },
    });
  };

  return (
    <div className="container fade-in"> {/* ✅ FIXED */}
      <h2>{event.name}</h2>

      <p><b>Department:</b> {event.dept}</p>
      <p><b>Date:</b> {event.date}</p>
      <p><b>Time:</b> {event.time}</p>
      <p><b>Venue:</b> {event.venue}</p>
      <p><b>Price:</b> ₹{event.price}</p>
      <p><b>Available Tickets:</b> {availableTickets}</p>

      <h3>Book Tickets</h3>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="number"
        min="1"
        value={tickets}
        onChange={(e) => setTickets(Number(e.target.value))}
      />

      <button onClick={handleBooking}>
        Book
      </button>

      {/* Message */}
      {message && (
        <p className="error">{message}</p>
      )}

      <br />

      <button onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
}

export default EventPage;