import { useState } from 'react';
import styles from './Profile.module.css';

function Profile() {
  const [usersRentalHistory, setUsersRentalHistory] = useState([]);

  return (
    <div className={styles['profile-container']}>
      <header>
        <h1>Welcome {localStorage.getItem('email')}</h1>
      </header>
    </div>
  );
}

export default Profile;
