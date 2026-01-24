// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { FaHistory, FaCalendarAlt, FaMapMarkerAlt, FaThermometerHalf } from 'react-icons/fa';

// const History = () => {
//   const [queries, setQueries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       // In a real app, you would fetch from your API
//       // const response = await axios.get('http://localhost:5000/api/history');
//       // setQueries(response.data);
      
//       // For demo, using localStorage
//       const savedQueries = localStorage.getItem('cropQueries');
//       if (savedQueries) {
//         setQueries(JSON.parse(savedQueries));
//       }
//     } catch (error) {
//       console.error('Error fetching history:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="page">
//       <h1 className="page-title">
//         <FaHistory /> Query History
//       </h1>
      
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="history-container"
//       >
//         {loading ? (
//           <div className="loading">Loading history...</div>
//         ) : queries.length > 0 ? (
//           <div className="queries-list">
//             {queries.map((query, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="query-card"
//               >
//                 <div className="query-header">
//                   <div className="query-meta">
//                     <span className="query-location">
//                       <FaMapMarkerAlt /> {query.location}
//                     </span>
//                     <span className="query-date">
//                       <FaCalendarAlt /> {formatDate(query.timestamp)}
//                     </span>
//                   </div>
//                   <div className="query-conditions">
//                     <span className="condition">
//                       <FaThermometerHalf /> {query.temperature}°C
//                     </span>
//                     <span className="condition">
//                       <FaThermometerHalf /> {query.humidity}% Humidity
//                     </span>
//                     <span className="condition">
//                       <FaThermometerHalf /> {query.rainfall}mm Rain
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="query-results">
//                   <h4>Recommended Crops:</h4>
//                   <div className="crops-list">
//                     {query.recommendedCrops.map((crop, idx) => (
//                       <div key={idx} className="crop-result">
//                         <span className="crop-name">{crop.name}</span>
//                         <span className="crop-confidence">{crop.confidence}% Match</span>
//                         <p className="crop-reason">{crop.reason}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <div className="no-history">
//             <FaHistory size={100} color="#ddd" />
//             <h3>No Query History</h3>
//             <p>Your crop recommendation queries will appear here.</p>
//           </div>
//         )}
//       </motion.div>

//       <style jsx>{`
//         .history-container {
//           max-width: 1000px;
//           margin: 0 auto;
//         }
        
//         .queries-list {
//           display: flex;
//           flex-direction: column;
//           gap: 2rem;
//         }
        
//         .query-card {
//           background: white;
//           border-radius: 20px;
//           padding: 2rem;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//         }
        
//         .query-header {
//           border-bottom: 2px solid #e0e6ed;
//           padding-bottom: 1rem;
//           margin-bottom: 1.5rem;
//         }
        
//         .query-meta {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 1rem;
//           flex-wrap: wrap;
//           gap: 1rem;
//         }
        
//         .query-location, .query-date {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           color: #666;
//         }
        
//         .query-conditions {
//           display: flex;
//           gap: 1rem;
//           flex-wrap: wrap;
//         }
        
//         .condition {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           background: #f8f9fa;
//           padding: 0.5rem 1rem;
//           border-radius: 10px;
//           color: #2d5a5f;
//           font-weight: 500;
//         }
        
//         .query-results h4 {
//           color: #2d5a5f;
//           margin-bottom: 1rem;
//         }
        
//         .crops-list {
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//         }
        
//         .crop-result {
//           background: #f8f9fa;
//           padding: 1rem;
//           border-radius: 10px;
//           border-left: 4px solid #4CAF50;
//         }
        
//         .crop-result .crop-name {
//           font-weight: 600;
//           color: #2d5a5f;
//           margin-right: 1rem;
//         }
        
//         .crop-result .crop-confidence {
//           background: #4CAF50;
//           color: white;
//           padding: 0.25rem 0.75rem;
//           border-radius: 20px;
//           font-size: 0.9rem;
//           font-weight: 600;
//         }
        
//         .crop-reason {
//           color: #666;
//           font-size: 0.9rem;
//           margin-top: 0.5rem;
//         }
        
//         .loading, .no-history {
//           text-align: center;
//           padding: 3rem;
//           color: #666;
//         }
        
//         .no-history {
//           background: white;
//           border-radius: 20px;
//           padding: 4rem;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//         }
        
