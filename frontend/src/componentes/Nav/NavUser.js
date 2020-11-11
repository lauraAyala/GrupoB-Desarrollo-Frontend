import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


export default class NavUser extends Component {



    render() {
        return (
            <Navbar bg="primary" variant="dark">

   <Navbar.Brand >Profile</Navbar.Brand>
    <Nav className="ml-auto">
      <Link className="nav-link" to={{ pathname:"/home", state: this.props.user }}>Home</Link>
      <Link className="nav-link" to={{ pathname:"/login", state: this.props.user }}>Login</Link>
   
    
    
    </Nav>
    <DropdownButton  alignRight id="dropdown-basic-button" title={this.props.user.nameUser +" "+ this.props.user.email + " " + this.props.user.nickeName }> 
  <Dropdown.Item href="/">Sign out</Dropdown.Item>
 </DropdownButton> 
  </Navbar>

        )
    }
}