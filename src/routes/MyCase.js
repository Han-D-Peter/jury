import Incident from "components/Incident";
import { dbService } from "firebaseInit";
import React, { useEffect, useState } from "react";

const MyCase = ({ userObj }) => {
  const [incidents, setIncidents] = useState([]);

  const getMyIncident = async () => {
    await dbService
      .collection("incidents")
      .where("creatorId", "==", userObj.uid)
      .onSnapshot(snapshot => {
        let incidentArray = [];
        snapshot.forEach(doc => {
          incidentArray.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setIncidents(incidentArray);
      });
  };

  useEffect(() => {
    getMyIncident();
  }, []);

  return (
    <>
      {incidents.map(incident => (
        <Incident
          key={incident.id}
          userObj={userObj}
          incidentObj={incident}
          isOwner={incident.creatorId === userObj.uid}
        />
      ))}
    </>
  );
};

export default MyCase;
