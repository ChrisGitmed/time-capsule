import React from 'react';

export default class CapsuleCreationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: ''
    };
    this.fileInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    const fileInput = this.fileInput.current;
    fileInput.click();
  }

  handleDrop(event) {
    event.preventDefault();
    if (event.dataTransfer.items &&
        event.dataTransfer.items[0].kind === 'file') {
      const fileInput = this.fileInput.current;
      fileInput.files = event.dataTransfer.files;
      this.setState({
        fileName: fileInput.files[0].name
      });
    }
  }

  handleDragOver(event) {
    event.preventDefault();
  }

  handleChange(event) {
    const fileInput = this.fileInput.current;
    this.setState({
      fileName: fileInput.files[0].name
    });
  }

  render() {
    const {
      handleSubmit,
      handleDragOver,
      handleDrop,
      handleClick,
      handleChange,
      fileInput
    } = this;

    const { fileName } = this.state;

    let dropZoneText = <p>Click to upload a file, or drag and drop.</p>;
    if (fileName !== '') {
      dropZoneText = <p className="green-text">{fileName}</p>;
    }
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="row drop-zone" onClick={handleClick} onDrop={handleDrop} onDragOver={handleDragOver}>
            {dropZoneText}
          </div>
          <div className="row justify-flex-end">
            <input required ref={fileInput} type="file" name="file" onChange={handleChange}/>
          </div>
        </div>
        <div className="row justify-center">
          <button className="submit-button">Submit</button>
        </div>
      </form>
    );
  }
}
