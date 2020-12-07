import React from 'react';
import Donor from "./Donor";
import axios from 'axios';
import Table from "react-bootstrap/Table";



function Donors(elements) {
    const[donors] = elements;
  

  
    
    let donors_to_show = donors.map((donor, i) =>  <Donor   key={i} 
                                                                info={donor}
                                                                history={elements}/> );
    return(
          
              <div className={"donors-cards-container"}>
              {donors_to_show}
              </div>
         
      )
  }
  
  export default Donors;