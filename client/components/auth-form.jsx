import React from 'react';
import AppContext from '../lib/app-context';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.signInButton = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
  }

  handleSignUpClick(event) {
    window.location.hash = 'sign-up';
  }

  handleSignInClick(event) {
    window.location.hash = 'sign-in';
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
          this.signInButton.current.click();
        }
        if (result.user && result.token) {
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
        <div className="form-container auth-form">
          <div className="row align-center">
            <label className="pad-right username-label" htmlFor="username">Username: </label>
            <input required className="input-box" type="text" name="username" onChange={handleUsernameChange} value={username} />
          </div>
          <div className="row align-center">
            <label className="pad-right password-label" htmlFor="password">Password: </label>
            <input required className="input-box" type="text" name="password" onChange={handlePasswordChange} value={password}/>
          </div>
          <div className="row align-center justify-flex-end">
            <button className="sign-in-button" ref={this.signInButton} onClick={handleSignInClick}>Sign In</button>
            <button className="sign-up-button" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </form>
    );
  }
}
AuthForm.contextType = AppContext;
