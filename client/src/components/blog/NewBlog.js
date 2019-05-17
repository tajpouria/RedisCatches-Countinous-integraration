import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import Navbar from '../Navbar';
import postBlog from './postBlog'

export default function () {
   const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChange = e => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const onContentChange = e => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const onFormSubmit = () => {
    return <postBlog title={title} content={content}/>
  };

  return (
    <React.Fragment>
      <Navbar path="DASHBOARD" />
      <Form onSubmit={onFormSubmit}>
        <div style={{ margin: 25 }}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={onTitleChange}
              type="text"
              placeholder="MyAwesomeBlog"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Content</Form.Label>
            <Form.Control
              value={content}
              onChange={onContentChange}
              as="textarea"
              rows="10"
            />
          </Form.Group>
          <Button variant="dark">
            <a>Done</a>
          </Button>
        </div>
      </Form>
    </React.Fragment>
  );
}