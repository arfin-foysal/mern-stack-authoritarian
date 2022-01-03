import React from 'react'
import { NavLink } from 'react-bootstrap'

export default function Navbar() {
  return (
    <div>
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <NavLink class="navbar-brand" href="#">AUTH</NavLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <NavLink class="nav-link active" aria-current="page" href="#">Home</NavLink>
        </li>
        <li class="nav-item">
          <NavLink class="nav-link" href="#">Features</NavLink>
        </li>
        <li class="nav-item">
          <NavLink class="nav-link" href="#">Pricing</NavLink>
        </li>
      </ul>
      <span class="navbar-text">
      Logout
      </span>
    </div>
  </div>
</nav>
  
    </div>
  )
}
