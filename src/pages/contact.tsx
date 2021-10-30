import React, { useEffect } from 'react';
import Ipage from '../interfaces/page';
import logging from '../config/logging';
import { RouteComponentProps } from 'react-router-dom';

const ContactPage: React.FC<Ipage & RouteComponentProps<any>> = (props) => {

  useEffect(() => {
    logging.info(`Loading ${props.name}`)
  }, [props]);

  return (
    <p> This is the Contact page </p>
  )
};

export default ContactPage;

