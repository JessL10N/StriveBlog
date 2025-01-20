import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router";

const BlogpostCard = ({
  _id,
  titolo,
  cover,
  readTime,
  author,
  content,
  categoria,
}) => {
  const shortenContent = (content) => {
    if (content.length > 200) {
      return content.slice(0, 200) + " ...";
    }
    return content;
  };

  return (
    <Col xs={4}>
      <Card style={{ height: "600px" }}>
        <Card.Body>
          <Card.Title>{titolo}</Card.Title>
          <Card.Img
            style={{ height: "250px", objectFit: "cover" }}
            src={cover}
          ></Card.Img>
          <Card.Text>{shortenContent(content)}</Card.Text>
          <Link to={`/blog/${_id}`}>Continua a leggere...</Link>
          <Card.Text className="mt-2">{author}</Card.Text>
          <Card.Text>{categoria}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BlogpostCard;
