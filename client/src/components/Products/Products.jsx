import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_PRODUCT_QUERY } from "../../graphql/queries/productQueries/productQueries";
import Product from "./Product/Product";

const Products = () => {
  const { loading, error, data } = useQuery(GET_PRODUCT_QUERY);

  return (
    <div className=" mx-2 flex flex-wrap ">
      {loading ? (
        <>
          <h1>Loading</h1>
        </>
      ) : (
        data.getAllProduct.map((product, index) => (
          <Link className="w-1/3 p-2" to={`/product/${index}`}>
            <Product
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              className="m-5 flex-1"
            />
          </Link>
        ))
      )}
    </div>
  );
};

export default Products;
