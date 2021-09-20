import React, { useEffect, useState } from "react";
import { dbService } from "firebaseInit";
import Incident from "components/Incident";
import IncidentFactory from "components/IncidentFactory";

const Home = ({ userObj }) => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    try {
      dbService.collection("incidents").onSnapshot(snapshot => {
        const incidentArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIncidents(incidentArray);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <span>
      <IncidentFactory userObj={userObj} />
      <div>
        {incidents.map(incident => (
          <Incident
            key={incident.id}
            incidentObj={incident}
            isOwner={incident.creatorId === userObj.uid}
          />
        ))}
      </div>
    </span>
  );
};

export default Home;
