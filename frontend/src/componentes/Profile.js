import axios from 'axios';
import React, { Component } from 'react';
import Donor from "./Donor";
import Table from "react-bootstrap/Table";
import "./css/profile.css"


class Profile extends Component {
  constructor(props) {
      super(props);
      this.state = {
          nameUser: '',
          points: '',
          donors: [],
          top10Donations: []
          
          
      };
    

  }
  componentDidMount() {
      axios.get(`http://localhost:3001/user/profile/${this.props.nameUser}`)
          .then((res => {
              
              this.setState({donors: res.data.listDonors});
                this.setState({user: res.data.nameUser});
                this.setState({points: res.data.points});
             
          }));

      axios.get(`http://localhost:3001/donation/top10donations`)
       .then((r => {

          this.setState({top10Donations: r.data});
        }))
      }

  
 rendenDonors(){

            const {donors} = this.state;
            if (donors.length === 0) {
                return <div>Todavia no colabora en ningún proyecto</div>
            }
            return (
                <div className="listDonors">
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            
                            <th>{this.state.nameUser}</th>
                            <th>{this.state.points}</th>
                            <th>amount</th>
                            <th>date</th>
                            
                        </tr>
                        </thead>
                        <tbody>
                        {donors.map(d => <Donor data={d}/>)}
                        </tbody>
                    </Table>
                </div>
            );
        }
rendenTop10Donations(){

          const {top10Donations} = this.state;
          if (top10Donations.length === 0) {
              return <div>No existen donaciones a ningún proyecto</div>
          }
          return (
              <div className="listTop10">
                  <Table striped bordered hover variant="dark">
                      <thead>
                      <tr>
                          
                          <th>amount</th>
                          <th>date</th>
                          
                      </tr>
                      </thead>
                      <tbody>
                      {top10Donations.map(d => <Donor data={d}/>)}
                      </tbody>
                  </Table>
              </div>
          );
}
    
        render() { 
          return (

            <div>
                 <div className="col-12">
               
                 {this.state.nameUser}
                  {this.state.points}
               
            <div className="container">

            <div className="texto">Donations</div>
            <div className="conteiner">
                   

                  

                  {this.rendenDonors()}


                </div>
                </div>
                </div>
                <div className="conteiner">

                <div className="texto">Top10Donations</div>
                <div className="conteiner">

                {this.rendenTop10Donations}

                
                </div>
                </div>
                </div>

                
        )};
   }

export default Profile