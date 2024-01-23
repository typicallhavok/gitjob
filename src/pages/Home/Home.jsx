import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Home.css";
import searchImg from "./Search.png";
import { useNavigate } from "react-router-dom";
import { Octokit } from "@octokit/rest";

const Home = () => {
    const GITOKEN = process.env.GIT_AUTH_TOKEN;
    const octokit = new Octokit({
        auth: GITOKEN,
    });
    const [error, setError] = useState(null);
    const [searchFor, setInputValue] = useState("");
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
            const repoLanguagesPromises = data.map(async (repo) => {
                try {
                    const repoLanguages = await octokit.request(
                        "GET /repos/{owner}/{repo}/languages",
                        {
                            owner: username,
                            repo: repo.name,
                        }
                    );
                    return Object.keys(repoLanguages.data);
                } catch (error) {
                    setError(error.message);
                }
            });
            const reposLanguages = await Promise.all(repoLanguagesPromises);
            return [data, reposLanguages];
        } catch (error) {
            setError(error);
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
            navigate(`/Profile/${data.login}`, {
                state: { user: data, Repos: repos[0], Langs: repos[1] },
            });
        } catch (error) {
            setError(error);
        }
    };

    return (
        <>
            <div className="container">
                <div className="head">
                    <h2>Welcome to gitview</h2>
                </div>
                <form onSubmit={handleSubmit} id="search">
                    <div className="search">
                        <input
                            type="text"
                            className="searchFor"
                            placeholder="Enter a github profile link or name"
                            value={searchFor}
                            onChange={handleInputChange}
                            required
                        />
                        <button className="searchBtn">
                            <img
                                src={searchImg}
                                alt="Search"
                                className="searchImg"
                            />
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
