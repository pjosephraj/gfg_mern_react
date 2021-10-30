import React, { useEffect, useState } from 'react';
import Ipage from '../interfaces/page';
import logging from '../config/logging';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IUser } from '../interfaces/user';
import config from '../config/config';
import Loader from '../shared/components/loader';

const RegisterPage: React.FC<Ipage & RouteComponentProps<any>> = (props) => {

  const [input, setInput] = useState<IUser>({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordMismatch, setPasswordMisMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [evt.target.name]: evt.target.value
    });
  }

  const handleConfirmPassword = () => {
    const { confirmPassword, password } = input;
    setPasswordMisMatch(confirmPassword !== password);
  }

  const resetForm = () => {
    setInput({
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  }

  const submitForm = async () => {
    const { first_name, last_name, email, phone_number, password, confirmPassword } = input;
    if (first_name && last_name && email && phone_number && password && confirmPassword) {
      try {
        setErrorMessage('');
        setSuccessMessage('');
        setShowLoader(true);
        let response: any = await fetch(`${config.apiUrl}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ first_name, last_name, email, phone_number, password }),
        });
        response = await response.json();
        const respErrMsg = response?.errors?.message;
        if (respErrMsg) {
          setErrorMessage(respErrMsg);
        } else {
          setSuccessMessage('User Successfully Created!');
          resetForm();
        }
      } catch (err) {
        setErrorMessage('Unknown Error!');
        console.error(err);
      } finally {
        setShowLoader(false);
      }
    } else {
      setErrorMessage('Please fill all the fields!');
    }
  }

  useEffect(() => {
    logging.info(`Loading ${props.name}`)
  }, [props]);

  useEffect(handleConfirmPassword, [input])

  return (
    <>
      {showLoader && <Loader></Loader>}
      <div className="err-success-wrapper">
        <div className={`error-wrapper ${errorMessage ? 'active' : ''}`}>
          <div className="error-text">{errorMessage}</div>
          <span className="error-close" onClick={() => setErrorMessage('')}></span>
        </div>
        <div className={`success-wrapper ${successMessage ? 'active' : ''}`}>
          <div className="success-text">{successMessage}</div>
          <span className="success-close" onClick={() => setSuccessMessage('')}></span>
        </div>
      </div>
      <div className="form-wrapper form-wrapper__register">
        <div className="form-title">Register</div>
        <div className="form">
          <div className="form-field">
            <label htmlFor="first_name">First Name</label>
            <input id="first_name" name="first_name" value={input.first_name} type="text" onChange={handleChange} placeholder="Enter First Name" />
          </div>
          <div className="form-field">
            <label htmlFor="last_name">Last Name</label>
            <input id="last_name" name="last_name" value={input.last_name} type="text" onChange={handleChange} placeholder="Enter Last Name" />
          </div>
          <div className="form-field">
            <label htmlFor="phone_number">Phone Number</label>
            <input id="phone_number" name="phone_number" value={input.phone_number} type="text" onChange={handleChange} placeholder="Enter Phone Number" />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" value={input.email} type="text" onChange={handleChange} placeholder="Enter Email Address" />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" value={input.password} type="password" onChange={handleChange} placeholder="Enter Password" />
          </div>
          <div className={`form-field ${passwordMismatch ? 'has-error' : ''}`} >
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" value={input.confirmPassword} type="password" onChange={handleChange} placeholder="Enter Confirm Password" />
            <div className="form-field-error">Password mismatch!</div>
          </div>
          <div className="form-btns">
            <button className="btn" onClick={submitForm}>Register</button>
          </div>
        </div>
      </div>
    </>
  )
};

export default withRouter(RegisterPage);

