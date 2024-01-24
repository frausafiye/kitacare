import React, { useContext, useState } from "react";
import { MyContext } from "../../Container";
import styles from "./children.module.scss";
import axios from "axios";
import ChildInfo from "./ChildInfo";
import ChildGroupEdit from "./ChildGroupEdit";

export default function Child(props) {
  const { user, authCheckHandler } = useContext(MyContext);
  const [groups, setGroups] = useState([]);
  const child = props.child;

  const getAllGroups = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/groups/getAllGroups/${user.kg} `,
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

  const handleEditGroup = () => {
    getAllGroups();
  };

  return (
    <div className={styles.scontainer} key={child._id}>
      <ChildInfo child={child} imageNum={props.imageNum} />
      <div className={styles.btn2}>
        {user.role === "Manager" && (
          <button
            value="edit"
            className="fixedit"
            onClick={() => props.handleEdit(child)}
          >
            Edit
          </button>
        )}
        {user.role === "Manager" && (
          <button
            value="edit"
            className="add"
            onClick={() => handleEditGroup()}
          >
            Edit Group
          </button>
        )}
        {groups && groups.length ? (
          <ChildGroupEdit child={child} groups={groups} />
        ) : null}
      </div>
    </div>
  );
}
