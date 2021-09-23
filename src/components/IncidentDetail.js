import { dbService, storageService } from "firebaseInit";
import React, { useEffect, useState } from "react";
import JudgeBtn from "./JudgeBtn";

const IncidentDetail = ({
  userObj,
  incidentObj,
  isOwner,
  setDetailInfo,
  setDetail,
}) => {
  const [editing, setEditing] = useState(false);
  const [newIncident, setNewIncident] = useState(incidentObj.text);
  const [incident, setIncident] = useState([]);
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
  useEffect(() => {
    try {
      dbService.doc(`incidents/${incidentObj.id}`).onSnapshot(snapshot => {
        const incidentArray = {
          id: snapshot.id,
          ...snapshot.data(),
        };
        setIncident(incidentArray);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div style={{ marginBottom: "15px", position: "fixed" }}>
      {editing ? (
        <>
          <div
            style={{
              width: "500px",
              paddingBottom: "10px",
              paddingTop: "3px",
              borderRadius: "10px",
              boxShadow: "0px 5px 10px 0.1px #8e8b8b",
            }}
          >
            <div
              style={{
                marginLeft: "5px",
                marginTop: "5px",
                width: "70px",
                paddingLeft: "10px",
                paddingTop: "4px",
                paddingBottom: "4px",
                borderRadius: "10px",
                color: "white",
                backgroundColor: "brown",
              }}
            >
              <span>Incident</span>
            </div>
            <form onSubmit={onSubmit}>
              <textarea
                placeholder="Edit your Incident"
                value={newIncident}
                onChange={onChange}
                style={{
                  marginLeft: "30px",
                  marginTop: "25px",
                  width: "90%",
                  height: "60px",
                  border: "none",
                  outline: "none",
                  wordBreak: "break-all",
                  resize: "none",
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
                    marginTop: "10px",
                    width: "100%",
                    marginLeft: "230px",
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
                      borderRadius: "10px",
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
                      borderRadius: "10px",
                      marginLeft: "5px",
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
          <div
            style={{
              width: "500px",
              paddingBottom: "10px",
              paddingTop: "3px",
              borderRadius: "10px",
              boxShadow: "0px 5px 10px 0.1px #8e8b8b",
            }}
          >
            <div
              style={{
                marginLeft: "5px",
                marginTop: "5px",
                width: "70px",
                paddingLeft: "10px",
                paddingTop: "4px",
                paddingBottom: "4px",
                borderRadius: "10px",
                color: "white",
                backgroundColor: "brown",
              }}
            >
              <span>Incident</span>
            </div>
            {incident?.attachmentUrl && (
              <div style={{ width: "85%", marginLeft: "20%" }}>
                <img
                  alt="*"
                  src={incident.attachmentUrl}
                  width="70%"
                  height="70%"
                />
              </div>
            )}
            <div
              style={{
                padding: "10px",
                width: "85%",
                overflow: "hidden",
                whiteSpace: "pre",
                wordBreak: "break-all",
                wordWrap: "break-word",
                textOverflow: "ellipsis",
                marginBottom: "10px",
                marginLeft: "23px",
                fontSize: "14px",
              }}
            >
              {incident.text}
            </div>
            <div>
              <JudgeBtn
                id={incident.id}
                userObj={userObj}
                leftArray={incident.leftSide}
                rightArray={incident.rightSide}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "10px",
                }}
              >
                {isOwner && (
                  <>
                    <div>
                      <button
                        onClick={onDeleteClick}
                        style={{
                          width: "130px",
                          border: "1px solid #1D1D1D",
                          backgroundColor: "rgba(0,0,0,0)",
                          color: "#1D1D1D",
                          padding: "5px",
                          borderRadius: "10px",
                          marginLeft: "5px",
                        }}
                      >
                        Delete Incident
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={toggleEditing}
                        style={{
                          width: "130px",
                          border: "1px solid #1D1D1D",
                          backgroundColor: "rgba(0,0,0,0)",
                          color: "#1D1D1D",
                          padding: "5px",
                          borderRadius: "10px",
                          marginLeft: "5px",
                        }}
                      >
                        Edit Incident
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IncidentDetail;
