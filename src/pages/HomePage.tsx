import React, { useEffect } from "react";
import "./HomePage.scss";
import Hero from "../components/Hero";
import { useSession } from "@supabase/auth-helpers-react";
import { getCookie, setCookie } from "../utils/helpers";
import Dashboard from "./Dashboard";

function HomePage() {
  const session = useSession();

  const [isFirstVisit, setIsFirstVisit] = React.useState(true);

  useEffect(() => {
    setCookie("visitCount", Number(getCookie("visitCount")) + 1, 365);
    if (Number(getCookie("visitCount")) > 2) {
      setCookie("isFirstVisit", false, 365);
      setIsFirstVisit(getCookie("isFirstVisit") === "true");
    }
  }, []);

  console.log(document.cookie);
  return (
    <div className="homepage-ctn">
      {!session && <Hero />}
      {!isFirstVisit && <Dashboard />}
    </div>
  );
}

export default HomePage;
