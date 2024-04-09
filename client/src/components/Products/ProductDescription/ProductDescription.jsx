import React, { useEffect, useState } from "react";
import { Button, Card } from "react-daisyui";
import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import {
  GET_BUY_MUTATION,
  GET_DELETE_MUTATION,
  GET_RENT_MUTATION,
} from "../../../graphql/mutations/productMutations/productMutations";
import { GET_SINGLE_PRODUCT_QUERY } from "../../../graphql/queries/productQueries/productQueries";
import { GET_USER_QUERY } from "../../../graphql/queries/userQueries/userQueries";
import BuyModal from "../../Modals/BuyModal/BuyModal";
import RentModal from "../../Modals/RentModal/RentModal";

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
  const handleEdit = () => {};

  useEffect(() => {
    // setProduct(demoData[id]);
  }, []);

  const Product = (
    <>
      <Card className="m-5 flex-1 shadow-xl">
        <Card.Body>
          {/* {console.log(dataProduct)} */}
          <Card.Title tag="h2">{dataProduct?.product?.name}</Card.Title>
          <p>{dataProduct?.product?.description}</p>
          <p>Price: {dataProduct?.product?.price}</p>

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
