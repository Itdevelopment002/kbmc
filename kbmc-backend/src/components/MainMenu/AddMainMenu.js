import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const AddMainMenu = () => {
  const initialMenuItems = [
    { mainMenu: "", subMenus: [{ subMenu: "", subLink: "" }] },
  ];
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/add-main-menu", { menuItems });
      navigate("/");
      setMenuItems(initialMenuItems);
    } catch (err) {
      console.error(
        err.response ? err.response.data.message : "An error occurred."
      );
    }
  };

  const handleAddMoreSubMenu = (index) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index].subMenus.push({ subMenu: "", subLink: "" });
    setMenuItems(newMenuItems);
  };

  const handleInputChange = (index, field, value) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index][field] = value;
    setMenuItems(newMenuItems);
  };

  const handleSubMenuChange = (index, subIndex, field, value) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index].subMenus[subIndex][field] = value;
    setMenuItems(newMenuItems);
  };

  const handleDeleteSubMenu = (index, subIndex) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index].subMenus.splice(subIndex, 1);
    setMenuItems(newMenuItems);
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/">Main Menu</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Main Menu
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add Main Menu</h4>
                    </div>
                    <div className="col-sm-8 col-9 text-right m-b-20">
                      <button
                        onClick={() =>
                          handleAddMoreSubMenu(menuItems.length - 1)
                        }
                        className="btn btn-primary float-right"
                      >
                        <i className="fa fa-plus"></i> Add Sub menu
                      </button>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    {menuItems.map((item, index) => (
                      <div key={index}>
                        <div className="form-group row">
                          <label className="col-form-label col-md-2">
                            Main Menu <span className="text-danger">*</span>
                          </label>
                          <div className="col-md-4">
                            <input
                              type="text"
                              placeholder="Enter Main menu name"
                              className="form-control form-control-md"
                              value={item.mainMenu}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "mainMenu",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        {item.subMenus.map((subMenu, subIndex) => (
                          <div className="form-group row" key={subIndex}>
                            <label className="col-form-label col-md-2">
                              Sub Menu <span className="text-danger">*</span>
                            </label>
                            <div className="col-md-3">
                              <input
                                type="text"
                                placeholder="Enter Sub menu name"
                                className="form-control form-control-md m-t-10"
                                value={subMenu.subMenu}
                                onChange={(e) =>
                                  handleSubMenuChange(
                                    index,
                                    subIndex,
                                    "subMenu",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-3">
                              <input
                                type="text"
                                placeholder="Enter Sub menu link"
                                className="form-control form-control-md m-t-10"
                                value={subMenu.subLink}
                                onChange={(e) =>
                                  handleSubMenuChange(
                                    index,
                                    subIndex,
                                    "subLink",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-1">
                              <button
                                type="button"
                                className="btn btn-danger m-t-10"
                                onClick={() =>
                                  handleDeleteSubMenu(index, subIndex)
                                }
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    <input
                      type="submit"
                      className="btn btn-primary btn-sm"
                      value="Submit"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMainMenu;
