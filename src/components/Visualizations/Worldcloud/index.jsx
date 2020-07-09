import React, { useEffect, useState } from "react";
import { select, scaleLinear, extent } from "d3";
import { parseWordcloudData } from "../utils";
import * as d3Cloud from "d3-cloud";
import { colors } from "../utils";
import Select from "react-select";

const Wordcloud = ({ dimensions, margin, data }) => {
  const [languageFilter, setLanguageFilter] = useState(undefined);
  const [categoryFilter, setCategoryFilter] = useState(undefined);
  const [parsedData, setParsedData] = useState(
    parseWordcloudData(data, languageFilter)
  );
  const innerDimensions = {
    width: dimensions.width / 2 - margin.left - margin.right,
    height: dimensions.height - margin.top - margin.bottom - 20,
  };

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Português", label: "Português" },
    { value: "Español", label: "Español" },
    { value: "Italiano", label: "Italiano" },
    { value: "Français", label: "Français" },
  ];

  const categoryOptions = [
    { value: "Employment", label: "Employment" },
    { value: "Clean Energy", label: "Clean Energy" },
    { value: "Health", label: "Health" },
    { value: "Digital Entertainment", label: "Digital Entertainment" },
    { value: "Cities", label: "Cities" },
    { value: "Economy", label: "Economy" },
    { value: "Environment", label: "Environment" },
    { value: "Science", label: "Science" },
    { value: "Education", label: "Education" },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#0098fd" : "#fff",
      backgroundColor: state.isSelected ? "#fff" : "#0098fd",
      borderRadius: 0,
      textTransform: "uppercase",
      fontWeight: 700,
    }),
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "none" : "none",
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        border: state.isFocused ? 0 : 0,
      },
      borderRadius: 0,
      backgroundColor: "#0098fd",
      color: "#fff",
      padding: "5px 10px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#fff",
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 900,
      fontSize: "20px",
      textTransform: "uppercase",
    }),
    menu: (provided) => ({
      ...provided,
      border: "none",
      borderRadius: 0,
      backgroundColor: "#0098fd",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 900,
      textTransform: "uppercase",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "30vh",
    }),
  };

  useEffect(() => {
    select(".cloudRemove").remove();
    const fontScale = scaleLinear()
      .range([20, 100])
      .domain(extent(parsedData.map((d) => d.count)));

    let layout = d3Cloud()
      .size([innerDimensions.width, innerDimensions.height])
      .words(
        parsedData.map(function (d) {
          return { text: d.word, size: d.count, category: d.category };
        })
      )
      .padding(7)
      .font("Montserrat")
      .rotate((d) => 0)
      .fontSize((d) => fontScale(d.size))
      .on("end", (d) => {
        select(".cloudContainer")
          .append("g")
          .classed("cloudRemove", true)
          .attr(
            "transform",
            `translate(${
              layout.size()[0] / 2 +
              innerDimensions.width +
              margin.left * 2 +
              margin.right
            }, ${layout.size()[1] / 2 + margin.top + 10})`
          )
          .selectAll("text")
          .data(d)
          .enter()
          .append("text")
          .style("font-size", function (d) {
            return d.size;
          })
          .style("fill", (d) => {
            return colors[d.category];
          })
          .style("font-family", "Montserrat")
          .style("font-weight", "900")
          .attr("text-anchor", "middle")
          .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function (d) {
            return d.text;
          });
      });
    layout.start();
  }, [parsedData, margin, innerDimensions]);

  const handleLanguageChange = (selectedOption) => {
    setLanguageFilter(selectedOption?.value);
  };

  const handleCategoryChange = (selectedOption) => {
    setCategoryFilter(selectedOption?.value);
  };

  useEffect(() => {
    setParsedData(parseWordcloudData(data, languageFilter, categoryFilter));
  }, [languageFilter, categoryFilter, data]);

  return (
    <g>
      <g className="cloudContainer"></g>
      <foreignObject
        width={innerDimensions.width + 100}
        height="400"
        x={dimensions.width / 2 + margin.left}
        y={20}
      >
        <div className="cloud-buttons">
          <div className="audience">Ideas</div>
          <Select
            className="language-selector"
            options={languageOptions}
            styles={customStyles}
            placeholder="languages"
            onChange={handleLanguageChange}
            isClearable={true}
            isSearchable={false}
          />
          <Select
            className="category-selector"
            options={categoryOptions}
            styles={customStyles}
            placeholder="Topics"
            onChange={handleCategoryChange}
            isClearable={true}
            isSearchable={false}
          />
        </div>
      </foreignObject>
    </g>
  );
};

export default Wordcloud;
