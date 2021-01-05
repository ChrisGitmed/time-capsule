import React from 'react';
import Navbar from './components/navbar';
import CapsuleCreationForm from './components/capsule-creation-form';
import SignInSignUpForm from './components/sign-in-sign-up-form';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

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
