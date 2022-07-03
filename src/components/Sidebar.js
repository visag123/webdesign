import React from 'react';
import "./Sidebar.css";
import { Link, } from "react-router-dom";


const Sidebar = () => {
  return (
    <div>
      <section>
        <div className="sidebar">
          <ul>
            <li>
              <i className="fa-solid fa-border-all"></i>Dashboard{" "}
            </li>
            <li>
              <i className="fa-solid fa-id-card"></i>Users
            </li>
            <li>
              <i className="fa-solid fa-file-lines"></i>Contacts
            </li>
            <li>
              <Link to="/">
                {" "}
                <i className="fa-solid fa-right-from-bracket"></i>Logout{" "}
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Sidebar