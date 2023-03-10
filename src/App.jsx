import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Task from "./Task";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [formError, setFormError] = useState({ error: "", hasError: false });

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks
      ? setTodoList(Object.values(tasks))
      : console.log("todoList not found");
  }, []);

  const handleTaskInputValue = (e) => {
    setNewTask(e.target.value);
    setFormError({
      error: "",
    });
  };

  const handleAddTask = () => {
    if (!newTask.trim()) {
      setFormError({ error: "*Type something to continue", hasError: true });
      return;
    }
    if (todoList.find((task) => task.taskName === newTask)) {
      setFormError({
        error: "*This task already exists",
        hasError: true,
      });
      return;
    }
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      color: "",
      completed: false,
    };
    setTodoList([...todoList, task]);
    setNewTask("");
    localStorage.setItem("tasks", JSON.stringify([...todoList, task]));
  };

  const handleDeleteTask = (id) => {
    const updatedTodoList = todoList.filter((task) => task.id !== id);
    setTodoList(updatedTodoList);
    localStorage.setItem("tasks", JSON.stringify(updatedTodoList));
  };

  const handleCompleteTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          task.completed = true;
          task.color = "green";
        }
        return task;
      })
    );
    localStorage.setItem("tasks", JSON.stringify(todoList));
  };

  const handleUndoCompletedTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          task.completed = false;
          task.color = "";
        }
        return task;
      })
    );
    localStorage.setItem("tasks", JSON.stringify(todoList));
  };

  const taskHandlers = {
    handleDeleteTask,
    handleCompleteTask,
    handleUndoCompletedTask,
  };

  return (
    <section className="App">
      <div className="header">
        <h1 className="title">What'sOnForToday?</h1>
        <div className="addTask">
          <div className="taskinfo">
            <input
              type="text"
              onChange={handleTaskInputValue}
              value={newTask}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTask();
                }
              }}
              placeholder={"Enter a task"}
            />

            <button
              onClick={handleAddTask}
              style={{
                borderColor: formError.hasError ? "#B63A3A" : "#6b7179",
              }}
            >
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: formError.hasError ? "#B63A3A" : "#6b7179" }}
              />
            </button>
          </div>

          {formError && <span className="error">{formError.error}</span>}
        </div>
      </div>

      <div className="task-section">
        {todoList.map((task) => {
          return (
            <Task
              taskName={task.taskName}
              id={task.id}
              handlers={taskHandlers}
              color={task.color}
              completed={task.completed}
            />
          );
        })}
      </div>
    </section>
  );
}

export default App;
