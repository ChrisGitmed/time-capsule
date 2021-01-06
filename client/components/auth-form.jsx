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
    if (action === 'sign-up') {
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
      };
      fetch('/api/auth/sign-up', req)
        .then(res => {
          this.setState({
            username: '',
            password: ''
          });
        })
        .catch(err => {
          if (err) throw err;
        });
    } else {
      // eslint-disable-next-line no-console
      console.log('Sign in request!');
    }
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    const {
      handleSubmit,
      handleUsernameChange,
      handlePasswordChange,
      handleSignUpClick,
      handleSignInClick
    } = this;

    const {
      username,
      password
    } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="row align-center">
            <label className="pad-right username-label" htmlFor="username">Username: </label>
            <input className="input-box" type="text" name="username" onChange={handleUsernameChange} value={username} />
          </div>
          <div className="row align-center">
            <label className="pad-right password-label" htmlFor="password">Password: </label>
            <input className="input-box" type="text" name="password" onChange={handlePasswordChange} value={password}/>
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
AuthForm.contextType = AppContext;
