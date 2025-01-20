import React from "react";
import { Container, Row, Button, Form } from "react-bootstrap";

const NewAuthor = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAuthor = {
        nome: e.target.formNome.value,
        cognome: e.target.formCognome.value,
        email: e.target.formEmail.value,
        data_di_nascita: new Date("08/08/1980"),
        avatar: e.target.formAvatar.value || "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
      };

      const response = await fetch("http://localhost:3001/api/authors/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAuthor),
      });
      if (!response.ok) {
        throw new Error("Si è verificato un errore");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-5">
      <Container>
        <Row>
          <h2>Aggiungi un nuovo autore</h2>
        </Row>
        <Row className="mt-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Inserisci Nome" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCognome">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" placeholder="Inserisci Cognome" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Inserisci Email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formData">
              <Form.Label>Data di nascita</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci data di nascita"
              />
            </Form.Group>
            <Form.Group encType="multipart/form-data" className="mb-3" controlId="formAvatar">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"
                placeholder="Scegli immagine del profilo"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default NewAuthor;
