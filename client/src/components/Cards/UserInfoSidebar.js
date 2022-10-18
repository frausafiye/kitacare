import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Mstyles from "../../pages/Dashboards/ManagerDashboard/ManagerDashboard.module.scss";
import Tstyles from "../../pages/Dashboards/TeacherDashboard/TeacherDashboard.module.scss";
import managerImg from "../../images/manager_photo.jpg";
import { MyContext } from "../../Container";

export default function UserInfoSidebar(props) {
  const { user } = useContext(MyContext);
  const location = useLocation();
  const history = useHistory();
  let page = location.pathname === "/mpage" ? "mpage" : "tpage";

  const handleEdit = () => {
    history.push({ pathname: "/editprofile" });
  };
  return (
    <div className={page === "mpage" ? Mstyles.mInfo : Tstyles.tInfo}>
      <div className={page === "mpage" ? Mstyles.mImg : Tstyles.tImg}>
        <img
          src={
            page === "mpage"
              ? managerImg
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRwB0cF7kCDk34cCTq00XL6xX5kS19aTnDPA&usqp=CAU"
          }
          alt=""
        />
        {/* <img src={user.img!!}alt="user image"/> */}
      </div>
      <div>
        <p>
          {user.firstName} {user.lastName}
        </p>
        <p>{user.email}</p>
        <p>{user.phoneNumber}</p>
        {user.group && <p>{user.group.groupName}</p>}
        <button
          type="submit"
          value="edit"
          className="edit"
          onClick={() => handleEdit()}
        >
          Edit Info
        </button>
      </div>
    </div>
  );
}
