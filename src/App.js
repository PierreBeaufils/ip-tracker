import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Leaflet from './components/Leaflet';
import './App.scss';

function App() {
  const [ip, setIp] = useState('192.204.17.28');
  const [address, setAddress] = useState('-');
  const [location, setLocation] = useState('-');
  const [country, setCountry] = useState('-');
  const [isp, setIsp] = useState('-');
  const [coordinates, setCoordinates] = useState([51.505, -0.09]);
  const [userAuthorization, setAuthorization] = useState(false);

  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      axios.get("https://api.ipify.org/?format=json")
        .then((res) => submit(res.data.ip));
    } else {
      setAuthorization(true);
    }
  };

  const submit = (ipAdress = ip) => {
    axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_IPIFY_KEY}&ip=${ipAdress}`)
      .then((response) => {
        const data = response.data;
        setAddress(data.ip);
        setLocation(`${data.city}, ${data.district}, ${data.country_name}`);
        setCountry(data.country_name);
        setIsp(data.isp);
        setCoordinates([data.latitude, data.longitude]);
      })
      .finally(() => setAuthorization(true));
  }

  useEffect(() => {
    getUserPosition();
  }, []);

  return (
    <div className="App">
      {userAuthorization && (
        <>
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
              <h4>Country</h4>
              <span>{country}</span>
            </div>
            <div className="separator" />
            <div className="tracker-infos-item item-ip">
              <h4>ISP</h4>
              <span>{isp}</span>
            </div>
          </div>
          <Leaflet coordinates={coordinates} />
        </>
      )}
    </div>
  );
}

export default App;
