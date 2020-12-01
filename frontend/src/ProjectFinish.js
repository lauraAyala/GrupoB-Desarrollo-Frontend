import React, { Component } from 'react';
import axios from 'axios';
import {finishProject } from './componentes/Api';


export default class ProjectFinish extends Component {
    constructor(props) {
       super(props);

   
       this.state = {
         project: '',
         user:'',
         error: '',
         isSuccess: false,
         
         
       };
       this.successTitle = 'Finish Project';
       this.changeNameProject = this.changeNameProject.bind(this);
       this.changeNameUser = this.changeNameUser.bind(this);
       this.execute = this.execute.bind(this);
     }


     changeNameUser(event) {
        this.setState({ user: event.target.value });
      }
    
      changeNameProject(event){
        this.setState({ project: event.target.value});
      }
    
      
      
       renderSuccessModal() { 
        return (
          <div className="modal" tabindex="-1" role="dialog" style={{ display: this.state.isSuccess ? 'block' : '' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                </div>
                <div className="modal-body">
                  <p> project closed</p>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => this.props.history.push('/')}>Go to page</button>

                </div>
              </div>
            </div>
          </div>
          );
    
       }

       handleClick2() {
        this.props.history.push('/home');
      }
      isEmpty(value) {
        return (typeof value === 'undefined' || value === null || value === '');
       }

      validarDatos(params) {
        if (this.isEmpty(params.user) && this.isEmpty(params.project)) {
            this.setState({error: 'Por favor, complete todos los datos.'});
            return false
        }
        return true;
       }
      execute() {
        const {project,user} = this.state;
        let params = {project,user};
        if (this.validarDatos(params)) {

          finishProject({project: this.state.project, user: this.state.user})
         .then((res)=>{
          console.log(res)
          this.setState({ isSuccess: true, successMessage: res.message })
          
        }).catch((error) => this.setState({error: error.response.data.title}))
      }
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
    
            <div className="finishProject">
            <div className="container">
              <div className="row centerRow">
                <div className="col-3" />
                <div className="col-6 card newCard">
                  <h1>Finish Project</h1>
                  <div className="card-body">
                    {this.renderInput('Name Project', this.state.project, 'text', this.changeNameProject,"Name del Project")}
                    {this.renderInput('Name ', this.state.user, 'text', this.changeNameUser,"Name user")}

                    <div className="col-12">
                      <button type="button" className="btn btn-primary btn-block" onClick={this.execute}>finish</button>
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