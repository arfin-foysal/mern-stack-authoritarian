import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Registration() {
  const URL = "http://localhost:5000";
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const inputhandel = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandeler = (e) => {
    e.preventDefault();
    postData();
  };

  const postData = async () => {
    const headers = {
      "Content-type": "Application/json",
    };
    try {
      const res = await axios.post(URL + "/api/Registration", input, {
        headers,
      });
      console.log(res.data.mess);
      toast.success(res.data.mess);
    } catch (Error) {
      console.log(Error.response.data.mess);
      toast.error(Error.response.data.mess);
    }
  };

  return (
    <div className=" d-flex justify-content-center">
      <ToastContainer />
      <div className="card" style={{ width: "40rem" }}>
        <div className="card-body">
          <h5 className="card-title">Registration</h5>
          <form onSubmit={submitHandeler}>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName1"
                aria-describedby="emailHelp"
                name="name"
                value={input.name}
                onChange={inputhandel}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
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
