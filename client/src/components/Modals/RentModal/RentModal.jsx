import React from "react";
import { Button, Modal } from "react-daisyui";
import Datepicker from "react-tailwindcss-datepicker";

const RentModal = (props) => {
  return (
    <div>
      <Modal open={props.isOpen} onClose={props.handleModal}>
        <Modal.Header className="font-bold">Hello!</Modal.Header>
        <Modal.Body>
          <div className="pb-44">Are you sure want to Rent it</div>

          <div className="pt-20">
            <Datepicker
              useRange={false}
              value={props.rangeValue}
              onChange={props.handleValueChange}
              popoverDirection="up"
            />
          </div>
        </Modal.Body>

        <Modal.Actions>
          <Button onClick={props.handleProduct}>Yes</Button>
          <Button onClick={props.handleModal}>No</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default RentModal;
