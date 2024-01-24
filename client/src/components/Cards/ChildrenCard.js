import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../Container";
import styles from "../../pages/Dashboards/ManagerDashboard/ManagerDashboard.module.scss";

export default function ChildrenCard() {
  const [children, setChildren] = useState([]);
  const { user, authCheckHandler } = useContext(MyContext);
  const getAllChildren = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.REACT_APP_BASE_URL}/child/getAllChildren/${user.kg}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.data.success) {
          setChildren(response.data.allChildren);
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        authCheckHandler(err);
      });
  };
  useEffect(() => {
    getAllChildren();
  }, []);
  return (
    <div className={styles.mChildren}>
      <h3>Childrens</h3>
      <p>Find all the information of the children:</p>
      <p>
        how many children in that kindergarden and all the children necessary
        information!
      </p>
      <p>Total: {children.length}</p>
      <Link to="/cregister">
        <button type="submit" value="add" className="add">
          Add
        </button>
      </Link>
      <Link to="/children">
        <button type="submit" value="view" className="view">
          View
        </button>
      </Link>
    </div>
  );
}
