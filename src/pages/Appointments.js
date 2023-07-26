import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Table, message } from "antd";
import axios from "axios";
import moment from "moment";
import { server } from './../index';

const Appointments = () => {
  const [appointments, setappointments] = useState([]);


  const getAppointments = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/user/user-appoinments`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setappointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Error while fetching appointments");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

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
    } 
  ];

  return (
    <Layout>
      <h2 className="text-center">Appointments</h2>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default Appointments;
