import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Form, Modal } from "react-bootstrap";

const BlogPostForm = () => {
  const _id = useParams().id; // ID del post da modificare
  const navigate = useNavigate();

  const [blogPost, setBlogPost] = useState({
    author: "",
    titolo: "",
    categoria: "",
    content: "",
    cover: "",
  });
  const [isEditing, setIsEditing] = useState(false); // gestione la modifica
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Recupera dati del post da modificare
  useEffect(() => {
    const fetchBlogPost = async () => {
      const response = await fetch(
        `http://localhost:3001/api/blog_posts/post/${_id}`
      );
      const data = await response.json();
      console.log(data);
      setBlogPost(data);
    };

    fetchBlogPost();
  }, [_id]);

  // Gestione cambiamento valori del modulo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogPost({ ...blogPost, [name]: value });
  };

  // Gestione invio form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3001/api/blog_posts/post/${_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogPost),
      }
    );

    if (response.ok) {
      const updatedBlogPost = await response.json();
      alert("Post aggiornato con successo");
      // Reindirizza alla lista dei post
      navigate("/page/:page");
    } else {
      alert("Errore nell'aggiornamento del post");
    }
  };

  // Funzione per cancellare il post
  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:3001/api/blog_posts/post/${_id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      alert("Post cancellato con successo");
      navigate("/");
    } else {
      alert("Errore nella cancellazione del post");
    }
    setShowDeleteModal(false);
  };

  // modale di conferma
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  // chiusura modale di conferma
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div>
      <h1>Modifica Post</h1>
      <Form className="m-4" onSubmit={handleSubmit}>
        <Form.Group controlId="author">
          <Form.Label>Autore</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={blogPost.author}
            onChange={handleChange}
            disabled={!isEditing} // Disabilita il campo se non è in modalità modifica
            required
          />
        </Form.Group>
        <Form.Group controlId="titolo">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            type="text"
            name="titolo"
            value={blogPost.titolo}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </Form.Group>

        <Form.Group controlId="categoria">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            type="text"
            name="categoria"
            value={blogPost.categoria}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Contenuto</Form.Label>
          <Form.Control
            type="text"
            name="content"
            value={blogPost.content}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </Form.Group>
        <Form.Group controlId="cover">
          <Form.Label>Cover</Form.Label>
          <Form.Control
            type="text"
            name="cover"
            value={blogPost.cover}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Form.Group>

        {!isEditing && (
          <Button variant="secondary" onClick={() => setIsEditing(true)}>
            Modifica
          </Button>
        )}

        {isEditing && (
          <>
            <Button variant="primary" type="submit">
              Aggiorna Post
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Annulla
            </Button>
          </>
        )}
        {/* Bottone per eliminare il post */}
        <Button
          variant="danger"
          onClick={handleShowDeleteModal}
          className="ms-2"
        >
          Elimina Post
        </Button>
      </Form>

      {/* Modale di conferma cancellazione */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Cancellazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler cancellare questo post? Questa azione è
          irreversibile.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlogPostForm;
