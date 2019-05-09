import React from 'react';

export const PopupContent = (props) => {
    return (
        <table className='table table-striped'>
            <tbody>
                <tr>
                    <td>Crime</td>
                    <td>{props.offense}</td>
                </tr>
                <tr>
                    <td>Location</td>
                    <td>{props.location}</td>
                </tr>
            </tbody>
        </table>
    );
}