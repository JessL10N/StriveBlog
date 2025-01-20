import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router";

const AuthorCard = ({ _id, nome, cognome, data_di_nascita, email, avatar }) => {
  return (
    <Col xs={3}>
      <Link className="text-decoration-none" to={`/authors/${_id}`}>
        <Card>
          <Card.Body>
            <Card.Title>
              {nome} {cognome}
            </Card.Title>
            <Card.Img src={avatar}></Card.Img>
            <Card.Text className="fw-bold">{email}</Card.Text>
            <Card.Text>lorem</Card.Text>
            <Card.Text>
              {new Date(data_di_nascita).toLocaleDateString()}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default AuthorCard;
