import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table, message } from "antd";
import axios from "axios";
import { server } from './../../index';

const Users = () => {
  const [users, setusers] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/admin/getAllUsers`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.data.success) {
        setusers(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => {
        return (
          <>
            <span>{record?.isDoctor ? "Yes" : "No"}</span>
          </>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (record) => {
        return (
          <div className="d-flex">
            <button className="btn btn-danger">Block</button>
          </div>
        );
      },
    },
  ];

  return (
    <Layout>
      <h2 className="text-center m-2">Users List</h2>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;
