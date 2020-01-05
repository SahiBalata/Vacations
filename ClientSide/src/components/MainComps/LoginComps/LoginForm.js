import React from "react";
import { Form, Button } from "react-bootstrap";
export default function LoginForm(props) {
  return (
    <Form className="LoginForm" onSubmit={props.submit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>UserName</Form.Label>
        <Form.Control
          type="text"
          placeholder="Please enter username"
          id="userLogin"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" id="userPass" />
      </Form.Group>
      <button type="submit" id="loginSubmit">
        Login
      </button>
    </Form>
  );
}
