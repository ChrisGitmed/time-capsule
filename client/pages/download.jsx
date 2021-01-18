import React from 'react';

export default class DownloadPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleDownloadClick = this.handleDownloadClick.bind(this);
  }

  handleDownloadClick(event) {
    event.preventDefault();
    const fullPathArray = window.location.hash.split('/');
    const capsuleId = fullPathArray[fullPathArray.length - 1];
    const reqString = '/api/download/' + capsuleId;
    const req = {
      mode: 'no-cors'
    };
    fetch(reqString, req)
      .then(res => res.json())
      .then(result => {
        const { url } = result;
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
      })
      .catch(err => {
        if (err) throw err;
      });
  }

  render() {
    const { handleDownloadClick } = this;
    return (
      <div className="row justify-center">
        <button onClick={handleDownloadClick}>Download</button>
      </div>
    );
  }
}
