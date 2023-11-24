import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import Sidebar from "./sidebar";
import Articles from "./Articles";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await fetch("http://localhost:5000/checkauth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data.user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de l'utilisateur",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <div>
        {isLoggedIn &&
          userInfo &&
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register" && (
            <Sidebar userInfo={userInfo} />
          )}
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/home"
              element={
                isLoggedIn ? (
                  <div>
                    {isLoggedIn && userInfo && <Sidebar userInfo={userInfo} />}
                    <Home
                      fetchUserInfo={fetchUserInfo}
                      userInfo={userInfo}
                      setUserInfo={setUserInfo}
                    />
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/articles"
              element={
                isLoggedIn ? (
                  <div>
                    {isLoggedIn && userInfo && <Sidebar userInfo={userInfo} />}
                    <Articles />
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  onLogin={() => setIsLoggedIn(true)}
                  fetchUserInfo={fetchUserInfo}
                />
              }
            />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
