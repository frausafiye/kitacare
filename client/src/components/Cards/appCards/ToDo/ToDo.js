import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import ToDosContainer from "./ToDosContainer";
import ToDonesContainer from "./ToDonesContainer";
import { MyContext } from "../../../../Container";
import "./Todo.scss";
import styles from "../../../../pages/Dashboards/ManagerDashboard/ManagerDashboard.module.scss";
import Tstyles from "../../../../pages/Dashboards/TeacherDashboard/TeacherDashboard.module.scss";
import axios from "axios";

export default function Todo() {
  const location = useLocation();
  let page = location.pathname === "/mpage" ? "mpage" : "tpage";

  let [todos, setTodos] = useState([]);
  const { user, authCheckHandler } = useContext(MyContext);
  let toDos = todos.length ? todos.filter((item) => !item.done) : [];
  let toDones = todos.length ? todos.filter((item) => item.done) : [];

  const serviceHandler = async (serviceType, payload) => {
    let method, url;
    if (serviceType === "getData") {
      method = "GET";
      url = "getTodos";
    } else if (serviceType === "addData") {
      method = "POST";
      url = "addTodo";
    } else if (serviceType === "updateData") {
      method = "PUT";
      url = "updateTodo";
    } else if (serviceType === "deleteData") {
      method = "DELETE";
      url = "deleteTodo";
    }
    try {
      let result = await axios({
        method: method,
        url: `${process.env.REACT_APP_BASE_URL}/users/${url}/${user._id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: payload,
      });
      if (result.data.success) {
        if (method === "GET") setTodos(result.data.todos);
        else setTodos(result.data.updatedTodos);
      } else console.log(result);
    } catch (err) {
      authCheckHandler(err);
    }
  };

  useEffect(() => {
    //onload get todos from database:
    serviceHandler("getData");
  }, []);

  let addItem = (value) => {
    serviceHandler("addData", { text: value, done: false });
  };

  let updateItem = (value) => {
    serviceHandler("updateData", { value: value });
  };

  let deleteItem = (value) => {
    serviceHandler("deleteData", { value: value });
  };

  return (
    <div className={page === "mpage" ? styles.mTodo : Tstyles.tTodo}>
      <div className="app">
        <ToDosContainer
          toDos={toDos}
          addItem={addItem}
          updateItem={updateItem}
          deleteItem={deleteItem}
        />
        <ToDonesContainer
          toDones={toDones}
          updateItem={updateItem}
          deleteItem={deleteItem}
        />
      </div>
    </div>
  );
}
