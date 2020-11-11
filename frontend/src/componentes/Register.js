import React, { Component } from 'react';
import {register } from './Api';

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
              <h5 className="modal-title">{this.successTitle}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ isSuccess: false })}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{this.state.successMessage}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => this.props.history.push('/')}>Go to page</button>
            </div>
          </div>
        </div>
      </div>
      );

  }
  executeRegister() {
    register({name: this.state.name, nickName: this.state.nickName, isAdmin: this.state.isAdmin, password: this.state.password })
    .then((res)=>{
      console.log(res)
      this.setState({ isSuccess: true, successMessage: res.message })
      
  
    
  }).catch((error) => {
    
    this.setState({ error : Error.message })
  })

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
        <div className="container">
          <div className="row centerRow">
            <div className="col-3" />
            <div className="col-6 card newCard">
              <h1> Registrarse </h1>
              <div className="card-body">
                {this.renderInput('Name', this.state.name, 'text', this.changeName,"Nombre")}
                {this.renderInput('Email', this.state.email, 'text', this.changeEmail,"x@gmail.com")}
                {this.renderInput('Password', this.state.password, 'password', this.changePassword,"********")}
                {this.renderInput('IsAdmin', this.state.isAdmin, 'text', this.changeIsAdmin)}
                {this.renderInput('Nick Name',this.state.nickName, 'text', this.changeNickName,"Apodo")}

                <div className="col-12">
                  <button type="button" className="btn btn-primary btn-block" onClick={this.executeRegister}>Register</button>
                </div> 
                <div className="col-12 " >
                        {this.state.error && this.state.error}
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
