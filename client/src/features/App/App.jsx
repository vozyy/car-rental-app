import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarCard from '../../components/HomePage/CarCard';

function App() {
  const navigate = useNavigate();

  const [carList, setCarList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const token = localStorage.getItem('token');

  const [rentInfo, setRentInfo] = useState({});

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

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
        resBody.error ? setErrorMessage(resBody.error) : setCarList(resBody);
      } catch (error) {
        console.log(error);
      }
    };

    return () => getAvailableCars();
  }, [navigate, token]);

  const handleButtonClick = (carId) => {
    console.log(`clicked and the car id is ${carId}`);
    setRentInfo((prevData) => ({
      ...prevData,
      userId: localStorage.getItem('userId'),
      carId,
    }));
  };

  console.log(rentInfo);

  const renderCarCard = () =>
    carList.map((car, i) => (
      <CarCard
        key={i}
        carManufacturer={car.manufacturer_name}
        carModel={car.model_name}
        carYear={car.year}
        carTransmittion={car.transmission}
        carSeats={car.seats}
        carPrice={car.price}
        onClick={() => handleButtonClick(car._id)}
        {...car}
      />
    ));
  return (
    <>
      <p>Main Content</p>
      {carList.length ? renderCarCard() : <p>{errorMessage}</p>}
    </>
  );
}

export default App;
