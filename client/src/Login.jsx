import React from 'react';
import "./App.css"

function LoginForm() {
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
                
        
            <h1>Login</h1>

            <form action="" method="POST">
              <div className="txt_field">
                <input type="text" name="text" required />
                <span></span>
                <label>Username</label>
              </div>

              <div className="txt_field" type="password">
                <input type="password" name="password" required />
                <span></span>
                <label>Password</label>
              </div>
              
              <div className="pass">Forget Password?</div>
              
              <input name="submit" type="Submit" value="Login" />
              <div className="signup_link">
                Don't have an account yet? <a href="register">Register</a>
              </div>

            </form>
          </div>
        </div>
      </body>
    </html>
  );
}

export default LoginForm;