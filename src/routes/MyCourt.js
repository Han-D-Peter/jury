import Incident from "components/Incident";
import { dbService } from "firebaseInit";
import React, { useEffect, useState } from "react";

const MyCourt = ({ userObj }) => {
  const [incidents, setIncidents] = useState([]);
  const [guilties, setGuilties] = useState([]);
  const [notGuilties, setNotGuilties] = useState([]);

  const getMyGuiltyIncident = async () => {
    await dbService
      .collection("incidents")
      .where("leftSide", "array-contains", userObj.uid)
      .onSnapshot(snapshot => {
        let guiltyCourt = [];
        snapshot.forEach(doc => {
          guiltyCourt.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setGuilties(guiltyCourt);
      });
  };

  const getMyNotGuiltyIncident = async () => {
    await dbService
      .collection("incidents")
      .where("rightSide", "array-contains", userObj.uid)
      .onSnapshot(snapshot => {
        let notGuiltyCourt = [];
        snapshot.forEach(doc => {
          notGuiltyCourt.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setNotGuilties(notGuiltyCourt);
      });
  };

  useEffect(() => {
    getMyGuiltyIncident();
    getMyNotGuiltyIncident();
  }, []);

  return (
    <>
      {guilties.map(incident =>
        incident.leftSide.includes(userObj.uid) ||
        incident.rightSide.includes(userObj.uid) ? (
          <Incident
            key={incident.id}
            incidentObj={incident}
            isOwner={incident.creatorId === userObj.uid}
          />
        ) : null
      )}
      {notGuilties.map(incident =>
        incident.leftSide.includes(userObj.uid) ||
        incident.rightSide.includes(userObj.uid) ? (
          <Incident
            key={incident.id}
            incidentObj={incident}
            isOwner={incident.creatorId === userObj.uid}
          />
        ) : null
      )}
    </>
  );
};

export default MyCourt;
