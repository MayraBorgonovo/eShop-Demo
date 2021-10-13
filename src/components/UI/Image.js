import React from "react";
import defaultImage from "../../assets/assorted-rack.jpg";

const Image = (props) => {
  let imagePath;
  try {
    imagePath = require(`../../assets/${props.src}`).default;
  } catch (err) {
    imagePath = defaultImage;
  }
  return (
    <img
      src={imagePath}
      className={props.className}
      alt={props.alt}
      onClick={props.onClick}
    />
  );
};

export default Image;
