import React, { useEffect, useState } from "react"; //Usestate
import Axios from "axios"; //import axios
import TodoListTasks from "../components/todo/TodoListTasks";

const ToDoLists = () => {
  const [lists, setLists] = useState([]);
  const [createList, setCreateList] = useState("");
  const [currentID, setcurrentID] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    //get data from backend
    Axios.get("http://localhost:3001/login").then((response) => {
      //if there is a cookie present
      if (response.data.loggedIn === true) {
        //set login status to true and return the username
        setcurrentID(response.data.user[0].id);
      }
    });
  }, []);

  const createLists = () => {
    Axios.post("http://localhost:3001/createList", {
      //post variables to backend
      list: createList, //set this variable equal to the value
      currentID: currentID,
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getLists", { currentID: currentID }).then(
      (response) => {
        setLists(response.data);
      }
    );
  });

  return (
    <div className="ToDoList">
      <div className="ToDoList-wrapper">
        <h2>To do lists</h2>
        <div className="ToDoList-lists">
          {lists.map((val, key) => {
            return (
              <div>
                <button onClick={() => setShow(true)}>{val.list}</button>
              </div>
            );
          })}
        </div>
        <h3>Create a new list</h3>
        <input
          type="text"
          onChange={(e) => {
            setCreateList(e.target.value);
          }}
          placeholder="List Name"
        />
        <button className="btn-primary" onClick={createLists}>
          Create
        </button>
      </div>
      <TodoListTasks onClose={() => setShow(false)} show={show} />
    </div>
  );
};

export default ToDoLists;
