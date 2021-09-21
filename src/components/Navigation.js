import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{userObj.displayName} Profile</Link>
        </li>
        <li>
          <Link to="/mycase">My Case</Link>
        </li>
        <li>
          <Link to="/mycourt">My Law Court</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
