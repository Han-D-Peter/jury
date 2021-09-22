import Incident from "components/Incident";
import IncidentDetail from "components/IncidentDetail";
import { dbService } from "firebaseInit";
import React, { useEffect, useState } from "react";

const MyCourt = ({ userObj }) => {
  const [incidents, setIncidents] = useState([]);
  const [guilties, setGuilties] = useState([]);
  const [notGuilties, setNotGuilties] = useState([]);
  const [detail, setDetail] = useState(false);
  const [detailInfo, setDetailInfo] = useState();

  const getMyGuiltyIncident = async () => {
    await dbService
      .collection("incidents")
      .where("leftSide", "array-contains", userObj.uid)
      .orderBy("createdAt", "desc")
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
      .orderBy("createdAt", "desc")
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
    <div style={{ display: "flex" }}>
      <div>
        <h3>My Court</h3>
        <div>
          {guilties.map(incident =>
            incident.leftSide.includes(userObj.uid) ||
            incident.rightSide.includes(userObj.uid) ? (
              <Incident
                key={incident.id}
                userObj={userObj}
                incidentObj={incident}
                isOwner={incident.creatorId === userObj.uid}
                setDetailInfo={setDetailInfo}
                setDetail={setDetail}
              />
            ) : null
          )}
          {notGuilties.map(incident =>
            incident.leftSide.includes(userObj.uid) ||
            incident.rightSide.includes(userObj.uid) ? (
              <Incident
                key={incident.id}
                userObj={userObj}
                incidentObj={incident}
                isOwner={incident.creatorId === userObj.uid}
                setDetailInfo={setDetailInfo}
                setDetail={setDetail}
              />
            ) : null
          )}
        </div>
      </div>
      <div style={{ marginLeft: "20px" }}>
        {detail && detailInfo ? (
          <IncidentDetail
            key={detailInfo.id}
            userObj={userObj}
            incidentObj={detailInfo}
            isOwner={detailInfo.creatorId === userObj.uid}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MyCourt;
