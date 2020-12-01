import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export default class NavRegister extends Component {
 
  render() {
    return (
      <Navbar bg="primary" variant="dark">
   <Navbar.Brand >Home</Navbar.Brand>
 
   <Nav className="ml-auto">

   <Nav.Link href="/user/registerUser"></Nav.Link>
   </Nav>  
  </Navbar>
    )
  }
}