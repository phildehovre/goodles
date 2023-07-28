import React from "react";
import "./HomePage.scss";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div className="homepage-ctn">
      <Hero />
      <Footer />
    </div>
  );
}

export default HomePage;
