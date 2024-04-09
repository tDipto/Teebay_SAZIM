import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
import { Button, Card, Form, Hero, Input } from "react-daisyui";
import { Link, useNavigate } from "react-router-dom";
import { GET_REG_MUTATION } from "../../graphql/mutations/userMutations/userMutations";
const Registration = () => {
  const [userReg, { data, loading, error }] = useMutation(GET_REG_MUTATION);
  const navigateTo = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      userReg({
        variables: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      }).then(() => {
        formik.resetForm();
        navigateTo("/login");
      });
    },
  });
  return (
    <>
      <div className="flex flex-col items-center">
        {error && <div className="text-red-500 font-bold">{error.message}</div>}
        {data && (
          <div className="text-green-500 font-bold">
            Successful Registration
          </div>
        )}
      </div>
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

                <Button className="mt-3">Signup</Button>

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
