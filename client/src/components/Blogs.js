import React from 'react';
import { Card } from 'react-bootstrap';
import Navbar from './Navbar';

export default function() {
  return (
    <div>
      <Navbar path="BLOGS" />
      <Card
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Card.Title>BLOGS</Card.Title>
      </Card>
    </div>
  );
}
