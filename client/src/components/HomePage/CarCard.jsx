import React from 'react';
import styles from './CarCard.module.css';
import Calendar from '../../components/Calendar';

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
  return (
    <div className={styles['car-card-container']}>
      <div className={styles['car-manufacturer-info']}>
        <h1>{carManufacturer}</h1>
        <h3>{carModel}</h3>
        <h5>{carYear}</h5>
      </div>
      <div className={styles['car-other-info']}>
        <p>{carSeats}</p>
        <p>{carTransmittion}</p>
        <p>{carPrice}</p>
      </div>
      <button onClick={onClick}>Rent</button>
      {selectedCarId === _id && <Calendar />}
    </div>
  );
}

export default CarCard;
