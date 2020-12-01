import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/login.css'
import { signIn } from './Api';
import User from "./User.js";

import React, { Component } from 'react';
import Alert from "react-bootstrap/Alert";




export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      user: ''


    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.executeSignIn = this.executeSignIn.bind(this);

  }

  changeUsername(event) {
    this.setState({ email: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }


    executeSignIn(){
      const {email,password}= this.state;
      let params= {email,password}

      if(this.validarDatos(params)){
        let endpoint ='http://localhost:3001/user/login';
        axios.post(endpoint, params)
                  .then(response => this.props.history.push('/', response.body))
                  .catch((error) => this.setState({error: error.response.data.title}))
      }
    } 
    
   handleClick2() {
    this.props.history.push('/register');
   }

   isEmpty(value) {
    return (typeof value === 'undefined' || value === null || value === '');
    }

    validarDatos(params) {
     if (this.isEmpty(params.email) &&  this.isEmpty(params.password)) {
      this.setState({error: 'Por favor, complete todos los datos.'});
      return false
   }
     return true;
   }

     

    renderInput(label, value, inputType, onChange,placeholder) {
    return (
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">{label}</label>
        <div className="col-sm-9">
        <input placeholder={placeholder || label} type={inputType} className="form-control" value={value} onChange={onChange} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
      <div>
        
          <div className="login">
            <div className="container">
              <div className="row centerRow">
                <div className="col-3" />
                <div className="col-6 card newCard">
                <h1> Login</h1>
                  <div className="card-body">
                    {this.renderInput('Email', this.state.username, 'text', this.changeUsername,"x@gmail.com")}
                    {this.renderInput('Password', this.state.password, 'password', this.changePassword,"**********")}
                    <div className="col-12">
                      <button type="button" className="btn btn-primary btn-block" onClick={this.executeSignIn}>Sign In</button>
                      <button variant="dark" className={"ml-1rem"} onClick={() =>  this.handleClick2()}>Sign Up</button>
                    </div>
                    <div className={"Warning mt-4 col-12"}>
                            {this.state.error &&
                            <Alert variant="danger">{this.state.error}</Alert>}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
      
      </React.Fragment>

    );
  }
};
