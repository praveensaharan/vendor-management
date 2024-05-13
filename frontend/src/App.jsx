import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home1 from "./Pages/Home1";
import Add from "./Pages/Add";
import Update from "./Pages/Update";
import NotFoundPage from "./Pages/Notfound";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./components/Login";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={user ? <Home1 /> : <Navigate to="/login" />}
          />
          <Route
            path="/add"
            element={user ? <Add /> : <Navigate to="/login" />}
          />
          <Route
            path="/update/:id"
            element={user ? <Update /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
