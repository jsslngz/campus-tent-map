import React, { useEffect } from "react";
import { select, scaleLinear, extent } from "d3";
import * as d3Cloud from "d3-cloud";

const Wordcloud = ({ dimensions }) => {
  const data = [
    { text: "Hey", value: 1000 },
    { text: "lol", value: 200 },
    { text: "first impression", value: 800 },
    { text: "very cool", value: 1000000 },
    { text: "duck", value: 10 },
  ];

  const colorScale = scaleLinear()
    .range(["red", "yellow", "blue", "green"])
    .domain(data.map((d) => d.text));

  const fontScale = scaleLinear()
    .range([20, 150])
    .domain(extent(data.map((d) => d.value)));

  useEffect(() => {
    let layout = d3Cloud()
      .size([dimensions.width / 2, dimensions.height])
      .words(
        data.map(function (d) {
          return { text: d.text, size: d.value };
        })
      )
      .padding(3)
      .font("Montserrat")
      .rotate((d) => 0)
      .fontSize((d) => fontScale(d.size))
      .on("end", (d) => {
        select(".cloudContainer")
          .attr(
            "transform",
            `translate(${layout.size()[0] / 2}, ${layout.size()[1] / 2})`
          )
          .selectAll("text")
          .data(d)
          .enter()
          .append("text")
          .style("font-size", function (d) {
            return d.size;
          })
          .style("fill", (d) => {
            return colorScale(d.size);
          })
          .style("font-family", "Montserrat")
          .attr("text-anchor", "middle")
          .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function (d) {
            return d.text;
          });
      });
    layout.start();
  });

  return <g className="cloudContainer"></g>;
};

export default Wordcloud;
