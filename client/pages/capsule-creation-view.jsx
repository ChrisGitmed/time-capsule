import React from 'react';
import CapsuleCreationForm from '../components/capsule-creation-form';

export default class CapsuleCreationView extends React.Component {
  render() {
    return (
      <>
        <CapsuleCreationForm/>
        <div className="row justify-center">
          <button className="submit-button">Submit</button>
        </div>
      </>
    );
  }
}
