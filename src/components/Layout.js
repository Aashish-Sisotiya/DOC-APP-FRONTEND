import React from "react";
import { adminMenu, userMenu } from "../Data/Data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge, message } from "antd";
import { setUser } from "../redux/features/userSlice";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: " fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: " fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: " fa-solid fa-user",
    },
  ];

  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUser(null));
    message.success("logout succesfully");
    navigate("/login");
  };

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sideBar">
            <div className="logo">
              <h6>DOC-APPOINTMENT-APP</h6>
              <hr></hr>
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout </Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>

                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children} </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
