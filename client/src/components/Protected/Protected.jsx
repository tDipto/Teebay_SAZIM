import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GET_USER_QUERY } from "../../graphql/queries/userQueries/userQueries";
const Protected = (props) => {
  const { Component } = props;
  //   const { loading, error, data } = useQuery(GET_USER_QUERY);
  //   if (loading) return <p>Loading...</p>;
  //   const isAuthenticated = data?.getCurrentUser !== undefined;
  const navigate = useNavigate();

  // useEffect(() => {
  //   let token = localStorage.getItem("token");

  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, []);

  const { loading, error, data } = useQuery(GET_USER_QUERY);

  useEffect(() => {
    // console.log(data?.getCurrentUser);
    if (!loading && data?.getCurrentUser === undefined) {
      navigate("/login");
    }
  }, [loading, data, navigate]);

  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
