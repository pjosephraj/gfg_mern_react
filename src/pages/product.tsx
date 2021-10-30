import React, { useEffect, useState } from 'react';
import Ipage from '../interfaces/page';
import logging from '../config/logging';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { IProduct } from '../interfaces/product';
import config from '../config/config';
import Loader from '../shared/components/loader';

const ProductPage: React.FC<Ipage & any> = (props) => {

  // const [productId, setProductId] = useState<string>('');
  const [product, setProduct] = useState<IProduct>()
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const getProductData = async (id: string) => {
    try {
      setShowLoader(true);
      const apiResponse = await fetch(`${config.apiUrl}/products/${id}`);
      console.log('apiResponse', apiResponse);
      if (apiResponse.status !== 200) {
        throw new Error('Product Id Mismatches!')
      }
      const resp = await apiResponse.json();
      setProduct(resp.data);
    } catch (err: any) {
      console.log('err', err)
      setErrorMessage(err.error || 'Unknown Error!');
      console.error(err);
    } finally {
      setShowLoader(false);
    }
  }

  useEffect(() => {
    logging.info(`Loading ${props.name}`);
    let productId = props.match.params.id;
    console.log(productId);
    if (productId) {
      getProductData(productId);
    } else {
      setProduct(undefined);
      setErrorMessage('Product Not Exist!');
    }
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
      {product && (
        <div className="product-container">
          {product._id ? (
            <div className="product-item">
              <div className="product-image">
                <img src={product.image} alt="product" />
              </div>
              <div className="product-detail">
                <div className="product-title">
                  {product.title}
                </div>
                <div className="product-desc">
                  {product.description}
                </div>
                <div className="product-price">₹ {product.price}</div>
                <div className="form-btns">
                  <button className={'btn ' + (!props.state.isLoggedIn && 'disabled')}>Buy Now</button>
                </div>
                {
                  !props.state.isLoggedIn && (
                    <div style={{'marginTop': '1rem'}}>
                      Please <Link to="/login">Login</Link> to Buy this product
                    </div>
                  )
                }
              </div>
            </div>
          ) : (
            <div className="product-empty">
              There is no product available, Please go back{" "}
              <Link to="/">Home</Link> to get the product.
            </div>
          )}
        </div>
      )}
    </>
  )
};

export default withRouter(ProductPage);

