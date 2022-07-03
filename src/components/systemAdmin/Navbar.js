import React from 'react';
// import { Link } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="nav">
      <h2 className="logo">
        <i className="fa-brands fa-servicestack" />
        &nbsp;&nbsp;&nbsp; CREW <font>Logistics</font>
      </h2>

      <ul className="navlink">
        <li>
          <i className="fa-solid fa-bell" />
        </li>
        <li>
          <i className="fa-solid fa-gear" />
        </li>
        <li>
          <i className="fa-solid fa-circle-user" />
          &nbsp;
          <small>
            admin <br />{" "}
          </small>
        </li>
      </ul>
    </div>
  );
}

export default Navbar