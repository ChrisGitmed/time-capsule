import React from 'react';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';
import Navbar from './components/navbar';
import CapsuleCreationForm from './components/capsule-creation-form';
import AuthForm from './components/auth-form';
import Hook from './components/hook';
import Home from './pages/home';
import DownloadPage from './pages/download';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('time-capsule-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('time-capsule-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('time-capsule-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    let { path } = this.state.route;
    path = path.split('/')[0];
    if (path === '') {
      window.location.hash = 'my-capsules';
    }
    if (path === 'my-capsules' || path === '') {
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
                <AuthForm onSignIn={this.handleSignIn} />
                <Hook />
              </>
      );
    }
  }

  render() {
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <div className="page-container">
          <Navbar onSignOut={handleSignOut}/>
          {this.renderPage()}
        </div>
      </AppContext.Provider>
    );
  }
}
