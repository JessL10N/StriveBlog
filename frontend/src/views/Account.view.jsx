import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router';
import { Button, Container, Spinner } from 'react-bootstrap';

const Account = ({ setIsLoggedIn }) => {

const { signOut } = useAuth();
const navigate = useNavigate();

const [loading, setLoading] = useState(true);

useEffect(() => {
  setTimeout(() => {
    setLoading(false);
  }, 2000);
}, []);

const handleLogout = () => {
  setIsLoggedIn(false);
  signOut();
  localStorage.clear();
  navigate("/");
}

  return (
    <Container>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <h1>Benvenuto nel tuo account</h1>
          <p>Ora puoi consultare la rubrica di autori, gestire il tuo account e visualizzare le pagine di dettaglio.</p>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      )}
    </Container>
  )
}

export default Account