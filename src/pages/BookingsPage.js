import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookingsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔒 Protect page (admin only)
  useEffect(() => {
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (!user) {
      alert("Please login first");
      navigate("/");
      return;
    }

    if (role !== "admin") {
      alert("Access denied! Admin only");
      navigate("/home");
      return;
    }

    fetchData();
  }, []);

  // 📡 Fetch bookings
  const fetchData = () => {
    setLoading(true);
    fetch("http://localhost:3001/bookings")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load data");
        setLoading(false);
      });
  };

  // 🗑 Delete booking
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this booking?");
    if (!confirmDelete) return;

    fetch(`http://localhost:3001/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then(() => {
        // instant UI update (better UX)
        setData((prev) => prev.filter((b) => b.id !== id));
      })
      .catch((err) => console.log(err));
  };

  // 📥 Download CSV
  const downloadCSV = () => {
    if (data.length === 0) {
      alert("No data to download");
      return;
    }

    const headers = ["Name", "Email", "Event", "Tickets", "Total"];

    const rows = data.map((b) => [
      b.name,
      b.email,
      b.event,
      b.tickets,
      b.total,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "bookings.csv";
    link.click();
  };

  return (
    <div className="container fade-in">
      <h2>Admin Dashboard</h2>

      <p>Total Bookings: {data.length}</p>

      {/* Buttons */}
      <button onClick={() => navigate("/home")}>⬅ Back</button>
      <button onClick={downloadCSV}>📥 Download</button>

      {/* STATES */}
      {loading && <p>Loading bookings...</p>}
      {error && <p className="error">{error}</p>}

      {/* TABLE */}
      {!loading && data.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        !loading && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Event</th>
                <th>Tickets</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>{b.email}</td>
                  <td>{b.event}</td>
                  <td>{b.tickets}</td>
                  <td>₹{b.total}</td>
                  <td>
                    <button onClick={() => handleDelete(b.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}

export default BookingsPage;