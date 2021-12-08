import React from "react";
import CallDetails from "./CallDetails.jsx";

const CallHistory = ({
  activities,
  setActivities,
  filteredActivities,
}) => {

  const allActivities = filteredActivities.map((activity) => {
    return (
      <CallDetails
        key={activity.id}
        activity={activity}
        activities={activities}
        setActivities={setActivities}
      />
    );
  });
  
  return (
    allActivities
  );
};

export default CallHistory;
