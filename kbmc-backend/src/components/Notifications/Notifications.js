import React from "react";
import { Link } from "react-router-dom";

const Notifications = () => {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Notifications
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Notifications</h4>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th width="8%">Sr. No.</th>
                          <th>Notification Description</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>01</td>
                          <td>Tax Department Added New Content</td>
                          <td>29 June 2024</td>
                          <td>01:20:30 PM</td>
                          <td>
                            <Link to="#." className="btn btn-success btn-sm m-t-10">
                              Approve
                            </Link>{" "}
                            <Link 
                              to="#."
                              data-toggle="modal"
                              data-target="#deleteModal"
                              className="btn btn-danger btn-sm m-t-10"
                            >
                              Disapprove
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>02</td>
                          <td>Tax Department Added New Content</td>
                          <td>29 June 2024</td>
                          <td>01:20:30 PM</td>
                          <td>
                            <Link to="#." className="btn btn-success btn-sm m-t-10">
                              Approve
                            </Link>{" "}
                            <Link 
                              to="#."
                              data-toggle="modal"
                              data-target="#deleteModal"
                              className="btn btn-danger btn-sm m-t-10"
                            >
                              Disapprove
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>03</td>
                          <td>Tax Department Added New Content</td>
                          <td>29 June 2024</td>
                          <td>01:20:30 PM</td>
                          <td>
                            <Link to="#." className="btn btn-success btn-sm m-t-10">
                              Approve
                            </Link>{" "}
                            <Link 
                              to="#."
                              data-toggle="modal"
                              data-target="#deleteModal"
                              className="btn btn-danger btn-sm m-t-10"
                            >
                              Disapprove
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

          <div>
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#" tabindex="-1">
                  Previous
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  2 <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
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

export default Notifications;
