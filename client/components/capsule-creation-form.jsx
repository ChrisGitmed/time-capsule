import React from 'react';

export default class CapsuleCreationForm extends React.Component {
  render() {
    return (
      <form className="form-container">
        <div className="row drag-drop-field">
          <p>Upload your files here.</p>
        </div>
        <div className="row justify-flex-end">
          <button className="upload-button">Upload</button>
        </div>
      </form>
    );
  }
}
