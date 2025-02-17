import React, { useEffect, useState } from "react";
import "./news.css";

const News = () => {
  const [mynews, setMyNews] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async (category, query = "") => {
    const API_KEY = process.env.REACT_APP_NEWS_API_KEY; // Load API key from .env
    console.log("API Key from env:", API_KEY);
    if (!API_KEY) {
      console.error("API Key is missing!");
      return;
    }

    // Build API URL
    let apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2025-01-17&sortBy=publishedAt&apiKey=${API_KEY}`;
    if (category !== "all") {
      apiUrl += `&category=${category}`;
    }
    if (query) {
      apiUrl += `&q=${query}`;
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setMyNews(data.articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(category, searchQuery);
  }, [category, searchQuery]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleSearch = () => {
    fetchData(category, searchQuery);
  };

  const reload = () => {
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" id="main-nav">
        <div className="container-fluid">
          <a
            href="#"
            onClick={reload}
            className="navbar-brand"
            id="company-logo"
          >
            <img
              src="GRABNEWZ-logos.jpeg"
              alt="company logo"
              style={{ width: "50px", height: "auto" }}
            />
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    category === "all" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange("all")}
                >
                  All
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    category === "business" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange("business")}
                >
                  Business
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    category === "sports" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange("sports")}
                >
                  Sports
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    category === "entertainment" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange("entertainment")}
                >
                  Entertainment
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    category === "technology" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange("technology")}
                >
                  Technology
                </button>
              </li>
            </ul>
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="mainDiv">
        {mynews &&
          mynews.map((article, index) => (
            <div
              key={index}
              className="card"
              style={{
                width: "400px",
                height: "auto",
                margin: "2rem",
              }}
            >
              <img
                src={article.urlToImage}
                className="card-img-top"
                alt={article.title}
              />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ marginTop: "0.5rem" }}
                >
                  Go somewhere
                </a>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default News;
