import React, { useEffect } from "react";
import "./Disp.css";
import { ReactComponent as LinkIcon } from "../../assets/images/link.svg";
import { useLocation } from "react-router-dom";
import backImg from "../../assets/images/back.svg";

const Disp = () => {
    const location = useLocation();
    const user = location.state?.user;
    const repos = location.state?.Repos;
    const langs1 = location.state?.Langs;
    const removeLangs = ["MDX", "Batchfile"];

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
                                <a
                                    className="websiteUrl"
                                    href={`https://github.com/${user.login}`}
                                >
                                    {`https://github.com/${user.login}`}
                                </a>
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

                                    <span className="dispDesc">
                                        {repo.description ? (
                                            repo.description.length > 62 ? (
                                                repo.description.substring(
                                                    0,
                                                    60
                                                ) + "..."
                                            ) : (
                                                repo.description
                                            )
                                        ) : (
                                            <span>No Description given</span>
                                        )}
                                    </span>
                                    {langs1[index] &&
                                        !langs1[index].every((item) =>
                                            removeLangs.includes(item)
                                        ) && (
                                            <div className="footerLang">
                                                {langs1[index]?.map(
                                                    (element, index1) =>
                                                        !removeLangs.includes(
                                                            element
                                                        ) && (
                                                            <span
                                                                key={index1}
                                                                className="eachLang"
                                                            >
                                                                {element}
                                                            </span>
                                                        )
                                                )}
                                            </div>
                                        )}
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
