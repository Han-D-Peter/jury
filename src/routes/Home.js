import React, { useEffect, useState } from "react";
import { dbService } from "firebaseInit";
import Incident from "components/Incident";
import IncidentFactory from "components/IncidentFactory";
import IncidentDetail from "components/IncidentDetail";

const Home = ({ userObj }) => {
  const [incidents, setIncidents] = useState([]);
  const [detail, setDetail] = useState(false);
  const [detailInfo, setDetailInfo] = useState();

  useEffect(() => {
    try {
      dbService
        .collection("incidents")
        .orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
          const incidentArray = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setIncidents(incidentArray);
        });
    } catch (e) {
      console.log(e);
    }
    setDetail(false);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div>
        <IncidentFactory userObj={userObj} />
        <div style={{ marginTop: "100px" }}>
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

export default Home;
