import { dbService, storageService } from "firebaseInit";
import React, { useState } from "react";

const Incident = ({ incidentObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newIncident, setNewIncident] = useState(incidentObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this incident?");
    if (ok) {
      await dbService.doc(`incidents/${incidentObj.id}`).delete();
      await storageService.refFromURL(incidentObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing(prev => !prev);

  const onSubmit = async event => {
    event.preventDefault();
    await dbService.doc(`incidents/${incidentObj.id}`).update({
      text: newIncident,
    });
    setEditing(false);
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNewIncident(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Incident"
              value={newIncident}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Incident" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{incidentObj.text}</h4>
          {incidentObj.attachmentUrl && (
            <img
              alt="*"
              src={incidentObj.attachmentUrl}
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Incident</button>
              <button onClick={toggleEditing}>Edit Incident</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Incident;
