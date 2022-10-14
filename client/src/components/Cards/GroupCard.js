import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { MyContext } from "../../Container";
import styles from "../../pages/Dashboards/TeacherDashboard/TeacherDashboard.module.scss";
export default function GroupCard() {
  const { user } = useContext(MyContext);
  const history = useHistory();

  const handleView = () => {
    history.push({
      pathname: ["/children"],
      state: { group: user.group },
    });
  };
  return (
    <div className={styles.tGroup}>
      <div className={styles.gHead}>
        <h2>Group:</h2>
        <h3 className={styles.gHeader}>{user.group.groupName}</h3>
      </div>
      {user.group.description && <p>{user.group.description}</p>}
      {user.group.ageGroup && <li>Group age: {user.group.ageGroup}</li>}
      {user.group.room && <li>Room: {user.group.room}</li>}
      <br />
      <br />
      <button onClick={() => handleView()} className="add">
        View Group
      </button>
      <Link to="/attendance">
        <button className="view">Check Attendance</button>
      </Link>
    </div>
  );
}
