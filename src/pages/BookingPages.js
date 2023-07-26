import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "./../index";
import "../styles/LayoutStyles.css";
// import moment from "moment";

const BookingPages = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setisAvailable] = useState(false);

  const bookAppointment = async () => {
    try {
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        `${server}/api/v1/user/book-appointement`,
        {
          doctorId: params.doctorId,
          doctorInfo: doctor,
          userId: user._id,
          userInfo: user,
          time: time,
          date: date,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());

      if (res.data.success) {
        message.success("Appointment booked successfully");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Error while booking appointment");
    }
  };

  const getDoctorsDataById = async () => {
    try {
      const res = await axios.post(
        `${server}/api/v1/doctor/getDoctorById`,
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      } else {
        message.error(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const checkAvailablity = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${server}/api/v1/user/booking-availablity`,
        {
          doctorId: params.doctorId,
          time,
          date,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setisAvailable(true);
        // console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong while checking availablity");
    }
  };
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  useEffect(() => {
    getDoctorsDataById();
  }, []);

  return (
    <Layout>
      <h3 className="text-center">Booking Page</h3>
      <div className="container m-3 ">
        {doctor && (
          <>
            <h3>
              Dr. {doctor?.firstName} {doctor?.lastName}
            </h3>
            <h4>Fee per concultation : {doctor?.feesPerCunsaltation} Rs/.</h4>
            <h4>
              Timings :{" "}
              {doctor.timings && doctor.timings[0]
                ? doctor.timings[0]
                : "No timings available"}{" "}
              -{" "}
              {doctor.timings && doctor.timings[1]
                ? doctor.timings[1]
                : "No timings available"}{" "}
            </h4>
            <div className="d-flex flex-column  w-50">
              <div>
                <label htmlFor="dateInput">Select a Date:</label>
                <input
                  type="date"
                  id="dateInput"
                  value={date}
                  onChange={handleDateChange}
                />
              </div>
              <div>
                <label htmlFor="timeInput">Select a Time:</label>
                <input
                  type="time"
                  id="timeInput"
                  value={time}
                  onChange={handleTimeChange}
                />
              </div>
              <button
                className="btn btn-primary mt-3 color"
                onClick={checkAvailablity}
              >
                check Availablity
              </button>

              <button className="btn btn-dark mt-3" onClick={bookAppointment}>
                Book Appointement
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default BookingPages;
