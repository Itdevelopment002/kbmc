import React from 'react';
import './NewsSection.css'; // Ensure this CSS file is created

const NewsSection = () => {
    const newsItems = [
        "Police and Fire Brigade KBMC flood rescue operations mock drill @ Barrage dam today.",
        "There are 16 primary and 4 secondary schools under the jurisdiction of Kulgaon Badlapur Municipal Council and students and parents are getting overwhelming response for admission in these schools in the new academic year 2024-25.",
        "कुळगाव बदलापूर नगर परिषदेच्या शाळांची गरुड भरारी. - नुकत्याच जाहीर झालेल्या दहावीच्या (SSC) निकालानुसार कुळगाव बदलापूर नगर परिषदेच्या शाळांनी उत्तुंग भरारी घेतली.",
        "List of candidates who have received applications for part time / full time medical officer and other posts.",
        "Lottery - Allotment of flats in Valmiki Nagar Kolegaon Badlapur 5 constructed by the Municipal Corporation ADVERTISEMENT - For appointment of members to Municipal Street Vendors Committee.",
        "On the post of Labourer/Valvemen/Zariwala dt. Result of Written Examination held on 21/01/2024.",
        "KBMC and Dr. Swachh Bharat Abhiyan dt. Implemented on 13 December 2023.",
        "Revised Development Plan Kolegaon Badlapur - Approved changes.",
        "Regarding noise pollution and temporary pavilions erected on roads without permission - Proceedings and details."
    ];

    return (
        <section className="news-section">
            <div className='container-fluid'>
                <div className="marquee">
                    <div className="marquee-content">
                        {newsItems.map((item, index) => (
                            <div className="marquee-item" key={index}>{item}</div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsSection;
