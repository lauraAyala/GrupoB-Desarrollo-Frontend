import axios from 'axios';
import React, { Component } from 'react';
import Donor from "./Donor";
import Table from "react-bootstrap/Table";
import "./css/profile.css";
import Paginacion from './Paginacion';
import Donors from './Donors';



class Profile extends Component {
  constructor(props) {
      super(props);
      this.state = {
          nameUser: '',
          points: '',
          donors: [],
          elements: [],
          top10Donations: [],
          perPage: 2,

          
          
      };
    

  }
  componentDidMount() {
    axios.get(`http://localhost:3001/user/profile/${this.props.location.state.nameUser}`)
        .then((res => {
            
              this.setState({nameUser: res.data.nameUser});
              this.setState({points: res.data.points});
             // this.setState({listDonors: res.data.listDonors});
             //this.setState({user: res.data});
           
        }));

    axios.get(`http://localhost:3001/user/donations/${this.props.location.state.nameUser}`)
     .then((r => {

        this.setState({donors: r.data});
      }))
    }

    renderDonors(){

      let elements = this.state.donors
      .slice(this.state.offset, this.state.offset + this.state.perPage)
        return (
          <div className="projectClose">
          <Table striped bordered hover variant="dark">
              <thead>
              <tr>
                    <th>nameProject</th>
                    <th>donation</th>
                    <th>date</th>
              </tr>
              </thead>

              <tbody>
                    {elements.map(p => <Donor data={p}/>)}
               </tbody>
             
          </Table>
      </div>
        )
    }
  
 rendenDonors(){

            const {donors} = this.state;
            if (donors.length === 0) {
                return <div>Todavia no colabora en ningún proyecto</div>
            }
            return (
                <div className="listDonors">
                    <Table striped bordered hover variant="dark">
                    {donors.map(d => <Donor data={d}/>)}
                      
                      <thead>
                      <tr>
                          <th>nameProject</th>
                          <th>donation</th>
                          <th>date</th>
                            
                        </tr>
                        </thead>
                        <tbody>
                       
                        </tbody>
                    </Table>
                </div>
            );
        }
/*rendenTop10Donations(){

          const {top10Donations} = this.state;
          if (top10Donations.length === 0) {
              return <div>No existen donaciones a ningún proyecto</div>
          }
          return (
              <div className="listTop10">
                  <Table striped bordered hover variant="dark">
                  {donors.map(d => <Donor data={d}/>)}
                      
                      <thead>
                      <tr>
                          <th>nameProject</th>
                          <th>donation</th>
                          <th>date</th>
                      </tr>
                      </thead>
                      <tbody>
                      {top10Donations.map(d => <Donor data={d}/>)}
                      </tbody>
                  </Table>
              </div>
          );
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

          const offset = this.state.currentPage * this.state.perPage;
          const selectedPage = offset - this.state.perPage;
  
          const currentDonations = ({ currentPage: selectedPage, offset: offset }, () => {
            this.setState({elements: currentDonations})
  
            this.renderDonors();
          });

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
                  <button type="button" className="style-button" onClick={() => this.props.history.push ('/makeDonation',this.props.location.state)}>Donor</button>
                  <button variant="dark" className="style-button" onClick={() => this.props.history.push('/home', this.props.location.state)}>Home</button>
                               
                </div> 


            <div className="texto">Donations</div>
            <div className="conteiner">
                   
            <div >
           
           {this.state.donors.length > 0 && (

            <div>
                 
                {this.rendenDonors()}
                 <Paginacion donorsPerPage ={this.state.perPage} totalDonors= {this.state.donors.length} />  

           
           </div>


           )}


                </div>
                </div>
                </div>

                
                </div>
                </div>
                </div>
                </div>

                
        )};
   }

export default Profile
