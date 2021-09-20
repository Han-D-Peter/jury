import Incident from "components/Incident";
import { authService, dbService } from "firebaseInit";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ userObj, refreshUser }) => {
  const [incidents, setIncidents] = useState([]);
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

  const getMyIncident = async () => {
    await dbService
      .collection("incidents")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get()
      .then(snapshot => {
        let incidentArray = [];
        snapshot.forEach(doc => {
          incidentArray.push(doc.data());
        });
        setIncidents(incidentArray);
      });
  };

  useEffect(() => {
    getMyIncident();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayname}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
      {incidents.map(incident => (
        <Incident
          key={incident.id}
          incidentObj={incident}
          isOwner={incident.creatorId === userObj.uid}
        />
      ))}
    </>
  );
};
