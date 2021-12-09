import React, { Fragment } from "react";
import axios from "axios";
import "../css/callLogs.css";
import {ACTIVITIES_API} from "../constants.jsx"
import { Icon} from "@blueprintjs/core";

const CallDetail = ({ activity, activities, setActivities }) => {
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
  } else if (activity.call_type === "answered") {
    callColor = "#48db80";
  } else if (activity.call_type === "voicemail") {
    callColor = "yellow";
  }

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


  if (!activities) return null;
  return (
    <Fragment>
      <div className="call-date">
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
      <div className="call-detail">
        <div className="call-icon">
          <Icon icon="phone" size={23} color={callColor}/>
        </div>
        <div className="call-info">
          <h3>{activity.from}</h3>
          <h4>
            tried to call on <strong>{activity.via}</strong>
          </h4>
        </div>
        <div className="call-time">
          <p>{`${formattedHours} : ${date.getMinutes()}`}</p>
        </div>
        <div className="call-time">
        {hours < 12 ? 'AM' : 'PM'}  
        </div>
        <div className="call-archive" onClick={handleArchiveCall}>
          <Icon icon="archive" size={9} color="#424242" />
        </div>
      </div>
    </Fragment>
  );
};

export default CallDetail;
