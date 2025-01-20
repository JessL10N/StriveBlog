import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import BlogpostCard from "../components/BlogpostCard.component";
import { Link, useParams } from "react-router";

const Blogposts = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState({ authorSearch: "", titleSearch: "" });

  const page = useParams().page ?? 1; //di default è 1

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/blog_posts/page/" + page
      );
      const data = await response.json();
      console.log("Dati ricevuti:", data);
      setBlogPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const fetchBlogPostNumber = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/blog_posts/count"
      );
      const data = await response.json();
      setPageCount(data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchBlogPosts = async () => {
    try{
      const response = await fetch("http://localhost:3001/api/blog_posts/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search),
      });
      const data = await response.json();
      setBlogPosts(data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBlogPosts();
    fetchBlogPostNumber();
  }, [page]); // ripete la fetch quando cambia la pagina

  useEffect(() => {
    searchBlogPosts();
  }, [search]);

  return (
    <Container>
      <Row className="m-4">
        <Col>
          <h3>Cerca negli articoli</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Control
            name="titleSearch"
            type="text"
            placeholder="per titolo"
            className=" mr-sm-2"
            onChange={handleSearch}
            value={search.titleSearch}
          />
        </Col>
        <Col>
          <Form.Control
            name="authorSearch"
            type="text"
            placeholder="per autore"
            className=" mr-sm-2"
            onChange={handleSearch}
            value={search.authorSearch}
          />
        </Col>
        <Col xs="auto">
          <Button type="submit" onClick={searchBlogPosts}>Submit</Button>
        </Col>
      </Row>
      <Row className="m-4">
        <Col>
          <h1>Sfoglia i blogpost dei nostri autori</h1>
        </Col>
      </Row>
      <Row className="g-2">
        {blogPosts.map((post) => {
          return <BlogpostCard key={post._id} {...post} />;
        })}
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          {Array.from({ length: pageCount }).map((_, index) => {
            return (
              <Link key={index + 1} className="m-2 fs-4" to={`/${index + 1}`}>
                {index + 1}
              </Link>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default Blogposts;
