import React, { Fragment } from "react";
import axios from "axios";
import "../css/callLogs.css";
import { HiArchive } from "react-icons/hi";
import { H5, Icon, IconSize, Intent, Label, Slider } from "@blueprintjs/core";
import { phone } from "@blueprintjs/icons";


const CallDetail = ({ activity, activities, setActivities }) => {
  const handleArchiveCall = () => {
    axios
      .post(`https://aircall-job.herokuapp.com/activities/${activity.id}`, {
        is_archived: !activity.is_archived,
      })
      .then((res) => {
        setActivities([
          ...activities.filter((elem) => elem.id !== res.data.id),
          res.data,
        ]);
      });
  };

  let icon = "";
  if (activity.call_type === "missed") {
    icon = (
      <span

      >
        <Icon icon={phone} size={23} />
      </span>
    );
  } else if (activity.call_type === "answered") {
    icon = (
      <span

      >
        <Icon icon={phone} size={23} />
      </span>
    );
  } else if (activity.call_type === "voicemail") {
    icon = (
      <span

      >
        <Icon icon={phone} size={23} />
      </span>
    );
  }

  const date = new Date(activity.created_at);
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  if (!activities) return null;
  return (
    <Fragment>
      <div className="call-date">
        <h5>
          <span>
            <strong>
              {`${month[date.getMonth()]} , ${date.getDate()}  ${date.getFullYear()}`}
            </strong>
          </span>
        </h5>
      </div>
      <div className="call-detail" >
        <div className="call-icon"><Icon icon={phone} size={23} /></div>
        <div className="call-info">
          <h3>{activity.from}</h3>
          <h4>
            tried to call on <strong>{activity.via}</strong>
          </h4>
        </div>
        <div className="call-time">
          <p>
            {`${date.getHours()} : ${date.getMinutes()}`}
          </p>
        </div>
        <div className="call-archive" onClick={handleArchiveCall}>
          <HiArchive />
        </div>
      </div>
    </Fragment>
  );
};

export default CallDetail;