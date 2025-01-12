import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { MyContext } from "../../../../Container";
export default function CalendarForm(props) {
  const { authCheckHandler } = useContext(MyContext);
  const [data, setData] = useState({
    startDate: "",
    endDate: "",
    name: "",
    //creator: "",
  });
  const history = useHistory();
  const [message, setMessage] = useState({
    submitting: false,
    status: null,
  });
  const date = props.day;

  const handleMessage = (ok, msg) => {
    setMessage({
      submitting: false,
      status: { ok, msg },
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/calendar/postNewEvent`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: data,
    })
      .then((response) => {
        if (response.data.success) {
          // console.log(response.data.event);
          handleMessage(true, "Event added!");
          history.go(0);
        } else {
          console.log(response);
        }
      })
      .catch((err) => authCheckHandler(err));
  };

  const grabValue = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="cform">
      <h1>Add Event!</h1>
      <form onSubmit={submitForm}>
        <div className="date">
          <label htmlFor="start"> Start Date</label>
          <input
            type="date"
            name="startDate"
            defaultValue={date}
            min="2018-01-01"
            max="2022-12-31"
            onChange={grabValue}
          />
        </div>
        <div className="date">
          <label htmlFor="end"> End Date</label>
          <input
            type="date"
            name="endDate"
            defaultValue={date}
            min="2018-01-01"
            max="2022-12-31"
            onChange={grabValue}
          />
        </div>
        <input
          type="text"
          name="name"
          placeholder="Enter event"
          className="text-event"
          onChange={grabValue}
        />
        <button type="submit" value="Submit" className="submit event">
          Submit
        </button>
        {message.status && (
          <p
            className={!message.status.ok ? "errorMsg" : ""}
            style={{ fontSize: "0.65rem", margin: "0.5rem" }}
          >
            {message.status.msg}
          </p>
        )}
      </form>
    </div>
  );
}
