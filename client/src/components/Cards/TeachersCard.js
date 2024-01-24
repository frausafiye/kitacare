import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../Container";
import styles from "../../pages/Dashboards/ManagerDashboard/ManagerDashboard.module.scss";
export default function TeachersCard() {
  const [teachers, setTeachers] = useState([]);
  const { kg, user, authCheckHandler } = useContext(MyContext);
  const getAllTeachers = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_URL}/users/teachers/${user.kg}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.data.success) {
          setTeachers(response.data.teachers);
        } else {
          console.log(response);
        }
      })
      .catch((err) => authCheckHandler(err));
  };

  useEffect(() => {
    getAllTeachers();
  }, []);
  return (
    <div className={styles.mTeachers}>
      <h3>Teachers</h3>
      <p>Find all the teacher information:</p>
      <p>
        how many children in that teachers group and all the teachers necessary
        information!
      </p>
      <p>Total: {teachers.length}</p>
      <Link to="/teachers">
        <button type="submit" value="view" className="view">
          View
        </button>
      </Link>
    </div>
  );
}
