import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      <div className="row text-center mb-4">
        <div className="col">
          <h1 className="display-4 mb-3">About myNotebook</h1>
          <p className="lead mb-4">Learn more about our application and how we prioritize your data security.</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 d-flex flex-column">
          <div className="card border-light shadow-sm rounded-3 mb-4 flex-fill">
            <div className="card-body">
              <h3 className="card-title mb-3">What is myNotebook?</h3>
              <p className="card-text">
                myNotebook is an intuitive and secure application designed to help you manage your notes effortlessly. 
                Whether for personal tasks, project tracking, or general note-taking, myNotebook offers a clean and user-friendly 
                interface to keep everything organized. Our mission is to enhance your productivity while ensuring an enjoyable 
                user experience.
              </p>
            </div>
          </div>
          <div className="card border-light shadow-sm rounded-3 flex-fill">
            <div className="card-body">
              <h3 className="card-title mb-3">Additional Information</h3>
              <p className="card-text">
                myNotebook also features a modern design, seamless integration, and regular updates to ensure a reliable and secure 
                note-taking experience. We are dedicated to continuously enhancing our platform to meet your needs.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-light shadow-sm rounded-3 h-100">
            <div className="card-body">
              <h3 className="card-title mb-3">How is myNotebook Secure?</h3>
              <p className="card-text">
                We prioritize your data security with advanced measures. myNotebook employs JSON Web Tokens (JWT) for robust 
                authentication and data protection. Here's how JWT contributes to our security framework:
              </p>
              <ul className="list-unstyled">
                <li><strong>Token-Based Authentication:</strong> Users receive a token upon logging in, used for secure and 
                verified requests.</li>
                <li><strong>Data Integrity:</strong> JWTs are digitally signed to prevent tampering and ensure data remains intact.</li>
                <li><strong>Stateless Authentication:</strong> JWTs are self-contained, reducing session management vulnerabilities 
                and improving scalability.</li>
                <li><strong>Expiration and Refresh:</strong> Tokens have expiration times, minimizing risk from compromised tokens. 
                Secure token refresh mechanisms maintain session integrity.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
