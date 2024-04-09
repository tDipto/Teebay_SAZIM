import React, { useEffect, useState } from "react";
import { Button, Card } from "react-daisyui";
import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import {
  GET_BUY_MUTATION,
  GET_RENT_MUTATION,
} from "../../../graphql/mutations/productMutations/productMutations";
import { GET_SINGLE_PRODUCT_QUERY } from "../../../graphql/queries/productQueries/productQueries";
import BuyModal from "../../Modals/BuyModal/BuyModal";
import RentModal from "../../Modals/RentModal/RentModal";

const demoData = [
  {
    name: "Product 1",
    description: "Description of Product 1",
    price: "$19.99",
  },
  {
    name: "Product 2",
    description: "Description of Product 2",
    price: "$29.99",
  },
  {
    name: "Product 3",
    description: "Description of Product 3",
    price: "$39.99",
  },
];

const ProductDescription = () => {
  const { id } = useParams();
  // const [product, setProduct] = useState();
  const [isBuyModalOpen, setBuyIsModalOpen] = useState(false);
  const [isRentModalOpen, setRentIsModalOpen] = useState(false);

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
    useMutation(GET_BUY_MUTATION);

  const [
    rentProduct,
    { data: dataRent, loading: loadingRent, error: errorRent },
  ] = useMutation(GET_RENT_MUTATION);

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

  useEffect(() => {
    // setProduct(demoData[id]);
  }, []);

  const Product = (
    <>
      <Card className="m-5 flex-1">
        <Card.Body>
          <Card.Title tag="h2">{dataProduct?.product?.name}</Card.Title>
          <p>{dataProduct?.product?.description}</p>
          <p>Price: {dataProduct?.product?.price}</p>
          <Card.Actions className="justify-end">
            <Button onClick={handleBuyModal} color="primary">
              Buy
            </Button>
            <Button onClick={handleRentModal} color="primary">
              Rent
            </Button>
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
