import { authService } from "firebaseInit";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ userObj, refreshUser }) => {
  const [newDisplayname, setNewDisplayname] = useState(
    userObj.displayName || ""
  );
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNewDisplayname(value);
  };

  const onSubmit = async event => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayname) {
      await userObj.updateProfile({ displayName: newDisplayname });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div
          style={{
            display: "flex",
            width: "440px",
            height: "40px",
            justifyContent: "space-around",
            boxShadow: "2px 5px 10px 0.1px #8e8b8b",
            borderRadius: "10px 10px 10px 10px",
          }}
        >
          <div>
            <input
              onChange={onChange}
              type="text"
              placeholder="Display name"
              value={newDisplayname}
              style={{
                width: "220px",
                height: "96%",
                border: "0px solid white",
                borderRadius: "10px 0px 0px 10px",
                textAlign: "center",
              }}
            />
          </div>
          <div>
            <input
              type="submit"
              value="Update Profile"
              style={{
                width: "220px",
                height: "100%",
                backgroundColor: "#60bfff",
                border: "0px solid white",
                borderRadius: "0px 10px 10px 0px",
              }}
            />
          </div>
        </div>
      </form>
      <div>
        <button
          onClick={onLogOutClick}
          style={{
            width: "440px",
            padding: "10px",
            height: "40px",
            backgroundColor: "#c94e4e",
            marginTop: "30px",
            border: "0px solid white",
            borderRadius: "10px 10px 10px 10px",
            boxShadow: "2px 5px 10px 0.1px #8e8b8b",
          }}
        >
          Log Out
        </button>
      </div>
    </>
  );
};
