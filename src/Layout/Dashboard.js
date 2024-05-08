import React, { useEffect, useState } from "react";
import { HiUsers } from "react-icons/hi";
import { FaTasks } from "react-icons/fa";
import { Navbar } from "../components/common/Navbar";
import { Sidebar } from "../components/common/Sidebar";
import { useNavigate } from "react-router-dom";

export const Dashboard = ({ children, getList, detectClick }) => {
  const [toggle, setToggle] = useState(false);
//   const navigate = useNavigate();

  const sideBarData = [
    {
      name: "Task Management",
      label: "Task Management",
      to: "/Task-Management",
      linkName: "/Task-Management",
      image: <FaTasks className="sideBarIconNonHighlight" />,
      imageHighlight: <FaTasks className="text-light sideBarIcon" />,
    },
   
  ];

  const toggleHandler = () => {
    setToggle(!toggle);
  };

//   useEffect(() =>{
//     if(!localStorage.getItem('sb-kcahqydrmeduuxuzssha-auth-token')){
//       navigate('/login');
//     }
//   }, [localStorage.getItem('sb-kcahqydrmeduuxuzssha-auth-token')]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-0">
            <Navbar handleToggler={toggleHandler} getList={getList} />
            <div className="row w-100">
              <Sidebar navData={sideBarData} isCollapse={toggle} detectClick={detectClick} />
              <div className="col postionContentBox pe-0">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
