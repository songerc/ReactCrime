import React from 'react';

class OffensePanel extends React.Component {
    render() {
        return (
            <ul className="offenses list-group">
                <li className='list-group-item'>
                    Select All <input type='checkbox' id='selectAll'/>
                </li>   
            {this.props.lis}
            </ul>
        )
    } 
}

export default OffensePanel