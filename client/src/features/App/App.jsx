import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarCard from '../../components/HomePage/CarCard';
import { DateRangeContext } from '../../contexts/DateRangeContext';

function App() {
  const navigate = useNavigate();
  const { dateRange } = useContext(DateRangeContext);

  const [carList, setCarList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const token = localStorage.getItem('token');

  const [selectedCarId, setSelectedCarId] = useState(null);

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

  const handleButtonClick = (carId) => {
    setSelectedCarId(carId);
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
        onClick={() => handleButtonClick(car._id)}
        selectedCarId={selectedCarId}
        {...car}
      />
    ));

  return <>{carList.length ? renderCarCard() : <p>{errorMessage}</p>};</>;
}

export default App;
