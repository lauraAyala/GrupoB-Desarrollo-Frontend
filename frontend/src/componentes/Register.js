import React, { Component } from 'react';
import {register } from './Api';
import axios from 'axios';
import './css/register.css'


export default class Register extends Component {
  constructor(props) {
     super(props);
 
     this.state = {

       
       name:'',
       email:'',
       password: '',
       isAdmin:'', 
       nickName: '',
       error: '',
       isSuccess: false,
       
       
     };
     this.successTitle = 'Register';
     this.changeName = this.changeName.bind(this);
     this.changeEmail = this.changeEmail.bind(this);
     this.changePassword = this.changePassword.bind(this);
     this.changeIsAdmin = this.changeIsAdmin.bind(this);
     this.changeNickName = this.changeNickName.bind(this);
     this.executeRegister = this.executeRegister.bind(this);
   }

   changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changeIsAdmin(event){
    this.setState({ isAdmin: event.target.value});
  }

  changeName(event) {
    this.setState({ name: event.target.value });
  }

  changeNickName(event) {

    this.setState({nickName : event.target.value});
  }
  
  changePassword(event) {
    this.setState({ password: event.target.value });
  }
  
  renderErrorModal() {
    return <div />
  }

  renderSuccessModal() { 
    return (
      <div className="modal" tabindex="-1" role="dialog" style={{ display: this.state.isSuccess ? 'block' : '' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
            </div>
            <div className="modal-body">
              <p>{this.state.successMessage}</p>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
      );

   }
   executeRegister() {
     const {name,nickName,isAdmin,password}= this.state;
     let params= {name,nickName,isAdmin,password}
  
    if(this.validarDatos(params)){
      let endpoint ='http://localhost:3001/user/registerUser';
      axios.post(endpoint, params)
                .then(response => this.props.history.push('/', response.body))
                .catch((error) => this.setState({error: error.response.data.title}))
    }
   } 
    

   handleClick2() {
    this.props.history.push('/');
 }
 isEmpty(value) {
  return (typeof value === 'undefined' || value === null || value === '');
 }

 validarDatos(params) {
  if (this.isEmpty(params.name) && this.isEmpty(params.nickName) && this.isEmpty(params.isAdmin) && this.isEmpty(params.password)) {
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

        <div className="register">
        <div className="container">
          <div className="row centerRow">
            <div className="col-3" />
            <div className="col-6 card newCard">
              <h1> Register </h1>
              <div className="card-body">
                {this.renderInput('Name', this.state.name, 'text', this.changeName,"Nombre")}
                {this.renderInput('Email', this.state.email, 'text', this.changeEmail,"x@gmail.com")}
                {this.renderInput('Password', this.state.password, 'password', this.changePassword,"********")}
                {this.renderInput('IsAdmin', this.state.isAdmin, 'text', this.changeIsAdmin)}
                {this.renderInput('Nick Name',this.state.nickName, 'text', this.changeNickName,"Apodo")}

                <div className="col-12">
                  <button type="button" className="btn btn-primary btn-block" onClick={this.executeRegister}>Register</button>
                  <button variant="dark" className={"ml-1rem"} onClick={() => this.handleClick2()}>Cancelar</button>
                               
                </div> 
                <div className="col-12 " >
                        {this.state.error && this.state.error}
                      </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        {this.renderSuccessModal()}

      </React.Fragment>
    );
  }
}
