import { useState, useEffect } from 'react';
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package


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

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(newMap); //Fondo Mapa
    
    const customIcon = L.icon({ //Icono marcador mapa
      iconUrl: '/src/assets/marker-icon.png', 
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  

   
    const newMarker = L.marker([coords.latitude, coords.longitude], {icon: customIcon}).addTo(newMap); 
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
    <div className='text-center '>
      <div className='absolute border-solid rounded-3xl dark:text-white dark:bg-slate-900 white:bg-slate-100 white:text-black p-3 top-5 right-11 z-10'>
        <h1 className='mb-4 font-bold text-3xl'>¿Donde estoy?</h1>
        <h1 className='text-2xl'>Latitud: {latlon?.latitude}</h1>
        <h1 className='text-2xl mb-4'>Longitud: {latlon?.longitude}</h1>
        <button className='' onClick={updateLocation}>
          Actualizar ubicación
        </button>
        </div>
      <div id='map' className='h-screen m-auto w-full relative z-0'></div>
    </div>
  );
}

export default App;
