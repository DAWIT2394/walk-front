import React, { useState } from "react";
import axios from "axios";
import { FaFacebook, FaTwitter, FaYoutube, FaTiktok, FaWhatsapp } from "react-icons/fa"; // added FaWhatsapp

// import local images
import logo from "../assets/logo.jpg";

function Home() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    age: "",
    gender: "",
    meetupArea: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://walk-talk-inspire-backend.onrender.com/api/registrations",
        form
      );
      alert("Registration submitted!");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        message: "",
        age: "",
        gender: "",
        meetupArea: ""
      });
    } catch (err) {
      console.error(err);
      alert("Error submitting registration");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage: `url(${"https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
    },
    card: {
      background: "rgba(255,255,255,0.9)",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      width: "100%",
      maxWidth: "500px",
    },
    logo: {
      display: "block",
      margin: "0 auto 20px auto",
      maxWidth: "150px",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "8px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      width: "100%",
      padding: "10px",
      background: "#3B82F6",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
    },
    socialContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "15px",
      gap: "15px",
    },
    icon: {
      fontSize: "25px",
      color: "#3B82F6",
      cursor: "pointer",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <img src={logo} alt="Walk Talk Inspire Logo" style={styles.logo} />
        <h2 style={styles.title}>Walk Talk Inspire</h2>

        <input
          style={styles.input}
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <input
          style={styles.input}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          style={styles.input}
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          style={styles.input}
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <select
          style={styles.input}
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <input
          style={styles.input}
          name="meetupArea"
          value={form.meetupArea}
          onChange={handleChange}
          placeholder="Meet-up Area"
        />
        <textarea
          style={styles.input}
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
        />
        <button style={styles.button} type="submit">
          Submit
        </button>

        {/* Social Media Icons */}
        <div style={styles.socialContainer}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook style={styles.icon} />
          </a>
          <a href="https://x.com/danhailuend?t=JmaU9ql-6vzwYipgbotSXA&s=09" target="_blank" rel="noopener noreferrer">
            <FaTwitter style={styles.icon} />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube style={styles.icon} />
          </a>
          <a href="https://www.tiktok.com/@danvision2?_t=ZM-8zBIAWhNhK9&_r=1" target="_blank" rel="noopener noreferrer">
            <FaTiktok style={styles.icon} />
          </a>
          <a href="https://chat.whatsapp.com/ETwKBlP37lO2oWOj7OiIkS?mode=ems_copy_t" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp style={{ ...styles.icon, color: "green" }} /> {/* WhatsApp icon in green */}
          </a>
        </div>
      </form>
    </div>
  );
}

export default Home;
