// App.js

import './App.css';
import React, { useState, useEffect } from 'react';
import CarStatus from './CarStatus';
import LiveLocation from './LiveLocation';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBD3B0bb7shcAmd5BjHpFqlGIPfD_XG4mo",
  authDomain: "hvgk-55863.firebaseapp.com",
  databaseURL: "https://hvgk-55863-default-rtdb.firebaseio.com",
  projectId: "hvgk-55863",
  storageBucket: "hvgk-55863.appspot.com",
  messagingSenderId: "311621136190",
  appId: "1:311621136190:web:a9c7d2d9d0b3be8f8cc66f"
};

function App() {
  const [carStatus, setCarStatus] = useState({
    secured: false, // Default to secure
    driverName: "--firebase data--"
  });

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    
    const fetchData = () => {
      const dataRef = ref(database, 'pressure');
      onValue(dataRef, (snapshot) => {
        const newData = snapshot.val();
        setCarStatus(prevStatus => ({
          ...prevStatus,
          secured: newData === 0 // Assuming 0 means secure and 1 means compromised
        }));

        if (newData === 1) {
          window.alert('ALERT!! Someone is trying to break into your car');
        }
      });
    };

    fetchData();

    return () => {
      // Detach the listener
    };
  }, []);

  return (
    <div className="app-container">
      <div className="main-content">
        <CarStatus carStatus={carStatus} />
        <LiveLocation />
      </div>
    </div>
  );
}

export default App;
