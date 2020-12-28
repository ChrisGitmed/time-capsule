import React from 'react';
import { level } from 'react-bulma-components';

export default class Navbar extends React.Component {
  render() {
    return (
      <level renderAs="nav">
        <h1>Hello world!</h1>
      </level>
    );
  }
}
