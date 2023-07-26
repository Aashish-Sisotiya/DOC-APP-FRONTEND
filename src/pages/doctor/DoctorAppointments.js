import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import moment from "moment";
import { Table, message } from "antd";
import axios from "axios";
import { server } from './../../index';

const DoctorAppointments = () => {
  const [appointments, setappointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/doctor/doctor-appointments`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setappointments(res.data.data);
        message.success(res.data.message);
      } else {
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Error while fetching appointments");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        `${server}/api/v1/doctor/update-status`,
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <div className="d-flex">
          {moment(record?.date).format("DD-MM-YYYY")}
          {"    "}
          {moment(record?.time).format("HH:mm")}
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "approved")}
              >
                Approved
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h2>Appointments</h2>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;
