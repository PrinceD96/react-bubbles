import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner"

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleLogin = e => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("http://localhost:5000/api/login", credentials)
      .then(res => {
        console.log("axios POST", res.data)
        sessionStorage.setItem("token", res.data.payload)
        props.history.push("/bubble-page");
        setIsLoading(false)
      })
      .catch(error => {
        console.log("axios POST: Invalid credentials, try again.", error)
        sessionStorage.removeItem("token")
      });
  }

  return (
    < div className="login__container" >
      {
        isLoading ? (
          <Loader
            type="Grid"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
            style={{ marginTop: "200px" }}
          />
        ) : (
            <>
              <h1>Welcome to the Bubble App!</h1>
              <p>Login</p>
              <form onSubmit={handleLogin}>
                <input type="text" name="username" placeholder="username" value={credentials.username} onChange={handleChange} required />
                <input type="password" name="password" placeholder="password" value={credentials.password} onChange={handleChange} required />
                <button>Login</button>
              </form>
            </>
          )}
    </div >
  );
};

export default Login;
