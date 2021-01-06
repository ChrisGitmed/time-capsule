import React from 'react';

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
      <button onClick={handleClick}>Create</button>
    </>
    );
  }
}
