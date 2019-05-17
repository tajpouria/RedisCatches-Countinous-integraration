import React from 'react';
import { Navbar, Button } from 'react-bootstrap';

export default function({ path }) {
  const renderContent = () =>{
    if(path === "BLOGS") return <a href={'/auth/logout'}>Logout</a> 
    return <a href={'/auth/google'}>SignIn With Google</a>
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">BlogSter</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Button bg="dark" variant="dark">
          {renderContent()}
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
