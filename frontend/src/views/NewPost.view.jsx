import React from "react";
import { Container, Row, Button, Form } from "react-bootstrap";

const NewPost = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        categoria: e.target.formCategoria.value,
        titolo: e.target.formTitolo.value,
        content: e.target.formContent.value,
        author: e.target.formAuthor.value,
        cover:e.target.formCover.value || "https://media.istockphoto.com/id/644015884/photo/bright-vibrant-colorful-umbrellas-parasols-row-pattern-blue-sky-background.jpg?s=612x612&w=0&k=20&c=6E31BV4QTqhI-IzKagP5K0ugbADlCKLJjINUd0CPtDY=",
      };

      const response = await fetch("http://localhost:3001/api/blog_posts/post/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
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
          <h2>Aggiungi un nuovo post</h2>
        </Row>
        <Row className="mt-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formCategoria">
              <Form.Label>Categoria</Form.Label>
              <Form.Control type="text" placeholder="Inserisci Categoria" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTitolo">
              <Form.Label>Titolo</Form.Label>
              <Form.Control type="text" placeholder="Inserisci Titolo" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control type="text" placeholder="Inserisci Content" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci Author"
              />
            </Form.Group>
            <Form.Group encType="multipart/form-data" className="mb-3" controlId="formCover">
              <Form.Label>Cover</Form.Label>
              <Form.Control
                type="file"
                placeholder="Scegli immagine cover"
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

export default NewPost;
