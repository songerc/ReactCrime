import React,{useEffect, useState} from 'react';
import { loadModules } from '@esri/react-arcgis';
import ReactDOM from 'react-dom';
import {PopupContent} from './PopupContent';
const FeatureLayer = (props) => {
    const [layer, setLayer] = useState(null);
    useEffect(() => {
        loadModules(['esri/Graphic', 'esri/layers/GraphicsLayer', 'esri/tasks/Locator']).then(([Graphic, GraphicsLayer, Locator]) => {
            const locator = new Locator({
                url: 'http://gisweb.charlottesville.org/arcgis/rest/services/composite_locator_WGS/GeocodeServer'
            });
            const layer = new GraphicsLayer();
            props.features.forEach(element => {
                let offense = element.attributes.Offense;
                locator.addressToLocations({
                    address: {
                        street: element.attributes.BlockNumber + ' ' + element.attributes.StreetName
                    },
                    maxLocations: 1,
                    outFields: ['*']
                }).then(data => {
                    let url = window.location.origin + '/assets/';
                    if (data.length > 0) {
                            if  ( offense.indexOf('Assault') !== -1) {
                                url += 'AssaultIcon.png'; 
                            }
                            else if (offense.indexOf('Theft') !== -1 || offense.indexOf('Larceny') !== -1) {
                                url += 'TheftIcon.png'; 
                            }
                            else if (offense.indexOf('Drug') !== -1 || offense.indexOf('Drunkeness') !== -1 || offense.indexOf('Narcotic') !== -1) {
                                url += 'DrugIcon.png'; 
                            }
                            else if (offense.indexOf('Burglary') !== -1) {
                                url += 'BurglaryIcon.png'; 
                            }
                            else if (offense.indexOf('DUI') !== -1 || offense.indexOf('DWI') !== -1 || offense.indexOf('Influence') !== -1) {
                                url += 'DUIIcon.png'; 
                            }
                            else if (offense.indexOf('Fraud') !== -1) {
                                url += 'FraudIcon.png'; 
                            }
                            else if (offense.indexOf('Homicide') !== -1) {
                                url += 'HomicideIcon.png'; 
                            }
                            else if (offense.indexOf('Vehicle') !== -1 || offense.toLowerCase().indexOf('hit and run') !== -1) {
                                url += 'VehicleIcon.png'; 
                            }
                            else if (offense.indexOf('Robbery') !== -1) {
                                url += 'RobberIcon.png'; 
                            }
                            else if (offense.indexOf('Vandal') !== -1) {
                                url += 'VandalismIcon.png'; 
                            }
                            else if (offense.indexOf('Weapons') !== -1) {
                                url += 'WeaponsIcon.png'; 
                            }
                            else if (offense.indexOf('Disturb') !== -1 || offense.indexOf('Disorder') !== -1) {
                                url += 'DisturbingPeaceIcon.png'; 
                            }        
                            else {
                                url += 'other.png';
                            }
                        let point = {
                            type: 'point',
                            longitude: data[0].location.longitude,
                            latitude: data[0].location.latitude
                        };
                        let symbol = {
                            type: 'picture-marker',
                            url: url,
                            width: "25px",
                            height: "25px"
                        };
                        let popNode = document.createElement("div");
                        let titleString = "<img src=" + url + " width='25' height='25' />&nbsp;&nbsp;&nbsp;" + offense;
                        let popupTemplate = {
                            title: titleString,
                            content: popNode
                        };
                        ReactDOM.render(<PopupContent offense={offense} location={element.attributes.BlockNumber + ' ' + element.attributes.StreetName} />, popNode);
                        let graphic = new Graphic({
                            geometry: point, 
                            symbol: symbol,
                            popupTemplate: popupTemplate
                        });
                        layer.graphics.add(graphic);
                    }
                });
            });
            setLayer(layer);
            props.map.add(layer);
        }).catch((err) => console.error(err));
        return function cleanup() {
            props.map.remove(layer);
        };
    }, [props]);
    return null;
}
export default FeatureLayer;