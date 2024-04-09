import React, { useEffect, useState } from "react";
import { Button, Card } from "react-daisyui";
import { useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
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

  const { loading, error, data } = useQuery(GET_SINGLE_PRODUCT_QUERY, {
    variables: {
      getSingleProductId: id,
    },
  });

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
    alert("Buy");
    navigateTo("/");
  };

  const handleRentProduct = () => {
    alert(`Rent from ${rangeValue.startDate} to ${rangeValue.endDate}`);
    navigateTo("/");
  };

  useEffect(() => {
    // setProduct(demoData[id]);
  }, []);

  const Product = (
    <>
      <Card className="m-5 flex-1">
        <Card.Body>
          <Card.Title tag="h2">{data?.product?.name}</Card.Title>
          <p>{data?.product?.description}</p>
          <p>Price: {data?.product?.price}</p>
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
      {loading && <div>Loading...</div>}
      {data && data.product === null ? <div>No product found</div> : Product}
    </div>
  );
};

export default ProductDescription;
