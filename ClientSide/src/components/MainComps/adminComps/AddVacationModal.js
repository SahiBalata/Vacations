import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
function AddVacationModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Please fill the details of the new vacation.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={props.createvacation} defaultValue="">
          <Form.Row>
            <Form.Group>
              <Form.Label>Vacation Name: </Form.Label>
              <Form.Control
                type="text"
                id="vacationName"
                placeholder="Vacation name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description: </Form.Label>
              <Form.Control
                type="text"
                id="description"
                placeholder="Please type description"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Destination: </Form.Label>
              <Form.Control
                type="text"
                id="destination"
                placeholder="Destination"
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group>
              <Form.Label>IMG Link: </Form.Label>
              <Form.Control
                type="text"
                id="imgLink"
                placeholder="Please insert Image link"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>From: </Form.Label>
              <Form.Control id="from" type="datetime-local" />
            </Form.Group>

            <Form.Group>
              <Form.Label>To: </Form.Label>
              <Form.Control id="to" type="datetime-local" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group>
              <Form.Label>Price in USD: </Form.Label>
              <Form.Control
                id="price"
                type="number"
                placeholder="Price in USD"
              />
            </Form.Group>
            <Button id="createVacationButton" type="submit">
              Create vacation
            </Button>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default AddVacationModal;
