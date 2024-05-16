// import React, { useEffect, useState } from 'react';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import car from './car-icon.png'; // Import the car icon image
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, onValue } from 'firebase/database';

// const firebaseConfig = {
//   // Your Firebase config
// };

// function LiveLocation() {
//   const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
//   const [carMarker, setCarMarker] = useState(null);

//   useEffect(() => {
//     const app = initializeApp(firebaseConfig);
//     const database = getDatabase(app);

//     const map = L.map('map').setView([0, 0], 13); // Set initial view and zoom level
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//     const carIcon = L.icon({
//       iconUrl: car,
//       iconSize: [32, 32], // Size of the icon
//       iconAnchor: [16, 16], // Anchor point of the icon (center)
//     });

//     setCarMarker(L.marker([0, 0], { icon: carIcon }).addTo(map));

//     const fetchData = () => {
//       const latitudeRef = ref(database, 'latitude');
//       const longitudeRef = ref(database, 'longitude');

//       onValue(latitudeRef, (snapshot) => {
//         const latitude = snapshot.val();
//         setCoordinates(prevCoordinates => ({ ...prevCoordinates, latitude }));
//       });

//       onValue(longitudeRef, (snapshot) => {
//         const longitude = snapshot.val();
//         setCoordinates(prevCoordinates => ({ ...prevCoordinates, longitude }));
//       });
//     };

//     fetchData();

//     return () => {
//       // Detach the listeners
//     };
//   }, []);

//   useEffect(() => {
//     if (carMarker) {
//       const { latitude, longitude } = coordinates;
//       carMarker.setLatLng([latitude, longitude]); // Update marker position
//     }
//   }, [coordinates, carMarker]);

//   return (
//     <div id="map-container" className="live-location">
//       <div id="map"></div>
//     </div>
//   );
// }

// export default LiveLocation;


/*TEST */

import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import car from './car-icon.png'; // Import the car icon image

const kolkataCoordinates = [
  {"latitude": 22.539186989688375, "longitude": 88.32921521393578},
  {"latitude": 22.539186989688305, "longitude": 88.32922522393578},
  {"latitude": 22.539147352316935, "longitude": 88.32923523393578},
  {"latitude": 22.539157352316935, "longitude": 88.32924524393578},
  {"latitude": 22.539167352316935, "longitude": 88.32925525393578},
  {"latitude": 22.539177352316935, "longitude": 88.32926526393578},
  {"latitude": 22.539187352316935, "longitude": 88.32927527393578},
  {"latitude": 22.539197352316935, "longitude": 88.32928528393578},
  {"latitude": 22.539118352316935, "longitude": 88.32929529393578},
  {"latitude": 22.539119352316935, "longitude": 88.32930530393578},
];



// const kolkataCoordinates = [
//   { latitude: 22.6407, longitude: 88.3766 }, // shringyesh 

//   { latitude: 22.5390, longitude: 88.3287 }, // college
//  { latitude: 22.5459, longitude: 88.3424 }, // Dakshineswar Kali Temple
//  { latitude: 22.5461, longitude: 88.3426 }, // Park Street
//   { latitude: 22.5463, longitude: 88.3428 }, // Salt Lake City (Bidhannagar)
//  { latitude: 22.5465, longitude: 88.3430 }, // South City Mall
//  { latitude: 22.5467, longitude: 88.3432 }, // Kalighat Temple
//  { latitude: 22.5469, longitude: 88.3434 }, // Indian Museum
// ];

function LiveLocation() {
  const [index, setIndex] = useState(0);
  const [map, setMap] = useState(null);
  const [carMarker, setCarMarker] = useState(null);

  useEffect(() => {
    const leafletMap = L.map('map').setView([kolkataCoordinates[0].latitude, kolkataCoordinates[0].longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap);

    const carIcon = L.icon({
      iconUrl: car,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const marker = L.marker([kolkataCoordinates[0].latitude, kolkataCoordinates[0].longitude], { icon: carIcon }).addTo(leafletMap);
    setMap(leafletMap);
    setCarMarker(marker);

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % kolkataCoordinates.length);
    }, 3000); // Update coordinates every 3 seconds

    return () => {
      clearInterval(interval);
      leafletMap.remove();
    };
  }, []);

  useEffect(() => {
    if (map && carMarker) {
      const nextLocation = kolkataCoordinates[index];
      carMarker.setLatLng([nextLocation.latitude, nextLocation.longitude]);
      map.setView([nextLocation.latitude, nextLocation.longitude], 15);
    }
  }, [index, map, carMarker]);

  return (
    <div id="map-container" className="live-location">
      <div id="map"></div>
    </div>
  );
}

export default LiveLocation;
