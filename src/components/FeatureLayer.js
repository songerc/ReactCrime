import {useEffect, useState} from 'react';
import { loadModules } from '@esri/react-arcgis';
const FeatureLayer = (props) => {
    const [layer, setLayer] = useState(null);
    useEffect(() => {
        loadModules(['esri/Graphic', 'esri/layers/GraphicsLayer', 'esri/tasks/Locator']).then(([Graphic, GraphicsLayer, Locator]) => {
            const locator = new Locator({
                url: 'http://gisweb.charlottesville.org/arcgis/rest/services/composite_locator_WGS/GeocodeServer'
            });
            const layer = new GraphicsLayer();
            let url = window.location.origin + '/assets/AssaultIcon.png';
            props.features.forEach(element => {
                locator.addressToLocations({
                    address: {
                        street: element.attributes.BlockNumber + ' ' + element.attributes.StreetName
                    },
                    maxLocations: 1,
                    outFields: ['*']
                }).then(data => {
                    if (data.length > 0) {
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
                        let popupTemplate = {
                            title: element.attributes.Offense,
                            content: [{
                                type: "fields",
                                fieldInfos: [{
                                    fieldName: element.attributes.Offense,
                                    visible: true,
                                    label: "Crime"
                                }, {
                                    fieldName: element.attributes.BlockNumber,
                                    label: "Block Reported"
                                }, {
                                    fieldName: element.attributes.StreetName,
                                    label: "Street Reported On"
                                }]
                            }]
                        };
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