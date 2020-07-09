import React, { useRef, useEffect, useState } from "react";
import Tabletop from "tabletop";

import Wordcloud from "./Worldcloud";
import Treemap from "./Treemap";
import { parseTreemapData, parseSubtitleData } from "./utils";

import cappraLogo from "../../assets/cappra-logo-preto.png";
import campusLogo from "../../assets/campuslogoazul.png";
import Subtitles from "./Subtitles";

const Visualizations = () => {
  const sheetsUrl =
    "https://docs.google.com/spreadsheets/d/1KyBaSV6zQ9zbz6TYKUxNOkh4bW9u_IxHJF_h-GDVn88/edit?usp=sharing";
  const svgRef = useRef(null);
  const contentRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 800 });
  const [treemapData, setTreemapData] = useState([]);
  const [wordcloudData, setWordcloudData] = useState([]);
  const [subtitleData, setSubtitleData] = useState([]);
  const [ready, setReady] = useState();
  // const delay = 5000;
  const margin = {
    top: 70,
    right: 150,
    bottom: 40,
    left: 150,
  };

  useEffect(() => {
    setDimensions({
      width: contentRef.current.getBoundingClientRect().width,
      height: contentRef.current.getBoundingClientRect().height - 5,
    });
  }, [contentRef]);

  useEffect(() => {
    Tabletop.init({
      key: sheetsUrl,
      simpleSheet: true,
    }).then(function (data, tabletop) {
      setTreemapData(parseTreemapData(data));
      setWordcloudData(data);
      setSubtitleData(parseSubtitleData(data));
    });
  }, []);

  // useEffect(() => {
  //   function tick() {
  //     Tabletop.init({
  //       key: sheetsUrl,
  //       simpleSheet: true,
  //     }).then(function (data, tabletop) {
  //       setTreemapData(parseTreemapData(data));
  //       setWordcloudData(data);
  //       setSubtitleData(parseSubtitleData(data));
  //     });
  //   }
  //   if (delay !== null) {
  //     let id = setInterval(tick, delay);
  //     return () => clearInterval(id);
  //   }
  // }, [delay]);

  useEffect(() => {
    if (
      subtitleData.length > 0 &&
      treemapData.length > 0 &&
      wordcloudData.length > 0 &&
      dimensions
    )
      setReady(true);
  }, [treemapData, wordcloudData, subtitleData, dimensions]);

  return (
    <div className="campus-tent-map">
      <div className="header">
        <div className="title-left">
          <h1 className="title">Ideas to reboot the world</h1>
          <p className="subtitle">
            This is a project led by the Cappra Institute & BigML to analyze all
            proposals for ideas, process them with machine learning's topic
            analysis to identify and extract the best concepts and ideas: the
            model will gradually learn to convert words into concepts and these
            into ideas. Our final objective is to help produce a document with
            the best ideas from and for humanity.
          </p>
        </div>
        <div className="buttons-right">
          <div className="survey">
            <a
              href="https://cappralab.typeform.com/to/or2lmFPW"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leave you Idea
            </a>
          </div>
          <div className="survey">
            <a href="https://reboot-the-world.campus-party.org/">Go Back</a>
          </div>
        </div>
      </div>
      <div className="content" ref={contentRef}>
        {ready ? (
          <svg
            ref={svgRef}
            className="main-svg"
            height={dimensions.height}
            width={dimensions.width}
          >
            <Treemap
              data={treemapData}
              dimensions={dimensions}
              margin={margin}
            />
            <Wordcloud
              data={wordcloudData}
              dimensions={dimensions}
              margin={margin}
            />
            <Subtitles
              data={subtitleData}
              dimensions={dimensions}
              margin={margin}
            />
          </svg>
        ) : (
          <div className="loading">LOADING...</div>
        )}
      </div>
      <div className="footer">
        <img src={campusLogo} className="campus-logo" alt="logo"></img>
        <img src={cappraLogo} className="cappra-logo" alt="logo"></img>
      </div>
    </div>
  );
};

export default Visualizations;
