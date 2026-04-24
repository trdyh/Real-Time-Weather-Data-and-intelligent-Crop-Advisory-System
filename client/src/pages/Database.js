// // // import { useEffect, useState } from "react";

// // // const Database = () => {
// // //   const [history, setHistory] = useState([]);

// // //   useEffect(() => {
// // //     const fetchHistory = async () => {
// // //       const token = localStorage.getItem("token");

// // //       const res = await fetch("http://localhost:5000/api/history", {
// // //         headers: {
// // //           Authorization: `Bearer ${token}`
// // //         }
// // //       });

// // //       const data = await res.json();
// // //       setHistory(data);
// // //     };

// // //     fetchHistory();
// // //   }, []);

// // //   return (
// // //     <div style={{ padding: "2rem" }}>
// // //       <h2>Your Search History</h2>

// // //       {history.length === 0 ? (
// // //         <p>No searches yet</p>
// // //       ) : (
// // //         history.map((item) => (
// // //           <div key={item._id} style={{
// // //             background: "#f8fafc",
// // //             padding: "1rem",
// // //             marginBottom: "1rem",
// // //             borderRadius: "12px"
// // //           }}>
// // //             <p><strong>Type:</strong> {item.type}</p>
// // //             <p><strong>Query:</strong> {item.query}</p>
// // //             <p><strong>Date:</strong> {new Date(item.createdAt).toLocaleString()}</p>
// // //           </div>
// // //         ))
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Database;

// // import { useEffect, useState } from "react";
// // import { getUserFromToken } from "../utils/auth";

// // const Database = () => {
// //   const user = getUserFromToken();
// //   const [history, setHistory] = useState([]);

// //   useEffect(() => {
// //     const fetchHistory = async () => {
// //       const res = await fetch("http://localhost:5000/api/history", {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`
// //         }
// //       });
// //       const data = await res.json();
// //       setHistory(data);
// //     };
// //     fetchHistory();
// //   }, []);

// //   return (
// //     <div style={{ padding: "2rem" }}>
// //       <h2>User Database</h2>

// //       {/* USER INFO */}
// //       <div style={{
// //         background: "#ecfdf5",
// //         padding: "1rem",
// //         borderRadius: "10px",
// //         marginBottom: "1.5rem"
// //       }}>
// //         <p><strong>Email:</strong> {user?.email}</p>
// //         <p><strong>User ID:</strong> {user?.userId}</p>
// //       </div>

// //       {/* HISTORY */}
// //       <h3>Search History</h3>

// //       {history.length === 0 ? (
// //         <p>No searches yet</p>
// //       ) : (
// //         history.map(item => (
// //           <div key={item._id} style={{
// //             background: "#f8fafc",
// //             padding: "1rem",
// //             marginBottom: "1rem",
// //             borderRadius: "10px"
// //           }}>
// //             <p><strong>Type:</strong> {item.type}</p>
// //             <p><strong>Query:</strong> {item.query}</p>
// //             <p><strong>Date:</strong> {new Date(item.createdAt).toLocaleString()}</p>
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );
// // };

// // export default Database;


// import { useEffect, useState } from "react";
// import { getUserFromToken } from "../utils/auth";

// const Database = () => {
//   const user = getUserFromToken();
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

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>User Database</h2>

//       {/* USER DETAILS */}
//       <div
//         style={{
//           background: "#ecfdf5",
//           padding: "1.5rem",
//           borderRadius: "12px",
//           marginBottom: "2rem",
//           maxWidth: "500px",
//         }}
//       >
//         <h3>Registered User Details</h3>

//         <p>
//           <strong>Email:</strong> {user?.email}
//         </p>

//         <p>
//           <strong>Password:</strong> ********
//         </p>

//         <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
//           (Password is hidden for security reasons)
//         </p>
//       </div>

//       {/* SEARCH HISTORY */}
//       <h3>Search History</h3>

//       {history.length === 0 ? (
//         <p>No searches yet</p>
//       ) : (
//         history.map((item) => (
//           <div
//             key={item._id}
//             style={{
//               background: "#f8fafc",
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

// export default Database;

// import { useEffect, useState } from "react";
// import { getUserFromToken } from "../utils/auth";
// import { useNavigate } from "react-router-dom";

// const Database = () => {
//   const user = getUserFromToken();
//   const navigate = useNavigate();

//   const [historyCount, setHistoryCount] = useState(0);

//   useEffect(() => {
//     const fetchHistoryCount = async () => {
//       const res = await fetch("http://localhost:5000/api/history", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const data = await res.json();
//       setHistoryCount(data.length);
//     };

//     fetchHistoryCount();
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
//       <h2>📂 User Database</h2>

