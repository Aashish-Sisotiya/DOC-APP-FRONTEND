import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate(`/doctor/book-appointment/${doctor._id}`);
        }}
        className="card m-2 ms-4 "
        style={{
          cursor: "pointer",
          boxShadow:
            "rgb(38, 57, 77) 0px 20px 30px -10px",
          border: "1px solid rgba(20, 171, 231, 0.8)" 
        }}
      > 
        <div className="d-flex ">
          <div className="card-header d-flex ">
            <div className="card-image-class"></div>
            <div className="mt-2">
              <b> Dr.</b> {doctor.firstName} {doctor.lastName}
            </div>
          </div>
        </div>
        <div
          className="card-body"
          style={{ border: "1px solid rgba(20, 171, 231, 0.8)" }}
        >
          <p>
            <b>Specialization : </b> {doctor.specialization}
          </p>
          <p>
            <b>Experience : </b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Consaltation : </b> {doctor.feesPerCunsaltation}
          </p>
          <p>
            <b>Timings : </b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
