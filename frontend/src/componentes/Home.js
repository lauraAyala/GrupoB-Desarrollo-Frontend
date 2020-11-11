import axios from 'axios';
import React, { Component } from 'react'


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
            
            
        };
      

    }
    componentDidMount() {
        axios.get(`http://localhost:3001/project/openProjects/${this.props}`)
            .then((res => {
                this.setState({ projects: res.data});
               
            }))


                    

    };

    render() {
        return (

            <div className="col-12">
                <button type="button" className="btn btn-primary btn-block" onClick={() => this.props.history.push ('/login')}>Login</button>
                <button type="button" className="btn btn-primary btn-block" onClick={() => this.props.history.push ('/register')}>Register</button>

              </div>
        )};

}