import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from './redirect';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleHashChangeClick = this.handleHashChangeClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const action = this.context.route.path;
    const { password } = this.state;
    if (password.length < 8) {
      this.setState({ message: 'Password is too short' });
    } else if (!/\d/.test(password)) {
      this.setState({ message: 'Password needs a number.' });
    } else if (!/[A-Z]+/.test(password)) {
      this.setState({ message: 'Password needs a capital.' });
    } else if (!/[\W]/.test(password)) {
      this.setState({ message: 'Password needs a symbol.' });
    } else {
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
      };
      fetch(`/api/auth/${action}`, req)
        .then(res => {
          if (res.status === 401) {
            this.setState({ message: 'Invalid login.' });
          }
          return res.json();
        })
        .then(result => {
          if (action === 'sign-up') {
            window.location.hash = 'sign-in';
            this.setState({
              message: 'success'
            });
          }
          if (result.user && result.token) {
            this.props.onSignIn(result);
            window.location.hash = 'my-capsules';
          }
        })
        .catch(err => {
          if (err) throw err;
        });
    }
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
      message: ''
    });
  }

  handleHashChangeClick(event) {
    this.setState({
      message: ''
    });
  }

  render() {
    const {
      handleSubmit,
      handleUsernameChange,
      handlePasswordChange,
      handleHashChangeClick
    } = this;

    const {
      username,
      password,
      message
    } = this.state;

    const { user } = this.context;
    const { path } = this.context.route;

    if (user) return <Redirect to=""/>;

    let button = <button className="sign-in-button" >Sign In</button>;
    if (path === 'sign-up') {
      button = <button className="sign-up-button" >Sign Up</button>;
    }

    let link = <a href="#sign-up" className="auth-link" onClick={handleHashChangeClick}>Sign-up</a>;
    if (path === 'sign-up') {
      link = <a href="#sign-in" className="auth-link" onClick={handleHashChangeClick}>Sign-In</a>;
    }

    let hiddenText = <em className="error-text">{message}</em>;
    if (message === 'success') {
      hiddenText = <em className="success-text">Sign-up successful.</em>;
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-container auth-form">
          <div className="row align-center">
            <label className="pad-right username-label" htmlFor="username">Username: </label>
            <input required className="input-box" type="text" name="username" autoComplete="username" onChange={handleUsernameChange} value={username} />
          </div>
          <div className="row align-center">
            <label className="pad-right password-label" htmlFor="password">Password: </label>
            <input required className="input-box" type="password" autoComplete="current-password" onChange={handlePasswordChange} value={password}/>
          </div>
          <div className="row align-center justify-space-between wrap unwrap-if-large">
            <div className="row placeholder justify-center">
              {hiddenText}
            </div>
            <div className="row justify-flex-end align-center">
              {link}
              {button}
            </div>
          </div>
        </div>
      </form>
    );
  }
}
AuthForm.contextType = AppContext;
