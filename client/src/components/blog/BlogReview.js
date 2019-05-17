import React from 'react';
import { Card } from 'react-bootstrap';

export default function({title, content}) {
  return (
    <Card border="primary" style={{ width: '100%', margin: 25 }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {content}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
