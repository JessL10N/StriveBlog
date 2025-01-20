import React, {useState} from "react";
import { Container, Button} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Header = ({ darkMode, toggleTheme }) => {

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-4">
      <Container>
        <Navbar.Brand href="/">StriveBlog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-2 d-flex justify-content-center align-items-center">
            <SignedOut>
              <Nav.Link href="/">Home</Nav.Link>
              <SignInButton className="btn btn-dark rounded m-2" />
            </SignedOut>
            <SignedIn>
              <Nav.Link href="/authors">Autori</Nav.Link>
              <Nav.Link href="/new-author">Aggiungi autore</Nav.Link>
              <Nav.Link href="/new-article">Aggiungi post</Nav.Link>
              <Nav.Link href="/account">Account</Nav.Link>
              <UserButton />
            </SignedIn>
            <div className="d-flex">
            <Button className="ms-2" variant="dark" onClick={toggleTheme}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
