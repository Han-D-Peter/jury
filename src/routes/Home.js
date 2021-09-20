import Incident from "components/Incident";
import { dbService } from "firebaseInit";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [incident, setIncident] = useState("");
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    dbService.collection("incidents").onSnapshot(snapshot => {
      const incidentArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIncidents(incidentArray);
    });
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    await dbService.collection("incidents").add({
      text: incident,
      createdAt: Date.now(),
      createId: userObj.uid,
    });
  };
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setIncident(value);
  };

  return (
    <span>
      <form onSubmit={onSubmit}>
        <input
          value={incident}
          onChange={onChange}
          type="text"
          placeholder="What's on your main?"
          maxLength={120}
        />
        <input type="submit" value="Jury" />
      </form>
      <div>
        {incidents.map(incident => (
          <Incident key={incident.id} incidentObj={incident} />
        ))}
      </div>
    </span>
  );
};

export default Home;
