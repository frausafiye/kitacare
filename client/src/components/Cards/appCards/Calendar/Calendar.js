import React, { useEffect, useState, useContext } from "react";
import styles from "../../../../pages/Dashboards/ManagerDashboard/ManagerDashboard.module.scss";
import Tstyles from "../../../../pages/Dashboards/TeacherDashboard/TeacherDashboard.module.scss";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  toDate,
  addMonths,
  subMonths,
} from "date-fns";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CalendarForm from "./CalendarForm";
import axios from "axios";
import EventsCalendar from "./EventsCalendar";

import { useLocation } from "react-router-dom";
import { MyContext } from "../../../../Container";

export default function Calendar() {
  const left = <FontAwesomeIcon icon={faChevronCircleLeft} />;
  const right = <FontAwesomeIcon icon={faChevronCircleRight} />;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [showEvents, setShowEvents] = useState([]);
  const { authCheckHandler } = useContext(MyContext);

  const location = useLocation();
  let page = location.pathname === "/mpage" ? "mpage" : "tpage";

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

  const header = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="column col-start">
          <div className="icon" onClick={prevMonth}>
            {left}
          </div>
        </div>
        <div className="column col-center">
          <p className="month">{format(currentDate, dateFormat)}</p>
        </div>
        <div className="column col-end">
          <div className="icon" onClick={nextMonth}>
            {right}
          </div>
        </div>
      </div>
    );
  };
  const days = () => {
    const dateFormat = "EEEE";
    const days = [];
    let startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="column col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };
  const cells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;

        const relatedEvent = showEvents.find((event) => {
          return isSameDay(Date.parse(day), Date.parse(event.startDate));
        });

        days.push(
          <div
            className={`column cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) || relatedEvent
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => onDateClick(toDate(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  return (
<<<<<<< HEAD:client/src/components/Calendar/Calendar.js
    <div className="calendar">
      {showForm && (
        <div>
          <CalendarForm />
        </div>
      )}
      <>
        <div>{header()}</div>
        <div>{days()}</div>
        <div onClick={() => setShowForm(!showForm)}>{cells()}</div>
      </>
      <EventsCalendar />
=======
    <div className={page === "mpage" ? styles.calendar : Tstyles.calendar}>
      <div className="calendar">
        {showForm && (
          <div>
            <CalendarForm />
          </div>
        )}
        <>
          <div>{header()}</div>
          <div>{days()}</div>
          <div onClick={() => setShowForm(!showForm)}>{cells()}</div>
        </>
        <EventsCalendar />
      </div>
>>>>>>> 558b1bc1f5858c933ff60bb932737d06acd3e726:client/src/components/Cards/appCards/Calendar/Calendar.js
    </div>
  );
}
