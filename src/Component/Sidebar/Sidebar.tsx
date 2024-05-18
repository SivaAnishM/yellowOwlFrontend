import React from "react";
import "./Sidebar.css";

function Sidebar({ isOpen }: any) {
  return (
    <div className="sidebar-container">
      <div className="sidebar-Innercontainer">
        <div className="sidebar-adminicon"></div>
        <div>
          <div className="sidebar-adminName">Yellow Owl</div>
          <div className="sidebar-adminStatus"> Admin</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
