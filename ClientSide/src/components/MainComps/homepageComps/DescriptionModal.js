import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

function DescriptionModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1>{props.modalName}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>From: {props.modalFrom}</h4>
        <h4>To: {props.modalTo}</h4>
        <p>{props.modalDescription}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default DescriptionModal;
