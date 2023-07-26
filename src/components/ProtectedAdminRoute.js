import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { server } from "../index";

const ProtectedAdminRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const { user } = useSelector((state) => state.user);

  //eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${server}/api/v1/user/getUserData`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        <Navigate to="/login" />;
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (user?.isAdmin) {
    return children;
  } else {
    navigate("/login");
  }
};

export default ProtectedAdminRoute;
