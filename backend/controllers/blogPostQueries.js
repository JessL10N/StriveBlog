import BlogPost from "../models/blogPostModel.js";

const queryAllBlogPosts = async (req, res, next) => {
  try {
    const allBlogPosts = await BlogPost.find({});
    res.json(allBlogPosts);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const queryPaginatedBlogPosts = async (req, res, next) => {
  try {
    const page = req.params.page;
    const allBlogPosts = await BlogPost.find({})
      .limit(6)
      .skip(6 * (page - 1));
    res.json(allBlogPosts);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const queryBlogPostById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blogPost = await BlogPost.findById({ _id: id });
    if (!blogPost) {
      res.sendStatus(404).json("Post non trovato");
    } else {
      res.json(blogPost);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createBlogPost = async (req, res, next) => {
  try{
      const newPost = await BlogPost.create(req.body);
      res.status(201).json("Nuovo post aggiunto con successo")
  } catch(error){
      console.log(error)
      next(error)
  }
};

const queryBlogPagesCount = async (req, res, next) => {
  try {
    const countAll = await BlogPost.countDocuments();
    const pages = Math.ceil(countAll / 6);
    res.json(pages);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const searchBlogPosts = async (req, res, next) => {
  try {
    const page = req.params.page;

    const searchResult = await BlogPost.find({
      titolo: {
        $regex: req.body.titleSearch,
        $options: "i",
      },
      author: {
        $regex: req.body.authorSearch,
        $options: "i",
      },
    })
      .limit(6)
      .skip(6 * (page - 1));

    res.json(searchResult);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const modifyBlogPost = async (req, res, next) => {
  try{
      const id = req.params.id;
      const updatedBlogPost = await BlogPost.findByIdAndUpdate( id, req.body);
      res.json("Post aggiornato");
  }catch(error){
      console.log(error);
      next(error);
  }
};

const deleteBlogPost = async (req, res, next) => {
  try{
      const id = req.params.id;
      const deletedBlogPost = await BlogPost.findByIdAndDelete(id);
      res.json("Post cancellato");
  }catch(error){
      console.log(error);
      next(error);
  }
}

export {
  queryAllBlogPosts,
  queryBlogPostById,
  queryPaginatedBlogPosts,
  queryBlogPagesCount,
  searchBlogPosts,
  modifyBlogPost,
  deleteBlogPost,
  createBlogPost,
};