//         .no-history h3 {
//           color: #2d5a5f;
//           margin: 1rem 0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default History;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const History = () => {
//   const navigate = useNavigate();

//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       const res = await fetch("http://localhost:5000/api/history", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       const data = await res.json();
//       setHistory(data);
//     };

//     fetchHistory();
//   }, []);

//   <button
//   onClick={() => navigate("/")}
//   style={{
//     marginBottom: "1.5rem",
//     padding: "10px 18px",
//     borderRadius: "8px",
//     border: "none",
//     background: "linear-gradient(135deg, #10B981, #34D399)",
//     color: "white",
//     fontWeight: "600",
//     cursor: "pointer",
//   }}
// >
//   ← Back to Home
// </button>

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>⏱️ Search History</h2>

//       {history.length === 0 ? (
//         <p>No activity found</p>
//       ) : (
//         history.map((item) => (
//           <div
//             key={item._id}
//             style={{
//               background: "#f1f5f9",
//               padding: "1rem",
//               marginBottom: "1rem",
//               borderRadius: "10px",
//             }}
//           >
//             <p><strong>Type:</strong> {item.type}</p>
//             <p><strong>Query:</strong> {item.query}</p>
//             <p>
//               <strong>Date:</strong>{" "}
//               {new Date(item.createdAt).toLocaleString()}
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default History;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUserFromToken } from "../utils/auth";

// const History = () => {
//   const navigate = useNavigate();
//   const user = getUserFromToken();

//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//    useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       const res = await fetch("http://localhost:5000/api/history", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       const data = await res.json();
//       setHistory(data);
//     };

//     fetchHistory();
//   }, []);

//   return (
//     <div style={{ padding: "2rem" }}>
//       {/* ✅ BACK TO HOME BUTTON */}
//       <button
//         onClick={() => navigate("/")}
//         style={{
//           marginBottom: "1.5rem",
//           padding: "10px 18px",
//           borderRadius: "8px",
//           border: "none",
//           background: "linear-gradient(135deg, #10B981, #34D399)",
//           color: "white",
//           fontWeight: "600",
//           cursor: "pointer",
//         }}
//       >
//         ← Back to Home
//       </button>

//       <h2>⏱️ Search History</h2>

//       {history.length === 0 ? (
//         <p>No activity found</p>
//       ) : (
//         history.map((item) => (
//           <div
//             key={item._id}
//             style={{
//               background: "#f1f5f9",
//               padding: "1rem",
//               marginBottom: "1rem",
//               borderRadius: "10px",
//             }}
//           >
//             <p><strong>Type:</strong> {item.type}</p>
//             <p><strong>Query:</strong> {item.query}</p>
//             <p>
//               <strong>Date:</strong>{" "}
//               {new Date(item.createdAt).toLocaleString()}
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default History;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

const History = () => {
  const navigate = useNavigate();
  const user = getUserFromToken();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Protect route
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // 📜 Fetch user history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error(err);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (!user) return null;

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
      {/* BACK TO HOME */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "1.5rem",
          padding: "10px 18px",
          borderRadius: "8px",
          border: "none",
          background: "linear-gradient(135deg, #10B981, #34D399)",
          color: "white",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        ← Back to Home
      </button>

      <h2 style={{ marginBottom: "1.5rem" }}>⏱️ Previous Searches</h2>

      {/* LOADING */}
      {loading && <p>Loading history...</p>}

      {/* NO HISTORY */}
      {!loading && history.length === 0 && (
        <div
          style={{
            background: "#f8fafc",
            padding: "2rem",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h3>No search history found</h3>
          <p>Your weather & crop searches will appear here.</p>
        </div>
      )}

      {/* HISTORY LIST */}
      {!loading &&
        history.map((item) => (
          <div
            key={item._id}
            style={{
              background: "#f1f5f9",
              padding: "1.2rem",
              marginBottom: "1rem",
              borderRadius: "12px",
              boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
            }}
          >
            <p>
              <strong>Search Type:</strong>{" "}
              {item.type === "weather" ? "🌤️ Weather" : "🌾 Crop Recommendation"}
            </p>

            <p>
              <strong>Search Query:</strong>{" "}
              <span style={{ color: "#0f766e" }}>{item.query}</span>
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
    </div>
  );
};

export default History;


