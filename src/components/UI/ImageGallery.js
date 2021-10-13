import { useState } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import Image from "./Image";
import classes from "./ImageGallery.module.css";

const ImageGallery = ({ images, title }) => {
  
  let imgArray = ["assorted-rack.jpg"];
  if (images) {
    imgArray = images;
  }
  const [selectedImg, setSelectedImg] = useState(imgArray[0]);

  return (
    <div className={classes.imgCtn}>
      <div className={classes.imgGallery}>
        {imgArray.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={title}
            className={selectedImg === img ? classes.active : ""}
            onClick={() => setSelectedImg(img)}
          />
        ))}
      </div>
      <div className={classes.selectedCtn}>
        <InnerImageZoom
          src={require(`../../assets/${selectedImg}`).default}
          zoomScale={0.3}
          alt={title}
          className={classes.selectedImg}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
