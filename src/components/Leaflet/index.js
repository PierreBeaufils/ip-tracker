import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import './leaflet.scss';

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const Leaflet = ({ coordinates }) => {
  return (
    <div className="map-container">
      <MapContainer
        className="map"
        center={coordinates}
        zoom={13}
        maxZoom={20}
        style={{ height: '100%', width: '100%' }}>
        <ChangeView center={coordinates} zoom={13} />
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_KEY}`}
          id='mapbox/streets-v11'
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        <Marker position={coordinates} >
        </Marker>
      </MapContainer>
    </div>
  )
};

export default Leaflet;