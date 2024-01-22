import React, { useEffect } from "react";
import "./Disp.css";
import { ReactComponent as LinkIcon } from "../../assets/images/link.svg";
import { useLocation } from "react-router-dom";
import backImg from "../../assets/images/back.svg";

const Disp = () => {
    const location = useLocation();
    const user = location.state?.user;
    const repos = location.state?.Repos;
    const langs = location.state?.langs;
    console.log(langs);
    useEffect(() => {
        document.title = "Repos";
    });

    return (
        <>
            <div className="complete">
                <nav>
                    <a href="/">
                        <button className="back">
                            <img src={backImg} alt="back" className="backImg" />
                        </button>
                    </a>
                    <h1>{user.login}</h1>
                </nav>
                <div className="container1">
                    <div className="about">
                        <div className="flexRow">
                            {user && (
                                <>
                                    <img
                                        src={user.avatar_url}
                                        alt={user.login}
                                        className="profileImg"
                                    />
                                    <div className="aboutText">
                                        <span className="profileName">
                                            {user.name ? (
                                                <p>{user.name}</p>
                                            ) : (
                                                <p>{user.login}</p>
                                            )}
                                        </span>
                                        <span className="aboutDets">
                                            {user.bio && <p>{user.bio}</p>}
                                            {user.location && (
                                                <p>{user.location}</p>
                                            )}
                                            {user.twitter_username && (
                                                <p>{user.twitter_username}</p>
                                            )}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="aboutLink">
                            <LinkIcon className="linkImg" />
                            {user && user.blog ? (
                                <a href={user.blog} className="websiteUrl">
                                    {user.blog}
                                </a>
                            ) : (
                                <div className="websiteUrl">
                                    <a
                                        href={`https://github.com/${user.login}`}
                                    >
                                        <p>{`https://github.com/${user.login}`}</p>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="repos">
                        {repos?.map((repo, index) => {
                            return (
                                <span
                                    className="card"
                                    key={index}
                                    onClick={() => {
                                        window.open(repo.git_url.substring(4));
                                    }}
                                >
                                    <span className="repoTitle">
                                        {repo.name}
                                    </span>
                                    <span>{repo.description}</span>
                                    <span>{langs[index]}</span>
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Disp;
