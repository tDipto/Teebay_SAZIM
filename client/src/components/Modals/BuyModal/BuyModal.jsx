import React from "react";
import { Button, Modal } from "react-daisyui";

const BuyModal = (props) => {
  return (
    <div>
      <Modal open={props.isOpen} onClose={props.handleModal}>
        <Modal.Header className="font-bold">Hello!</Modal.Header>
        <Modal.Body>Are you sure want to buy it</Modal.Body>

        <Modal.Actions>
          <Button onClick={props.handleProduct}>Yes</Button>
          <Button onClick={props.handleModal}>No</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default BuyModal;
