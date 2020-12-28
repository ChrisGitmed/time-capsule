import React from 'react';

export default class CapsuleCreationForm extends React.Component {
  render() {
    return (
      <form>
        <div>
          Upload your files here.
        </div>
        <div>
          <button>Upload</button>
        </div>
      </form>
    );
  }
}
