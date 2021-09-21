import { dbService, storageService } from "firebaseInit";
import React, { useState } from "react";
import JudgeBtn from "./JudgeBtn";

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
          <div style={{ border: "1px solid #1D1D1D", width: "500px" }}>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Edit your Incident"
                value={newIncident}
                onChange={onChange}
                maxLength={120}
                style={{
                  marginLeft: "10px",
                  marginTop: "25px",
                  width: "60%",
                  height: "20px",
                  border: "none",
                  outline: "none",
                }}
                required
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    marginLeft: "240px",
                  }}
                >
                  <input
                    type="submit"
                    value="Update Incident"
                    style={{
                      width: "130px",
                      border: "1px solid #1D1D1D",
                      backgroundColor: "rgba(0,0,0,0)",
                      color: "#1D1D1D",
                      padding: "5px",
                    }}
                  />
                  <button
                    onClick={toggleEditing}
                    style={{
                      width: "130px",
                      border: "1px solid #1D1D1D",
                      backgroundColor: "rgba(0,0,0,0)",
                      color: "#1D1D1D",
                      padding: "5px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
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
          <JudgeBtn
            id={incidentObj.id}
            leftArray={incidentObj.leftSide}
            rightArray={incidentObj.rightSide}
          />
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
