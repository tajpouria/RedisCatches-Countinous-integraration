import React from 'react';
import { Navbar, Button } from 'react-bootstrap';

export default function({ path }) {
  const renderContent = () => {
    if (path === 'DASHBOARD') {
      return (
        <React.Fragment>
          <Button bg="dark" variant="dark">
            MyBlogs
          </Button>
          <Button bg="dark" variant="dark">
            <a href="/auth/logout">Logout</a>
          </Button>
        </React.Fragment>
      );
    }
    return (
      <Button bg="dark" variant="dark">
        <a href="/auth/google">SignIn With Google</a>
      </Button>
    );
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">BlogSter</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {renderContent()}
      </Navbar.Collapse>
    </Navbar>
  );
}
