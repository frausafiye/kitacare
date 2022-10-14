import axios from "axios";
import React, { useState } from "react";
import styles from "./children.module.scss";

export default function ChildGroupEdit({ child, groups }) {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const changeGroup = (id) => {
    //to assign none as group:
    let obj;
    if (selectedGroup === "empty") {
      obj = {
        method: "PUT",
        url: `${process.env.REACT_APP_BASE_URL}/child/deleteChildsGroup/${id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
    } else {
      obj = {
        method: "PUT",
        withCredentials: true,
        url: `${process.env.REACT_APP_BASE_URL}/child/updateChild/${id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: { group: selectedGroup },
      };
    }
    axios(obj)
      .then((result) => {
        if (result.data.success) {
          console.log(result.data);
        } else {
          console.log(result.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form>
      <div className={styles.groups}>
        {groups.map((group) => {
          return (
            <label key={group.groupName} htmlFor={group.groupName}>
              <input
                type="radio"
                id={group.groupName}
                name="group"
                value={group.groupName}
                onClick={() => setSelectedGroup(group._id)}
              />
              {group.groupName}
            </label>
          );
        })}
        <label key="none" htmlFor="none" style={{ flexDirection: "row" }}>
          <input
            type="radio"
            id="none"
            name="group"
            value="none"
            onClick={() => setSelectedGroup("empty")}
          />
          none
        </label>
        <button
          onClick={() => changeGroup(child._id)}
          disabled={selectedGroup ? false : true}
          className="add"
        >
          save
        </button>
      </div>
    </form>
  );
}
