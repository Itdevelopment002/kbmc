import React, {useState, useEffect} from 'react';
import './NewsSection.css'; 
import api from "../api";

const NewsSection = () => {
    const [newsData, setNewsData] = useState([]);

    const fetchNews = async()=>{
        try{
            const response = await api.get("/newsupdate");
            setNewsData(response.data);
        } catch(error){
            console.error("Error fetchings news");
        }
    };

    useEffect(()=>{
        fetchNews();
    }, [])

    return (
        <section className="news-section">
            <div className='container-fluid'>
                <div className="marquee">
                    <div className="marquee-content">
                        {newsData.map((item, index) => (
                            <div className="marquee-item" key={index}>{item.description}</div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsSection;
