import React, { Component } from 'react';
import {profile} from './api';

export default class Profile extends Component {
    constructor(props) {
       super(props);
       this.user = this.props.location.state;
   
       this.state = {

        name:'',
        nickName:'',
        email: '', 
        accumulatedPoints: '',
        error: props.error,
        isSuccess: false

         
       };
  
       this.successTitle = 'Profile';
       this.changeName = this.changeName.bind(this);
       this.changeNickName = this.changeNickName.bind(this);
       this.changeEmail = this.changeEmail.bind(this);
       this.changePoints = this.changePoints.bind(this);
       this.executeProfile = this.executeProfile.bind(this);
     }

     componentDidMount() {
      
          
              this.setState({
                name: this.user.name,
                nickName: this.user.nickName,
                email: this.user.email,
                caccumulatedPoints: this.user.points,

               });
             
          
    }
  
     changeName(event) {
        this.setState({ name: event.target.value });
      }

      changeNickName(event) {
        this.setState({ nickName: event.data });
      }

    changeEmail(event) {
      this.setState({ email: event.target.value });
    }

    changePoints(event) {
        this.setState({ accumulatedPoints: event.data});
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
                <button type="button" className="btn btn-primary" onClick={() => this.props.history.push('/home',this.user)}>Go to page</button>
              </div>
            </div>
          </div>
        </div>
        );
  
    }

    executeProfile() {
      profile({ name: this.state.name, nickName: this.state.nickName, email: this.state.email, accumulatedPoints: this.user.points })
      .then((res)=>{   
        console.log(res)
        this.setState({ isSuccess: true, successMessage: res.message })  
      
      }).catch((error) => {
        this.setState({ error: error.response.data.title })
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
            <h1> Profile </h1>

              <div className="card-body"> 
                {this.renderInput('Name', this.state.name, 'text', this.changeFirstName,"Nombre")}
                {this.renderInput('Nick Name', this.user.lastName, 'text', () => {})}
                {this.renderInput('Email', this.state.email, 'text', this.changeEmail,"Email")}
                 {this.renderInput('Accumulated Points', this.user.accumulatedPoints, 'text',() => {})}
               
                <div className="col-12">
                  <button type="button" className="btn btn-primary btn-block" onClick={this.executeProfile}>Regresar</button>
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
  