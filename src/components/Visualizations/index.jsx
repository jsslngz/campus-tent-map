import React, { useRef, useEffect, useState } from "react";
import { select } from "d3";

import Wordcloud from "./Worldcloud";
import Treemap from "./Treemap";

import cappraLogo from "../../assets/cappralogo.png";
import campusLogo from "../../assets/campuslogo.png";

const Visualizations = () => {
  const contentRef = useRef();

  const [dimensions, setDimensions] = useState({
    height: contentRef.current?.offsetHeight,
    width: contentRef.current?.offsetWidth,
  });

  useEffect(() => {
    setDimensions({
      width: contentRef.current.offsetWidth,
      height: contentRef.current.offsetHeight - 5,
    });

    window.addEventListener("resize", () =>
      handleResize(contentRef, setDimensions)
    );
  }, [contentRef.current?.offsetWidth]);

  return (
    <div className="campus-tent-map">
      <div className="header">
        <div className="title-left">
          <h1 className="title">Título</h1>
          <p className="subtitle">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit...
          </p>
        </div>
        <div className="buttons-right">
          <div className="research">Responder a Pesquisa</div>
          <div className="theme">SELECIONAR TEMA</div>
        </div>
      </div>
      <div className="content" ref={contentRef}>
        <svg
          width={dimensions.width}
          height={dimensions.height}
          className="main-svg"
        >
          <Wordcloud dimensions={dimensions} />
          <Treemap dimensions={dimensions} />
        </svg>
      </div>
      <div className="footer">
        <img src={campusLogo} className="campus-logo" alt="logo"></img>
        <img src={cappraLogo} className="cappra-logo" alt="logo"></img>
      </div>
    </div>
  );
};

function handleResize(contentRef, setDimensions) {
  setDimensions({
    width: contentRef.current.offsetWidth,
    height: contentRef.current.offsetHeight - 5,
  });
}

export default Visualizations;
