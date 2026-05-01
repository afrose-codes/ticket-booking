import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // 👤 Get logged-in user
  const user = localStorage.getItem("user");

  // 🚪 Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container fade-in">
      
      <h2>Event List</h2>

      {/* 👤 Show user */}
      <p><b>Logged in as:</b> {user}</p>

      <br />

      {/* 🎟 Events */}
      <button onClick={() => navigate("/event/1")}>
        🎉 Technical Fest
      </button>

      <br /><br />

      <button onClick={() => navigate("/event/2")}>
        🎓 Seminar
      </button>

      <br /><br />

      {/* 🛠 Admin */}
      <button onClick={() => navigate("/bookings")}>
        🧑‍💼 Admin Dashboard
      </button>

      <br /><br />

      {/* 🔙 Logout */}
      <button onClick={handleLogout}>
        🚪 Logout
      </button>

    </div>
  );
}

export default Home;