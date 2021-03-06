import React from 'react';
import { Card } from 'react-bootstrap';
import Navbar from './Navbar';

export default function() {
  return (
    <div>
      <Navbar path="HOME" />
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
    </div>
  );
}
