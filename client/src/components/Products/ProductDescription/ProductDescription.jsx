import React, { useState } from "react";
import { Button, Card, Modal } from "react-daisyui";
import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import {
  GET_BUY_MUTATION,
  GET_DELETE_MUTATION,
  GET_RENT_MUTATION,
} from "../../../graphql/mutations/productMutations/productMutations";
import {
  GET_ALL_PRODUCT_QUERY,
  GET_SINGLE_PRODUCT_QUERY,
  GET_USER_BOUGHT_PRODUCT_QUERY,
  GET_USER_RENT_PRODUCT_QUERY,
} from "../../../graphql/queries/productQueries/productQueries";
import { GET_USER_QUERY } from "../../../graphql/queries/userQueries/userQueries";
import BuyModal from "../../Modals/BuyModal/BuyModal";
import RentModal from "../../Modals/RentModal/RentModal";
import ProductSellForm from "../ProductSellForm/ProductSellForm";

const ProductDescription = () => {
  const { id } = useParams();
  // const [product, setProduct] = useState();
  const [isBuyModalOpen, setBuyIsModalOpen] = useState(false);
  const [isRentModalOpen, setRentIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [rangeValue, setRangeValue] = useState({
    startDate: null,
    endDate: null,
  });

  const {
    loading: loadingProduct,
    error: errorProduct,
    data: dataProduct,
  } = useQuery(GET_SINGLE_PRODUCT_QUERY, {
    variables: {
      getSingleProductId: id,
    },
  });

  const [buyProduct, { data: dataBuy, loading: loadingBuy, error: errorBuy }] =
    useMutation(GET_BUY_MUTATION, {
      refetchQueries: [GET_ALL_PRODUCT_QUERY, GET_USER_BOUGHT_PRODUCT_QUERY],
    });

  const [
    rentProduct,
    { data: dataRent, loading: loadingRent, error: errorRent },
  ] = useMutation(GET_RENT_MUTATION, {
    refetchQueries: [GET_ALL_PRODUCT_QUERY, GET_USER_RENT_PRODUCT_QUERY],
  });

  const [
    deleteProduct,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(GET_DELETE_MUTATION);

  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(GET_USER_QUERY);

  const handleValueChange = (newValue) => {
    setRangeValue(newValue);
  };

  const navigateTo = useNavigate();

  const handleBuyModal = () => {
    setBuyIsModalOpen(!isBuyModalOpen);
  };

  const handleRentModal = () => {
    setRentIsModalOpen(!isRentModalOpen);
  };

  const handleBuyProduct = () => {
    buyProduct({
      variables: {
        productId: id,
      },
    });
    navigateTo("/");
  };

  const handleRentProduct = () => {
    const startDate = new Date(rangeValue.startDate);
    const endDate = new Date(rangeValue.endDate);

    alert(`Rent from ${startDate} to ${endDate}`);
    rentProduct({
      variables: {
        productId: id,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
      },
    });
    navigateTo("/");
  };

  const handleDelete = () => {
    deleteProduct({
      variables: {
        deleteProductId: id,
      },
    }).then(() => {
      navigateTo("/");
    });
  };
  const handleEdit = () => {
    setEditModalOpen(true);
    // navigateTo("/product");
  };

  function formatDateWithSuffix(createdAt) {
    // Input date
    const inputDate = new Date(createdAt);

    // Output formatting
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = inputDate.toLocaleDateString("en-US", options);

    // Get the day
    const day = inputDate.getDate();
    let daySuffix;
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    } else if (day === 2 || day === 22) {
      daySuffix = "nd";
    } else if (day === 3 || day === 23) {
      daySuffix = "rd";
    } else {
      daySuffix = "th";
    }

    // Formatted date with day suffix
    const formattedDateWithSuffix = formattedDate.replace(
      /\b\d{1,2}\b/,
      `${day}${daySuffix}`
    );

    return formattedDateWithSuffix;
  }
  const Product = (
    <>
      <Card className="m-5 flex-1 shadow-xl">
        <Card.Body>
          {/* {console.log(dataProduct)} */}
          <Card.Title tag="h2">{dataProduct?.product?.name}</Card.Title>
          <p>{dataProduct?.product?.description}</p>
          <div className="flex items-center">
            <svg
              class="h-4 fill-current text-green-700 pr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z" />
            </svg>
            {dataProduct?.product?.price}
          </div>

          <p>
            Date Posted :{" "}
            {formatDateWithSuffix(dataProduct?.product?.createdAt)}
          </p>
          <div>
            <p className="font-bold">Categories:</p>
            <ul>
              {dataProduct?.product?.categories?.map((category, index) => (
                <li key={index}>{category.name}</li>
              ))}
            </ul>
          </div>

          <Card.Actions className="justify-end">
            {dataProduct?.product?.available === false ? (
              <span>Sold</span>
            ) : dataUser?.getCurrentUser?.id ===
              dataProduct?.product?.user?.id ? (
              <>
                <Button onClick={handleEdit} color="primary">
                  Edit
                </Button>
                <Button onClick={handleDelete} color="primary">
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleBuyModal} color="primary">
                  Buy
                </Button>
                <Button onClick={handleRentModal} color="primary">
                  Rent
                </Button>
              </>
            )}
          </Card.Actions>
        </Card.Body>

        <BuyModal
          isOpen={isBuyModalOpen}
          handleModal={handleBuyModal}
          handleProduct={handleBuyProduct}
        />
        <RentModal
          isOpen={isRentModalOpen}
          handleModal={handleRentModal}
          handleProduct={handleRentProduct}
          rangeValue={rangeValue}
          handleValueChange={handleValueChange}
        />

        <Modal open={editModalOpen}>
          {/* <Modal.Header className="font-bold">Hello!</Modal.Header> */}

          <ProductSellForm
            dataEdit={dataProduct?.product}
            setEditModalOpen={setEditModalOpen}
          />
        </Modal>
      </Card>
    </>
  );

  return (
    <div>
      {loadingProduct && <div>Loading...</div>}
      {dataProduct && dataProduct.product === null ? (
        <div>No product found</div>
      ) : (
        Product
      )}
    </div>
  );
};

export default ProductDescription;
