import React, { useEffect } from 'react';
import Ipage from '../interfaces/page';
import logging from '../config/logging';
import { RouteComponentProps } from 'react-router-dom';

const AboutPage: React.FC<Ipage & RouteComponentProps<any>> = (props) => {

  useEffect(() => {
    logging.info(`Loading ${props.name}`);
  }, [props]);

  return (
    <>
      <div className="profile-wrapper">
        <div className="profile-body">
          <div className="profile-image">
            <img src="https://avatars.githubusercontent.com/u/17683780?v=4" alt="" />
          </div>
          <div className="profile-content">
            <div className="profile-item profile-item__name">P Joseph Raj</div>
            <div className="profile-item profile-item__designation">Ui/Ux Developer</div>
          </div>
        </div>
      </div>
    </>
  )
};

export default AboutPage;