import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import Navbar from '../Navbar';
import * as actions from '../../actions';

class NewBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      error: false
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onTitleChange(e) {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  onContentChange(e) {
    e.preventDefault();
    this.setState({ content: e.target.value });
  }

  onFormSubmit() {
    const {
      createBlog,
      history: { push }
    } = this.props;
    const { title, content } = this.state;

    if (title === '' || content === '')
      return this.setState({ error: 'Value should provide' });

    createBlog(title, content, push);
  }

  renderError() {
    if (this.state.error)
      return <Alert variant="danger">Value Must Be Provided</Alert>;
  }

  render() {
    const { title, content } = this.state;
    return (
      <React.Fragment>
        <Navbar path="DASHBOARD" />
        <Form>
          <div style={{ margin: 25 }}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={this.onTitleChange}
                type="text"
                placeholder="MyAwesomeBlog"
              />
            </Form.Group>
            {this.renderError()}
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Content</Form.Label>
              <Form.Control
                value={content}
                onChange={this.onContentChange}
                as="textarea"
                rows="10"
              />
            </Form.Group>
            {this.renderError()}
            <Button id="done" onClick={this.onFormSubmit} variant="dark">
              Done
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  actions
)(NewBlog);
