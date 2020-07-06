import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <Link to="/reboot-the-world-viz">Reboot the World</Link>
      </div>
      <div>
        <a>Research</a>
      </div>
      <div>
        <a>All the Ideas</a>
      </div>
    </div>
  );
};

export default Home;
