import React from "react";
import { treemap, stratify } from "d3";

const Treemap = ({ dimensions }) => {
  const data = [
    { name: "Origin", parent: "", value: "" },
    { name: "group", parent: "Origin", value: 15 },
    { name: "group2", parent: "Origin", value: 25 },
    { name: "group3", parent: "Origin", value: 50 },
    { name: "group4", parent: "Origin", value: 5 },
    { name: "group5", parent: "Origin", value: 89 },
    { name: "group6", parent: "Origin", value: 200 },
  ];

  let root = stratify()
    .id(function (d) {
      return d.name;
    })
    .parentId(function (d) {
      return d.parent;
    })(data);

  root.sum(function (d) {
    return +d.value;
  });

  treemap()
    .size([dimensions.width / 2, dimensions.height])
    .padding(10)(root);

  return (
    <g
      className="treemapContainer"
      transform={`translate(${dimensions.width / 2}, 0)`}
    >
      {root.leaves().map((leave) => {
        return (
          <g>
            <rect
              x={leave.x0}
              y={leave.y0}
              width={leave.x1 - leave.x0}
              height={leave.y1 - leave.y0}
              stroke="#000"
              fill="blue"
            />
            <image
            href="https://images.pexels.com/photos/1067333/pexels-photo-1067333.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            x={leave.x0}
            y={leave.y0}
            width={leave.x1 - leave.x0}
            height={leave.y1 - leave.y0}
            />
          </g>
        );
      })}
    </g>
  );
};

export default Treemap;
