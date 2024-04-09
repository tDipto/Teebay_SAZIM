import React from "react";
import { Card } from "react-daisyui";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
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
const BuyProducts = () => {
  return (
    <div className="">
      <Card className="mt-5 flex-shrink-0 w-full max-w shadow-2xl bg-base-100 text-center">
        <h1 className=" p-3 text-md font-bold">Post Items</h1>
      </Card>
      {demoData.map((product, index) => (
        <Link to={`/product/${index}`}>
          <Product
            key={index}
            name={product.name}
            description={product.description}
            price={product.price}
            className="m-2 p-2"
          />
        </Link>
      ))}
    </div>
  );
};

export default BuyProducts;
