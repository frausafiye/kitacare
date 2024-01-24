import React from "react";
import styles from "./ManagerDashboard.module.scss";
import Calendar from "../../../components/Cards/appCards/Calendar/Calendar";
import TeachersCard from "../../../components/Cards/TeachersCard";
import ChildrenCard from "../../../components/Cards/ChildrenCard";
import GroupsCard from "../../../components/Cards/GroupsCard";
import Todo from "../../../components/Cards/appCards/ToDo/ToDo";
import UserInfoSidebar from "../../../components/Cards/UserInfoSidebar";

export default function Mpage(props) {
  return (
    <div className={styles.mpContainer}>
      <UserInfoSidebar />
      <div className={styles.features}>
        <GroupsCard />
        <TeachersCard />
        <ChildrenCard />
        <Todo />
        <Calendar />
      </div>
    </div>
  );
}
