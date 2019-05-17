import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">BlogSter</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Button bg="dark" variant="dark">
          <a href={'/auth/google'}>SignIn With Google</a>
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
