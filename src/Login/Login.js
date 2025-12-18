// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
// Apply CSS according to your design theme or the CSS provided in week 3 lab 2
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {

  // State variables for email and password
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // GET navigation function from react-router-dom
  const navigate = useNavigate();

  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);

  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();

    // Send a POST request to the login API endpoint
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // Parse the response JSON
    const json = await res.json();

    if (json.authtoken) {
      // If authentication token is received, store it in session storage
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email);

      // Redirect user to home page and reload the window
      navigate('/');
      window.location.reload();
    } else {
      // Handle errors if authentication fails
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };

  return (
    <div className="container"> {/* Main container div for the page content */}
      <div className="login-grid"> {/* Div for login grid layout */}
        <div className="login-text"> {/* Div for login text */}
          <h2>Login</h2>
        </div>
        <div className="login-text"> {/* Additional login text with a link to Sign Up page */}
          Are you a new member? <span><Link to="/signup" style={{color: "#2190FF"}}> Sign Up Here</Link></span>
        </div>
        <br />
        <div className="login-form"> {/* Div for login form */}
          <form onSubmit={login}>
            <div className="form-group"> {/* Form group for email input */}
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="helpId" />
            </div>
            <div className="form-group"> {/* Form group for password input */}
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="helpId"
              />
            </div>
            <div className="btn-group"> {/* Button group for login and reset buttons */}
              <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button> 
              <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
            </div>
            <br />
            <div className="login-text"> {/* Additional login text for 'Forgot Password' option */}
              Forgot Password?
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
