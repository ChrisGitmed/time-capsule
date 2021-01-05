import React from 'react';

export default class SignInSignUpForm extends React.Component {
  render() {
    return (
      <form>
        <div className="form-container">
          <div className="row">
            <label htmlFor="username">Username: </label>
            <input className="input-box" type="text"/>
          </div>
          <div className="row">
            <label htmlFor="password">Password: </label>
            <input className="input-box" type="text" />
          </div>
          <div className="row">
            <em className="">Forgot your password?</em>
          </div>
          <div className="row">
            <button className="sign-in-button">Sign In</button>
            <button className="sign-up-button">Sign Out</button>
          </div>
        </div>
      </form>
    );
  }
}
