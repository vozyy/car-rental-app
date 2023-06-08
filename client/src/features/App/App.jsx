import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarCard from '../../components/CarCard';
import { DateRangeContext } from '../../contexts/DateRangeContext';
import SwalAlert from '../../components/SwalAlert';
import { formatDate, getDateDifference } from '../../utils/dateManipulation';

function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { dateRange, setDateRange } = useContext(DateRangeContext);
  const userId = localStorage.getItem('userId');

  const [carList, setCarList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedCarId, setSelectedCarId] = useState(null);

  const [rentalInformation, setRentalInformation] = useState({});

  const [showAlert, setShowAlert] = useState(false);

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

  const handleButtonClick = ({ ...car }) => {
    setSelectedCarId(car._id);
    setRentalInformation((prevState) => {
      return {
        ...prevState,
        userId,
        carId: car._id,
        model: car.model_name,
        manufacturer: car.manufacturer_name,
        price: car.price,
      };
    });
  };

  //TODO: add click events on alert window buttons
  useEffect(() => {
    if (dateRange[1] !== null) {
      const numberOfDays = getDateDifference(dateRange[0], dateRange[1]);
      setTimeout(() => {
        setRentalInformation((prevState) => {
          return {
            ...prevState,
            total_price: prevState.price * numberOfDays,
            dates: dateRange,
          };
        });
        setShowAlert(true);
      }, 100);
    }
  }, [dateRange]);

  const handleProceed = () => {
    console.log(userId);
    console.log(rentalInformation);
  };

  const handleCancel = () => {
    setRentalInformation({});
    setDateRange([null, null]);
    setShowAlert(!showAlert);
  };

  return (
    <>
      {carList.length ? renderCarCard() : <p>{errorMessage}</p>}
      {showAlert && (
        <SwalAlert
          title='Please confirm your selection'
          text={`Car: ${rentalInformation.manufacturer} ${
            rentalInformation.model
          }, Total price: ${
            rentalInformation.total_price
          }€, Start: ${formatDate(dateRange[0])} Return: ${formatDate(
            dateRange[1]
          )}`}
          icon='info'
          buttons={['Back', 'Rent']}
          onConfirmation={handleProceed}
          onCancelation={handleCancel}
        />
      )}
      ;
    </>
  );
}

export default App;
