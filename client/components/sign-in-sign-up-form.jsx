import React from 'react';

export default class SignInSignUpForm extends React.Component {
  render() {
    return (
      <form>
        <div className="form-container">
          <div className="row align-center">
            <label className="pad-right username-label" htmlFor="username">Username: </label>
            <input className="input-box" type="text" name=""username/>
          </div>
          <div className="row align-center">
            <label className="pad-right password-label" htmlFor="password">Password: </label>
            <input className="input-box" type="text" name="password"/>
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
