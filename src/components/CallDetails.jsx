import React, { Fragment } from "react";
import axios from "axios";
import "../css/callLogs.css";
import {ACTIVITIES_API} from "../constants.jsx"
import { Icon} from "@blueprintjs/core";

const CallDetail = ({ activity, activities, setActivities, currentView }) => {
  const handleArchiveCall = () => {
    axios
      .post(`${ACTIVITIES_API}/${activity.id}`, {
        is_archived: !activity.is_archived,
      })
      .then((res) => {
        setActivities([
          ...activities.filter((elem) => elem.id !== res.data.id),
          res.data,
        ]);
      });
  };

  let callColor = "";
  if (activity.call_type === "missed") {
    callColor = "red";
  } else {
    callColor = "#48db80";
  } 

  const callIcon = (activity.call_type === "voicemail") ? "group-objects" : "phone";

  const date = new Date(activity.created_at);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function formatNumber(n){
    return n > 9 ? "" + n: "0" + n;
  }

  let hours = date.getHours();
  const formattedHours = hours > 12 ? formatNumber(hours-12) : hours;

  const archiveIcon = (currentView === "HISTORY") ? "archive" : "unarchive";

  if (!activities) return null;
  return (
    <Fragment>
      <div className="callDate">
        <h5>
          <span>
            <strong>
              {`${
                month[date.getMonth()]
              }, ${date.getDate()}  ${date.getFullYear()}`}
            </strong>
          </span>
        </h5>
      </div>
      <div className="callDetail">
        <div className="callIcon">
          <Icon icon={callIcon} size={23} color={callColor}/>
        </div>
        <div className="callInfo">
          <h3>{activity.from}</h3>
          <h4>
            tried to call on <strong>{activity.via}</strong>
          </h4>
        </div>
        <div className="callTime">
          <p>{`${formattedHours} : ${formatNumber(date.getMinutes())}`}</p>
        </div>
        <div className="callTime">
        {hours < 12 ? 'AM' : 'PM'}  
        </div>
        <div className="callArchive" onClick={handleArchiveCall}>
          <Icon icon={archiveIcon} size={15} color="#424242" />

        </div>
      </div>
    </Fragment>
  );
};

export default CallDetail;
