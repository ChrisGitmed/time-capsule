import React from 'react';
import Navbar from './components/navbar';
import CapsuleCreationView from './pages/capsule-creation-view';

export default class App extends React.Component {
  render() {
    return (
      <div className="page-container">
        <Navbar />
        <CapsuleCreationView />
      </div>
    );
  }
}
