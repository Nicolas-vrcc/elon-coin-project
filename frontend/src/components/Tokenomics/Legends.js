import React from "react";
import LegendItem from "./LegendItem";
import "./styles.css";

const Legends = (props) => {
  return (
    <div className="legend">
      {Object.keys(props.data).map((e, i) => (
        <LegendItem
          key={i + e + props.colors[i]}
          color={props.colors[i]}
          text={e}
        />
      ))}
    </div>
  );
};

export default Legends;
