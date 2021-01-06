import React from 'react';
import AppContext from '../lib/app-context';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
  }

  handleSignUpClick(event) {
    window.location.hash = 'sign-up';
    this.context.route.path = 'sign-up';
  }

  handleSignInClick(event) {
    window.location.hash = 'sign-in';
    this.context.route.path = 'sign-in';
  }

  handleSubmit(event) {
    event.preventDefault();
    const action = this.context.route.path;
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
          window.location.hash = 'landing';
        }
      })
      .catch(err => {
        if (err) throw err;
      });
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  isLongerThan8(password) {
    if (password.length > 8) {
      return true;
    } else return false;
  }

  doesIncludeANumber(password) {
    const regex = /\d/;
    const hasANumber = regex.test(password);
    return hasANumber;
  }

  doesIncludeACapitalLetter(password) {
    const regex = /[A-Z]+/;
    const hasACapital = regex.test(password);
    return hasACapital;
  }

  doesIncludeASymbol(password) {
    const regex = /[\W]/;
    const hasASymbol = regex.test(password);
    return hasASymbol;
  }

  render() {
    const {
      handleSubmit,
      handleUsernameChange,
      handlePasswordChange,
      handleSignUpClick,
      handleSignInClick,
      isLongerThan8,
      doesIncludeANumber,
      doesIncludeACapitalLetter,
      doesIncludeASymbol
    } = this;

    const {
      username,
      password
    } = this.state;

    let message;

    if (password.length > 0) {
      if (!isLongerThan8(password)) {
        message = 'Your password is too short.';
      } else if (!doesIncludeACapitalLetter(password)) {
        message = 'Password must include a capital letter';
      } else if (!doesIncludeANumber(password)) {
        message = 'Password must include a number.';
      } else if (!doesIncludeASymbol(password)) {
        message = 'Password must include a symbol.';
      }
    }
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-container auth-form">
          <div className="row align-center">
            <label className="pad-right username-label" htmlFor="username">Username: </label>
            <input className="input-box" type="text" name="username" onChange={handleUsernameChange} value={username} />
          </div>
          <div className="row align-center">
            <label className="pad-right password-label" htmlFor="password">Password: </label>
            <input className="input-box" type="text" name="password" onChange={handlePasswordChange} value={password}/>
          </div>
          <div className="row justify-flex-end">
            <em>{message}</em>
          </div>
          <div className="row align-center justify-flex-end">
            <button className="sign-in-button" onClick={handleSignInClick}>Sign In</button>
            <button className="sign-up-button" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </form>
    );
  }
}
AuthForm.contextType = AppContext;
