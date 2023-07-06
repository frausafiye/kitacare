import React, { useEffect, useState } from "react";

const ImageDisplay = ({ imageData }) => {
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

      for (const image of imageData) {
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
  }, [imageData]);

  return (
    <div>
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
