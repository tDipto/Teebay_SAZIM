// ProductList.jsx
import { useQuery } from "@apollo/client";
import React from "react";
import { Card } from "react-daisyui";
import { Link } from "react-router-dom";
import Product from "../Product/Product";

const ProfileProduct = ({ query, name }) => {
  const { loading, error, data } = useQuery(query);

  return (
    <div>
      <Card className="mt-5 w-full max-w shadow-2xl bg-base-100 text-center ">
        <h1 className="p-3 text-md font-bold">{name} Items</h1>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <h1>Loading</h1>
        ) : data && data.product.length === 0 ? (
          <h1 className="p-3 text-md font-bold text-center">No products</h1>
        ) : (
          data &&
          data.product.map((product, index) => (
            <Link to={`/product/${product.id}`} key={index}>
              <Product
                name={product.name}
                description={product.description}
                price={product.price}
                className="m-2 p-2 h-[250px]"
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileProduct;
