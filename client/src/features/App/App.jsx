import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DateRangeContext } from '../../contexts/DateRangeContext';
import { formatDate, getDateDifference } from '../../utils/dateManipulation';

import CarCard from '../../components/CarCard';
import SwalAlert from '../../components/SwalAlert';

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

  useEffect(() => {
    const getAvailableCars = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/vehicles`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const resBody = await response.json();
        if (response.status === 401 || !token) {
          navigate('/login');
        }
        resBody.error ? setErrorMessage(resBody.error) : setCarList(resBody);
      } catch (error) {
        setErrorMessage(error);
      }
    };

    return () => getAvailableCars();
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
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/create-rental`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fetchData),
      }
    );
    const resBody = await response.json();
    setDateRange([null, null]);
    setShowAlert(false);

    console.log(resBody);
  };

  const handleCancel = () => {
    setDateRange([null, null]);
    setShowAlert(false);
  };

  const renderCarCard = () =>
    carList.map((car) => (
      <CarCard
        key={car._id}
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

  const renderSwaltAlert = () => {
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
    <>
      {carList.length ? renderCarCard() : <p>{errorMessage}</p>}
      {showAlert && renderSwaltAlert()}
    </>
  );
}

export default App;
