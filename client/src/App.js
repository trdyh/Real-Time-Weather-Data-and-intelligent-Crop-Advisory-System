// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import './App.css';
// // import Navbar from './components/Navbar';
// // import Home from './pages/Home';
// // import Weather from './pages/Weather';
// // import CropRecommendation from './pages/CropRecommendation';
// // import CropDatabase from './pages/CropDatabase';
// // import History from './pages/History';

// // function App() {
// //   return (
// //     <Router>
// //       <div className="App">
// //         <Navbar />
// //         <main className="main-content">
// //           <Routes>
// //             <Route path="/" element={<Home />} />
// //             <Route path="/weather" element={<Weather />} />
// //             <Route path="/crop-recommendation" element={<CropRecommendation />} />
// //             <Route path="/crop-database" element={<CropDatabase />} />
// //             <Route path="/history" element={<History />} />
// //             <Route path="*" element={<Navigate to="/" replace />} />
// //           </Routes>
// //         </main>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;



// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Weather from "./pages/Weather";
// import CropRecommendation from "./pages/CropRecommendation";
// import History from "./pages/History";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* Protected Routes */}
//       <Route
//         path="/weather"
//         element={
//           <ProtectedRoute>
//             <Weather />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/crop"
//         element={
//           <ProtectedRoute>
//             <CropRecommendation />
//           </ProtectedRoute>
//         }
//       />
//       {/* <Route
//         path="/history"
//         element={
//           <ProtectedRoute>
//             <History />
//           </ProtectedRoute>
//         }
        
//       /> */}
//       <Route
//         path="/database"
//         element={
//           <ProtectedRoute>
//             <Database />
//           </ProtectedRoute>
//         }
//       />


//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }

// export default App;


import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Weather from "./pages/Weather";
import CropRecommendation from "./pages/CropRecommendation";
import History from "./pages/History";
import Database from "./pages/Database"; // ✅ ADD THIS
import ProtectedRoute from "./components/ProtectedRoute";
import WeatherOnly from './pages/WeatherOnly';
import WeatherWithCrops from './pages/WeatherWithCrops';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/WeatherOnly" element={<WeatherOnly />} />
      <Route path="/WeatherWithCrops" element={<WeatherWithCrops />} />

      {/* Protected Routes */}
      <Route
        path="/weather"
        element={
          <ProtectedRoute>
            <Weather />
          </ProtectedRoute>
        }
      />

      <Route
        path="/crop-recommendation"
        element={
          <ProtectedRoute>
            <CropRecommendation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      {/* ✅ DATABASE ROUTE */}
      <Route
        path="/database"
        element={
          <ProtectedRoute>
            <Database />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

