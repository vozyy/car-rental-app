import { useEffect, useState } from 'react';
import styles from './Profile.module.css';

function Profile() {
  const [usersRentalHistory, setUsersRentalHistory] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    try {
      const getRentalHistory = async () => {
        const response = await fetch(`${backendUrl}/api/history?id=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const rentalHistoryData = await response.json();
        setUsersRentalHistory(rentalHistoryData);
        console.log(rentalHistoryData);
      };
      getRentalHistory();
    } catch (error) {
      console.log(error);
    }
  }, [backendUrl, userId]);

  const renderRentalHistory = () => {
    return usersRentalHistory.map((item) => (
      <div key={item._id} className={styles['rental-details']}>
        <p>
          {item.car_id.manufacturer_name} {item.car_id.model_name}
        </p>
        <p>from: {new Date(item.start_date).toLocaleDateString()}</p>
        <p>to: {new Date(item.end_date).toLocaleDateString()}</p>
      </div>
    ));
  };

  return (
    <div className={styles['profile-container']}>
      <header>
        <h1>Welcome {localStorage.getItem('email')}</h1>
      </header>
      <div className={styles['rental-history-container']}>
        {renderRentalHistory()}
      </div>
    </div>
  );
}

export default Profile;
