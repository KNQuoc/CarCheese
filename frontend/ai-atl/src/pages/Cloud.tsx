// Cloud.js
import React from "react";

const Cloud = ({ left, top, delay }) => (
  <div
    className="cloud"
    style={{
      left: `${left}%`,
      top: `${top}%`,
      animationDelay: `${delay}s`,
    }}
  />
);

export default Cloud;