//       {/* USER PROFILE */}
//       <div
//         style={{
//           background: "#ecfdf5",
//           padding: "1.5rem",
//           borderRadius: "12px",
//           maxWidth: "500px",
//           marginBottom: "2rem",
//         }}
//       >
//         <h3>👤 User Profile</h3>
//         <p><strong>Email:</strong> {user?.email}</p>
//         <p><strong>User ID:</strong> {user?.userId}</p>
//         <p><strong>Total Searches:</strong> {historyCount}</p>
//         <p><strong>Password:</strong> ********</p>
//         <small>(Password hidden for security)</small>
//       </div>

//       {/* STATIC CROP DATABASE IDEA */}
//       <div
//         style={{
//           background: "#f8fafc",
//           padding: "1.5rem",
//           borderRadius: "12px",
//         }}
//       >
//         <h3>🌾 Crop Knowledge Database</h3>
//         <ul>
//           <li>🌾 Wheat – Cool climate, Rabi season</li>
//           <li>🌽 Corn – Warm climate, Kharif season</li>
//           <li>🍚 Rice – High water, Kharif season</li>
//           <li>🥔 Potato – Cool season crop</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Database;


// import { useEffect, useState } from "react";
// import { getUserFromToken } from "../utils/auth";
// import { useNavigate } from "react-router-dom";

// const Database = () => {
//   const user = getUserFromToken();
//   const navigate = useNavigate();
//   const [historyCount, setHistoryCount] = useState(0);

//   useEffect(() => {
//     const fetchHistoryCount = async () => {
//       const res = await fetch("http://localhost:5000/api/history", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       const data = await res.json();
//       setHistoryCount(data.length);
//     };

//     fetchHistoryCount();
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

//       <h2>📂 User Database</h2>

//       {/* USER PROFILE */}
//       <div
//         style={{
//           background: "#ecfdf5",
//           padding: "1.5rem",
//           borderRadius: "12px",
//           maxWidth: "500px",
//           marginBottom: "2rem",
//         }}
//       >
//         <h3>👤 User Profile</h3>
//         <p><strong>Email:</strong> {user?.email}</p>
//         <p><strong>User ID:</strong> {user?.userId}</p>
//         <p><strong>Total Searches:</strong> {historyCount}</p>
//         <p><strong>Password:</strong> ********</p>
//         <small>(Password hidden for security)</small>
//       </div>

//       {/* STATIC CROP DATABASE */}
//       <div
//         style={{
//           background: "#f8fafc",
//           padding: "1.5rem",
//           borderRadius: "12px",
//         }}
//       >
//         <h3>🌾 Crop Knowledge Database</h3>
//         <ul>
//           <li>🌾 Wheat – Cool climate, Rabi season</li>
//           <li>🌽 Corn – Warm climate, Kharif season</li>
//           <li>🍚 Rice – High water, Kharif season</li>
//           <li>🥔 Potato – Cool season crop</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Database;


import { useEffect, useState } from "react";
import { getUserFromToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Database = () => {
  const user = getUserFromToken();
  const navigate = useNavigate();

  const [historyCount, setHistoryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // 📊 Fetch history count
  useEffect(() => {
    const fetchHistoryCount = async () => {
      try {
        const res = await fetch("http://backend:5000/api/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await res.json();
        setHistoryCount(data.length);
      } catch (err) {
        console.error(err);
        setHistoryCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryCount();
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

      <h2 style={{ marginBottom: "1.5rem" }}>📂 User Database</h2>

      {/* USER PROFILE */}
      <div
        style={{
          background: "#ecfdf5",
          padding: "1.5rem",
          borderRadius: "12px",
          maxWidth: "500px",
          marginBottom: "2rem",
          boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>👤 User Profile</h3>

        <p>
          <strong>Email:</strong>{" "}
          <span style={{ color: "#065f46" }}>{user.email}</span>
        </p>

        <p>
          <strong>User ID:</strong> {user.userId}
        </p>

        <p>
          <strong>Total Searches:</strong>{" "}
          {loading ? "Loading..." : historyCount}
        </p>

        <p>
          <strong>Password:</strong> ********
        </p>

        <small style={{ color: "#475569" }}>
          (Password hidden for security)
        </small>
      </div>

      {/* STATIC CROP DATABASE */}
      <div
        style={{
          background: "#f8fafc",
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>🌾 Crop Knowledge Database</h3>
        <ul style={{ lineHeight: "1.8" }}>
          <li>🌾 Wheat – Cool climate, Rabi season</li>
          <li>🌽 Corn – Warm climate, Kharif season</li>
          <li>🍚 Rice – High water, Kharif season</li>
          <li>🥔 Potato – Cool season crop</li>
        </ul>
      </div>
    </div>
  );
};

export default Database;





