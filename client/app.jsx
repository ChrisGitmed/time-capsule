import React from 'react';
import Navbar from './components/navbar';
import CapsuleCreationForm from './components/capsule-creation-form';
import SignInSignUpForm from './components/sign-in-sign-up-form';

export default class App extends React.Component {
  render() {
    return (
      <div className="page-container">
        <Navbar />
        <SignInSignUpForm />
        <CapsuleCreationForm />
      </div>
    );
  }
}
