import React, { useEffect, useState } from 'react';
import Ipage from '../interfaces/page';
import logging from '../config/logging';
import { Link, RouteComponentProps } from 'react-router-dom';
import Loader from '../shared/components/loader';
import config from '../config/config';
import { IProduct } from '../interfaces/product';

const HomePage: React.FC<Ipage & RouteComponentProps<any>> = (props) => {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const getProductsData = async () => {
    try {
      setShowLoader(true);
      const apiResponse = await fetch(`${config.apiUrl}/products`);
      const resp = await apiResponse.json();
      setProducts(resp.data);
    } catch (err) {
      setErrorMessage('Unknown Error!');
      console.error(err);
    } finally {
      setShowLoader(false);
      return;
    }
  };

  const getProductsElms = () => {
    return products.map((itm: IProduct) => {
      return (
        <Link to={`/products/${itm._id}`} key={itm._id} className="product-item">
          <img src={itm.image} alt="product" />
          <div className="product-title">
            {itm.title}
          </div>
          <div className="product-desc">
            {itm.description.slice(0, 100) + "..."}
          </div>
          <div className="product-price">₹ {itm.price}</div>
        </Link>
      );
    })
  }

  useEffect(() => {
    getProductsData();
  }, [])

  useEffect(() => {
    logging.info(`Loading ${props.name}`);
  }, [props.name]);

  return (
    <>
      {showLoader && <Loader></Loader>}
      <div className="err-success-wrapper">
        <div className={`error-wrapper ${errorMessage ? 'active' : ''}`}>
          <div className="error-text">{errorMessage}</div>
          <span className="error-close" onClick={() => setErrorMessage('')}></span>
        </div>
      </div>
      <div className="product-list">
        {getProductsElms()}
      </div>
    </>
  )
};

export default HomePage;

