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
      return (
        <li className="form-container" key={capsule.capsuleId}>
          <div className="row wrap unwrap-if-larger">
            <p className="row pad-bottom justify-center">Capsule ID: <span className="flavor-text">{capsule.capsuleId}</span></p>
            <p className="row pad-bottom justify-center">Recipient: <span className="flavor-text">{capsule.recipient}</span></p>
          </div>
          <p className="row justify-center">Send on: <span className="flavor-text">{sendString}</span></p>
        </li>
      );
    });
    return <ul>{listItems}</ul>;
  }
}
