import { faCalendar, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Todos.scss";
import dayjs from "dayjs";
import Spinner from "./Spinner";
import { postTodos } from "../apis/googleCalendar";
import { useSession } from "@supabase/auth-helpers-react";

function Todo(props: {
  todo: any;
  handleDelete: (id: string) => void;
  isDeleting: boolean;
}) {
  const { todo, handleDelete, isDeleting } = props;
  const session = useSession();

  const [isHovered, setIsHovered] = React.useState(false);

  const handlePostTodo = async () => {
    const res = await postTodos([todo], session);
    console.log(res);
  };
  return (
    <div
      className="todo-ctn"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div className="todo_left-ctn">
        <div className="todo_title-ctn">
          <div
            id="category"
            style={{
              backgroundColor: `${
                todo.category === "work" ? "var(--type-1)" : "var(--type-2)"
              }`,
            }}
          ></div>
          {todo.title}
        </div>
        <div>{dayjs(todo.startDate).format("dddd DD/MM/YYYY")}</div>
      </div>
      <div className="todo_right-ctn"></div>

      {isHovered && (
        <>
          <button onClick={handlePostTodo}>
            <FontAwesomeIcon icon={faCalendar} />
          </button>
          <div className="todo-delete">
            {isDeleting ? (
              <Spinner />
            ) : (
              <FontAwesomeIcon
                icon={faClose}
                onClick={() => handleDelete(todo.calendar_id)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Todo;
