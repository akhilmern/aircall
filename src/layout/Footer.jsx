import React from "react";
import { HiArchive } from "react-icons/hi";
import { GrList, GrTty } from "react-icons/gr";
import {IconContext} from 'react-icons';

const Footer = (props) => {
  const { currentView, setCurrentView } = props;


  function changeView(viewName) {
    setCurrentView(viewName);
  }


  return (
    <footer>
      <div className="footerButtons">
        <button  className="historyButtons" onClick={()=>changeView('HISTORY')}>
          <GrList />
        </button>
        {(currentView === "HISTORY" || currentView === "ARCHIVE") && (
          <button className="midButton" >
                <IconContext.Provider
      value={{ color: 'white', size: '50px' }}
    >
            <GrTty/>
            </IconContext.Provider>
          </button>
        )}
        <button className="archiveButtons" onClick={()=>changeView('ARCHIVE')}>
          <HiArchive />
        </button>
      </div>
    </footer>
  );
};

export default Footer;