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
      axios.get(`http://localhost:3001/user/profile/${this.props.location.state.nameUser}`)
          .then((res => {
              
                this.setState({nameUser: res.data.nameUser});
                this.setState({points: res.data.points});
                this.setState({listDonors: res.data.listDonors});
             
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

            <div className="profile">
            <div className="container">
            <div className="row centerRow">
                <div className="col-3" />
                <div className="col-6 card newCard">
                <h1> Profile </h1>

            <div className="card-body"> 
                {this.renderInput('Name', this.state.nameUser, 'text', () => {})}
                {this.renderInput('Points', this.state.points, 'text', () => {})}

                <div className="col-12">
                  <button type="button" className="style-button" onClick={() => this.props.history.push ('/makeDonation')}>Donor</button>
                  <button variant="dark" className="style-button" onClick={() => this.props.history.push('/home')}>Home</button>
                               
                </div> 


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
                </div>
                </div>

                
        )};
   }

export default Profile
