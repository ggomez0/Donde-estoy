import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';

function App() {
  const [latlon, setLatLon] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null); // Added marker state

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatLon(position.coords);
        loadMap(position.coords);
        marker.setLatLng([position.coords.latitude, position.coords.longitude]);

      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );

  }, [marker]);

  const loadMap = (coords) => {
    const mapContainer = document.getElementById('map');
    const newMap = L.map(mapContainer).setView([coords.latitude, coords.longitude], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(newMap);

    // Add the marker at a specific position
    const newMarker = L.marker([coords.latitude, coords.longitude]).addTo(newMap);
    setMarker(newMarker);

    setMap(newMap);
  };

  const updateLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatLon(position.coords);
        if (map && marker) {
          map.setView([position.coords.latitude, position.coords.longitude], 17);
          marker.setLatLng([position.coords.latitude, position.coords.longitude]);
        }
      },
      (error) => {
        console.error('Error updating location:', error);
      }
    );
  };

  return (
    <div className='justify-center text-center flex flex-col h-screen dark:text-white dark:bg-slate-900 white:bg-slate-100 white:text-black'>
      <h1 className='mb-4 mt-8 font-bold underline text-4xl'>¿Donde estoy?</h1>
      <h1 className='text-3xl'>Latitud: {latlon?.latitude}</h1>
      <h1 className='text-3xl mb-4'>Longitud: {latlon?.longitude}</h1>
      <button className='' onClick={updateLocation}>
        Actualizar ubicación
      </button>
      <div id='map' className='w-3/4 m-auto mt-4 h-96 rounded-3xl'></div>
    </div>
  );
}

export default App;
