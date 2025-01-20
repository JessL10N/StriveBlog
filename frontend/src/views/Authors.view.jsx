import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import AuthorCard from '../components/AuthorCard.component';

const Authors = () => {
    const [authors, setAuthors] = useState([]);

    const fetchAuthors = async () => {
        try{
            const response = await fetch(
                "http://localhost:3001/api/authors"
            );
            const data = await response.json();
            setAuthors(data);
        }catch(error){
            console.log(error)
        }
    };

    useEffect(() => {fetchAuthors();}, []);

  return (
    <>
    <Container>
        <Row>
            <h2>Authors</h2>
        </Row>
        <Row className="g-2">
            {authors.map((author) => (<AuthorCard key={author._id} {...author} />))}
        </Row>
    </Container>
    </>
  );
};

export default Authors;