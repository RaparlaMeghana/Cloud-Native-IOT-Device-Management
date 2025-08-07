import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const [expanded, setExpanded] = useState({
    about: false,
    objectives: false,
    tech: false,
    features: false,
    usecases: false,
    team: false,
    future: false,
    conclusion: false,
  });

  const toggle = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sectionStyle = {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#e3f2fd",
    borderRadius: 8,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    userSelect: "none",
  };

  const contentStyle = (isOpen) => ({
    maxHeight: isOpen ? "600px" : "0px",
    overflow: "auto",
    transition: "max-height 0.5s ease",
    color: "#102027",
    fontSize: 16,
    lineHeight: 1.6,
    marginTop: 12,
  });

  const arrowStyle = (isOpen) => ({
    fontSize: 22,
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.3s ease",
    marginLeft: 10,
  });

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "auto",
        padding: 30,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f0f8ff",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <header
        style={{
          backgroundColor: "#0a192f",
          color: "#fff",
          padding: 30,
          textAlign: "center",
          borderRadius: "12px 12px 0 0",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: 10 }}>
          Cloud Native IoT Device Management
        </h1>
        <h2>SenseVerse</h2>
        <h3 style={{ fontWeight: 400, opacity: 0.85 }}>
          Mini Project by CSE - Q Team 7, Anurag University
        </h3>
      </header>

      {/* All Expandable Sections */}
      {[
        {
          key: "about",
          title: "📘 About the Project",
          content: `This project demonstrates a cloud-native IoT solution to monitor and visualize real-time data from smart devices. It utilizes FastAPI, ReactJS, Recharts, and Docker to simulate or integrate real sensor readings into an interactive and scalable system.`,
        },
        {
          key: "objectives",
          title: "🎯 Objectives",
          content: (
            <ul>
              <li>Enable real-time data collection and streaming.</li>
              <li>Simulate or ingest sensor data and monitor it on the web.</li>
              <li>Showcase cloud-native microservice architecture.</li>
              <li>Use auto-refresh logic for up-to-date visualization.</li>
            </ul>
          ),
        },
        {
          key: "tech",
          title: "🛠️ Technologies Used",
          content: (
            <ul>
              <li><strong>Frontend:</strong> ReactJS + Recharts</li>
              <li><strong>Backend:</strong> FastAPI (Python)</li>
              <li><strong>Communication:</strong> REST APIs</li>
              <li><strong>Deployment:</strong> Docker</li>
            </ul>
          ),
        },
        {
          key: "features",
          title: "📦 Key Features",
          content: (
            <ul>
              <li>Simulated IoT sensor sending data every 5s</li>
              <li>FastAPI backend serving endpoints for latest and history</li>
              <li>Live updating charts (Line, Pie, Gauge)</li>
              <li>Auto-scrollable table of recent 20 readings</li>
              <li>Responsive design with expandable sections</li>
            </ul>
          ),
        },
        {
          key: "usecases",
          title: "📈 Real-World Applications",
          content: (
            <ul>
              <li>🏭 Industrial IoT dashboards</li>
              <li>🏫 Smart campus lab environment monitoring</li>
              <li>🏥 Real-time health monitoring (vitals, air quality)</li>
              <li>🏠 Smart home sensor control (temperature/humidity)</li>
            </ul>
          ),
        },
        {
          key: "team",
          title: "👥 Team Contributions",
          content: (
            <ul>
              <li>Backend: API logic, simulation script</li>
              <li>Frontend: UI/UX, chart integration</li>
              <li>Docker: Container setup and deployment-ready architecture</li>
              <li>Docs: Report, viva prep, PPT</li>
            </ul>
          ),
        },
        {
          key: "future",
          title: "🔮 Future Enhancements",
          content: (
            <ul>
              <li>Integration with real devices via MQTT</li>
              <li>Database for persistent logging (MongoDB, PostgreSQL)</li>
              <li>Email/SMS alerts for threshold breach</li>
              <li>Mobile support + user authentication</li>
            </ul>
          ),
        },
        {
          key: "conclusion",
          title: "📝 Conclusion",
          content: `This project is a compact yet powerful demonstration of how cloud-native principles can be applied to real-time IoT monitoring. It delivers a scalable, interactive, and educational system that can evolve with physical devices or more complex use cases.`,
        },
      ].map(({ key, title, content }) => (
        <section
          key={key}
          style={sectionStyle}
          onClick={() => toggle(key)}
        >
          <h2 style={{ color: "#0a192f", display: "flex", justifyContent: "space-between" }}>
            {title}
            <span style={arrowStyle(expanded[key])}>▼</span>
          </h2>
          <div style={contentStyle(expanded[key])}>{content}</div>
        </section>
      ))}

      {/* Dashboard Navigation */}
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: 40,
          padding: "12px 24px",
          backgroundColor: "#0a192f",
          color: "white",
          border: "none",
          borderRadius: 6,
          fontSize: "16px",
          cursor: "pointer",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        📊 View Live IoT Dashboard
      </button>

      {/* Footer */}
      <footer style={{ marginTop: 50, textAlign: "center", color: "#555" }}>
        <p><strong>Submitted by:</strong> CSE - Q Team 7, Anurag University</p>
        <small>© 2025 All rights reserved.</small>
      </footer>
    </div>
  );
}
