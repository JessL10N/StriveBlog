import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useParams } from "react-router";
import BlogPostForm from "../components/BlogPostForm.component";
import CommentCard from "../components/CommentCard.component";

const BlogPostDetail = () => {
  const [blogPost, setBlogPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    author: "",
    comment: "",
    likes: 0,
  });

  const _id = useParams().id;

  const { titolo, cover, readTime, author, content, categoria } = blogPost;

  const fetchBlogPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/blog_posts/post/${_id}`
      );
      const data = await response.json();
      setBlogPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();

    const commentData = {
      author: newComment.author,
      comment: newComment.comment,
      likes: newComment.likes,
    };

    try {
      const response = await fetch(
        `http://localhost:3001/api/comments/${_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );

      if (!response.ok) {
        throw new Error("Errore nella creazione del commento");
      }

      const newCommentResponse = await response.json();
      console.log('Nuovo commento ricevuto:', newCommentResponse);
      setComments((prevComments) => [...prevComments, newCommentResponse]); // Aggiunge il nuovo commento alla lista
      fetchComments(); // Chiama la funzione per recuperare i commenti
      setNewComment({ author: "", comment: "", likes: 0 }); // Pulisce il form
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/comments/${_id}`
      );
      const data = await response.json();
  
      console.log("Commenti ricevuti:", data);
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReply = async (commentId, replyText, replyAuthor) => {
    const replyData = {
      author: replyAuthor,
      comment: replyText,
      likes: 0,
    };
  
    try {
      const response = await fetch(
        `http://localhost:3001/api/comments/${_id}/comments/${commentId}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(replyData),
        }
      );
  
      if (!response.ok) {
        throw new Error("Errore nell'invio della risposta");
      }
  
      const updatedComment = await response.json();
      // Aggiorna lo stato dei commenti per includere la nuova risposta
      setComments((prevComments) => 
        prevComments.map((comment) =>
          comment._id === updatedComment._id ? updatedComment : comment
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogPost();
    fetchComments();
  }, []);

  useEffect(() => {
    console.log("Commenti:", comments);
  }, [comments]);

  return (
    <Container className="m-5">
      <Row>
        <Col xs={6}>
          <Card style={{ height: "600px" }}>
            <Card.Body>
              <Card.Title>{titolo}</Card.Title>
              <Card.Img
                style={{ height: "250px", objectFit: "cover" }}
                src={cover}
              ></Card.Img>
              <Card.Text>{content}</Card.Text>
              <Card.Text className="mt-2 fw-bold">{author}</Card.Text>
              <Card.Text>{categoria}</Card.Text>
            </Card.Body>
          </Card>
          <div className="mt-4">
            <Card>
              {comments.map((comment) => (
                <CommentCard key={comment._id} comment={comment} onReply={handleReply} />
              ))}
            </Card>
          </div>

          <div className="mt-4">
            <Card>
              <Form onSubmit={postComment} className="p-3">
                <Form.Group controlId="formComment">
                  <Form.Label>Commento</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Scrivi un commento"
                    value={newComment.comment}
                    onChange={(e) =>
                      setNewComment({ ...newComment, comment: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formAuthor">
                  <Form.Label>Autore</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Autore del commento"
                    value={newComment.author}
                    onChange={(e) =>
                      setNewComment({ ...newComment, author: e.target.value })
                    }
                  />
                </Form.Group>
                <Button
                  className="w-50 mt-3 me-3 p-1"
                  variant="dark"
                  type="submit"
                >
                  Aggiungi commento
                </Button>
              </Form>
            </Card>
          </div>
        </Col>
        <Col>
          <BlogPostForm />
        </Col>
      </Row>
    </Container>
  );
};

export default BlogPostDetail;
