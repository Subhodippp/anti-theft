import React from 'react';
import compromisedIcon from './compromised_icon.png';
import securedIcon from './secured_icon.png';

function CarStatus({carStatus}) {
  return (
    <div className="car-status">
      <div className="status-icon">
        {carStatus.secured ? (
          <img src={securedIcon} alt="Secured" />
        ) : (
          <img src={compromisedIcon} alt="Compromised" />
        )}
      </div>
      <div className="status-message">
        <p>{carStatus.secured ? 'Car Secured' : 'Car Compromised'}</p>
        <p>Driver: {carStatus.driverName}</p>
      </div>
    </div>
  );
}

export default CarStatus;
