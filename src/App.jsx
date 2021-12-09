import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Icon, Spinner } from "@blueprintjs/core";
import { ACTIVITIES_API } from "./constants.jsx";
import CallHistory from "./components/CallHistory.jsx";
import Footer from "./layout/Footer.jsx";
import Header from "./layout/Header.jsx";

const App = () => {
  const [activities, setActivities] = useState([]);
  const [, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState("HISTORY");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const handleArchiveCalls = () => {
    const archivedActivities = [];
    activities.forEach((activity) => {
      axios
        .post(`${ACTIVITIES_API}/${activity.id}`, {
          is_archived: false,
        })
        .then((res) => {
          archivedActivities.push(res.data);
        });
    });
    setActivities(archivedActivities);
  };

  useEffect(() => {
    axios.get(ACTIVITIES_API).then((res) => {
      setActivities(res.data);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (currentView === "HISTORY") {
      setFilteredActivities(
        activities
          .filter((activity) => activity.is_archived === true)
          .sort((a, b) => (b.created_at - a.created_at ? -1 : 1))
      );
    } else {
      setFilteredActivities(
        activities
          .filter((activity) => activity.is_archived === false)
          .sort((a, b) => (b.created_at - a.created_at ? -1 : 1))
      );
    }
  }, [activities, currentView]);

  return (
    <div className="container">
      <Header />
      <div className="container-view">
    
          <div>
            {currentView === "HISTORY" && (
              <div className="callDetail">
                <span className="arhiveIcon">
                  <Icon icon="archive" size={23} color="#424242" />
                </span>
                <span className="archiveText" onClick={handleArchiveCalls}>
                  <strong>Archive all calls</strong>
                </span>
              </div>
            )}

            <CallHistory
              activities={activities}
              setActivities={setActivities}
              filteredActivities={filteredActivities}
              setFilteredActivities={setFilteredActivities}
              setIsLoaded={setIsLoaded}
              currentView={currentView}
            />
          </div>
      
      </div>
      <Footer setCurrentView={setCurrentView} currentView={currentView} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
