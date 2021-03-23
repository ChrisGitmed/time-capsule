import React, { useContext } from 'react';
import AppContext from '../lib/app-context';

export default function Navbar() {
  const context = useContext(AppContext);
  const { route, handleSignOut } = context;
  let { path } = route;

  function handleClick(event) {
    handleSignOut();
    window.location.hash = '';
  }

  let link;
  path = path.split('/')[0];
  if (path === 'my-capsules') {
    link = <a href="#sign-in" onClick={handleClick}>Sign Out</a>;
  } else if (path === 'create' || path === 'download') {
    link = <a href="#my-capsules">Home</a>;
  }

  return (
  <nav>
    <h1>
      Time Capsule
    </h1>
    {link}
  </nav>);
}
