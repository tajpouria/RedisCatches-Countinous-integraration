import React from 'react';
import { Navbar, Button } from 'react-bootstrap';

export default function() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">BlogSter</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Button bg="dark" variant="dark">
          SignIn With Google
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
