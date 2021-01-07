import React from 'react';
import CapsuleList from '../components/capsule-list';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    window.location.hash = 'create';
  }

  render() {
    const { handleClick } = this;
    return (
    <>
      <div className="row justify-center">
        <button className="create-button"onClick={handleClick}>Create</button>
      </div>
      <CapsuleList />
    </>
    );
  }
}
