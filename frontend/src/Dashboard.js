// Dashboard.js
import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadialBarChart, RadialBar, PieChart, Pie, Cell,
} from "recharts";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [latest, setLatest] = useState({ temperature: 0, humidity: 0 });
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch("http://localhost:8000/device/latest");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const json = await res.json();
        setLatest(json);
        setError(null);
      } catch (err) {
        setError(`⚠️ Unable to fetch latest data: ${err.message}`);
        console.error("Fetch latest data error:", err);
      }
    };
    fetchLatest();
    const interval = setInterval(fetchLatest, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://localhost:8000/device/history");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const json = await res.json();
        const now = new Date();
        const dataWithTime = json.map((item, idx) => {
          const time = new Date(now - (json.length - idx - 1) * 5000);
          return { ...item, time: time.toLocaleTimeString() };
        });
        setHistory(dataWithTime);
        setError(null);
      } catch (err) {
        setError(`⚠️ Unable to fetch historical data: ${err.message}`);
        console.error("Fetch historical data error:", err);
      }
    };
    fetchHistory();
    const interval = setInterval(fetchHistory, 15000);
    return () => clearInterval(interval);
  }, []);

  const pieData = [
    { name: "Temperature", value: latest.temperature || 0, fill: "#8884d8" },
    { name: "Humidity", value: latest.humidity || 0, fill: "#82ca9d" },
  ];

  return (
    <div style={{ padding: 30, fontFamily: "Arial", maxWidth: 900, margin: "auto" }}>
      <h2>📡 Live IoT Dashboard</h2>

      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: 20,
          padding: "8px 16px",
          borderRadius: 6,
          border: "none",
          backgroundColor: "#0a192f",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        🔙 Back to About
      </button>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <p><strong>Temperature:</strong> {latest.temperature} °C</p>
          <p><strong>Humidity:</strong> {latest.humidity} %</p>

          <h3>📈 Temperature & Humidity Trends</h3>
          <LineChart
            width={850}
            height={300}
            data={history}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
          </LineChart>

          <h3>🧭 Current Readings Overview</h3>
          <RadialBarChart
            width={400}
            height={250}
            cx="50%" cy="50%"
            innerRadius="20%" outerRadius="90%"
            barSize={15}
            data={pieData}
            startAngle={180} endAngle={0}
          >
            <RadialBar minAngle={15} label background clockWise dataKey="value" />
            <Legend iconSize={10} width={120} height={40} layout="horizontal" verticalAlign="bottom" align="center" />
            <Tooltip />
          </RadialBarChart>

          <h3>🥧 Temperature vs Humidity</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%" cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          <h3>🧾 Live Data Table </h3>
          <h4>(Last 20 Readings)</h4>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: 20,
              fontFamily: "Arial",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <thead style={{ backgroundColor: "#0a192f", color: "#fff" }}>
              <tr>
                <th style={{ padding: 10 }}>#</th>
                <th style={{ padding: 10 }}>Time</th>
                <th style={{ padding: 10 }}>Temperature (°C)</th>
                <th style={{ padding: 10 }}>Humidity (%)</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                    textAlign: "center",
                  }}
                >
                  <td style={{ padding: 8 }}>{index + 1}</td>
                  <td style={{ padding: 8 }}>{item.time}</td>
                  <td style={{ padding: 8 }}>{item.temperature}</td>
                  <td style={{ padding: 8 }}>{item.humidity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
