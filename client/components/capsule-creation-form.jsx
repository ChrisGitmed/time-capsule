import React, { useState, useContext } from 'react';
import Redirect from './redirect';
import AppContext from '../lib/app-context';

export default function CapsuleCreationForm() {
  const [fileName, setFileName] = useState('');
  const { user } = useContext(AppContext);

  if (!user) return <Redirect to="sign-in" />;

  const fileInput = React.createRef();

  function handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem('time-capsule-jwt');
    const form = new FormData(event.target);
    const date = form.get('date');
    const time = form.get('time');
    const dateArray = date.split('-');
    const timeArray = time.split(':');
    const [
      year,
      month,
      day
    ] = dateArray;
    const [
      hour,
      minute
    ] = timeArray;
    const sendOn = JSON.stringify(new Date(year, month - 1, day, hour, minute));
    form.append('sendOn', sendOn);
    form.delete('time');
    form.delete('date');
    const req = {
      method: 'POST',
      headers: {
        'x-access-token': token
      },
      body: form
    };
    fetch('/api/uploads', req)
      .then(
        event.target.reset(),
        setFileName('')
      )
      .then(res => {
        window.location.hash = 'my-capsules';
      })
      .catch(err => {
        if (err) throw err;
      });
  }

  function handleClick(event) {
    fileInput.current.click();
  }

  function handleDrop(event) {
    event.preventDefault();
    if (event.dataTransfer.items && event.dataTransfer.items[0].kind === 'file') {
      fileInput.current.files = event.dataTransfer.files;
      setFileName(fileInput.current.files[0].name);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleChange(event) {
    setFileName(fileInput.current.files[0].name);
  }

  const dropZoneText = (!fileName)
    ? <p>Click to upload a file, or drag and drop.</p>
    : <p className="success-text">{fileName}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="row drop-zone input-box" onClick={handleClick} onDrop={handleDrop} onDragOver={handleDragOver}>
          {dropZoneText}
        </div>
        <input required ref={fileInput} className="hidden" type="file" name="file" onChange={handleChange} />
        <div className="row recipient-section">
          <label className="pad-right" htmlFor="recipient">Recipient:</label>
          <input required className="input-box" type="email" name="recipient" placeholder="john@example.com" />
        </div>
        <div className="date-time-row justify-space-between unwrap-if-large">
          <div className="date-section">
            <label className="date-label pad-right" htmlFor="date">Date: </label>
            <input required className="input-box" type="date" name="date" />
          </div>
          <div className="time-section">
            <label className="time-label pad-right" htmlFor="time">Time: </label>
            <input required className="input-box" type="time" name="time" />
          </div>
        </div>
      </div>
      <div className="row justify-center">
        <button className="submit-button big-button">Seal the time capsule</button>
      </div>
    </form>
  );
}
