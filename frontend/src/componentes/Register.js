import React, { Component } from 'react';
import {register } from './Api';
import axios from 'axios';
import './css/register.css'


export default class Register extends Component {
  constructor(props) {
     super(props);
 
     this.state = {

       
       nameUser:'',
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

   changeName(event) {
    this.setState({ nameUser: event.target.value });
  }

   changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changeIsAdmin(event){
    this.setState({ isAdmin: event.target.value});
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
            <p>{this.state.message}</p>
            </div>
            <div className="modal-footer">


            </div>
          </div>
        </div>
      </div>
      );

   }

   
   executeRegister() {

    axios({
      method: 'post',
      url: 'http://localhost:3001/user/registerUser',
      data: {nameUser: this.state.nameUser, email: this.state.email,password: this.state.password,isAdmin: this.state.isAdmin, nickName: this.state.nickName }
    })
     .then((res) => {

      this.props.history.push('/', res.data) })
      //this.setState({ isSuccess: true, successMessage: 'se registro correctamente' })

      //const user = (< User data =  {res.data} />)
     //this.setState({email: this.state.email, password: this.state.passwor })
      //this.setState({user: res });
    //const user= this.state.users.find(e=>e.email===this.state.email);   
      //this.props.history.push('/home',this.state.user);
      //this.props.history.push('/home');

    .catch((Error)=> {
      this.setState({ error : Error.message});
     //const {name,nickName,isAdmin,password}= this.state;
     //let params= {name,nickName,isAdmin,password}
    })
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
                {this.renderInput('Name', this.state.nameUser, 'text', this.changeName,"Nombre")}
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
