import React from 'react';

export default class Hook extends React.Component {
  render() {
    return (
      <div className="form-container">
        <article className="about-article">
          <header className="row justify-center">
            <h3 className="flavor-text">What is this?</h3>
          </header>
          <p className="pad-bottom">Time Capsule is a full-stack application
             created to help people send files across time through email.
             Capsules can contain just about any file type.
          </p>
          <p className="pad-bottom">
             Users can create a capsule by uploading a file, and specifying a
             recipient, date, and time before sealing the capsule.
          </p>
          <p className="pad-bottom"> Recipients will receive an email at the
             specified time containing a link to a page where
             they can download the contents of the capsule.
          </p>
          <p className="extra-pad-bottom">
            <span className="flavor-text remove-pad">NOTE: </span>
            Downloading random files from the internet is sketchy.
            Only download capsules when you have a good idea of who sent it to you.
          </p>
        </article>

        <div className="row justify-center">
          <img src="./images/time-capsule-portfolio-demo.gif" alt=""/>
        </div>
      </div>
    );
  }
}
