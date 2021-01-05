import React from 'react';

export default class SignInSignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleUsernameChange(event) {
  // eslint-disable-next-line no-console
    console.log('Username changed');
  }

  handlePasswordChange(event) {
  // eslint-disable-next-line no-console
    console.log('Password changed');
  }

  render() {
    const {
      handleSubmit,
      handleUsernameChange,
      handlePasswordChange
    } = this;

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="row align-center">
            <label className="pad-right username-label" htmlFor="username">Username: </label>
            <input className="input-box" type="text" name="username" onChange={handleUsernameChange} />
          </div>
          <div className="row align-center">
            <label className="pad-right password-label" htmlFor="password">Password: </label>
            <input className="input-box" type="text" name="password" onChange={handlePasswordChange} />
          </div>
          <div className="row justify-space-between">
            <button className="sign-in-button">Sign In</button>
            <button className="sign-up-button">Sign Up</button>
          </div>
        </div>
      </form>
    );
  }
}
