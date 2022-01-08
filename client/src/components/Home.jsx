import React from "react";
import jwt_decode from "jwt-decode";
export default function Home() {
  var tokens = localStorage.getItem("token");
  var decoded = jwt_decode(tokens);

  return (
    <div className="card text-center " style={{ width: "18rem" }}>
      <div className="card-body">
        <h5>Name: {decoded.name}</h5>
        <h5>Email: {decoded.email}</h5>
      </div>
    </div>
  );
}
