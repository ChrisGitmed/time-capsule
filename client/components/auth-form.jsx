import React, { useState, useContext } from 'react';
import AppContext from '../lib/app-context';
import Redirect from './redirect';

export default function AuthForm() {
  const [username, setUsername] = useState('DemoUser');
  const [password, setPassword] = useState('password1!A');
  const [message, setMessage] = useState('');

  const context = useContext(AppContext);
  const { path } = context.route;
  const { user } = context;
  if (user) return <Redirect to="" />;

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setMessage('');
  }

  function handleHashChangeClick(event) {
    setMessage('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const action = context.route.path;
    if (password.length < 8) {
      setMessage('Password is too short');
    } else if (!/\d/.test(password)) {
      setMessage('Password needs a number');
    } else if (!/[A-Z]+/.test(password)) {
      setMessage('Password needs a capital.');
    } else if (!/[\W]/.test(password)) {
      setMessage('Password needs a symbol.');
    } else {
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      };
      fetch(`/api/auth/${action}`, req)
        .then(res => {
          if (res.status === 401) {
            setMessage('Invalid Login.');
          }
          return res.json();
        })
        .then(result => {
          if (action === 'sign-up') {
            window.location.hash = 'sign-in';
            setMessage('success');
          }
          if (result.user && result.token) {
            const { handleSignIn } = context;
            handleSignIn(result);
            window.location.hash = 'my-capsules';
          }
        })
        .catch(err => {
          if (err) throw err;
        });
    }
  }

  let button = <button className="sign-in-button" >Sign In</button>;
  let link = <a href="#sign-in" className="auth-link" onClick={handleHashChangeClick}>Sign-up</a>;

  if (path === 'sign-up') {
    button = <button className="sign-up-button" >Sign Up</button>;
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
          <input required disabled className="input-box" type="text" name="username" autoComplete="username" onChange={handleUsernameChange} value={username} />
        </div>
        <div className="row align-center">
          <label className="pad-right password-label" htmlFor="password">Password: </label>
          <input required disabled className="input-box" type="password" autoComplete="current-password" onChange={handlePasswordChange} value={password} />
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
