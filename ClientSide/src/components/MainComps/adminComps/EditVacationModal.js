import React from "react";
import { Modal, Button, ListGroup, Form } from "react-bootstrap";
function EditVacationModal(props) {
  if (props.page == 1) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Please choose a vacation from the list and edit it.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup className="listGroundHolder">
            {props.vacations.map(v => {
              return (
                <ListGroup.Item
                  action
                  onClick={props.getVacationDataFromButton}
                  className="list-group-Vacation"
                >
                  {v}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  } else if (props.page == 2) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit: {props.staticName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.handleEditSubmit} defaultValue="">
            <Form.Row>
              <Form.Group>
                <Form.Label>Vacation Name: </Form.Label>
                <Form.Control
                  type="text"
                  id="editName"
                  value={props.selectedVacation.name}
                  onChange={props.change}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description: </Form.Label>
                <Form.Control
                  type="text"
                  id="editDescription"
                  value={props.selectedVacation.description}
                  onChange={props.change}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Destination: </Form.Label>
                <Form.Control
                  type="text"
                  id="editDestination"
                  value={props.selectedVacation.destination}
                  onChange={props.change}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group>
                <Form.Label>IMG Link: </Form.Label>
                <Form.Control
                  type="text"
                  id="editImgLink"
                  value={props.selectedVacation.img_link}
                  onChange={props.change}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>From: </Form.Label>
                <Form.Control id="editFrom" type="datetime-local" />
              </Form.Group>

              <Form.Group>
                <Form.Label>To: </Form.Label>
                <Form.Control id="editTo" type="datetime-local" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group>
                <Form.Label>Price in USD: </Form.Label>
                <Form.Control
                  id="editPrice"
                  type="number"
                  value={props.selectedVacation.price}
                  onChange={props.change}
                />
              </Form.Group>
              <Button id="createVacationButton" type="submit">
                Save changes
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
}
export default EditVacationModal;
