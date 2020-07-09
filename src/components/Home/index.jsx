import React from "react";
import { Link } from "react-router-dom";

import cappraLogo from "../../assets/cappra-logo-branco.png";
import campusLogo from "../../assets/campuslogo.png";
import rebootworld from "../../assets/reboot-world.svg";

const Home = () => {
  return (
    <div className="home">
      <div className="logos top">
        <img src={rebootworld} className="campus-logo-home" alt="logo" />
      </div>
      <div className="buttons">
        <div className="campus-button idea">
          <a
            href="https://cappralab.typeform.com/to/or2lmFPW"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leave Your Idea
          </a>
        </div>
        <div className="campus-button concepts">
          <Link to="/most-important-concepts">Most Important Concepts</Link>
        </div>
        <div className="campus-button sheets">
          <a href="https://docs.google.com/spreadsheets/d/1hLuhK-h48VzxnooQNDN_11paI-SbFS6Rp30i95nuEBw/export?format=xlsx">
            Download All Ideas [sheets]
          </a>
        </div>
        <div className="campus-button pdf">
          <a href="https://docs.google.com/spreadsheets/d/1hLuhK-h48VzxnooQNDN_11paI-SbFS6Rp30i95nuEBw/export?format=pdf">
            Download All Ideas [pdf]
          </a>
        </div>
      </div>
      <div className="logos bottom">
        <img src={campusLogo} className="campus-logo-home" alt="logo"></img>+
        <img src={cappraLogo} className="cappra-logo-home" alt="logo"></img>
      </div>
    </div>
  );
};

export default Home;
