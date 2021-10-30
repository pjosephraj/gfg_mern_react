import React, { useEffect, useState } from 'react';
import { NavLink, withRouter } from "react-router-dom";

const Header: React.FC<any> = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLogout = () => {
    localStorage.clear();
    props.setUserLoggedIn(false);
    props.history.push('/login');
  }


  useEffect(() => {
    setIsLoggedIn(props.state.isLoggedIn);
  }, [props])

  return (
    <div className="top-nav">
      <div>
        <NavLink className="nav-items" to="/" activeClassName="active" exact>
          Home
        </NavLink>
        <NavLink className="nav-items" to="/about" activeClassName="active">
          About
        </NavLink>
        <NavLink
          className="nav-items"
          to="/contact"
          activeClassName="active"
        >
          Contact
        </NavLink>
        <NavLink className="nav-items" to="/users" activeClassName="active">
          Users
        </NavLink>
      </div>
      <div>
        {isLoggedIn ? (
          <span className="nav-items" onClick={setLogout}>Logout</span>
        ) : (
          <>
            <NavLink className="nav-items" to="/login" activeClassName="active">
              Login
            </NavLink>
            <NavLink className="nav-items" to="/register" activeClassName="active">
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);