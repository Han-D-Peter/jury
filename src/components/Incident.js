import React from "react";

const Incident = ({ incidentObj }) => {
  <div key={incidentObj.id}>
    <h4>{incidentObj.text}</h4>
    <button>Delete Incident</button>
    <button>Edit Incident</button>
  </div>;
};

export default Incident;
