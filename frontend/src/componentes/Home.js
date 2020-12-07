import axios from 'axios';
import React, { Component, Fragment } from 'react';
import './css/home.css';
import Project from "./Project";
import Table from "react-bootstrap/Table";
import {useTranslation} from 'react-i18next';
import Image from 'react-bootstrap/Image';
import i18next from 'i18next';
import i18n from '../i18n';
import ReactPaginate from 'react-bootstrap/Pagination';
import Paginacion from './Paginacion';
import Projects from './Donors';


class Home extends Component {
    constructor(props) {
      //const [t,i18n] = useTranslation("global");
        super(props);

        this.user = this.props.location.state;

        this.state = {
            projects: [],
            projectsClosed: [],
            offset: 0,
            perPage: 1,
            currentPage: 0,
            pageCount: ''
            
            
        };
        this.handleClick = this.handleClick.bind(this); 

        //const [t,i18n] = withTranslation("global");
    }
    componentDidMount() {
        axios.get(`http://localhost:3001/project/openProjects`)
            .then((res => {
                this.setState({ projects: res.data})}
                 
                  ))  
           

            this.setState({user: this.props.location.state })

        /*axios.get(`http://localhost:3001/project/projectsCloseToClosing`)
            .then((res => {
                this.setState({ projectsClosed: res.data});
               
            }));*/
    };

    renderProjects(){

      const {projects} = this.state;
      if (projects.length === 0) {
          return <div>No existen Proyectos proximos a cerrarse</div>
      }
      return (
          <div className="projectClose">
              <Table striped bordered hover variant="dark">
                  <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name Project</th>
                      <th>Location</th>
                      <th>Init Date</th>
                      <th>End Date</th>
                  </tr>
                  </thead>
                  <tbody>
                  {projects.map(p => <Project data={p}/>)}
                  </tbody>
              </Table>
          </div>
      )


    }

    /*
    rendenProjects( ){
      let elements = this.state.projects
      .slice(this.state.offset, this.state.offset + this.state.perPage)
        return (
          <div className="projectClose">
          <Table striped bordered hover variant="dark">
              <thead>
              <tr>
                  <th>ID</th>
                  <th>Name Project</th>
                  <th>Location</th>
                  <th>Init Date</th>
                  <th>End Date</th>
              </tr>
              </thead>

              <tbody>
                    {elements.map(p => <Project data={p}/>)}
               </tbody>
             
          </Table>
      </div>
        )
  }*/

    renderProjectsCloseToClosing(){

        const {projectsClosed} = this.state;
        if (projectsClosed.length === 0) {
            return <div>No existen Proyectos proximos a cerrarse</div>
        }
        return (
            <div className="projectClose">
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name Project</th>
                        <th>Location</th>
                        <th>Init Date</th>
                        <th>End Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {projectsClosed.map(p => <Project data={p}/>)}
                    </tbody>
                </Table>
            </div>
        )
    }
    handleClick(event) { 
      this.setState({ 
       currentPage: Number(event.target.id) 
      }); 
      } 
    
     handlePageClick() {
        const offset = selectedPage * this.state.perPage;
        const selectedPage = offset - this.state.perPage;

        const currentProjects = ({ currentPage: selectedPage, offset: offset }, () => {

          this.setState({elements: currentProjects})
          this.rendenProjects();
        });
      };

    

    handleOnClickButton = (goTo) => {
        this.setState({
          currentPage: goTo,
        });}

    
    render() {

     
        return (
            <div className="Home">
           <div class="btn-group" role="group" aria-label="Basic example">
           <button type="button" className="style-button" onClick={() => this.props.history.push ('/login')}>Login</button>
           <button type="button" class="style-button" onClick={() => this.props.history.push ('/register')}>Register</button>
           <button type="button" class="style-button" onClick={() => this.props.history.push ('/profile',this.user)}>Profile</button>
           <button type="button" class="style-button" onClick={() => this.props.history.push ('/makeDonation', this.user)}>Donor</button>
           <button type="button" class="style-button" onClick={() => this.props.history.push ('/finishedProject', this.user)}>FinishProject</button>
 
           <button onClick={()=> i18n.changeLanguage("es")}>ES</button>
           <button onClick={()=> i18n.changeLanguage("en")}>EN</button>
           </div>
          <div >
           
             {this.state.projects.length > 0 && (

              <div>
              
              {this.renderProjects()}
            
          </div>
             )}
             
  
           <div>
               <h1> Projects Close To Closing</h1>

              
                 {this.renderProjectsCloseToClosing()}

             </div>

            
            </div>
          </div>
                   
     

     )};

}
export default (Home);
