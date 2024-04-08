import React from "react";
import { Link } from "react-router-dom";
import Product from "./Product/Product";
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
const Products = () => {
  return (
    <div className=" mx-2 flex flex-wrap ">
      {demoData.map((product, index) => (
        <Link className="w-1/3 p-2" to={`/product/${index}`}>
          <Product
            key={index}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        </Link>
      ))}
    </div>
  );
};

export default Products;
