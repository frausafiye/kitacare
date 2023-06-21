import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../Container";
import styles from "../../pages/Dashboards/ManagerDashboard/ManagerDashboard.module.scss";

export default function GroupsCard() {
  const [groups, setGroups] = useState([]);
  const { kg, user, authCheckHandler } = useContext(MyContext);

  const getAllGroups = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/groups/getAllGroups/${user.kg}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((result) => {
        if (result.data.success) {
          setGroups(result.data.allGroups);
        } else {
          console.log(result);
        }
      })
      .catch((err) => authCheckHandler(err));
  };
  useEffect(() => {
    getAllGroups();
  }, []);
  return (
    <div className={styles.mGroup}>
      <h3>Groups</h3>
      <p>Find all the groups information:</p>
      <p>how many children per group, ages, weekely plans and more!</p>
      <p>Total: {groups.length}</p>
      <Link to="/addgroup">
        <button type="submit" value="add" className="add">
          Add
        </button>
      </Link>
      <Link to="/groups">
        <button type="submit" value="view" className="view">
          View
        </button>
      </Link>
    </div>
  );
}
