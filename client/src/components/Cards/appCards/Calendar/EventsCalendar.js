import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./calendar.module.scss";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../../../Container";

export default function EventsCalendar() {
  const backspace = <FontAwesomeIcon icon={faBackspace} size="2x" />;
  const [showEvents, setShowEvents] = useState([]);
  const dateFormat = "dd/MM";
  const history = useHistory();
  const { authCheckHandler } = useContext(MyContext);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/calendar/getAllEvents`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((result) => {
        if (result.data.success) {
          setShowEvents(result.data.event);
        } else {
          console.log(result.data.getAllEvents);
        }
      })
      .catch((err) => authCheckHandler(err));
  }, []);

  const handleDelete = (id) => {
    axios(
      `${process.env.REACT_APP_BASE_URL}/calendar/deleteSingleEvent/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
      .then((result) => {
        if (result.data.success) {
          console.log(result.data);
          history.go(0);
        } else {
          console.log(result);
        }
      })
      .catch((err) => authCheckHandler(err));
  };

  return (
    <div>
      {showEvents.map((event, i) => {
        return (
          <div key={i} className={styles.container}>
            <p>
              <span className={styles.date}>
                {" "}
                {format(new Date(event.startDate), dateFormat)} -{" "}
                {format(new Date(event.endDate), dateFormat)}{" "}
              </span>{" "}
              : {event.name}
            </p>
            <button
              type="submit"
              value="delete"
              className={styles.delete}
              onClick={() => handleDelete(event._id)}
            >
              {backspace}
            </button>
          </div>
        );
      })}
    </div>
  );
}
