import React from 'react';

export default class CapsuleCreationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ''
    };
    this.fileInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const req = {
      method: 'POST',
      body: form
    };
    fetch('/api/uploads', req)
      .then(res => {
        event.target.reset();
      })
      .catch(err => {
        if (err) throw err;
      });
  }

  handleClick(event) {
  }

  handleDrop(event) {
    event.preventDefault();
    if (event.dataTransfer.items &&
        event.dataTransfer.items[0].kind === 'file') {
      const fileInput = this.fileInput.current;
      fileInput.files = event.dataTransfer.files;
    }
  }

  handleDragOver(event) {
    event.preventDefault();
  }

  render() {
    const {
      handleSubmit,
      handleDragOver,
      handleDrop,
      handleClick,
      fileInput
    } = this;

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="row drop-zone" onClick={handleClick} onDrop={handleDrop} onDragOver={handleDragOver}>
            <p>Upload your files here.</p>
          </div>
          <div className="row justify-flex-end">
            <input required ref={fileInput} type="file" name="file"/>
          </div>
        </div>
        <div className="row justify-center">
          <button className="submit-button">Submit</button>
        </div>
      </form>
    );
  }
}
