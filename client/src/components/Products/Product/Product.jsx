import React from "react";
import { Card } from "react-daisyui";
const Product = (props) => {
  const { name, description, price } = props;
  return (
    <Card className="m-5 flex-1 ">
      <Card.Body>
        <Card.Title tag="h2">{name}</Card.Title>
        {description}
      </Card.Body>
    </Card>
  );
};

export default Product;
