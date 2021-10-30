import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import logging from './config/logging';
import routes from './config/routes';
import './application.css';
import Header from './shared/components/header';
import { DefaultRootState, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './state/action';
import { useSelector } from 'react-redux';

const Application: React.FunctionComponent<{}> = (props) => {

  const state = useSelector((state: DefaultRootState) => state);
  const dispatch = useDispatch();

  const { setUserLoggedIn } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    logging.info('Loading Application');
    setUserLoggedIn(!!localStorage.getItem('isLoggedIn'));
  })

  return (
    <div>
      <BrowserRouter>
        <Header
          state={state}
          setUserLoggedIn={setUserLoggedIn}>
        </Header>
        <Switch>
          {routes.map((route, idx) => {
            return (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps<any>) => (
                  <route.component
                    name={route.name}
                    {...props}
                    {...route.props}
                    state={state}
                    setUserLoggedIn={setUserLoggedIn}
                  />
                )} />
            );
          })}
        </Switch>
      </BrowserRouter>
    </div>
  )
};

export default Application;