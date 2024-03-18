import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'; // for all react routes
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Provider } from 'react-redux';
import store from './store.js';
// import 'bootstrap/dist/css/bootstrap.min.css'; // this is the bootstrap default
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css'; //bradtravercy own custom bootstrap
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import HomeScreen from './screens/HomeScreen'; // any screen you want to create a route to you need to import here
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import OrderListScreen from './screens/admin/OrderListScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      
      <Route path='' element={<PrivateRoute />}>
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
          <Route path="/admin/orderlist" element={<OrderListScreen />} />
          
      </Route>
    </Route>
  )
);
// <Route index={true} path="/" element={<HomeScreen />} /> index true means that it will show only the HomeScreen on path "/" not multiple screens
//any private routes would go where the shipping route is -it will redirect to the login page if user is not login


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
