import React from 'react';

export default function DownloadPage() {

  function handleDownload(event) {
    event.preventDefault();
    const pathArray = window.location.hash.split('/');
    const capsuleId = pathArray[pathArray.length - 1];
    const req = {
      mode: 'no-cors'
    };
    fetch(`/api/download/${capsuleId}`, req)
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

  return (
    <div className="form-container">
      <div className="row justify-center pad-bottom">
        <p>Click to start your download.</p>
      </div>
      <div className="row justify-center">
        <span className="lnr lnr-download download-icon" onClick={handleDownload}></span>
      </div>
    </div>
  );
}
