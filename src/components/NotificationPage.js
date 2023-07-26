import React from "react";
import Layout from "./Layout";
import { Tabs, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios"; 
import { server } from './../index';
 

const NotificationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${server}/api/v1/user/get-all-notification`,
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());

      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      } else {
        message.error(res.data.error);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${server}/api/v1/user/delete-all-notification`,
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());

      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.error);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong in notification");
    }
  };

  const items = [
    {
      key: "0",
      label: `Unread`,
      children: (
        <>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleMarkAllRead}
            >
              Mark all read
            </h4>
          </div>
          {user?.notification.map((notificationMsg) => (
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => {
                  navigate(notificationMsg.onClickPath);
                }}
              >
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </>
      ),
    },
    {
      key: "1",
      label: `Read`,
      children: (
        <>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllRead}
            >
              Delete all read
            </h4>
          </div>
          {user?.seenNotification.map((notificationMsg) => (
            <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => {
                  navigate(notificationMsg.onClickPath);
                }}
              >
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </>
      ),
    },
  ];
  return (
    <Layout>
      <h3 className="p-3 text-center">Notification Page</h3>

      <Tabs defaultActiveKey="0" items={items}></Tabs>
    </Layout>
  );
};

export default NotificationPage;
