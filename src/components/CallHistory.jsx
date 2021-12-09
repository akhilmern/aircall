import React, { Fragment } from "react";
import CallDetails from "./CallDetails.jsx";

const CallHistory = ({ activities, setActivities, filteredActivities }) => {
  const allActivities = filteredActivities.map((activity) => {
    return (
      <Fragment>

        <CallDetails
          key={activity.id}
          activity={activity}
          activities={activities}
          setActivities={setActivities}
        />
      </Fragment>
    );
  });

  return allActivities;
};

export default CallHistory;
