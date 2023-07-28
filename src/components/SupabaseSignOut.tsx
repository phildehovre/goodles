import React from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import "./Dropdown.scss";
import { useNavigate } from "react-router-dom";

function SupabaseSignOut() {
  const session = useSession(); //tokens, when session exists, we have a user
  const supabase = useSupabaseClient(); // talk to supabase

  const navigate = useNavigate();
  async function signOut() {
    try {
      await supabase.auth.signOut().then(() => sessionStorage.clear());
    } catch (error) {
      alert(error);
    } finally {
      navigate("/");
    }
  }

  return (
    <li
      style={{ textAlign: "left" }}
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </li>
  );
}

export default SupabaseSignOut;
