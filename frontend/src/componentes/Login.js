import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/login.css'
import { signIn } from './Api';
import React, { Component } from 'react';



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
    signIn({ email: this.state.email, password: this.state.password })
    axios.post("http://localhost:3001/user/login")
      .then((res) => {
      
        //const user= this.state.users.find(e=>e.email===this.state.email);   
        this.props.history.push('/home',res.data);
        
      }).catch((Error)=> {
        this.setState({ error : Error.message});
      })
        
      
    }   

 /*componentDidMount(){
  axios.get("http://localhost:3001/user/users")	   
  .then((res=>{  
          this.setState({users:res.data}); 
      
          }))
 }*/

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

          <div className="left-colum">
            <div className="container">
              <div className="row centerRow">
                <div className="col-3" />
                <div className="col-6 card newCard">
        

                  <div className="card-body">
                    {this.renderInput('Email', this.state.username, 'text', this.changeUsername,"x@gmail.com")}
                    {this.renderInput('Password', this.state.password, 'password', this.changePassword,"**********")}
                    <div className="col-12">
                      <button type="button" className="btn btn-primary btn-block" onClick={this.executeSignIn}>Sign In</button>
                    </div>
                    <div className="col-12">
                      <Link to="/register" className="btn btn-link">Sign Up</Link>
                    </div>
                    <div className="col-12 " >
                      {this.state.error }
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
