import React, { useEffect } from "react";
import "./Hero.scss";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

function Hero() {
  const navigate = useNavigate();
  const session = useSession();
  const supabase = useSupabaseClient(); // talk to supabase

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session]);
  useEffect(() => {
    // Target the lines of text using CSS classes or other selectors
    const lines = document.querySelectorAll(".animated-line");

    // Set initial position and opacity for the lines
    gsap.set(lines, { y: 20, opacity: 0 });

    // Create the staggered animation
    gsap.to(lines, {
      duration: 3, // Animation duration in seconds
      y: 0, // Translate to the intended position (change this value to adjust the translation)
      opacity: 1, // Fade into view
      stagger: 0.5, // Stagger the animation by 0.2 seconds between each line
      ease: "power1.easeOut", // Easing function for the animation (you can change this if desired)
    });
  }, []);

  async function googleSignIn() {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          scopes: "https://www.googleapis.com/auth/calendar", // scopes must be seperated by a space, under the same string.
          redirectTo: window.location.origin + "/dashboard",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      alert("Error logging in to Google with Supabase");
    }
  }

  const handleCTAClick = async () => {
    await googleSignIn().then(() => {
      navigate("/dashboard");
    });
  };
  return (
    <div className="hero-ctn">
      <div className="tagline-ctn">
        <h1 className="animated-line ">Take control</h1>
        <h1 className="animated-line ">of Your calendar</h1>
        <h4 className="animated-line ">We'll look after the rest.</h4>
        <>
          {session && (
            <button
              className="animated-line cta"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Create your first Todo!
            </button>
          )}
          {!session && (
            <button
              className="animated-line cta"
              onClick={() => {
                handleCTAClick();
              }}
            >
              Sign in
            </button>
          )}
        </>
      </div>
    </div>
  );
}

export default Hero;
