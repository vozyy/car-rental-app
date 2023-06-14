import React from 'react';
import styles from './CarCard.module.css';
import Calendar from './Calendar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPerson,
  faGear,
  faEuroSign,
} from '@fortawesome/free-solid-svg-icons';

function CarCard({
  carManufacturer,
  carModel,
  carYear,
  carTransmittion,
  carSeats,
  carPrice,
  onClick,
  selectedCarId,
  _id,
}) {
  library.add(faPerson, faGear, faEuroSign);

  return (
    <div className={styles['car-card-container']}>
      <div className={styles['car-manufacturer-info']}>
        <h3>{carManufacturer}</h3>
        <h3>{carModel}</h3>
        <h5>{carYear}</h5>
      </div>
      {/* add a image property to the DB and render it here */}
      <img src='' alt='here comes a car img' />
      <div className={styles['car-other-info']}>
        <p>
          <FontAwesomeIcon icon={faPerson} /> {carSeats}
        </p>
        <p>
          <FontAwesomeIcon icon={faGear} /> {carTransmittion}
        </p>
        <p>
          {' '}
          <FontAwesomeIcon icon={faEuroSign} /> {carPrice}/day
        </p>
      </div>
      <div className={styles['date-picker-button-container']}>
        <button className={styles['dates-button']} onClick={onClick}>
          Pick dates
        </button>
        {selectedCarId === _id && <Calendar />}
      </div>
    </div>
  );
}

export default CarCard;
