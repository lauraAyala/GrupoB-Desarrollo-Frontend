import axios from 'axios';
import React, { Component } from 'react';
import './css/home.css';
import Project from "./Project";
import Table from "react-bootstrap/Table";
import Image from 'react-bootstrap/Image';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
            
            
        };
      

    }
    componentDidMount() {
        axios.get(`http://localhost:3001/project/openProjects`)
            .then((res => {
                this.setState({ projects: res.data});
               
            }))


                    

    };

    rendenProjects(){

        const {projects} = this.state;
        if (projects.length === 0) {
            return <div>Todavia no hay Proyectos Registrados</div>
        }
        return (
            <div className="listOpenProjects">
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
                    {projects.map(proj => <Project data={proj}/>)}
                    </tbody>
                </Table>
            </div>
        )
    }

    render() {
        return (

            
            <div className="col-12">
               

                <button type="button" className="btn btn-primary btn-block" onClick={() => this.props.history.push ('/login')}>Login</button>
                <button type="button" className="btn btn-primary btn-block" onClick={() => this.props.history.push ('/register')}>Register</button>
               
                <div className={"MainPageMiddle"}>
                <div className="card border-primary mb-3" style={{ margin: "auto", float: "none", marginBottom: "10px" }} >

                <h1>Open Projects </h1>
                        
                        {this.rendenProjects()}

                </div>
                </div>
                </div>

                
        )};

}
export default Home