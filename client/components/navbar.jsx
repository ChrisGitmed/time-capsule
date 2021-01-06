import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onSignOut();
    window.location.hash = '';
  }

  render() {
    return (
      <nav>
        <h1>
          Time Capsule
        </h1>
        <a href="#sign-in" onClick={this.handleClick}>Sign-Out</a>
      </nav>
    );
  }
}
Navbar.contextType = AppContext;
