import Incident from "components/Incident";
import IncidentDetail from "components/IncidentDetail";
import { dbService } from "firebaseInit";
import React, { useEffect, useState } from "react";

const MyCase = ({ userObj }) => {
  const [incidents, setIncidents] = useState([]);
  const [detail, setDetail] = useState(false);
  const [detailInfo, setDetailInfo] = useState();

  const getMyIncident = async () => {
    await dbService
      .collection("incidents")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        let incidentArray = [];
        snapshot.forEach(doc => {
          incidentArray.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setIncidents(incidentArray);
      });
  };

  useEffect(() => {
    getMyIncident();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div>
        <h3>My Case</h3>
        <div>
          {incidents.map(incident => (
            <Incident
              key={incident.id}
              userObj={userObj}
              incidentObj={incident}
              isOwner={incident.creatorId === userObj.uid}
              setDetailInfo={setDetailInfo}
              setDetail={setDetail}
            />
          ))}
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

export default MyCase;
