// src/App.jsx
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./component/About"; // About Page Component
import Contact from "./component/Contact"; // Contact Page Component
import Footer from "./component/Footer"; // Footer Component
import HomePage from "./component/Homepage"; // HomePage Component
import Login from "./component/Login"; // Login Component
import Navbar from "./component/Navbar"; // Navbar Component
import Post from "./component/Post"; // Post Component

function App() {
  const [user, setUser] = useState(null); // Manage logged-in user state

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />{" "}
      {/* Navbar displayed on all pages */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Routes>
          {/* HomePage route */}
          <Route path="/" element={<HomePage />} />

          {/* Posts page accessible to everyone */}
          <Route
            path="/posts"
            element={<Post user={user} setUser={setUser} />} // Pass user and setUser to Post component
          />

          {/* About Page */}
          <Route path="/about" element={<About />} />

          {/* Contact Page */}
          <Route path="/contact" element={<Contact />} />

          {/* Login page */}
          <Route
            path="/login"
            element={<Login setUser={setUser} />} // Pass setUser to Login component
          />
        </Routes>
        <Footer /> {/* Footer displayed on all pages */}
      </div>
    </Router>
  );
}

export default App;
