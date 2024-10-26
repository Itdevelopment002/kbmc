import React from "react";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import img1 from "../../assets/images/health/img1.jpg"
import img2 from "../../assets/images/health/img2.jpg"
import img3 from "../../assets/images/health/img3.jpg"
import img4 from "../../assets/images/health/img4.jpg"

const Health = () => {
  return (
    <div>
      {/* Page Title */}
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
            <h1>Health</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="#.">City Profile</a>
              </li>
              <li>
                <span>Health</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <br />
      <br />
      <br />

      {/* Service Style Four */}
      <section className="service-style-four">
        <div className="auto-container">
          <h5 className="mb-3">Works under Health Department</h5>

          {/* First Table */}
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    Ward no. From 1 to 47, the work of road cleaning and door to
                    door collection and transportation of wet and dry waste is
                    done through the department.
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    Zone no.1 to 6 is sprayed ward wise with mosquito repellent
                    fume by fogging machine.
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    Daily cleaning of public and community toilets in zone no.1
                    to 6 Maintenance and minor repairs are carried out.
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    Catching stray dogs in Kubanp area and carrying out
                    sterilization operations on them and The work of giving them
                    rabies prevention vaccine is done through the department.
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>
                    In Kulgaon Badlapur Municipal Council area pesticide
                    spraying is done by mini tractor with power spray machine.
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>
                    Kulgaon Badlapur Municipal Council Area Maharashtra Plastic
                    and Thermocol Non-decomposable Commodities (Production, Use,
                    Sale, Transport, Handling, Storage) Notification, 2018
                    Sanitation Inspector has been appointed and appointed for
                    implementation Through the plastic teams working under the
                    supervision of the officials Penal action is taken against
                    those violating the provisions of the notification.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h5 className="mb-4 mt-4">
            Zone Wise Names of Sanitation Inspectors
          </h5>

          {/* Second Table */}
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                    width="10%"
                  >
                    Zone No.
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Names of Sanitary Inspectors
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Ward No.
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowspan="4">1/2</td>
                  <td rowspan="4">Mr. Akesh Mhatre (7666505666)</td>
                  <td colspan="1">1,2,3</td>
                </tr>
                <tr>
                  <td rowspan="1">3,20,21,22</td>
                </tr>
                <tr>
                  <td rowspan="1">18,19</td>
                </tr>
                <tr>
                  <td rowspan="1">23,24</td>
                </tr>

                <tr>
                  <td rowspan="3">3</td>
                  <td rowspan="3">Mr. Ashish Jadhav (8380007027)</td>
                  <td colspan="1">4,5,16,17</td>
                </tr>
                <tr>
                  <td rowspan="1">6,7,13,14</td>
                </tr>
                <tr>
                  <td rowspan="1">8,10</td>
                </tr>

                <tr>
                  <td rowspan="3">4</td>
                  <td rowspan="3">Mr. Raju Bhande (9881055385)</td>
                  <td colspan="1">11,12</td>
                </tr>
                <tr>
                  <td rowspan="1">15,26,29</td>
                </tr>
                <tr>
                  <td rowspan="1">30,32,33</td>
                </tr>

                <tr>
                  <td rowspan="3">5</td>
                  <td rowspan="3">Mr. Vilas Mute (8380007029)</td>
                  <td colspan="1">34,35,36,37</td>
                </tr>
                <tr>
                  <td rowspan="1">38,39,40,41,42</td>
                </tr>
                <tr>
                  <td rowspan="1">31</td>
                </tr>

                <tr>
                  <td rowspan="4">6</td>
                  <td rowspan="4">Mr. Vivek Shahane (9881092678)</td>
                  <td colspan="1">25</td>
                </tr>
                <tr>
                  <td rowspan="1">27,28</td>
                </tr>
                <tr>
                  <td rowspan="1">43,44,47</td>
                </tr>
                <tr>
                  <td rowspan="1">45,46</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h5 className="mb-4 mt-4">Treatment Facility</h5>

          {/* Third Table */}
          <div className="table-responsive mt-4">
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
                    Name of the Plant
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Location of the Plant
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Designed Plant Capacity (MTD)
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Present waste Intake (MTD)
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Output of plant
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Biogas Plant, Vadavali</td>
                  <td>
                    S.No. 178, Vadvali Smashan Bhoomi, Vadvali Gaon, Badlapur
                    (W)
                  </td>
                  <td>5</td>
                  <td>5</td>
                  <td>Electricity</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Decentralized Pit Composting Plant, Manjarli</td>
                  <td>
                    S.No. 55, Manjarli Vidyapeeth Road, Manjarli, Badlapur (W)
                  </td>
                  <td>1</td>
                  <td>1</td>
                  <td>Compost</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Decentralized Pit Composting Plant, Juveli</td>
                  <td>
                    S.No. 83, Juveli Smashan Bhoomi, Juveli Gaon, Badlapur (E)
                  </td>
                  <td>1.5</td>
                  <td>1.5</td>
                  <td>Compost</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h5 className="mb-4 mt-4">Name of Ward Wise Litigations</h5>

          {/* Fourth Table */}
          <div className="table-responsive mt-4">
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Ward. No
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Name of the lawsuit
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Mobile No.
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1, 2, 3</td>
                  <td>Mr. Gurunath Mahtre</td>
                  <td>9011384305</td>
                </tr>
                <tr>
                  <td>3, 20, 21, 22</td>
                  <td>Mr. Pravin Dhule</td>
                  <td>7709765162</td>
                </tr>
                <tr>
                  <td>18, 19</td>
                  <td>Mr. Pandharinath Meher</td>
                  <td>9764773256</td>
                </tr>
                <tr>
                  <td>23, 24</td>
                  <td>Mr. Ramakant Vishe</td>
                  <td>9850431178</td>
                </tr>
                <tr>
                  <td>4, 5, 16, 17</td>
                  <td>Mr. Pandharinath Meher</td>
                  <td>9764773256</td>
                </tr>
                <tr>
                  <td rowspan="2">6, 7, 13, 14</td>
                  <td>Mr. Vilas Dhotre</td>
                  <td>7276577421</td>
                </tr>
                <tr>
                  <td>Mr. Vasant Meher</td>
                  <td>9011252781</td>
                </tr>
                <tr>
                  <td>8, 10</td>
                  <td>Mr. Gurunath Mahtre</td>
                  <td>9011384305</td>
                </tr>
                <tr>
                  <td>11, 12</td>
                  <td>Mr. Hanuman Shelke</td>
                  <td>9511845441</td>
                </tr>
                <tr>
                  <td>15, 26, 29</td>
                  <td>Mr. Athmaram Deshmukh</td>
                  <td>8766779947</td>
                </tr>
                <tr>
                  <td>30, 32, 33</td>
                  <td>Mr. Mahesh Shelar</td>
                  <td>8805903890</td>
                </tr>
                <tr>
                  <td>34, 35, 36, 37</td>
                  <td>Mr. Ramesh Gosavi</td>
                  <td>9022240185</td>
                </tr>
                <tr>
                  <td>38, 39, 40, 41, 42</td>
                  <td>Mr. Mahesh Jaweri</td>
                  <td>8149341797</td>
                </tr>
                <tr>
                  <td>31</td>
                  <td>Mr. Mahesh Shelar</td>
                  <td>8805903890</td>
                </tr>
                <tr>
                  <td>25</td>
                  <td>Mr. Athmaram Deshmukh</td>
                  <td>8766779947</td>
                </tr>
                <tr>
                  <td>27, 28</td>
                  <td>Mr. Hanuman Shelke</td>
                  <td>9511845441</td>
                </tr>
                <tr>
                  <td>43, 44, 47</td>
                  <td>Mr. Sunil Patil</td>
                  <td>9890095037</td>
                </tr>
                <tr>
                  <td>45, 46</td>
                  <td>Mr. Ramakant Vishe</td>
                  <td>9850431178</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="row mt-3 pmay_img">
            <div class="col-md-3">
              <img src={img1} alt="img1" />
              <h6 class="text-center">
                Decentralized Pit Composting Plant, Manjarli
              </h6>
            </div>
            <div class="col-md-3">
              <img src={img2} alt="img2" />
              <h6 class="text-center">
                Decentralized Pit Composting Plant, Manjarli
              </h6>
            </div>
            <div class="col-md-3">
              <img src={img3} alt="img3" />
              <h6 class="text-center">
                Decentralized Pit Composting Plant, Juveli
              </h6>
            </div>
            <div class="col-md-3">
              <img src={img4} alt="img4" />
              <h6 class="text-center">Biogas Plant, Vadavali</h6>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Health;
