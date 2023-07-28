import { useSession } from "@supabase/auth-helpers-react";
import DropdownMenu from "./Dropdown";
import "./Navbar.scss";
import React from "react";
import SupabaseLogin from "./SupabaseLogin";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const handleProfileClick = () => {
    setShow(show);
  };

  const session = useSession();

  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        onClick={() => {
          navigate("");
        }}
      >
        {/* <h2>ToGoos</h2> */}
      </div>
      <div className="navbar-buttons">
        <button className="navbar-button">Home</button>
        {session ? (
          <DropdownMenu
            options={["About", "Settings", "Profile", "sign out"]}
            onSelect={() => {
              console.log("clicked");
            }}
          >
            <div
              className="user-icon"
              style={{
                backgroundImage: `url(${session?.user?.user_metadata.avatar_url})`,
              }}
            ></div>
          </DropdownMenu>
        ) : (
          <SupabaseLogin />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
