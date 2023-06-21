import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DateRangeContext } from '../../contexts/DateRangeContext';
import { formatDate, getDateDifference } from '../../utils/dateManipulation';
import { getVehicles } from '../../api/vehicle';
import { createRental } from '../../api/rental';

import CarCard from '../../components/CarCard';
import SwalAlert from '../../components/SwalAlert';

import styles from './App.module.css';

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const { dateRange, setDateRange } = useContext(DateRangeContext);

  const [carList, setCarList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [rentalInformation, setRentalInformation] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [fetchData, setFetchData] = useState({});

  const currentPage = 1;
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const fetchAllVehicles = async () => {
      await getVehicles(token, navigate, setCarList, setErrorMessage);
    };

    fetchAllVehicles();
    //TODO: add cleanup function
  }, [navigate, token]);

  useEffect(() => {
    if (dateRange[1] !== null) {
      const numberOfDays = getDateDifference(dateRange[0], dateRange[1]);
      setTimeout(() => {
        setRentalInformation((prevState) => {
          return {
            ...prevState,
            dates: dateRange,
            totaPrice: prevState.price * numberOfDays,
          };
        });
        setShowAlert(true);
      }, 100);
    }

    setFetchData((prevState) => {
      return {
        ...prevState,
        userId,
        carId: selectedCarId,
        startDate: dateRange[0],
        endDate: dateRange[1],
      };
    });
  }, [dateRange, selectedCarId, userId]);

  const handleButtonClick = ({ ...car }) => {
    setSelectedCarId(car._id);
    setRentalInformation((prevState) => {
      return {
        ...prevState,
        model: car.model_name,
        manufacturer: car.manufacturer_name,
        price: car.price,
      };
    });
  };

  const handleProceed = async () => {
    try {
      // TODO: doublecheck res.body and handle possible errors
      const resBody = await createRental(token, fetchData);
      console.log(resBody.status);
      setDateRange([null, null]);
      setShowAlert(false);
      if (!resBody.error) {
        navigate('/profile');
      }
    } catch (error) {
      console.error(error);
      // TODO: Handle any errors that occur during the API call
    }
  };

  const handleCancel = () => {
    setDateRange([null, null]);
    setShowAlert(false);
  };

  const handleSeeMore = () => {
    setItemsPerPage(itemsPerPage + 3);
  };

  const renderSeeMoreButton = () => {
    if (currentPage * itemsPerPage >= carList.length) {
      return null;
    }
    return (
      <div className={styles['see-more-container']}>
        <button onClick={handleSeeMore} className={styles['see-more-button']}>
          See More
        </button>
      </div>
    );
  };

  const renderCarCard = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = carList.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems.map((car) => (
      <CarCard
        key={car._id}
        // carImage={carImage}
        carManufacturer={car.manufacturer_name}
        carModel={car.model_name}
        carYear={car.year}
        carTransmittion={car.transmission}
        carSeats={car.seats}
        carPrice={car.price}
        onClick={() => handleButtonClick({ ...car })}
        selectedCarId={selectedCarId}
        {...car}
      />
    ));
  };

  const renderConfrimSwaltAlert = () => {
    const alertText = `Car: ${rentalInformation.manufacturer} ${
      rentalInformation.model
    }, Total price: ${rentalInformation.totaPrice}€, Start: ${formatDate(
      dateRange[0]
    )} Return: ${formatDate(dateRange[1])}`;

    return (
      <SwalAlert
        title='Please confirm your selection'
        text={alertText}
        icon='info'
        buttons={['Back', 'Rent']}
        onConfirmation={handleProceed}
        onCancelation={handleCancel}
      />
    );
  };

  return (
    <div className={styles['home-page-container']}>
      <header>
        <h1 className={styles['home-page-header']}>
          <strong>Choose </strong>a car
        </h1>
        <button className={styles['profile-btn']}>Profile</button>
      </header>
      <h3 className={styles['welcome-message']}>
        Welcom back, check out our latest cars:
      </h3>
      {renderCarCard()}
      {renderSeeMoreButton()}
      {showAlert && renderConfrimSwaltAlert()}
    </div>
  );
}

export default App;
