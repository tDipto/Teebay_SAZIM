import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  GET_ADD_PRODUCT_MUTATION,
  GET_EDIT_MUTATION,
} from "../../../graphql/mutations/productMutations/productMutations";

import React, { useEffect } from "react";
import { Button, Card, Checkbox, Form, Input } from "react-daisyui";
import {
  GET_ALL_PRODUCT_QUERY,
  GET_SINGLE_PRODUCT_QUERY,
  GET_USER_SELL_PRODUCT_QUERY,
} from "../../../graphql/queries/productQueries/productQueries";
const ProductSellForm = ({ dataEdit, setEditModalOpen }) => {
  const [addProduct, { data, loading, error }] = useMutation(
    GET_ADD_PRODUCT_MUTATION,
    {
      refetchQueries: [GET_ALL_PRODUCT_QUERY, GET_USER_SELL_PRODUCT_QUERY],
    }
  );
  const [
    editProduct,
    { data: dataEDit, loading: loadingEdit, error: errorEdit },
  ] = useMutation(GET_EDIT_MUTATION, {
    refetchQueries: [GET_ALL_PRODUCT_QUERY, GET_SINGLE_PRODUCT_QUERY],
  });
  const navigateTo = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      categories: [],
    },

    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));

      if (dataEdit) {
        editProduct({
          variables: {
            editProductId: dataEdit?.id,
            name: values.name,
            description: values.description,
            price: values.price,
            categories: [...values.categories],
          },
        }).then(() => {
          // formik.resetForm();
          setEditModalOpen(false);
          // navigateTo(`/profile`);
        });
      } else {
        addProduct({
          variables: {
            name: values.name,
            description: values.description,
            price: values.price,
            categories: [...values.categories],
          },
        }).then(() => {
          formik.resetForm();
          navigateTo("/");
        });
      }
    },
    validate: (values) => {
      const errors = {};
      if (values.price < 0) {
        errors.price = "Price cannot be negative";
      }
      return errors;
    },
  });
  useEffect(() => {
    if (dataEdit) {
      formik.setValues({
        name: dataEdit.name || "",
        description: dataEdit.description || "",
        price: dataEdit.price || 0,
        categories: (dataEdit.categories || []).map((category) => category.id),
      });
    }
  }, [dataEdit]);

  const categoriesList = [
    { id: "101", name: "ELECTRONICS" },
    { id: "102", name: "FURNITURE" },
    { id: "103", name: "HOME APPLIANCES" },
    { id: "104", name: "SPORTING GOODS" },
    { id: "105", name: "OUTDOOR" },
    { id: "106", name: "TOYS" },
  ];

  const handleCategoryChange = (id) => {
    const { categories } = formik.values;
    const updatedCategories = categories.includes(id)
      ? categories.filter((categoryId) => categoryId !== id)
      : [...categories, id];
    formik.setFieldValue("categories", updatedCategories);
  };

  const CardItem = (
    <>
      {/* {console.log(dataEdit?.id)} */}
      <Card className="mt-1 flex-shrink-0 w-full max-w shadow-2xl bg-base-100 ">
        <Form className="m-1 p-5" onSubmit={formik.handleSubmit}>
          <Form.Label title="Name" />
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="input-bordered"
            required
          />
          <Form.Label title="Description" />

          <Input
            id="description"
            name="description"
            type="text"
            placeholder="Enter description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="input-bordered"
            required
          />
          <Form.Label title="Price" />
          {/* {console.log(formik.values.price)} */}

          <Input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price"
            onChange={formik.handleChange}
            value={formik.values.price}
            className="input-bordered"
            required
            error={formik.errors.price ? true : false}
          />
          {formik.errors.price && (
            <div className="text-red-500">{formik.errors.price}</div>
          )}

          <Form.Label title="Categories" />
          {categoriesList.map((category) => (
            <div key={category.id}>
              <Checkbox
                checked={formik.values.categories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <label className="ml-2">{category.name}</label>{" "}
              {/* Display category name */}
            </div>
          ))}

          <Button className="mt-4" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </>
  );

  return (
    <>
      <div className="flex flex-col items-center">
        {loading && <div className="text-blue-500 font-bold">Loading...</div>}
        {error && <div className="text-red-500 font-bold">{error.message}</div>}
        {data && <div className="text-green-500 font-bold">Product Added</div>}
      </div>
      {CardItem}
    </>
  );
};

export default ProductSellForm;
