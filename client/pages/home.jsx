import React from 'react';
import CapsuleList from '../components/capsule-list';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    window.location.hash = 'create';
  }

  render() {
    const { handleClick } = this;
    if (!this.context.user) return <Redirect to="sign-in"/>;
    return (
    <>
      <div className="row justify-center">
        <button className="create-button"onClick={handleClick}>Create</button>
      </div>
      <CapsuleList />
    </>
    );
  }
}
Home.contextType = AppContext;
