import { useState, useEffect } from 'react';

function App() {
  const [latlon, setlatlong] = useState(null);

  useEffect(() => {
      // Obtenemos la ubicación actual del usuario
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setlatlong(position.coords);
        })}, []);

    return(
    <div className='justify-center text-center flex flex-col h-screen dark:text-white dark:bg-slate-900 white:bg-slate-100 white:text-black'>
      <h1 className='text-3xl'>Latitud: {latlon?.latitude}</h1>
      <h1 className='text-3xl'>Longitud: {latlon?.longitude}</h1>
      <h1>Exactitud de medición: {(Math.floor(latlon?.accuracy))/100}%</h1>
      <button className='btn'>Actualizar ubicación</button>


    </div>
    )


  }
export default App;
