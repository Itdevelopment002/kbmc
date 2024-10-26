import React from 'react';
import innerBanner from '../../assets/images/banner/inner-banner.jpg'

const Functions = () => {
    return (
        <div>
            <section className="page-title">
                <div className="bg-layer" style={{ backgroundImage: `url(${innerBanner})` }}></div>
                {/* <div className="pattern-layer" style={{ backgroundImage: 'url(assets/images/shape/shape-25.png)' }}></div> */}
                <div className="line-box">
                    <div className="line-1"></div>
                    <div className="line-2"></div>
                </div>
                <div className="auto-container">
                    <div className="content-box">
                        <h1>Functions</h1>
                        <ul className="bread-crumb clearfix">
                            <li><a href="/">Home</a></li>
                            <li><span>Functions</span></li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* page-title end */}
            <br />

            {/* departments-style-two */}
            <section className="departments-style-two alternat-2">
                <div className="auto-container">
                    {/* <h3>Functions Page Content Coming Soon...</h3> */}
                    <div className="content-two">
                        <h3>DUTIES AND FUNCTIONS OF THE COUNCIL AND THE MUNICIPAL EXECUTIVE.</h3><br />
                        <ul className="list-item clearfix">
                            <li>
                                Except as otherwise provided in this Act, the municipal Government of a municipal area shall vest in the Council.
                            </li>
                            <li>
                                In addition to the duties imposed upon it by or under this Act or any other law for the time being in force, it shall be the duty of every Council to undertake and to make reasonable provision for the following matters within the limits of the municipal area, and when effective measures cannot otherwise be made then even outside the said limits, namely:—
                                <ul>
                                    <li><b>a.</b> lighting public streets, places and buildings;
                                        <ul>
                                            <li>(aa) planning for social and economic development;</li>
                                            <li>(ab) urban forestry, protection of the environment and promotion of ecological aspects;</li>
                                        </ul>
                                    </li>
                                    <li><b>b.</b> watering public streets and places;</li>
                                    <li><b>c.</b> cleansing public streets, places and sewers, and all spaces, not being private property, which are open to the enjoyment of the public, whether such spaces are vested in the Council or not removing noxious vegetation and abating all public nuisances;</li>
                                    <li><b>d.</b> maintenance of a fire-brigade equipped with suitable appliances for extinguishing fires, and protection of life and property when fire occurs;</li>
                                    <li><b>e.</b> regulating or abating offensive or dangerous trades or practices;</li>
                                    <li><b>f.</b> removing obstructions and protections in public streets or places and in spaces, not being private property, which are open to the enjoyment of the public, whether such spaces are vested in the Council or in Government;</li>
                                    <li><b>g.</b> securing or removing dangerous buildings or places and reclaiming unhealthy localities;</li>
                                    <li><b>h.</b> acquiring and maintaining, changing and regulating places for the disposal of the dead;</li>
                                    <li><b>i.</b> constructing, altering and maintaining public streets, culverts, municipal boundary marks, markets, slaughterhouses, latrines, privies, urinals, drains, sewers, drainage works, sewerage works, baths, washing places, drinking fountains, tanks, wells, dams and the like;</li>
                                    <li><b>j.</b> obtaining a supply or an additional supply of water, proper and sufficient for preventing danger to the health of the inhabitants from the insufficiency or unwholesomeness of the existing supply, when such supply or additional supply can be obtained at reasonable cost;</li>
                                    <li><b>k.</b> naming streets and numbering of premises;</li>
                                    <li><b>l.</b> registering births and deaths;</li>
                                    <li><b>m.</b> public vaccination;</li>
                                    <li><b>n.</b> suitable accommodation for any calves, cows, or buffaloes required within the municipal area for the supply of animal lymph;</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Functions;
