import React from 'react';

export default class SignInSignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
  }

  handleSignInClick(event) {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(`Clicked: ${event.target.className}`);
  }

  handleSignUpClick(event) {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(`Clicked: ${event.target.className}`);
  }

  render() {
    const {
      handleSignInClick,
      handleSignUpClick
    } = this;

    return (
      <form>
        <div className="form-container">
          <div className="row align-center">
            <label className="pad-right username-label" htmlFor="username">Username: </label>
            <input className="input-box" type="text" name="username"/>
          </div>
          <div className="row align-center">
            <label className="pad-right password-label" htmlFor="password">Password: </label>
            <input className="input-box" type="text" name="password"/>
          </div>
          <div className="row justify-space-between">
            <button className="sign-in-button" onClick={handleSignInClick}>Sign In</button>
            <button className="sign-up-button" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </form>
    );
  }
}
