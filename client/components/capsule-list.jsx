import React, { useState, useEffect } from 'react';

export default function CapsuleList() {
  const [capsuleList, setCapsuleList] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('time-capsule-jwt');
    const req = {
      headers: {
        'x-access-token': token
      }
    };
    fetch('api/capsules', req)
      .then(res => res.json())
      .then(result => {
        setCapsuleList(result);
      });
  }, []);

  if (!capsuleList) return <p style={{ textAlign: 'center' }}>loading...</p>;

  const listItems = capsuleList.map(capsule => {
    const date = new Date(capsule.sendOn);
    const currentDate = new Date().getTime();
    const SentOrSendOn = (date < currentDate ? 'Sent: ' : 'Send On: ');
    const sendString = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' }).format(date);
    const {
      capsuleId,
      recipient,
      type
    } = capsule;
    const typeArray = type.split('/');
    let classString;
    if (typeArray[0] === 'image') {
      classString = 'lnr-picture';
    } else if (typeArray[0] === 'text') {
      classString = 'lnr-text-size';
    } else if (typeArray[0] === 'video') {
      classString = 'lnr-camera-video';
    } else if (typeArray[0] === 'audio') {
      classString = 'lnr-volume-high';
    } else if (typeArray[0] === 'application') {
      classString = 'lnr-file-empty';
    }
    const icon = <span className={`lnr ${classString} file-type-icon flavor-text`}></span>;

    return (
      <li className="form-container" key={capsule.capsuleId}>
        <div className="row wrap unwrap-if-large align-center justify-space-between">
          <div className="row justify-center">
            {icon}
          </div>
          <div className="row wrap">
            <p className="row pad-top remove-pad-top-if-large">Capsule ID: <span className="flavor-text">{capsuleId}</span></p>
            <p className="row pad-bottom pad-top">Recipient: <span className="flavor-text">{recipient}</span></p>
            <p className="row">{SentOrSendOn}<span className="flavor-text">{sendString}</span></p>
          </div>
        </div>
      </li>
    );
  });
  return <ul>{listItems}</ul>;
}
