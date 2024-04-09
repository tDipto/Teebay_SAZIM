import { useFormik } from "formik";
import React from "react";
import { Button, Card, Form, Hero, Input } from "react-daisyui";
import { Link } from "react-router-dom";
const Registration = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
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
                <Form.Label title="Name" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="input-bordered"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />

                <Form.Label title="Email" />
                <Input
                  id="email"
                  type="text"
                  placeholder="Email"
                  className="input-bordered"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  required
                />

                <Form.Label title="Password" />
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  className="input-bordered"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />

                <Button>Signup</Button>

                <label className="label label-text-alt">
                  Already have an account?
                  <Link to="/login" className="label-text-alt" hover>
                    SignIn
                  </Link>
                </label>
              </Form>
            </Card.Body>
          </Card>
        </Hero.Content>
      </Hero>
    </>
  );
};

export default Registration;
