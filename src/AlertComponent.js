import React, { useEffect, useState } from 'react';
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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const AlertComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const dataRef = ref(database, 'pressure');
      onValue(dataRef, (snapshot) => {
        const newData = snapshot.val();
        setData(newData);
      });
    };

    fetchData();

    return () => {
      // Detach the listener
    };
  }, [database]); // Include database in the dependency array to ensure useEffect runs when database changes

  useEffect(() => {
    if (data === 1) {
      alert('ALERT!! Someone is trying to break into your car');
    }
  }, [data]);

  return (
    <div>
      <p>Data: {data}</p>
    </div>
  );
};

export default AlertComponent;
