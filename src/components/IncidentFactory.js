import React, { useState } from "react";
import { dbService, storageService } from "firebaseInit";
import { v4 as uuidv4 } from "uuid";
import { FaCameraRetro } from "react-icons/fa";

const IncidentFactory = ({ userObj }) => {
  const [incident, setIncident] = useState("");
  const [attachment, setAttachment] = useState("");

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
      leftSide: [],
      rightSide: [],
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
    <div
      style={{
        width: 500,
        border: "1px solid",
      }}
    >
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            alt="*"
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
          </div>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <textarea
          className="factoryInput__input"
          value={incident}
          onChange={onChange}
          placeholder="억울한 얘기를 소송해보세요"
          maxLength={8000}
          required
          style={{
            marginLeft: "10px",
            marginTop: "25px",
            width: "90%",
            height: `${(60 + incident.length / 3.5).toFixed(0)}px`,
            border: "none",
            outline: "none",
            wordBreak: "break-all",
            resize: "none",
          }}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", marginTop: "5px" }}>
            <div>
              <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                  opacity: 0,
                  width: 0,
                }}
              />
            </div>
            <div style={{ marginLeft: "10px", marginTop: "15px" }}>
              <label htmlFor="attach-file" className="factoryInput__label">
                <span>
                  <FaCameraRetro size={25} />
                </span>
              </label>
            </div>
          </div>
          <div style={{ marginTop: "20px", marginRight: "10px" }}>
            <input
              type="submit"
              value="소송하기"
              style={{
                width: "100px",
                border: "1px solid #1D1D1D",
                backgroundColor: "rgba(0,0,0,0)",
                color: "#1D1D1D",
                padding: "5px",
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default IncidentFactory;
