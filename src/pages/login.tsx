import React, { useEffect, useState } from 'react';
import Ipage from '../interfaces/page';
import logging from '../config/logging';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import config from '../config/config';
import Loader from '../shared/components/loader';

const LoginPage: React.FC<Ipage & RouteComponentProps<any> | any> = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const submitForm = async () => {
    if (email && password) {
      try {
        setErrorMessage('');
        setShowLoader(true);
        let response: any = await fetch(`${config.apiUrl}/users/authenticate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        response = await response.json();
        const respErrMsg = response?.errors?.message;
        if (respErrMsg) {
          setErrorMessage(respErrMsg);
          props.setUserLoggedIn(false);
        } else {
          localStorage.setItem('isLoggedIn', 'true');
          props.setUserLoggedIn(true);
          props.history.push('/');
        }
      } catch (err) {
        setErrorMessage('Unknown Error!');
        props.setUserLoggedIn(false);
        console.error(err);
      } finally {
        setShowLoader(false);
      }
    } else {
      setErrorMessage('Please fill all the fields!');
    }
  }

  useEffect(() => {
    return () => {};
  }, [])

  useEffect(() => {
    logging.info(`Loading ${props.name}`);
  }, [props]);

  return (
    <>
      {showLoader && <Loader></Loader>}
      <div className="err-success-wrapper">
        <div className={`error-wrapper ${errorMessage ? 'active' : ''}`}>
          <div className="error-text">{errorMessage}</div>
          <span className="error-close" onClick={() => setErrorMessage('')}></span>
        </div>
      </div>
      <div className="form-wrapper form-wrapper__register">
        <div className="form-title">Login</div>
        <div className="form">
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" value={email} type="text" onChange={e => setEmail(e.target.value)} placeholder="Enter Email Address" />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
          </div>
          <div className="form-btns">
            <button className="btn" type="submit" onClick={submitForm}>Submit</button>
          </div>
        </div>
      </div>
    </>
  )
};

export default withRouter(LoginPage);

