import React, { useEffect, useState } from "react";

import Mstyles from "../pages/Dashboards/ManagerDashboard/ManagerDashboard.module.scss";
import Tstyles from "../pages/Dashboards/ManagerDashboard/ManagerDashboard.module.scss";
const ImageDisplay = (props) => {
  const [validImages, setValidImages] = useState([]);
  //   const [invalidImages, setInvalidImages] = useState([]);

  useEffect(() => {
    const checkImageValidity = (image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(image);
        img.onerror = () => reject(image);
        img.src = `data:image/jpeg;base64,${image.data}`;
      });
    };

    const validateImages = async () => {
      const valid = [];
      const invalid = [];

      for (const image of props.imageData) {
        try {
          await checkImageValidity(image);
          valid.push(image);
        } catch {
          invalid.push(image);
        }
      }

      setValidImages(valid);
      //setInvalidImages(invalid);
    };

    validateImages();
  }, [props.imageData]);

  return (
    <div className={props.page === "mpage" ? Mstyles.mImg : Tstyles.tImg}>
      {validImages.map((image, index) => (
        <img
          key={index}
          src={`data:image/jpeg;base64,${image.data}`}
          alt={`Profile ${index}`}
        />
      ))}
    </div>
  );
};

export default ImageDisplay;
