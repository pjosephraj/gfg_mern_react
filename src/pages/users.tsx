import React, { useEffect, useState } from 'react';
import Ipage from '../interfaces/page';
import { RouteComponentProps } from 'react-router-dom';
import logging from '../config/logging';
import config from '../config/config';
import Loader from '../shared/components/loader';

const UsersListPage: React.FC<Ipage & RouteComponentProps<any>> = (props) => {

  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const getUsers = async () => {
    try {
      setShowLoader(true);
      let response: any = await fetch(`${config.apiUrl}/users`);
      response = await response.json();
      const respErrMsg = response?.errors?.message;
      if (respErrMsg) {
        setErrorMessage(respErrMsg);
      } else {
        setUsers(response.data);
      }
    } catch (err) {
      setErrorMessage('Unknown Error!');
      console.error(err);
    } finally {
      setShowLoader(false);
    }
  }


  useEffect(() => {
    logging.info(`Loading ${props.name}...`);
    getUsers();
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
      <div className="table-wrapper">
        <div className="table-title">Users</div>
        <div className="table-content">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.length ? (users.map((user: any) => {
                return (
                  <tr key={user._id}>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.phone_number}</td>
                    <td>{user.email}</td>
                  </tr>
                )
              })) : (
                <tr><td colSpan={4} className="no-data">{showLoader ? 'Loading...' : 'No users available!'}</td></tr>
              )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UsersListPage;