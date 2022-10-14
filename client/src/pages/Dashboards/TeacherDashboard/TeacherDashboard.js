import React, { useContext } from "react";
import styles from "./TeacherDashboard.module.scss";
import Calendar from "../../../components/Cards/appCards/Calendar/Calendar";
import GroupCard from "../../../components/Cards/GroupCard";
import ToDo from "../../../components/Cards/appCards/ToDo/ToDo";
import UserInfoSidebar from "../../../components/Cards/UserInfoSidebar";
import { MyContext } from "../../../Container";

export default function Tpage(props) {
  const { user } = useContext(MyContext);
  return (
    <div className={styles.tpContainer}>
      <UserInfoSidebar />
      <div className={styles.features}>
        {user.group && <GroupCard />}
        <ToDo />
        <Calendar />
      </div>
    </div>
  );
}
