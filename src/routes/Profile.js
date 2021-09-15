import { authService } from "firebaseInit";
import React from "react";
import { useHistory } from "react-router";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
