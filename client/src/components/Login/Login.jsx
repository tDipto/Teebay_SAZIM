import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";

import { Button, Card, Form, Hero, Input } from "react-daisyui";
import { Link, useNavigate } from "react-router-dom";
import { GET_LOGIN_MUTATION } from "../../graphql/mutations/userMutations/userMutations";
const Login = () => {
  const [userLogin, { data, loading, error }] = useMutation(GET_LOGIN_MUTATION);
  const navigateTo = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      userLogin({
        variables: {
          email: values.email,
          password: values.password,
        },
      }).then((result) => {
        localStorage.setItem("token", result.data.token);
        navigateTo("/");
      });
    },
  });
  return (
    <>
      <div className="flex flex-col items-center">
        {loading && <div className="text-blue-500 font-bold">Loading...</div>}
        {error && <div className="text-red-500 font-bold">{error.message}</div>}
        {data && (
          <div className="text-green-500 font-bold">Successful Login</div>
        )}
      </div>
      <Hero>
        <Hero.Content className="flex-col lg:flex-row-reverse">
          <Card className="flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Label title="Email" />
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="email"
                  className="input-bordered"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />

                <Form.Label title="Password" />
                <Input
                  id="password"
                  name="password"
                  type="text"
                  placeholder="password"
                  className="input-bordered"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />

                <Button className="mt-3">Login</Button>
              </Form>

              <div>
                <label className="label label-text-alt">
                  Don't have an account?
                  <Link to="/registration" className="label-text-alt" hover>
                    Signup
                  </Link>
                </label>
              </div>
            </Card.Body>
          </Card>
        </Hero.Content>
      </Hero>
    </>
  );
};

export default Login;
