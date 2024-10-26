import React from "react";
import innerBanner from '../../assets/images/banner/inner-banner.jpg'

const TreeCensus = () => {
  return (
    <>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{
            backgroundImage: `url(${innerBanner})`,
          }}
        ></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>Tree Census</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="#.">City Profile</a>
              </li>
              <li>
                <span>Tree Census</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <section className="service-style-four mt-5">
        <div className="auto-container">
          <h5 className="pb-4">
            The Maharashtra (Urban Area) Tree Protection and Conservation Act
            came into being in 1975. As per the provisions of these Acts, the
            Tree Authority is bound to enumerate all the trees under its
            jurisdiction. Accordingly, the tree census report in Kulgaon
            Badlapur Municipal Council is as follows.
          </h5>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Sr. No
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Area of Kulgaon-Badlapur Municipal Council</td>
                  <td>35.68 Sq. Km.</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>No. of Wards in Kulgaon-Badlapur Municipal Council</td>
                  <td>47</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    No. of Trees counted in Jurisdiction of Kulgaon-Badlapur
                    Municipal Council
                  </td>
                  <td>1,96,466</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    No. of Tree species counted in Jurisdiction of
                    Kulgaon-Badlapur Municipal Council
                  </td>
                  <td>198</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Fruiting Trees</td>
                  <td>72,558</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Medicinal Trees</td>
                  <td>6,613</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Ornamental Trees</td>
                  <td>1,17,295</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Heritage Trees</td>
                  <td>137</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default TreeCensus;
