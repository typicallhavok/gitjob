import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Home.css";
import searchImg from "./Search.png";
import { useNavigate } from "react-router-dom";
import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";

dotenv.config();

const Home = () => {
    const octokit = new Octokit({
        auth: process.env.GIT_AUTH_TOKEN,
    });
    const [error, setError] = useState(null);
    const [searchFor, setInputValue] = useState("");
    // const [repos, setRepos] = useState([]);
    const navigate = useNavigate();

    const getUserRepositories = async (username) => {
        try {
            const response = await octokit.rest.repos.listForUser({
                username,
                type: "all",
                sort: "updated",
                direction: "desc",
            });
            const data = response.data;
            const reposLanguages = [];
            data.forEach(async (repo) => {
                try {
                    const repoLanguages = await octokit.repos.listLanguages({
                        owner: username,
                        repo: repo,
                    });

                    reposLanguages.push(repoLanguages);
                } catch (error) {
                    setError(error.message);
                }
            });

            return [data, reposLanguages];
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let username = "";

        if (
            searchFor.startsWith("https://github.com/") ||
            searchFor.startsWith("github.com/")
        ) {
            username = searchFor.replace(/^(https?:\/\/)?github\.com\//, "");
        } else {
            username = searchFor;
        }
        try {
            const response = await octokit.rest.users.getByUsername({
                username,
            });
            const data = response.data;
            const repos = await getUserRepositories(username);
            console.log(repos[1]);
            navigate(`/Profile/${data.login}`, {
                state: { user: data, Repos: repos[0], langs: repos[1] },
            });
        } catch (error) {
            setError(error);
        }
    };

    return (
        <>
            <title>hi</title>
            <div className="container">
                <div className="head">
                    <h2>Welcome to gitview</h2>
                </div>
                <form onSubmit={handleSubmit} id="search">
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

export default Home;
