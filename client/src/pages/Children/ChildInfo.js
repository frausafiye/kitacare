import React from "react";
import styles from "./children.module.scss";
import kid1 from "../../images/kid_avatar.svg";
import kid2 from "../../images/kid_avatar2.svg";
import kid3 from "../../images/kid_avatar3.svg";
import kid4 from "../../images/kid_avatar4.svg";
export default function ChildInfo({ child, imageNum }) {
  const images = [kid1, kid2, kid3, kid4];
  const randImg = images[imageNum];
  return (
    <>
      <div className={styles.kidimg}>
        <img src={randImg} className={styles.kid} alt="profileImg" />
      </div>
      <div className={styles.col1}>
        <p className={styles.bold2}>
          {child.firstName} {child.lastName}
        </p>
      </div>
      <div className={styles.maininfo}>
        <div className={styles.col}>
          <p className={styles.info}>{child.birthday.split("T")[0]}</p>
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
            {"Allergies: " + child.allergies.join(" ")}
          </p>
        </div>
        <div className={styles.col2}>
          <p className={styles.info}>
            Dietary Needs:{" "}
            {child.dietaryNeeds
              ? child.dietaryNeeds
              : "No dietary needs provided"}
          </p>
        </div>
        <div className={styles.col2}>
          <p className={styles.info}>
            Group: {child.group ? child.group.groupName : "none"}
          </p>
        </div>
      </div>
    </>
  );
}
