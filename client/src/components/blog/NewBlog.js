import React from 'react';
import { Form, Button } from 'react-bootstrap';

import Navbar from '../Navbar'

export default function() {
  return (
    <React.Fragment>
      <Navbar path="DASHBOARD" />
      <Form>
        <div style={{ margin: 25 }}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="MyAwesomeBlog" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows="10" />
          </Form.Group>
          <Button variant="dark">
            <a>Done</a>
          </Button>
        </div>
      </Form>
    </React.Fragment>
  );
}
