import React, { useContext } from 'react';
import CapsuleList from '../components/capsule-list';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default function Home() {

  const { user } = useContext(AppContext);
  if (!user) return <Redirect to="sign-in" />;

  function handleClick(event) {
    window.location.hash = 'create';
  }

  return (
    <>
      <div className="row justify-center">
        <button className="create-button big-button" onClick={handleClick}>Create a new capsule</button>
      </div>
      <CapsuleList />
    </>
  );
}
