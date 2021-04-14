import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./children.module.scss";
import { Link } from "react-router-dom";
import kid from "../../images/kid_avatar.svg";

export default function AllChildren(props) {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3001/child/getAllChildren/`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(result => {
        if (result.data.success) {
          setChildren(result.data.allChildren);
        } else {
          console.log(result);
        }
      })
      .catch(err => console.log(err));
  }, []);
  const handleEdit = child => {
    props.history.push({ pathname: "/editchild", state: { child: child } });
  };

  return (
    <div className={styles.container}>
      <h2>Children!</h2>
      <div key={children._id} className={styles.cContainer}>
        {children.map(child => {
          console.log(child.emergencyContact);
          return (
            <div className={styles.scontainer} key={child._id}>
              <img src={kid} className={styles.kid} />
              <div className={styles.col1}>
                <p className={styles.bold2}>
                  {child.firstName} {child.lastName}
                </p>
              </div>
              <div className={styles.col}>
                <p className={styles.info}>{child.birthday}</p>
              </div>
              <div className={styles.col}>
                <p className={styles.info}>
                  {child.address.street} {child.address.number},{" "}
                  {child.address.postcode} {child.address.city}
                </p>
              </div>
              <div className={styles.col}>
                <p className={styles.info}>Emergency Contact 1:</p>
                <p className={styles.info}>
                  {child.emergencyContact[0].emerName1}{" "}
                  {child.emergencyContact[0].emerEmail1}{" "}
                  {child.emergencyContact[0].emerNumber1}
                </p>
              </div>
              <div className={styles.col}>
                <p className={styles.info}>Emergency Contact 2:</p>
                <p className={styles.info}>
                  {child.emergencyContact[1].emerName2}{" "}
                  {child.emergencyContact[1].emerEmail2}{" "}
                  {child.emergencyContact[1].emerNumber2}
                </p>
              </div>
              <div className={styles.col2}>
                <p className={styles.info}>
                  Allergies: {child.allergies[0]} {child.allergies[1]}{" "}
                  {child.allergies[2]} {child.allergies[3]}
                  {child.allergies[4]} {child.allergies[5]}
                </p>
              </div>
              <div className={styles.col2}>
                <p className={styles.info}>
                  Dietary Needs: {child.dietaryNeeds}
                </p>
              </div>
              <div>
                <button
                  type='submit'
                  value='edit'
                  className='fixedit'
                  onClick={() => handleEdit(child)}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Link to='/cregister'>
        <button type='submit' value='add' className='add'>
          Add
        </button>
      </Link>
    </div>
  );
}
