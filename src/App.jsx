import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  const loadMap = (coords) => {
    const mapContainer = document.getElementById('map');
    const newMap = L.map(mapContainer).setView([coords.latitude, coords.longitude], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(newMap);

    // Add the marker at a specific position
    const newMarker = L.marker([51.5, -0.09]).addTo(newMap);
    setMarker(newMarker);

    setMap(newMap);
  };

  const updateLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatLon(position.coords);
        if (map && marker) {
          map.setView([position.coords.latitude, position.coords.longitude], 15);
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
      <h1 className='text-3xl'>Latitud: {latlon?.latitude}</h1>
      <h1 className='text-3xl mb-4'>Longitud: {latlon?.longitude}</h1>
      <button className='btn' onClick={updateLocation}>
        Actualizar ubicación
      </button>
      <div id='map' style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>
    </div>
  );
}

export default App;
