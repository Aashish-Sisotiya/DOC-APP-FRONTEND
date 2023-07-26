import React from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";

const Userprofile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Layout>
      <h2 className="m-3"> Your Details</h2>
      <div className="d-flex flex-column m-5">
        <div>
          <h4>Name : {user?.name}</h4>
        </div>
        <div>
          <h4>Email : {user?.email}</h4>
        </div>
      </div>
    </Layout>
  );
};

export default Userprofile;
