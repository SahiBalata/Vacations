import React from "react";
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function VacationCard(props) {
  const [isCardFollowed, setProp] = useState(props.isFollowed);

  useEffect(() => {});

  if (props.isFollowed === false) {
    return (
      <div className="cardHolder">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={props.img_link} />
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
              <h5>{props.price}$</h5> <h5>Follows: {props.followers}</h5>{" "}
            </Card.Text>
            <button
              className="description"
              onClick={props.showModal}
              id={props.name}
            >
              Description
            </button>
            <button
              className="Follow"
              id={props.name}
              onClick={props.setNewFollower}
            >
              Follow
            </button>
          </Card.Body>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="cardHolder">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={props.img_link} />
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
              <h5>{props.price}$</h5> <h5>Follows: {props.followers}</h5>{" "}
            </Card.Text>
            <button
              className="description"
              onClick={props.showModal}
              id={props.name}
            >
              Description
            </button>
            <button
              className="Followed"
              id={props.name}
              onClick={props.setUnfollow}
            >
              Following
            </button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
