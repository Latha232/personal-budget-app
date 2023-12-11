import React, { useState, useRef, useEffect } from "react";
import '../css/Login.css';
import { TextField } from '@mui/material';
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const LoginSignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [name, setName] = useState("");
  const [loginForm, setLoginForm] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const emailSignUpRef = useRef();
  const passwordSignUpRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("budget-token")) {
      navigate("/");
    }
  }, []);

  const navigate = useNavigate();

  const signUp = async () => {
    if (name === "") {
      toast.error('Please enter your name!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      nameRef.current.focus();
      return
    }
    if (signUpEmail === "") {
      toast.error('Please enter your email!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      emailSignUpRef.current.focus();
      return
    }

    if (signUpPassword === "") {
      toast.error('Please enter your password!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      passwordSignUpRef.current.focus();
      return
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passwordRegex.test(signUpPassword)) {
      toast.error('Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      passwordSignUpRef.current.focus();
      return
    }
    setLoading(true);
    await Axios.post("https://moneydiet.onrender.com/auth/signup", {
      name: name,
      email: signUpEmail,
      password: signUpPassword,
    }).then(({ data }) => {
      setLoading(false);
      if (data.status !== 200) {
        toast.error(data.message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setSignUpEmail("");
        setSignUpPassword("");
        setName("");
        toast.success('Signedup successfully!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("budget-token", data.token);
        navigate("/");
      }
    }).catch((err) => {
      setLoading(false);
      toast.error(err.message, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  }

  const login = async () => {
    if (email === "") {
      toast.error('Please enter your email!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      emailRef.current.focus();
      return
    }
    if (password === "") {
      toast.error('Please enter your password!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      passwordRef.current.focus();
      return
    }
    setLoading(true);
    await Axios.post("https://moneydiet.onrender.com/auth/login", {
      email: email,
      password: password,
    }).then(({ data }) => {
      setLoading(false);
      if (data.status !== 200) {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setEmail("");
        setPassword("");
        setName("");
        toast.success('Login successful!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("budget-token", data.token);
        navigate("/");
      }
    }).catch((err) => {
      setLoading(false);
      toast.error(err.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="auth">
        <div className="container d-flex justify-content-center align-items-center flex-wrap">
          <div className="col-md-6 col-12 auth-left">
            <img src="/assets/login.jpg" alt="login" className="auth-img" />
          </div>
          <div className="col-md-6 col-12 auth-right">
            {
              loginForm ? (
                <div className="auth-form col-md-7">
                  <h1 className="auth-title">Login</h1>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    className="auth-input"
                    name="email"
                    placeholder="Enter email"
                    margin="dense"
                    onChange={(e) => setEmail(e.target.value)}
                    inputRef={emailRef}
                    value={email}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    className="auth-input"
                    name="password"
                    placeholder="Enter password"
                    margin="dense"
                    onChange={(e) => setPassword(e.target.value)}
                    inputRef={passwordRef}
                    value={password}
                  />
                  <button className="btn btn-primary btn-block mt-5" onClick={() => login()} disabled={loading}>
                    {
                      loading ? (
                        <div className="spinner-border spinner-border-sm text-light" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Login"
                      )
                    }
                  </button>
                  <p className="mt-3 text-center">
                    Don't have an account? <span className="auth-link" onClick={() => setLoginForm(false)}>Signup</span>
                  </p>
                </div>
              ) : (
                <div className="auth-form col-md-7">
                  <h1 className="auth-title">Signup</h1>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    type="text"
                    className="auth-input"
                    name="name"
                    placeholder="Enter name"
                    margin="dense"
                    onChange={(e) => setName(e.target.value)}
                    inputRef={nameRef}
                    value={name}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    className="auth-input"
                    name="email"
                    placeholder="Enter email"
                    margin="dense"
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    inputRef={emailSignUpRef}
                    value={signUpEmail}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    className="auth-input"
                    name="password"
                    placeholder="Enter password"
                    margin="dense"
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    inputRef={passwordSignUpRef}
                    value={signUpPassword}
                  />
                  <button className="btn btn-primary btn-block mt-3" onClick={() => signUp()} disabled={loading}>
                    {
                      loading ? (
                        <div className="spinner-border spinner-border-sm text-light" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Signup"
                      )
                    }
                  </button>
                  <p className="mt-3 text-center">
                    Already have an account? <span className="auth-link" onClick={() => setLoginForm(true)}>Login</span>
                  </p>
                </div>
              )
            }

          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignupForm;