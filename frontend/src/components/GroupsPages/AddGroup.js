import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./groups.module.scss";
import { MyContext } from "../../Container";

export default function AddGroup() {
  const {user} = useContext(MyContext)
  const [data, setData] = useState({});
  const[setMessage] = useState(false)

  const handleMessage = e => {
    
  }
  const submitForm = e => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:3001/groups/addGroup",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {...data, kg: user.kg}
    })
      .then(response => {
        if (response.data.success) {
          setMessage(true, "Thank you! We received your information :)")
          console.log(response.data.group);
        } else {
          console.log(response);
        }
      })
      .catch(err => console.log(err));
  };

  const grabValue = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.title}>
        <h3>Information we need:</h3>
      </div>
      <form onSubmit={submitForm}>
        <div className={styles.addcontainer}>
          <div className={styles.addinfo}>
            <label>Group Name</label>
            <br />
            <input
              type='text'
              name='groupName'
              placeholder='groupName'
              onChange={grabValue}
            />
          </div>
          <div className={styles.addinfo}>
            <label>Room</label>
            <br />
            <input
              type='text'
              name='room'
              placeholder='room'
              onChange={grabValue}
            />
          </div>
          <div className={styles.addinfo}>
            <label className='details'>Age Group</label>
            <br />
            <input
              type='text'
              name='ageGroup'
              placeholder='ex: children between 1 and 2 years old'
              onChange={grabValue}
            />
          </div>
          <div className={styles.addinfo}>
            <label>Description</label>
            <br />
            <input
              type='text'
              name='description'
              placeholder='group description'
              onChange={grabValue}
            />
          </div>
        </div>
        <div className={styles.btn}>
        <Link to ="/groups">
        <button type='submit' value='Cancel' className='cancel'>
          Cancel
        </button>
        </Link>
        <button type='submit' value='Submit' className='submit'>
          Submit
        </button>
        </div>
      </form>
    </div>
  );
}
