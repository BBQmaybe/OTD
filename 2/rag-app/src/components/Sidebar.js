// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <NavLink
        to="/intro"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        Введение
      </NavLink>

      <NavLink
        to="/description"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        Описание
      </NavLink>

      <NavLink
        to="/conclusion"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        Заключение
      </NavLink>
    </nav>
  );
};

export default Sidebar;
