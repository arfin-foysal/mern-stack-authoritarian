import React from 'react'

export default function ChangeEmail() {
  return (
    <div className=' d-flex justify-content-center'>
    <div className="card" style={{width: "40rem"}}>

<div className="card-body">
  <h5 className="card-title">Change Password</h5>
  <form>
<div className="mb-3">
  <label className="form-label">OTP</label>
  <input type="text" className="form-control" id="exampleInputOTP1"/>
  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>

<div className="mb-3">
  <label for="exampleInputPassword1" className="form-label">Password</label>
  <input type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            
<div className="mb-3">
  <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
  <input type="password" className="form-control" id="exampleInputPassword1"/>
</div>

<button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
</div>
  </div>
  )
}
