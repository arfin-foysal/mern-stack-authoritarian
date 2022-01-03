import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const URL = "http://localhost:5000";
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const inputhandel = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandeler = (e) => {
    e.preventDefault();
    postData();
    setTimeout(() => {
      window.location.reload(false)
    }, 3000);
  };

  const postData = async () => {
    const headers = {
      "Content-type": "Application/json",
    };
    try {
      const res = await axios.post(URL+"/api/login", input, {
        headers,
      });
      // console.log(res.data.token);
      toast.success("sucessfull login");
      localStorage.setItem("token", res.data.token);
      
    } catch (Error) {
      console.log(Error);
      toast.error(Error.response.data.mess);
    }
  };
  return (
    <div className=" d-flex justify-content-center">
      <ToastContainer />
      <div className="card" style={{ width: "40rem" }}>
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          <form onSubmit={submitHandeler}>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={input.email}
                onChange={inputhandel}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={input.password}
                onChange={inputhandel}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
