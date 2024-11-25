import React, { useState, useEffect } from "react";
import "./NewsSection.css";
import api from "../api";

const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await api.get("/newsupdate");
      const reversedNewsData = response.data.reverse();
      setNewsData(reversedNewsData);
    } catch (error) {
      console.error("Error fetching news", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <section className="news-section">
      <div className="container-fluid">
        <div className="marquee">
          <div className="marquee-content">
            {newsData.map((item, index) => (
              <div className="marquee-item" key={index}>
                <span style={{ color: "#3EA4ED" }}>{index + 1}. </span>
                {item.description}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
