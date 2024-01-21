import React from "react";
import Home from "./pages/Home/Home.jsx";
import Disp from "./pages/Disp/Disp.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Profile/:id" element={<Disp />} />
            </Routes>
        </Router>
    );
}

export default App;
