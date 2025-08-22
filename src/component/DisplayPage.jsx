import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function DisplayPage() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Backend URL
  const API_URL = "https://walk-talk-inspire-backend.onrender.com";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/registrations`);
      setRegistrations(res.data);
    } catch (err) {
      console.error("Error fetching registrations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/registrations/${id}`);
      setRegistrations((prev) => prev.filter((reg) => reg._id !== id));
    } catch (err) {
      console.error("Error deleting registration:", err);
    }
  };

  const handleEdit = (reg) => {
    setEditingId(reg._id);
    setEditForm({ ...reg });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/api/registrations/${editingId}`, editForm);
      setRegistrations((prev) =>
        prev.map((reg) => (reg._id === editingId ? editForm : reg))
      );
      setEditingId(null);
    } catch (err) {
      console.error("Error updating registration:", err);
    }
  };

  // Pie Chart Data
  const ageGroups = registrations.reduce((acc, reg) => {
    if (!reg.age) return acc;
    const age = parseInt(reg.age, 10);
    let group =
      age < 18
        ? "Under 18"
        : age <= 30
        ? "18-30"
        : age <= 45
        ? "31-45"
        : age <= 60
        ? "46-60"
        : "60+";
    acc[group] = (acc[group] || 0) + 1;
    return acc;
  }, {});
  const ageData = Object.entries(ageGroups).map(([name, value]) => ({ name, value }));

  const genderGroups = registrations.reduce((acc, reg) => {
    if (!reg.gender) return acc;
    acc[reg.gender] = (acc[reg.gender] || 0) + 1;
    return acc;
  }, {});
  const genderData = Object.entries(genderGroups).map(([name, value]) => ({ name, value }));

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  // Styles
  const styles = {
    container: {
      minHeight: "100vh",
      padding: "20px",
      background: "linear-gradient(to right, #3B82F6, #10B981)",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      margin: "20px auto",
      overflowX: "auto",
      width: "100%",
      maxWidth: "1200px",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    chartsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
      marginTop: "30px",
    },
    chartBox: {
      flex: "1 1 300px",
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "800px",
    },
    th: {
      background: "#3B82F6",
      color: "#fff",
      padding: "10px",
      textAlign: "left",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #ccc",
      wordWrap: "break-word",
    },
    button: {
      marginRight: "5px",
      padding: "5px 10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    editBtn: { background: "#F59E0B", color: "#fff" },
    deleteBtn: { background: "#EF4444", color: "#fff" },
    saveBtn: { background: "#10B981", color: "#fff" },
    cancelBtn: { background: "#6B7280", color: "#fff" },
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={styles.container}>
      {/* Table */}
      <div style={styles.card}>
        <h2 style={styles.title}>Registered Participants</h2>
        {registrations.length === 0 ? (
          <p style={{ textAlign: "center" }}>No registrations found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Full Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Age</th>
                  <th style={styles.th}>Gender</th>
                  <th style={styles.th}>Meet-up Area</th>
                  <th style={styles.th}>Message</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg._id}>
                    {editingId === reg._id ? (
                      <>
                        <td style={styles.td}>
                          <input type="text" name="fullName" value={editForm.fullName} onChange={handleChange} />
                        </td>
                        <td style={styles.td}>
                          <input type="email" name="email" value={editForm.email} onChange={handleChange} />
                        </td>
                        <td style={styles.td}>
                          <input type="text" name="phone" value={editForm.phone} onChange={handleChange} />
                        </td>
                        <td style={styles.td}>
                          <input type="number" name="age" value={editForm.age} onChange={handleChange} />
                        </td>
                        <td style={styles.td}>
                          <input type="text" name="gender" value={editForm.gender} onChange={handleChange} />
                        </td>
                        <td style={styles.td}>
                          <input type="text" name="meetupArea" value={editForm.meetupArea} onChange={handleChange} />
                        </td>
                        <td style={styles.td}>
                          <input type="text" name="message" value={editForm.message} onChange={handleChange} />
                        </td>
                        <td style={styles.td}>
                          <button style={{ ...styles.button, ...styles.saveBtn }} onClick={handleUpdate}>Save</button>
                          <button style={{ ...styles.button, ...styles.cancelBtn }} onClick={() => setEditingId(null)}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={styles.td}>{reg.fullName}</td>
                        <td style={styles.td}>{reg.email}</td>
                        <td style={styles.td}><a href={`tel:${reg.phone}`}>{reg.phone}</a></td>
                        <td style={styles.td}>{reg.age}</td>
                        <td style={styles.td}>{reg.gender}</td>
                        <td style={styles.td}>{reg.meetupArea}</td>
                        <td style={styles.td}>{reg.message}</td>
                        <td style={styles.td}>
                          <button style={{ ...styles.button, ...styles.editBtn }} onClick={() => handleEdit(reg)}>Edit</button>
                          <button style={{ ...styles.button, ...styles.deleteBtn }} onClick={() => handleDelete(reg._id)}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Charts */}
      <div style={styles.chartsContainer}>
        <div style={styles.chartBox}>
          <h3 style={{ textAlign: "center" }}>Age Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={ageData} cx="50%" cy="50%" outerRadius="80%" dataKey="value" label>
                {ageData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartBox}>
          <h3 style={{ textAlign: "center" }}>Gender Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={genderData} cx="50%" cy="50%" outerRadius="80%" dataKey="value" label>
                {genderData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default DisplayPage;
