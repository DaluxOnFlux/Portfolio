import React, { useState, useEffect } from "react";

const StatusBadge = () => {
  const [ping, setPing] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [uptime, setUptime] = useState(99.9);

  useEffect(() => {
    const checkStatus = async () => {
      const start = performance.now();
      try {
        // Ajout d'un paramètre aléatoire pour éviter le cache navigateur (cache-busting)
        await fetch(`${window.location.origin}?t=${Date.now()}`, {
          method: "HEAD",
          mode: "no-cors",
          cache: "no-store",
        });
        const end = performance.now();
        setPing(Math.round(end - start));
        setIsOnline(true);
      } catch (e) {
        console.error("L'infra semble hors-ligne");
        setIsOnline(false);
        setPing(null);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Petite logique : si isOnline passe à false, on baisse l'uptime
    if (!isOnline) {
      setUptime((prev) => (parseFloat(prev) - 0.001).toFixed(3));
    }
  }, [isOnline]);

  return (
    <div className="status-badge-container">
      <div className="status-dot-wrapper">
        <div
          className="status-dot"
          style={{ backgroundColor: isOnline ? "#22c55e" : "#ef4444" }}
        ></div>
        {isOnline && <div className="status-dot-pulse"></div>}
      </div>

      <div className="status-info">
        <span className="status-text">
          <span className="status-label">INFRA:</span>{" "}
          {isOnline ? "ONLINE" : "OFFLINE"}
        </span>
        <span className="status-divider">|</span>
        <span className="status-text">
          <span className="status-label">PING:</span>{" "}
          {ping !== null ? `${ping}ms` : "--"}
        </span>
        <span className="status-divider">|</span>
        <span className="status-text">
          {/* MODIFICATION ICI : On utilise la variable uptime dynamique */}
          <span className="status-label">UPTIME:</span> {uptime}%
        </span>
      </div>
    </div>
  );
};

export default StatusBadge;
