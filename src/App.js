import { useState } from 'react';
import axios from 'axios';

import Leaflet from './components/Leaflet';
import './App.scss';

function App() {
  const [ip, setIp] = useState('192.212.174.101');
  const [address, setAddress] = useState('-');
  const [location, setLocation] = useState('-');
  const [tz, setTz] = useState('-');
  const [isp, setIsp] = useState('-');
  const [coordinates, setCoordinates] = useState([51.505, -0.09]);


  const submit = () => {
    axios.get(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPIFY_KEY}&ipAddress=${ip}`)
      .then((response) => {
        const data = response.data;
        setAddress(data.ip);
        setLocation(`${data.location.city}, ${data.location.region}, , ${data.location.country}`);
        setTz(data.location.timezone);
        setIsp(data.isp);
        setCoordinates([data.location.lat, data.location.lng]);
      });
  }

  return (
    <div className="App">
      <div className="tracker">
        <h1>IP Address Tracker</h1>
        <div className="tracker-input">
          <input type="text" name="ip" placeholder="Search for any input adress or domain" onChange={(event) => setIp(event.target.value)} />
          <button onClick={submit}>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
      <div className="tracker-infos">
        <div className="tracker-infos-item item-ip">
          <h4>IP Address</h4>
          <span>{address}</span>
        </div>
        <div className="separator" />
        <div className="tracker-infos-item item-location">
          <h4>Location</h4>
          <span>{location}</span>
        </div>
        <div className="separator" />
        <div className="tracker-infos-item item-timezone">
          <h4>Timezone</h4>
          <span>{tz}</span>
        </div>
        <div className="separator" />
        <div className="tracker-infos-item item-ip">
          <h4>Isp</h4>
          <span>{isp}</span>
        </div>
      </div>
      <Leaflet coordinates={coordinates} />
    </div>
  );
}

export default App;
