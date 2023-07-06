import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../Container";
import publicUserImg from "../../images/user-public-image.png";
import Mstyles from "../../pages/Dashboards/ManagerDashboard/ManagerDashboard.module.scss";
import Tstyles from "../../pages/Dashboards/TeacherDashboard/TeacherDashboard.module.scss";
import ImageDisplay from "../ImageDisplay";

export default function UserImage(props) {
  const { user, setUser, authCheckHandler } = useContext(MyContext);
  const inputFile = useRef(null);
  const [file, setFile] = useState(null);
  const [defaultUserImage, setDefaultUserImage] = useState(
    user.img || publicUserImg
  );
  const [imageData, setImageData] = useState();

  const onButtonClick = () => {
    inputFile.current.click();
  };

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_BASE_URL}/profile/uploadImg`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: formData,
      })
        .then((response) => {
          if (response.data.success) {
            console.log(response.data);
            if (response.data.user) setUser(user);
            //display the image using uploaded file:
            // const objectURL = URL.createObjectURL(file);
            // setDefaultUserImage(objectURL);
            //display img using user.img:
            console.log(response.data.user.img);
            getUserImage(response.data.user.img);
          } else {
            console.log(response);
          }
        })
        .catch((err) => authCheckHandler(err));
    }

    return () => URL.revokeObjectURL(defaultUserImage);
  }, [file]);

  const getUserImage = (url) => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/profile/getUserImg/${url}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setImageData(response.data.img);
        } else {
          console.log(response.message);
        }
      })
      .catch((err) => authCheckHandler(err));
  };

  return (
    <div
      className={props.page === "mpage" ? Mstyles.mImg : Tstyles.tImg}
      onClick={onButtonClick}
    >
      {/* <img src={user.img || defaultUserImage} alt="user" />
       */}
      {imageData ? (
        <ImageDisplay imageData={imageData} alt="user" />
      ) : (
        <img src={defaultUserImage} alt="user" />
      )}
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
        accept="image/*"
      />
    </div>
  );
}
