import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [data, setData] = useState({ temperature: 0, humidity: 0 });

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8000/data")
        .then(res => res.json())
        .then(setData);
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: 'Arial', textAlign: 'center' }}>
      <h2>Anurag University IoT Dashboard</h2>
      <p><strong>Temperature:</strong> {data.temperature} °C</p>
      <p><strong>Humidity:</strong> {data.humidity} %</p>
    </div>
  );
}

export default Dashboard;