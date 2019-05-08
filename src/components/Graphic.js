import {useState, useEffect} from 'react';
import { loadModules } from '@esri/react-arcgis';

const PointGraphic = (props) => {

    const [graphic, setGraphic] = useState(null);
    useEffect(() => {
        loadModules(['esri/Graphic']).then(([Graphic]) => {
            const point = {
                type: 'point',
                x: props.x,
                y: props.y,
                spatialReference: 102100
            };
            const symbol = {
                type: 'simple-marker',
                color: 'blue',
                size: 20
            };
            const graphic = new Graphic({
                geometry: point, 
                symbol: symbol
            });
            setGraphic(graphic);
            props.view.graphics.add(graphic);
        }).catch((err) => console.error(err));
        return function cleanup() {
            props.view.graphics.remove(graphic);
        };
    }, []);
    return null;
} 

export default PointGraphic;