import React, { useState } from "react";
import { dbService, storageService } from "firebaseInit";
import { v4 as uuidv4 } from "uuid";

const IncidentFactory = ({ userObj }) => {
  const [incident, setIncident] = useState("");
  const [attachment, setAttachment] = useState();

  const onSubmit = async event => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const incidentObj = {
      text: incident,
      createdAt: Date.now(),
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
  );
};

export default IncidentFactory;
