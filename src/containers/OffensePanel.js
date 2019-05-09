import React from 'react';

class OffensePanel extends React.Component {
    render() {
        return (
            <div className={this.props.status} id='menu'>
                <ul className="offenses flush list-group">
                    <li className='list-group-item'>
                        Select All <input type='checkbox' id='selectAll'/>
                    </li>   
                {this.props.lis}
                </ul>
            </div>
        )
    } 
}

export default OffensePanel