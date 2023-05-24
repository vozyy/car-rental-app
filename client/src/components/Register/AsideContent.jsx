import React from 'react';
import styles from './AsideContent.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCar, faHouse, faCarBurst } from '@fortawesome/free-solid-svg-icons';

function AsideContent(props) {
  library.add(faCar, faHouse, faCarBurst);

  const { content, iconName } = props;
  return (
    <>
      <div className={styles['aside-content']}>
        <span>
          <FontAwesomeIcon icon={iconName} />
        </span>
        <aside>{content}</aside>
      </div>
    </>
  );
}

export default AsideContent;
