// RegisterForm.js
import React from 'react';
import "./App.css"; // Make sure to import your stylesheet

function RegisterForm() {
  return (
    <html lang="en" >
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="styles.css" />
      <title>muse.</title> 
    </head>

    <div className="bgimage">
    <div className="menu">
      <div className="leftmenu">
        <h4> muse. </h4>
      </div>
    </div>
  </div>

<body>
    <div className="container">
      <div className="center">
        
        <h1>Register</h1>
        <form method="POST" action="">
        
          <div className="txt_field">
            <input type="text" name="name" required />
            <span></span>
            <label>Profile Name</label>
          </div>
          <div className="txt_field">
            <input type="text" name="name" required />
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input type="password" name="password" required />
            <span></span>
            <label>Password</label>
          </div>
          <div className="txt_field">
            <input type="password" name="cpassword" required />
            <span></span>
            <label>Confirm Password</label>
          </div>
          <input name="submit" type="Submit" value="Sign Up" />
          <div className="signup_link">
            Have an Account? <a href="login">Login Here</a>
          </div>
        </form>
      </div>
    </div>

    </body>
    </html>
  );
}

export default RegisterForm;
