import React from 'react';

const Project = ({data}) => {
    const {id,nameProject,location, initDate, endDate} = data;

    return (
        <tr>
            <td>{id}</td>
            <td>{nameProject}</td>
            <td>{location}</td>
            <td>{initDate}</td>
            <td>{endDate}</td>
            

        </tr>
    );
};

export default Project;