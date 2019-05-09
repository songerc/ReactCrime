import React from 'react';
import OffensePanel from './OffensePanel';
class Menu extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            isOpen: false,
            offenses: ['Arson', 'Assault', 'Burglary', 'Disturbing the Peace', 'Drugs/Narcotics'],
            lis: []
        };

        this._toggle = this._toggle.bind(this);
        this._handleDocumentClick = this._handleDocumentClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this._handleDocumentClick, false);
        let li = this.state.offenses.map((offense, i) => {
            return (
                <li key={offense+'_'+i} className='list-group-item'>{offense} <input type="checkbox" id="test"/></li>
            )
        });
        this.setState({lis: li});
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._handleDocumentClick, false);
    }

    _handleDocumentClick(e) {
        
    }

    _toggle(e) {
        e.stopPropagation();
        this.setState({
            isOpen: !this.state.isOpen
        });
        console.log(this.state.isOpen);
    }

    render() {
        let menuStatus = this.state.isOpen ? 'isopen' : '';
        return (
            <div>
            <div className="menuBar">
                <div className="clicker" onClick={this._toggle}>

                </div>
                <div id="hambmenu" className={menuStatus}>
                <span></span><span></span><span></span><span></span>
                </div>
                <div className='menuTitle'>
                    <span>Charlottesville Crime Map</span>
                </div>
            </div>
            
            <OffensePanel status={menuStatus} lis={this.state.lis}/>
            </div>
        );
    }
}
export default Menu;