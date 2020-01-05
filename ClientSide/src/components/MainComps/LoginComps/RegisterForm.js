import React from "react";
import { Form, Button } from "react-bootstrap";
export default function RegisterForm(props) {
  return (
    <Form className="RegForm" onSubmit={props.submit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>UserName</Form.Label>
        <Form.Control
          type="text"
          placeholder="Please enter username"
          id="RuserName"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" id="Rpassword" />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>E-mail</Form.Label>
        <Form.Control type="text" placeholder="E-mail" id="Remail" />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="First name" id="Rfirstname" />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Last name" id="Rlastname" />
      </Form.Group>
      <button type="submit" id="registerSubmit">
        Register
      </button>
    </Form>
  );
}
