import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
function DeleteVacationModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Please choose the vacation you would like to delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.vacations.map(v => {
          return (
            <ListGroup.Item
              action
              onClick={props.click}
              className="list-group-Vacation"
            >
              {v}
            </ListGroup.Item>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default DeleteVacationModal;
