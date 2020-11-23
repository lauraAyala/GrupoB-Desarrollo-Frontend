import React from 'react';

const User = ({data}) => {
    const {nameUser,mail, nickName, points} = data;

    return (
        <tr>
            <td>{nameUser}</td>
            <td>{mail}</td>
            <td>{nickName}</td>
            <td>{points}</td>
            

        </tr>
    );
};

export default User;