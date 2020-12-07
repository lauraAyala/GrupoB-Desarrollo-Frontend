import React from 'react';

const Paginacion = ({donorsPerPage, totalDonors}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalDonors / donorsPerPage); i++ ){

       pageNumbers.push(i);
    }

    return(

        <nav>

            <ul className = "paginacion">

                {pageNumbers.map(number => (
                    <li key={number} className = "page-item">

                        <a  href="!#" className ="page-link"> 
                        
                           {number}
                        </a>

                    </li>
                ))}
                
            </ul>

        </nav>
    )
}

export default Paginacion 
