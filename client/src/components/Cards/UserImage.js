import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../Container";
import publicUserImg from "../../images/user-public-image.png";
import Mstyles from "../../pages/Dashboards/ManagerDashboard/ManagerDashboard.module.scss";
import Tstyles from "../../pages/Dashboards/TeacherDashboard/TeacherDashboard.module.scss";

export default function UserImage(props) {
  const { user, authCheckHandler } = useContext(MyContext);
  const inputFile = useRef(null);
  const [file, setFile] = useState(null);
  const [defaultUserImage, setDefaultUserImage] = useState(
    user.img || publicUserImg
  );

  const onButtonClick = () => {
    inputFile.current.click();
  };

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_BASE_URL}/users/uploadImage`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: formData,
      })
        .then((response) => {
          if (response.data.success) {
            //display the image:
            const objectURL = URL.createObjectURL(file);
            setDefaultUserImage(objectURL);
          } else {
            console.log(response);
          }
        })
        .catch((err) => authCheckHandler(err));
    }

    return () => URL.revokeObjectURL(defaultUserImage);
  }, [file]);

  return (
    <div
      className={props.page === "mpage" ? Mstyles.mImg : Tstyles.tImg}
      onClick={onButtonClick}
    >
      {/* <img src={user.img || defaultUserImage} alt="user" />
       */}
      <img src={defaultUserImage} alt="user" />
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
