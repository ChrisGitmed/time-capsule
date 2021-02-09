import React, { useContext } from 'react';
import AppContext from '../lib/app-context';

export default function Navbar(props) {
  const context = useContext(AppContext);

  function handleClick(event) {
    props.onSignOut();
    window.location.hash = '';
  }
  let link;
  const { path } = context.route;
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
      </nav>
  );
}
