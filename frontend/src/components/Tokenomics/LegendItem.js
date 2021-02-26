import React from "react";

const LegendItem = (props) => {
  return (
    <div className="d-flex text-center">
      <div
        style={{
          backgroundColor: props.color,
          width: "20px",
          height: "20px",
          marginRight: "5px",
        }}
      ></div>
      <div>{props.text}</div>
    </div>
  );
};

export default LegendItem;
