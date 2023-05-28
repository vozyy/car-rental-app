import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarCard from '../../components/HomePage/CarCard';

function App() {
  const navigate = useNavigate();

  const [carList, setCarList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const token = localStorage.getItem('token');
  // TODO: think about naming
  const [rentInfo, setRentInfo] = useState({});

  useEffect(() => {
    // TODO: further develop the token verification - try placing this code to the getAvailableCars()
    // so if the res.body is error redirect the cx to /login (change the verifyToken return to tokenError object instead of error)
    // and if responseBody.tokenError is true then navigate OR check the response.status and if it is a 400ish (check w my backend) run navigate(/login)
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

  // TODO: this button click should open the calendar and after picking a start and end date
  // make sure that no field in the rentIfo object is empty, if its okay then run a POST request
  // to send all the rentInfo to the backend and DB
  const handleButtonClick = (carId) => {
    console.log(`clicked and the car id is ${carId}`);
    setRentInfo((prevData) => ({
      ...prevData,
      userId: localStorage.getItem('userId'),
      carId,
    }));
  };

  const renderCarCard = () =>
    carList.map((car, i) => (
      // figure out whether its possible to make this look nicer - too many props
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
  // TODO: add a button - onClick show a calendar (proly MUI) that lets you pick from-to dates
  // TODO: later on make the taken days in the calendar have a different color marking them unavailable
  return (
    <>
      <p>Main Content</p>
      {carList.length ? renderCarCard() : <p>{errorMessage}</p>}
    </>
  );
}

export default App;
