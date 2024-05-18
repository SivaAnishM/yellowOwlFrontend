import React from "react";
import Dashboard from "./Screens/Dashboard/Dashboard";
import "./App.css";
import Sidebar from "./Component/Sidebar/Sidebar";
import Navbar from "./Component/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
