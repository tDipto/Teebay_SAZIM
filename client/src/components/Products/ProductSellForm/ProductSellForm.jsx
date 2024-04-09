import { useFormik } from "formik";
import React from "react";
import { Button, Card, Form, Input } from "react-daisyui";
const ProductSellForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Card className="mt-5 flex-shrink-0 w-full max-w shadow-2xl bg-base-100 text-center">
      <Form className="m-5 p-5" onSubmit={formik.handleSubmit}>
        <Form.Label title="firstName" />
        <Input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="firstName"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          className="input-bordered"
        />
        <Form.Label title="lastName" />
        <Input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="lastName"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          className="input-bordered"
        />
        <Form.Label title="Email" />
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="input-bordered"
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Card>
  );
};

export default ProductSellForm;
