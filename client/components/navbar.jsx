import React, { useContext } from 'react';
import AppContext from '../lib/app-context';

export default function Navbar() {
  const context = useContext(AppContext);

  function handleClick(event) {
    const { handleSignOut } = context;
    handleSignOut();
    window.location.hash = '';
  }

  let links;
  let { path } = context.route;
  path = path.split('/')[0];
  if (path === 'my-capsules') {
    links = <a href="#sign-in" onClick={handleClick}>Sign Out</a>;
  } else if (path === 'create' || path === 'download') {
    links = <a href="#my-capsules">Home</a>;
  }

  return (
  <nav>
    <h1>
      Time Capsule
    </h1>
    {links}
  </nav>);
}
/*
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
    let { path } = this.context.route;
    path = path.split('/')[0];
    if (path === 'my-capsules') {
      links = <a href="#sign-in" onClick={this.handleClick}>Sign Out</a>;
    } else if (path === 'create' || path === 'download') {
      links = <a href="#my-capsules">Home</a>;
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
*/
