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
    return <h1>Capsule list coming soon.</h1>;
  }
}
