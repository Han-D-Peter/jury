import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

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
      </ul>
    </nav>
  );
};

export default Navigation;
