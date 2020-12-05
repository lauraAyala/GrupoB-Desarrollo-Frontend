import React, { Component } from 'react';
import {makeDonation } from './Api';
import axios from 'axios';
import './css/donation.css';


export default class MakeDonation extends Component {
    constructor(props) {
       super(props);

       this.user = this.props.location.state;
   
       this.state = {
  
         
         user: '',
         project:'',
         donorUser:'', 
         date: '',
         file: '',
         error: '',
         isSuccess: false,
         
         
       };
       this.successTitle = 'Make Donation';
       this.changeNameUser = this.changeNameUser.bind(this);
       this.changeNameProject = this.changeNameProject.bind(this);
       this.changeAmount = this.changeAmount.bind(this);
       this.executeDonation = this.executeDonation.bind(this);
     }

     componentDidMount() {
        
      this.setState({user: this.props.location.state.nameUser, file: this.props.location.state})


     }

     changeNameUser(event) {
        this.setState({ user: event.target.value });
      }
    
      changeNameProject(event){
        this.setState({ project: event.target.value});
      }
    
      changeAmount(event) {
        this.setState({ donorUser: event.target.value });
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

       handleClick2() {
        this.props.history.push('/');
      }
      executeDonation() {



        axios({
          method: 'post',
          url: 'http://localhost:3001/user/makeDonation',
          data: {user: this.state.user, project: this.state.project,donorUser: this.state.donorUser}
        })
         .then((res) => {
    
         
          this.props.history.push('/home',this.props.location.state)})
        
         .catch((error) => this.setState({ error : Error.message}))
       }
      

      isEmpty(value) {
        return (typeof value === 'undefined' || value === null || value === '');
       }

      validarDatos(params) {
        if (this.isEmpty(params.user) && this.isEmpty(params.project) && this.isEmpty(params.donorUser)) {
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
    
            <div className="donation">
            <div className="container">
              <div className="row centerRow">
                <div className="col-3" />
                <div className="col-6 card newCard">
                  <h1> Make Donation</h1>
                  <div className="card-body">
                    {this.renderInput('Name', this.state.user, 'text', () => {})}
                    {this.renderInput('Name Project', this.state.project, 'text', this.changeNameProject,"Name del Project")}
                    {this.renderInput('Amount', this.state.donorUser, 'text', this.changeAmount,"Amount")}
    
                    <div className="col-12">
                      <button type="button" className="style-button" onClick={this.executeDonation}>Donor</button>
                      <button type="button" className="style-button" onClick={() => this.handleClick2()}>Cancel</button>
                                   
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
