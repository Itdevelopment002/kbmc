import React from "react";
import { Link } from "react-router-dom";

const TermsConditions = () => {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="#.">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Terms & Conditions
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Terms & Conditions</h4>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th>Description</th>
                          <th width="15%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>01</td>
                          <td>
                            Kulgaon Badlapur city is just 55 km east from
                            Mumbai. is sitting at a distance. Naturally Badlapur
                            city is famous for its human friendly environment,
                            clean water, pollution free environment etc. Due to
                            this, thousands of families have migrated from
                            Mumbai to Badlapur. Another main reason is that due
                            to the planned development brought about by Badlapur
                            Municipal Council, the name of Badlapur Municipal
                            Council is being taken with great respect today.
                            Various projects implemented by the municipal
                            council for the service of the citizens and to
                            maintain the balance of nature have been honored by
                            the President of the country. All his credit goes to
                            the first citizen of the city Hon. Mayor, Mr. The
                            chief officer, all the members of the party have
                            unitedly cooperated for the development of the city
                            and the support given by the citizens of the city.
                          </td>
                          <td>
                            <Link
                              to="#."
                              data-toggle="modal"
                              data-target="#deleteModal"
                              className="btn btn-danger btn-sm m-t-10"
                            >
                              Delete
                            </Link>
                            <Link
                              to="edit-terms-conditions.php"
                              className="btn btn-success btn-sm m-t-10"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal delete_modal fade text-center"
            id="deleteModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <h4>Are you sure you want to delete this item?</h4>
                </div>
                <div className="modal-footer text-center">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-danger btn-lg">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
