import React from 'react';
import { Card } from 'react-bootstrap';

export default function() {
  return (
    <Card
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card.Title>BLOGSTER</Card.Title>
      <Card.Text>Write private blogs</Card.Text>
    </Card>
  );
}
