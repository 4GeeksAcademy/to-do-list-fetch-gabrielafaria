import React, { useState, useEffect } from "react";

const url = "https://playground.4geeks.com/todo";

const createUser = () => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "gabrielaFaria", id: 0 }),
  };
  fetch(url + "/users/gabrielaFaria", options)
    .then((r) => r.json())
    .then((d) => console.log("created user data:", d));
};

const getAllUsers = () => {
  fetch(url + "/users")
    .then((resp) => resp.json())
    .then((data) => console.log("getAllUsersData:", data));
};

const updateToDo = () => {
  let options = {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      label: "string",
      is_done: false,
    }),
  };
  fetch(url + "/todos/36", options)
    .then((resp) => resp.json())
    .then((data) => console.log("updated:", data));
};

const Home = () => {
  const [chores, setChores] = useState([]);
  const [newchore, setNewChore] = useState({ label: "", is_done: false });

  const nextChore = () => {
    setChores([newchore, ...chores]);
    setNewChore({ label: "", is_done: false });
  };

  const deleteToDo = (ID) => {
    let options = { method: "DELETE" };
    fetch(url + "/todos/" + ID, options)
      .then((resp) => resp.json())
      .then((data) => console.log("deleted :", data));
	  getTodos();
	
  };

  const getTodos = () => {
    fetch(url + "/users/gabrielaFaria")
      .then((resp) => resp.json())
      .then((data) => setChores(data.todos));
  };

  const addToDo = (Label) => {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        label: Label,
        is_done: false,
      }),
    };
    fetch(url + "/todos/gabrielaFaria", options)
      .then((resp) => resp.json())
      .then((data) => console.log("dataAddToDos:", data));
    getTodos();
  };

  useEffect(() => {
    createUser();
    getTodos();
  }, []);

  return (
    <div className="container text-center">
      <h1 >To Do List</h1>

      <input
        value={newchore.label}
        type="text"
        placeholder="Add new task"
        onChange={(e) =>
          setNewChore({ label: e.target.value, is_done: false })
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            nextChore();
            addToDo(newchore.label);
            setNewChore({ label: "", is_done: false })
          }
        }}
      />

      <ul>
        {chores.map((item, i) => (
          <div  className="choresList" key={i + "chores"}>
            <li>{item.label}</li>
            <span
              style={{ cursor: "pointer", marginLeft: "8px", color: "red" }}
              onClick={() => deleteToDo(item.id)}
            >
              X
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Home;
