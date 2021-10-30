import React, { useEffect, useState } from 'react';
import Ipage from '../interfaces/page';
import logging from '../config/logging';
import { Link, withRouter } from 'react-router-dom';
import { IProduct } from '../interfaces/product';
import config from '../config/config';
import Loader from '../shared/components/loader';

const ProductPage: React.FC<Ipage & any> = (props) => {

  // const [productId, setProductId] = useState<string>('');
  const [product, setProduct] = useState<IProduct>()
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const getProductData = async (id: string) => {
    try {
      setShowLoader(true);
      const apiResponse = await fetch(`${config.apiUrl}/products/${id}`);
      if (apiResponse.status !== 200) {
        throw new Error('Product Id Mismatches!')
      }
      const resp = await apiResponse.json();
      setProduct(resp.data);
    } catch (err: any) {
      setErrorMessage(err.error || err.message || 'Unknown Error!');
      console.error(err);
    } finally {
      setShowLoader(false);
    }
  }

  const displayRazorpay = async () => {
    try {
      setErrorMessage('');
      setSuccessMessage('');
      let resp: any = await fetch(`${config.apiUrl}/razorpay/order/${product?._id}`);
      resp = await resp.json();
      const { amount, id: order_id, currency } = resp.order;
      const options = {
        key: config.RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency,
        name: 'GFG MERN',
        description: 'GFG MERN Razorpay Payment',
        image: '',
        order_id,
        handler: async (response: any) => {
          setShowLoader(true);
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            amount: amount.toString(),
            currency
          };
          const successResp = await fetch(`${config.apiUrl}/razorpay/verify`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          });
          setSuccessMessage('Order placed successfully!');
          setTimeout(() => {
            setSuccessMessage('');
          }, 3000)
          setShowLoader(false);
        },
        prefill: {
          name: 'Sumit Kapoor',
          email: 'sumit@kapoor.com',
          contact: '0123456789',
        }
      }
      const transaction: any = new (window as any).Razorpay(options);
      transaction.open();
    } catch (err: any) {
      console.log(err.message);
      setErrorMessage(err.message || 'Unknown Error!');
    }
  }

  useEffect(() => {
    logging.info(`Loading ${props.name}`);
    let productId = props.match.params.id;
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
        <div className={`success-wrapper ${successMessage ? 'active' : ''}`}>
          <div className="success-text">{successMessage}</div>
          <span className="success-close" onClick={() => setSuccessMessage('')}></span>
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
                  <button className={'btn ' + (!props.state.isLoggedIn && 'disabled')} onClick={displayRazorpay}>Buy Now</button>
                </div>
                {
                  !props.state.isLoggedIn && (
                    <div style={{ 'marginTop': '1rem' }}>
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

