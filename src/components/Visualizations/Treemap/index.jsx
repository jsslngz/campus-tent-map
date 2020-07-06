import React from "react";

const Treemap = ({ dimensions }) => {
  return <g transform={`translate(${dimensions.width / 2}, 0)`}></g>;
};

export default Treemap;
