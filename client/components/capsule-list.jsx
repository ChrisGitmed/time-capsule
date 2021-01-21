import React from 'react';

export default class CapsuleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      capsuleList: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('time-capsule-jwt');
    const req = {
      headers: {
        'x-access-token': token
      }
    };
    fetch('api/capsules', req)
      .then(res => res.json())
      .then(result => {
        this.setState({
          capsuleList: result
        });
      });
  }

  render() {
    const { capsuleList } = this.state;
    if (capsuleList.length === 0) {
      return (
        <div className="row justify-center">
          <p className="no-capsules-text">No time capsules pending.</p>
        </div>
      );
    }
    const listItems = capsuleList.map(capsule => {
      const date = new Date(capsule.sendOn);
      const currentDate = new Date().getTime();

      let sendOnOrSent = 'Send On:';
      if (date < currentDate) {
        sendOnOrSent = 'Sent:';
      }
      const sendString = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' }).format(date);
      const {
        capsuleId,
        recipient,
        type
      } = capsule;
      const typeArray = type.split('/');
      let classString;
      if (typeArray[0] === 'image') {
        classString = 'lnr lnr-picture file-type-icon flavor-text';
      } else if (typeArray[0] === 'text') {
        classString = 'lnr lnr-text-size file-type-icon flavor-text';
      } else if (typeArray[0] === 'video') {
        classString = 'lnr lnr-camera-video file-type-icon flavor-text';
      } else if (typeArray[0] === 'audio') {
        classString = 'lnr lnr-volume-high file-type-icon flavor-text';
      } else if (typeArray[0] === 'application') {
        classString = 'lnr lnr-file-empty file-type-icon flavor-text';
      }
      const icon = <span className={classString}></span>;
      return (
        <li className="form-container" key={capsule.capsuleId}>
          <div className="row wrap unwrap-if-large align-center justify-space-between">
            <div className="row justify-center">
              {icon}
            </div>
            <div className="row wrap">
              <p className="row pad-top remove-pad-top-if-large">Capsule ID: <span className="flavor-text">{capsuleId}</span></p>
              <p className="row pad-bottom pad-top">Recipient: <span className="flavor-text">{recipient}</span></p>
              <p className="row">{sendOnOrSent}<span className="flavor-text">{sendString}</span></p>
            </div>
          </div>
        </li>
      );
    });
    return <ul>{listItems}</ul>;
  }
}
