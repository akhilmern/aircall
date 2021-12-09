import React from "react";
import { GrTty } from "react-icons/gr";
import { IconContext } from "react-icons";
import { Icon } from "@blueprintjs/core";

const Footer = (props) => {
  const { currentView, setCurrentView } = props;

  function changeView(viewName) {
    setCurrentView(viewName);
  }

  return (
    <footer>
      <div className="footerButtons">
        <button
          className="historyButtons"
          onClick={() => changeView("HISTORY")}
        >
          <Icon icon="menu" size={23} color="#424242" />
        </button>
        {(currentView === "HISTORY" || currentView === "ARCHIVE") && (
          <button className="midButton">
            <IconContext.Provider value={{ color: "white", size: "50px" }}>
              <GrTty />
            </IconContext.Provider>
          </button>
        )}
        <button
          className="archiveButtons"
          onClick={() => changeView("ARCHIVE")}
        >
          <Icon icon="archive" size={15} color="#424242" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
