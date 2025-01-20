import Comment from "../models/commentModel.js";

const createComment = async (req, res) => {
  try {
    const { author, comment, likes } = req.body;
    const blogPostId = req.params.id; // ID del post dalla route

    // nuovo commento associato al post
    const newComment = new Comment({
      author,
      comment,
      likes,
      blogPostId,
    });

    await newComment.save();

    // Recupera tutti i commenti per il post specificato
    const comments = await Comment.find({ blogPostId });

    res.status(201).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante la creazione del commento");
  }
};

const getComments = async (req, res) => {
  try {
    const blogPostId = req.params.id; // ID del post
    const comments = await Comment.find({ blogPostId }); // commenti associati al post

    if (comments.length === 0) {
      return res.status(200).json([]); // array vuoto se non ci sono commenti
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore nel recupero dei commenti");
  }
};

const createReply = async (req, res) => {
  try {
    const { author, comment, likes } = req.body;
    const commentId = req.params.commentId; // ID del commento a cui rispondere

    // risposta a un commento
    const newReply = new Comment({
      author,
      comment,
      likes,
      blogPostId: req.params.id, // Associa la risposta allo stesso post
    });

    await newReply.save();

    // commento principale
    const parentComment = await Comment.findById(commentId);

    // Aggiunge la risposta alla lista delle risposte del commento principale
    parentComment.replies.push(newReply._id);
    await parentComment.save();

    // Commento principale (con le risposte aggiornate)
    const updatedParentComment = await Comment.findById(commentId).populate("replies");
    res.status(201).json(updatedParentComment);
  } catch (error) {
    console.error("Errore nel server:", error);
    res.status(500).send("Errore durante la creazione della risposta");
  }
};



  
  export { createComment, getComments, createReply };