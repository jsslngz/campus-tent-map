import React, { useEffect } from "react";
import { select, selectAll } from "d3";

import { colors } from "../utils";

const Subtitles = ({ dimensions, margin, data }) => {
  useEffect(() => {
    let offset = 0;
    var nodeWidth = (d) => d.getBBox().width;
    selectAll(".legend").attr("transform", function (d, i) {
      let x = offset;
      offset += nodeWidth(this) + 25;
      return `translate(${x},${dimensions.height - 25})`;
    });

    select(".legends")
      .attr("transform", function () {
        return `translate(${(dimensions.width - nodeWidth(this)) / 2},${0})`;
      })
      .attr("opacity", 1);
  }, [data, dimensions]);

  return (
    <g className="legends" opacity="0">
      {data.map((d, i) => {
        return (
          <g key={d} className="legend">
            <rect
              x={0}
              y={0}
              stroke={colors[d]}
              strokeWidth={4}
              fill="none"
              width={15}
              height={15}
            />
            <text className="legend-text" x={20} y={12}>
              {d}
            </text>
          </g>
        );
      })}
    </g>
  );
};

export default Subtitles;
