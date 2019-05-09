import React from 'react';
import { Map } from '@esri/react-arcgis';
import OffensePanel from './OffensePanel';
import FeatureLayer from '../components/FeatureLayer';
import Menu from './Menu';
const style = {
    "position": "absolute",
    "zIndex": 12
};
class MapView extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            map: null, 
            view: null,
            features: []
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        this._isMounted = true;
        fetch('http://gisweb.charlottesville.org/arcgis/rest/services/OpenData_2/MapServer/6/query?where=DateReported+%3E+date+%271%2F1%2F2019%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=pjson')
            .then(response => response.json())
            .then(data => {
                const newState = data.features.slice(0,150);
                this.setState({features: newState});
            });
    }
    componentWillUnmount() {
        this._isMounted = false;
        if (!this._isMounted) {
            this.setState({features: []});
        }
        console.log("unmounted");
    }
    handleClick() {
        document.getElementById('panelWrapper').classList.toggle('active');
    }
    render() {
        return (
            <div id="root2">
                <Menu />
                <Map
                    mapProperties={{ basemap: 'streets'}}
                    viewProperties={{
                        center: [-78.477, 38.025],
                        zoom: 14
                    }}
                    class="full-screen-map"
                >
                
                <FeatureLayer features={this.state.features}/>
                </Map>
            </div>
        );
    }
};

export default MapView;