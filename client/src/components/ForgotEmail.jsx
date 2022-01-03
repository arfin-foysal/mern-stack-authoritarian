import React from 'react'

export default function ForgotEmail() {
  return (
    <div className=' d-flex justify-content-center'>
      <div className="card" style={{width: "40rem"}}>
 
  <div className="card-body">
    <h5 className="card-title">Forgot Email</h5>
    <form>
  
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  </div>
</div>
    </div>
  )
}
