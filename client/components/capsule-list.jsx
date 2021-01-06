import React from 'react';

export default class CapsuleList extends React.Component {

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
        // eslint-disable-next-line no-console
        console.log(result);
      });
  }

  render() {
    return <h1>Capsule list coming soon.</h1>;
  }
}
