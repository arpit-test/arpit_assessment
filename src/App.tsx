import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Listing from "./components/Listing/Listing";
import Details from "./components/Details/Details";
import  { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Listing />} />
          <Route path="/university/:name" element={<Details />} />
        </Routes>
      </Router>
      <Toaster/>
    </div>
  );
};

export default App;
