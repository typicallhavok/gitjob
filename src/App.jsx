import React from "react";
import { Home } from "./pages/Home/Home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
