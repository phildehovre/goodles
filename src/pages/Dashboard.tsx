import React, { useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import CreateTodo from "../components/CreateTodo";
import TodoList from "../components/TodoList";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";

function Dashboard() {
  const session = useSession();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!session) {
  //     navigate("/");
  //   }
  // });

  return (
    <div className="dashboard-ctn">
      {session && (
        <>
          <CreateTodo />
          <TodoList />
        </>
      )}
    </div>
  );
}

export default Dashboard;
