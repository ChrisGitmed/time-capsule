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
    let links;
    if (this.context.route.path === 'home' || this.context.route.path === 'create') {
      links = <a href="#sign-in" onClick={this.handleClick}>Sign Out</a>;
    }
    return (
      <nav>
        <h1>
          Time Capsule
        </h1>
        {links}
      </nav>
    );
  }
}
Navbar.contextType = AppContext;
