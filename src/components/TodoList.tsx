import React, { isValidElement } from "react";
import { deleteTodo, useTodos } from "../utils/db";
import { useSession } from "@supabase/auth-helpers-react";
import Todo from "./Todo";
import "./Todos.scss";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCalendarEvent, postTodos } from "../apis/googleCalendar";
import CardWrapper from "./layout/CardWrapper";
import Spinner from "./Spinner";

function TodoList() {
  const session = useSession();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isPosting, setIsPosting] = React.useState(false);

  const { data: todosData, isLoading, error } = useTodos(session?.user.id);

  const useDelete = useMutation({
    mutationFn: deleteTodo,
  });
  function handleDelete(id: string) {
    setIsDeleting(true);
    deleteCalendarEvent(id, session).then(() => {
      useDelete
        .mutateAsync(id)
        .then((res) => {
          queryClient.invalidateQueries({ queryKey: ["todos"] });
        })
        .then(() => setIsDeleting(false));
    });
  }

  const handlePostTodos = async () => {
    setIsPosting(true);
    const response = await postTodos(todosData?.data, session)
      .then((res) => {
        console.log(res);
      })
      .then(() => setIsPosting(false))
      .then(() => alert("Todos Posted to Google Calendar"));
  };

  return (
    <>
      {todosData?.data?.length !== 0 && (
        <CardWrapper title="Todos">
          <span>
            {isPosting ? (
              <Spinner />
            ) : (
              <button onClick={() => handlePostTodos()}>Post to Google</button>
            )}
          </span>
          <div className="todo_list-ctn">
            {todosData?.data?.map((todo, i) => {
              return (
                <Todo
                  handleDelete={handleDelete}
                  todo={todo}
                  isDeleting={isDeleting}
                  key={i}
                />
              );
            })}
          </div>
        </CardWrapper>
      )}
    </>
  );
}

export default TodoList;
