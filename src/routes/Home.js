import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "firebaseInit";
import Incident from "components/Incident";

const Home = ({ userObj }) => {
  const [incident, setIncident] = useState("");
  const [incidents, setIncidents] = useState([]);
  const [attachment, setAttachment] = useState();

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
    const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    const response = await fileRef.putString(attachment, "data_url");
    const attachmentUrl = await response.ref.getDownloadURL();
    const incidentObj = {
      text: incident,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("incidents").add(incidentObj);
    setIncident("");
    setAttachment("");
  };
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setIncident(value);
  };

  const onFileChange = event => {
    const {
      target: { files },
    } = event;
    const theFiles = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFiles);
  };

  const onClearAttachment = () => setAttachment(null);

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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Jury" />
        {attachment && (
          <div>
            <img src={attachment} alt="*" width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {incidents.map(incident => (
          <Incident
            key={incident.id}
            incidentObj={incident}
            isOwner={incident.createId === userObj.uid}
          />
        ))}
      </div>
    </span>
  );
};

export default Home;
