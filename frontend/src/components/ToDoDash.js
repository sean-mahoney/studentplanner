import React, { useEffect, useState } from "react"; //Usestate
import Axios from "axios"; //import axios
import { Link } from "react-router-dom";

function ToDoDash() {
  const [lists, setLists] = useState([]);
  const [currentID, setcurrentID] = useState("");

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

  useEffect(() => {
    Axios.get("http://localhost:3001/getLists", { currentID: currentID }).then(
      (response) => {
        setLists(response.data);
      }
    );
  });

  return (
    <div className="ToDoDash">
      <Link to="/ToDoLists">
        <h2>To-Do Lists</h2>
        <div className="ToDoDash-lists">
          {lists.map((val, key) => {
            return (
              <div>
                <p>{val.list}</p>
              </div>
            );
          })}
        </div>
      </Link>
    </div>
  );
}

export default ToDoDash;
