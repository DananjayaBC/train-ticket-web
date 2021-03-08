import React from 'react'
import { Navbar,Nav } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

 function Navb() {
    return (
      <div className="App">
        <Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
  <Navbar.Brand href="/">Train-Ticket</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">History</Nav.Link>
      <Nav.Link href="#pricing">About US</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link href="/dashboard">Profile</Nav.Link>
     
    </Nav>
  </Navbar.Collapse>
</Navbar>
      </div>
  
    )
}
export default Navb;