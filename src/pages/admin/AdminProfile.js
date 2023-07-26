import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";

const AdminProfile = () => {
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

export default AdminProfile;
