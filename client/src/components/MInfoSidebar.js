import React, { useContext } from "react";
import styles from "../pages/Dashboards/ManagerDashboard/ManagerDashboard.module.scss";
import managerImg from "../images/manager_photo.jpg";
import { MyContext } from "../Container";

export default function MInfoSidebar(props) {
  const { user } = useContext(MyContext);
  const handleEdit = () => {
    props.history.push({ pathname: "/editprofile" });
  };
  return (
    <div className={styles.mInfo}>
      <div className={styles.mImg}>
        <img src={managerImg} alt="manager" />
      </div>
      <div>
        <p>
          {user.firstName} {user.lastName}
        </p>
        <p>{user.email}</p>
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
