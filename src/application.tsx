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

  const loadScript = (src: any) => {
    return new Promise(res => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        res(true);
      };
      script.onerror = () => {
        res(false);
      }
      document.body.appendChild(script);
    });
  };



  useEffect(() => {
    const loadRazorPay = async () => {
      try {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res) alert('Network Error, Please check the connectivity!')
        return;
      } catch (err: any) {
        console.log(err.message || err)
      }
    }
    loadRazorPay();
  }, [])

  useEffect(() => {
    logging.info('Loading Application');
    setUserLoggedIn(!!localStorage.getItem('isLoggedIn'));
    // loadRazorPay();
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