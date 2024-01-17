import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Home.css";
import searchImg from "./Search.png";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [error, setError] = useState(null);
    const [searchFor, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        let username = "";

        if (
            searchFor.startsWith("https://github.com") ||
            searchFor.startsWith("github.com")
        ) {
            username = searchFor.replace(/^(https?:\/\/)?github\.com\//, "");
        } else {
            username = searchFor;
        }
        fetch(`https://api.github.com/users/${username}`)
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404) {
                        setError({
                            message:
                                "Account not found, Enter a valid account name or link",
                        });
                    } else {
                        setError({
                            message:
                                "An error occurred. Please try again later.",
                        });
                    }
                }
                return response.json();
            })
            .then((userDetails) => {
                if (userDetails.message !== "Not Found") {
                    navigate("/disp", {
                        state: { data: userDetails },
                    });
                }
                console.log(userDetails);
            })
            .catch((error) => {
                console.error("Error:", error.message);
            });
    };

    return (
        <>
            <div className="container">
                <div className="head">
                    <h2>Welcome to gitview</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="search">
                        <input
                            type="text"
                            className="searchFor"
                            placeholder="Enter a profile link or name"
                            value={searchFor}
                            onChange={handleInputChange}
                            required
                        />
                        <button>
                            <img src={searchImg} alt="Search" />
                        </button>
                    </div>
                </form>
                <div className="error">
                    {error && (
                        <div className="alert alert-danger">
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
