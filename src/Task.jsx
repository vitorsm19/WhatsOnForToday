import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose, faRefresh } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function Task({ taskName, id, handlers, color, completed }) {
  return (
    <div className="tasklist">
      <span className={color}>{taskName}</span>
      {!completed ? (
        <>
          <div className="complete">
            <button
              className={color}
              onClick={() => handlers.handleCompleteTask(id)}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
          <div className="delete">
            <button onClick={() => handlers.handleDeleteTask(id)}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
        </>
      ) : (
        <div>
          <button onClick={() => handlers.handleUndoCompletedTask(id)}>
            <FontAwesomeIcon icon={faRefresh} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Task;
