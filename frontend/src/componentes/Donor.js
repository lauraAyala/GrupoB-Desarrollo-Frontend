import React from 'react';
import './css/register.css'

const Donor = ({data}) => {
    const {nameProject,donation,date} = data;

    return (
        <tr>
            <td>{nameProject}</td>
            <td>{donation}</td>
            <td>{date}</td>
            

        </tr>
    );
};

export default Donor;