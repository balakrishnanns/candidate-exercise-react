import "./style.scss";
import React, { useState } from "react";
// import { createClient } from "@supabase/supabase-js";
import taskLogo from "../../../assets/png/task-logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import {
//   privateKey,
//   serviceKey,
//   supabaseAnonKey,
//   supabaseUrl,
// } from "../../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbar = ({ handleToggler, getList }) => {
  const [state, setState] = useState(true);
  const [loader, setLoader] = useState(true);
  const [toggle, setToggle] = useState(false);
  //   const supabase = createClient(supabaseUrl, supabaseAnonKey);
  //   const getProfileDetails = JSON.parse(
  //     localStorage.getItem("sb-kcahqydrmeduuxuzssha-auth-token")
  //   );
  //   const { email } = getProfileDetails?.user || {};


  const navigate = useNavigate();

  const handleLogout = async () => {

    setTimeout(() => {
      localStorage.clear();
      navigate("/login");
    }, 2000);
    toast.success('Logout successfully!')

  };

  return (
    <>
      <div className="navbar px-4 position-relative">
        <div className="d-flex justify-content-between align-items-center w-100 h-100">
          <div className="col-4">
            <div className="d-flex flex-row">
              <div role="button" onClick={handleToggler}>
                <GiHamburgerMenu className="text-black burgerIcon"   />
              </div>
              <div className="ps-3">
                <img
                  src={taskLogo}
                  className="taskLogoClass"
                  alt="taskIcon"
                />
              </div>
              <div className="ps-3">
                <p className="taskTextLogo mb-0">Task Management</p>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end w-100 align-items-center">
            <div className="mr-4 d-flex justify-content-center align-items-center">
              <button
                type="button"
                className="profileBtn py-2"
                onClick={() => setToggle(true)}
              >
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <div className="pe-2">
                    <p className="profileTextLogo mb-0">user</p>
                  </div>
                </div>
              </button>
            </div>
            <div
              className="cursor-pointer profile profile-dropdown mr-3"
              onClick={() => setState(!state)}
            >
              <div className="d-flex align-items-center">
                <i className="icon-down-arrow down-icon text-white" />
              </div>
            </div>
          </div>
        </div>
        {toggle && (
          <div className="logoutModal">
            <MdClose
              className="cursor-pointer positionModalClose"
              onClick={() => setToggle(false)}
            />
          
            
            <div className="mx-auto d-block px-5 mt-3 pb-3">
              <button
                type="button"
                className="profileBtn py-2"
                onClick={handleLogout}
              >
                <MdLogout className="logoutIcon" /> Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer className="toast-position" position="top-right" />
    </>
  );
};
