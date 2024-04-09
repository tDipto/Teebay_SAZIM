import { useFormik } from "formik";
import React from "react";

import { Button, Card, Form, Hero, Input } from "react-daisyui";
import { Link } from "react-router-dom";
const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
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

                <Button>Login</Button>
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
