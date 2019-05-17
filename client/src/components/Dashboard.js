import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import BlogReview from './blog/BlogReview';
import * as actions from '../actions';

function Dashboard({ getBlogs, blogs }) {
  useEffect(() => {
    getBlogs();
  }, []);

  const renderBlogs = () => {
    return blogs.map(blog => {
      const { title, content, _id } = blog;
      return <BlogReview title={title} content={content} _id={_id} />;
    });
  };

  return (
    <div style={{ flex: 1 }}>
      <Navbar path="DASHBOARD" />
      <Card
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Card.Title>Last Activities</Card.Title>
      </Card>
      <Button
        variant="dark"
        style={{ position: 'absolute', right: 35, bottom: 35 }}
      >
        <a href={'blogs/new'}>New Blog</a>
      </Button>
      {renderBlogs()}
    </div>
  );
}

const mapStateToProps = ({ blogs }) => ({ blogs });

export default connect(
  mapStateToProps,
  actions
)(Dashboard);
