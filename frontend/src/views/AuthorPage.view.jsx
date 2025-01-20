import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardText,
  Form,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router";

const AuthorPage = () => {
  const { id } = useParams();

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [avatar, setAvatar] = useState("");

  const author = {
    _id: id,
    nome,
    cognome,
    email,
    data_di_nascita: data,
    avatar,
  };

  const redirect = useNavigate();

  const fetchAuthor = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/authors/${id}`);

      if (!response.ok) {
        redirect("/404");
        throw new Error("Si è verificato un problema");
      }
      const author = await response.json();
      setNome(author.nome);
      setCognome(author.cognome);
      setEmail(author.email);
      setData(author.data_di_nascita);
      setAvatar(author.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  const modifyAuthor = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/authors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(author),
      });
      if (!response.ok) {
        throw new Error("Si è verificato un errore");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAuthor = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/authors/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Si è verificato un errore");
      }
      redirect("/authors");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, [id]);

  return (
    <>
      <Container className="m-5 d-flex justify-content-center">
        <Row>
          <Col>
            <Card className="w-85">
              <Card.Img
                className="w-100"
                variant="top"
                src={author.avatar}
                alt=""
              />
              <Card.Body>
                <Card.Title>
                  {author.nome} {author.cognome}
                </Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <CardText className="fw-bold">{author.email}</CardText>
                <CardText>
                  {new Date(author.data_di_nascita).toLocaleDateString()}
                </CardText>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <h3>Modifica autore</h3>
            <Form>
              <Form.Group className="mb-3" controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  value={nome}
                  placeholder="Inserisci Nome"
                  onChange={(e) => setNome(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCognome">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  type="text"
                  value={cognome}
                  placeholder="Inserisci Cognome"
                  onChange={(e) => setCognome(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Inserisci Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formData">
                <Form.Label>Data di nascita</Form.Label>
                <Form.Control
                  type="text"
                  value={new Date(data).toLocaleDateString()}
                  placeholder="Inserisci data di nascita"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAvatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  type="text"
                  value={avatar}
                  placeholder="Scegli immagine del profilo"
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={modifyAuthor}>
                Modifica autore
              </Button>
              <Button className="m-2" variant="danger" onClick={deleteAuthor}>
                Cancella autore
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AuthorPage;
