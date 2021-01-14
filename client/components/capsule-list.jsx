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
    const listItems = capsuleList.map(capsule => {
      const date = new Date(capsule.sendOn);
      const sendString = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' }).format(date);
      const {
        capsuleId,
        recipient,
        type
      } = capsule;
      let icon;
      if (type === 'image/png') {
        icon = <span className="lnr lnr-camera file-type-icon flavor-text"></span>;
      }
      // if type = mp4/gif/????
      return (
        <li className="form-container" key={capsule.capsuleId}>
          <div className="row justify-center">{icon}</div>
          <div className="row wrap unwrap-if-larger">
            <p className="row pad-bottom justify-center">Capsule ID: <span className="flavor-text">{capsuleId}</span></p>
            <p className="row pad-bottom justify-center">Recipient: <span className="flavor-text">{recipient}</span></p>
          </div>
          <div className="row wrap unwrap-if-larger ">
            <p className="row pad-bottom justify-center">Send on: <span className="flavor-text">{sendString}</span></p>
          </div>
        </li>
      );
    });
    return <ul>{listItems}</ul>;
  }
}
