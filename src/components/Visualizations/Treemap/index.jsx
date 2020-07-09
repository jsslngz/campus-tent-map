import React, { useState, useEffect } from "react";
import { treemap, stratify, format, scaleLinear, extent } from "d3";

import { colors, tents } from "../utils";

const Treemap = ({ dimensions, margin, data }) => {
  const [innerDimensions, setInnerDimensions] = useState({
    width: 0,
    height: 0,
  });

  const fontScale = scaleLinear()
    .range([8, 30])
    .domain(extent(data.map((d) => d.value)));

  useEffect(() => {
    setInnerDimensions({
      width: dimensions.width / 2 - margin.left,
      height: dimensions.height - margin.top - margin.bottom - 20,
    });
  }, [dimensions, margin]);

  let root = stratify()
    .id(function (d) {
      return d.group;
    })
    .parentId(function (d) {
      return d.parent;
    })(data);

  root.sum(function (d) {
    return +d.value;
  });

  treemap().size([innerDimensions.width, innerDimensions.height]).padding(30)(
    root
  );

  return (
    <g>
      <foreignObject width="200" height="100" x={margin.left + 25} y={20}>
        <div className="audience">Subjects</div>
      </foreignObject>
      <g
        className="treemapContainer"
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        {root?.leaves().map((leave) => {
          const leaveX0 = leave.x0;
          const leaveY0 = leave.y0;
          const leaveWidth = leave.x1 - leave.x0;
          const leaveHeight = leave.y1 - leave.y0;
          return (
            <g key={leave.data.group}>
              <rect
                x={leaveX0}
                y={leaveY0}
                width={leaveWidth}
                height={leaveHeight}
                stroke={colors[leave.data.group]}
                strokeWidth="7px"
                fill="#fff"
              />

              {leaveHeight > 30 && leaveWidth > 30 ? (
                <image
                  href={tents[leave.data.group]}
                  x={leaveX0 + 10}
                  y={leaveY0 + 10}
                  width={leaveWidth - 20 > 0 ? leaveWidth - 20 : 0}
                  height={leaveHeight - 50 > 0 ? leaveHeight - 50 : 0}
                />
              ) : (
                <g />
              )}
              {leaveHeight > 25 && leaveWidth > 25 ? (
                <text
                  className="treemap-text"
                  x={leaveX0 + leaveWidth / 2}
                  y={leaveY0 + leaveHeight - 10}
                  fill={colors[leave.data.group]}
                  fontSize={fontScale(leave.data.value)}
                  textAnchor={"middle"}
                >
                  {format(".0%")(leave.data.value / data.total.value)}
                </text>
              ) : (
                <g />
              )}
            </g>
          );
        })}
      </g>
    </g>
  );
};

export default Treemap;
