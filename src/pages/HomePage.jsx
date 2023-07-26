import React, { useEffect, useState } from "react";
import "../styles/LayoutStyles.css";
import Layout from "../components/Layout";
import axios from "axios";
import { Row, message } from "antd";
import DoctorList from "../components/DoctorList";
import { server } from "./../index";
import "../styles/LayoutStyles.css";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctorsData = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/user/getAllDoctors`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      // console.log(res);
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center">HomePage</h1>
      <Row className="cardBody">
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
  );
};

export default HomePage;
