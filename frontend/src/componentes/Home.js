import axios from 'axios';
import React, { Component, Fragment } from 'react';
import './css/home.css';
import Project from "./Project";
import Table from "react-bootstrap/Table";
import {useTranslation} from 'react-i18next';
import Image from 'react-bootstrap/Image';
import i18next from 'i18next';
import i18n from '../i18n';


class Home extends Component {
    constructor(props) {
      //const [t,i18n] = useTranslation("global");
        super(props);
        this.state = {
            projects: [],
            projectsClosed: [],
            elements: [],
            offset: 0,
            perPage: 1,
            currentPage: 0,
            pageCount: ''
            
            
        };
        //const [t,i18n] = withTranslation("global");
    }
    componentDidMount() {
        axios.get(`http://localhost:3001/project/openProjects`)
            .then((res => {
                this.setState({ projects: res.data, pageCount: Math.ceil(this.state.projects.length / this.state.perPage)},
                 () => this.rendenProjects());
               
            }));

        axios.get(`http://localhost:3001/project/projectsCloseToClosing`)
            .then((res => {
                this.setState({ projectsClosed: res.data});
               
            }));
    };

    rendenProjects(){
      let elements = this.state.projects
      .slice(this.state.offset, this.state.offset + this.state.perPage)
      .map((project, i) => {
        return (
          <tr key={i}>
            <td>{project.id}</td>
            <td>{project.nameProject}</td>
            <td>{project.location}</td>
            <td>{project.initDate}</td>
            <td>{project.endDate}</td>

          </tr>
        );
      });
    this.setState({ elements: elements });
  }

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

    handlePageClick = projects => {
        const selectedPage = projects.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, () => {
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
           <button type="button" className="login-button" onClick={() => this.props.history.push ('/login')}>Login</button>
           <button type="button" class="register-button" onClick={() => this.props.history.push ('/register')}>Register</button>
           <button type="button" class="profile-button" onClick={() => this.props.history.push ('/profile')}>Profile</button>
           <button type="button" class="donor-button" onClick={() => this.props.history.push ('/makeDonation')}>Donor</button>

           <button onClick={()=> i18n.changeLanguage("es")}>ES</button>
           <button onClick={()=> i18n.changeLanguage("en")}>EN</button>
           </div>
          <div >
           
             {this.state.projects.length > 0 && (
             <div>
                 <Table striped bordered hover variant="dark">
                 <tr>
                     <th>ID</th>
                     <th>Name Project</th>
                     <th>Location</th>
                     <th>Init Date</th>
                     <th>End Date</th>
                 </tr>
                 {this.state.elements}
                 </Table>
             </div>

             )}
           <div>
               <h1> Projects Close To Closing</h1>
                   {this.renderProjectsCloseToClosing()}
            </div>
          </div>

          <nav aria-label="Page navigation example">
           <ul class="pagination">
           <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          </a>
          </li>
         <li class="page-item"><a class="page-link" href="#">1</a></li>
         <li class="page-item"><a class="page-link" href="#">2</a></li>
         <li class="page-item"><a class="page-link" href="#">3</a></li>
         <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
         <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
         </ul>
        </nav>
       </div>

     )};

}
export default (Home);
