import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar";
import Loader from "./components/Loader";
import ProtectedRoute from "./routes/ProtectedRoute";
import UnprotectedRoute from "./routes/UnprotectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddEditTask from "./pages/AddEditTask";
import { checkAuth } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading && !user) {
    return <Loader />;
  }

  return (
    <Router>
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main content with top padding to offset fixed navbar height */}
      <div className="pt-16 min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddEditTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <AddEditTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <UnprotectedRoute>
                <Login />
              </UnprotectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <UnprotectedRoute>
                <Register />
              </UnprotectedRoute>
            }
          />
        </Routes>
        <ToastContainer position="top-right" />
      </div>
    </Router>
  );
}

export default App;
