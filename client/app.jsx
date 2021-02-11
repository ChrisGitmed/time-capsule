import React, { useState, useEffect } from 'react';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';
import Navbar from './components/navbar';
import CapsuleCreationForm from './components/capsule-creation-form';
import AuthForm from './components/auth-form';
import Hook from './components/hook';
import Home from './pages/home';
import DownloadPage from './pages/download';

export default function App() {
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState(parseRoute(window.location.hash));

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setRoute(parseRoute(window.location.hash));
    });
    const token = window.localStorage.getItem('time-capsule-jwt');
    const user = token ? decodeToken(token) : null;
    setUser(user);
  }, []);

  function handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('time-capsule-jwt', token);
    setUser(user);
  }

  function handleSignOut() {
    window.localStorage.removeItem('time-capsule-jwt');
    setUser(null);
  }

  function renderPage() {
    let { path } = route;
    path = path.split('/')[0];
    if (path === '') {
      window.location.hash = 'my-capsules';
    }
    if (path === 'my-capsules') {
      return <Home />;
    }
    if (path === 'create') {
      return <CapsuleCreationForm />;
    }
    if (path === 'download') {
      return <DownloadPage />;
    } else {
      window.location.hash = 'sign-in';
      return (<>
                <AuthForm onSignIn={handleSignIn} />
                <Hook />
              </>
      );
    }
  }

  const contextValue = { user, route, handleSignIn, handleSignOut };
  return (
    <AppContext.Provider value={contextValue}>
      <div className="page-container">
        <Navbar onSignOut={handleSignOut} />
        {renderPage()}
      </div>
    </AppContext.Provider>
  );
}
