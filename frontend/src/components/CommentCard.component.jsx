import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

const CommentCard = ({ comment, onReply }) => {
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [replyAuthor, setReplyAuthor] = useState("");

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setReplyAuthor(e.target.value);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (replyText.trim() && replyAuthor.trim()) {
      await onReply(comment._id, replyText, replyAuthor);
      setReplyText("");
      setReplyAuthor("");
      setIsReplying(false);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Text className="m-2 fw-bold">{comment.author}</Card.Text>
        <Card.Text className="m-2">{comment.comment}</Card.Text>
        <Button
          variant="dark"
          onClick={() => setIsReplying(!isReplying)}
        >
          {isReplying ? "Annulla" : "Rispondi"}
        </Button>

        {isReplying && (
          <Form onSubmit={handleReplySubmit} className="mt-2">
            <Form.Group controlId="formReplyAuthor">
              <Form.Control
                type="text"
                placeholder="Nome autore della risposta"
                value={replyAuthor}
                onChange={handleAuthorChange}
              />
            </Form.Group>
            <Form.Group controlId="formReplyText">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Scrivi una risposta"
                value={replyText}
                onChange={handleReplyChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Invia risposta
            </Button>
          </Form>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            {comment.replies.map((reply) => (
              <CommentCard key={reply._id} comment={reply} onReply={onReply} />
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CommentCard;
