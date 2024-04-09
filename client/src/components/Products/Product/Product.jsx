import React from "react";
import { Card } from "react-daisyui";
const Product = (props) => {
  const { name, description, price, className } = props;
  return (
    <Card className={className}>
      <Card.Body>
        <Card.Title tag="h2">{name}</Card.Title>
        {description}
      </Card.Body>
    </Card>
  );
};

export default Product;
