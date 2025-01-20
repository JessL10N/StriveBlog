import Author from "../models/authorModel.js";

const queryAllAuthors = async (req, res, next) => {
    try{
    const allAuthors = await Author.find({});
    res.json(allAuthors);
    }catch (error){
        console.log(error)
        next(error);
    }
};

const queryAuthorById = async (req, res, next) => {
    try{
        const id = req.params.id;
        const author = await Author.findById({_id: id});
        if(!author){
            //throw new Error("Autore non trovato")
            res.sendStatus(404).json("Autore non trovato");
        } else{
        res.json(author);
        }
    } catch(error){
        console.log(error);
        next(error);
    }
};

const createAuhtor = async (req, res, next) => {
    try{
        const newAuthor = await Author.create(req.body);
        res.status(201).json("Nuovo autore aggiunto con successo")
    } catch(error){
        console.log(error)
        next(error)
    }
};

const modifyAuthor = async (req, res, next) => {
    try{
        const id = req.params.id;
        const updatedAuthor = await Author.findByIdAndUpdate( id, req.body);
        res.json("Autore aggiornato");
    }catch(error){
        console.log(error);
        next(error);
    }
};

const deleteAuthor = async (req, res, next) => {
    try{
        const id = req.params.id;
        const deleteAuthor = await Author.findByIdAndDelete(id);
        res.json("Autore cancellato");
    }catch(error){
        console.log(error);
        next(error);
    }
}

export { queryAllAuthors, queryAuthorById, createAuhtor, modifyAuthor, deleteAuthor } ;