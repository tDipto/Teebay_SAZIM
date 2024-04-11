import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Protected = (props) => {
  const { Component } = props;
  //   const { loading, error, data } = useQuery(GET_USER_QUERY);
  //   if (loading) return <p>Loading...</p>;
  //   const isAuthenticated = data?.getCurrentUser !== undefined;
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
