import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Followers from "./components/Followers";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup";
import UpdatePost from "./components/UpdatePost";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const MainLayout = ({ darkMode, setDarkMode }) => {
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="w-full h-screen justify-between flex ">
        <Sidebar setDarkMode={setDarkMode} darkMode={darkMode} />
        <div className="w-full">
          <Home darkMode={darkMode} />
        </div>
        <Followers darkMode={darkMode} />
      </div>
    </div>
  );
};

const UpdateLayout = () => {
  return (
    <div className="w-full h-screen justify-between flex ">
      <Sidebar />
      <div className="w-full">
        <UpdatePost />
      </div>
      <Followers />
    </div>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/update/:id"
            element={<UpdateLayout darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route
            path="/"
            element={<MainLayout darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route
            path="login"
            element={<Login darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route
            path="signup"
            element={<Signup darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
