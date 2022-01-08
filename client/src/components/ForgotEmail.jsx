import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function ForgotEmail() {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const URL = "http://localhost:5000";

  const submitHandeler = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        "Content-type": "Application/json",
      };
      const res = await axios.post(
        URL + "/api/forgot-password",
        { email: email },
        {
          headers,
        }
      );
      toast.success(res.data.mess);
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    } catch (Error) {
      toast.error(Error.response.data.mess);
      // console.log(Error.response.data.mess);
    }
  };

  return (
    <div className=" d-flex justify-content-center">
      <ToastContainer />
      <div className="card" style={{ width: "40rem" }}>
        <div className="card-body">
          <h5 className="card-title">Forgot Email</h5>
          <form onSubmit={submitHandeler}>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
