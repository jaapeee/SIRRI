import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Sample from "./components/Sample";



function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path ='/' element={<Landing/>}/>
        <Route path ='Sample' element={<Sample/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
