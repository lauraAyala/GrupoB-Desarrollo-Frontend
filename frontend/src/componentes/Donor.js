import React from 'react';

const Donor = ({data}) => {
    const {amount,date} = data;

    return (
        <tr>
            <td>{amount}</td>
            <td>{date}</td>
            
            

        </tr>
    );
};

export default Donor;