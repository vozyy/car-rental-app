import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarCard from '../../components/CarCard';
import { DateRangeContext } from '../../contexts/DateRangeContext';
import SwalAlert from '../../components/SwalAlert';

function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { dateRange } = useContext(DateRangeContext);
  const userId = localStorage.getItem('userId');

  const [carList, setCarList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedCarId, setSelectedCarId] = useState(null);

  const [selectedCarInfo, setSelectedCarInfo] = useState({});

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
    setSelectedCarInfo((prevState) => {
      return {
        ...prevState,
        model: car.model_name,
        manufacturer: car.manufacturer_name,
        price: car.price,
      };
    });
  };

  console.log(selectedCarInfo);

  useEffect(() => {
    if (dateRange[1] !== null) {
      setTimeout(() => {
        setSelectedCarInfo((prevState) => {
          return {
            ...prevState,
            date: dateRange,
          };
        });
        console.log(selectedCarInfo);
        setShowAlert(true);
      }, 100);
    }
  }, [dateRange]);

  return (
    <>
      {carList.length ? renderCarCard() : <p>{errorMessage}</p>}
      {showAlert && (
        <SwalAlert
          title='Please confirm your selection'
          text={`Car: ${selectedCarInfo.manufacturer} ${selectedCarInfo.model}, Total price: ${selectedCarInfo.price}, Date: ${dateRange} `}
          icon='info'
          buttons={['Back', 'Rent']}
        />
      )}
      ;
    </>
  );
}

export default App;
