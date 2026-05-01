import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import BookingsPage from "./pages/BookingsPage";
import ConfirmPage from "./pages/ConfirmPage"; // 🔥 NEW

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/confirm" element={<ConfirmPage />} /> {/* 🔥 NEW */}
      </Routes>
    </Router>
  );
}

export default App;