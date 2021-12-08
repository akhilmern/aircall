import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import CallHistory from "./components/CallHistory.jsx";
import Footer from "./layout/Footer.jsx";
import Header from "./layout/Header.jsx";


const App = () => {
  const [activities, setActivities] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState("HISTORY");
  const [filteredActivities, setFilteredActivities] = useState([]);

  useEffect(() => {
    axios.get("https://aircall-job.herokuapp.com/activities").then((res) => {
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
        {!isLoaded ? (
          "loading"
        ) : (
            <CallHistory
              activities={activities}
              setActivities={setActivities}
              filteredActivities={filteredActivities}
              setFilteredActivities={setFilteredActivities}
              setIsLoaded={setIsLoaded}
            />
          )}
      </div>
      <Footer
        setCurrentView={setCurrentView}
        currentView={currentView}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
