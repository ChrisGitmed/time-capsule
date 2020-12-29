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
    // const form = new FormData(event.target);
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api', req)
      .then(res => {
        event.target.reset();
      })
      .catch(err => {
        if (err) throw err;
      });
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
            <input type="file" name="file"/>
          </div>
        </div>
        <div className="row justify-center">
          <button className="submit-button">Submit</button>
        </div>
      </form>
    );
  }
}
