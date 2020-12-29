import React from 'react';

export default class CapsuleCreationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: 'hello.txt'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api', req);

  }

  render() {
    const { handleSubmit } = this;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="row drag-drop-field">
          <p>Upload your files here.</p>
        </div>
        <div className="row justify-flex-end">
          <button className="upload-button">Upload</button>
        </div>
        </div>
        <div className="row justify-center">
          <button className="submit-button">Submit</button>
        </div>
      </form>
    );
  }
}
