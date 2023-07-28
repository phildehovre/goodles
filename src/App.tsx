import "./App.css";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route element={<HomePage />} path=""></Route>
            <Route element={<Dashboard />} path="/dashboard"></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
