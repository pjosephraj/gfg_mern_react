import IRoute from "../interfaces/route";
import AboutPage from "../pages/about";
import ContactPage from "../pages/contact";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import ProductPage from "../pages/product";
import RegisterPage from "../pages/register";
import UsersListPage from "../pages/users";

const routes: IRoute[] = [
  {
    path: '/',
    name: 'Home Page',
    component: HomePage,
    exact: true
  },
  {
    path: '/products/:id',
    name: 'Product Page',
    component: ProductPage,
    exact: true
  },
  {
    path: '/about',
    name: 'About Page',
    component: AboutPage,
    exact: true
  },
  {
    path: '/contact',
    name: 'Contact Page',
    component: ContactPage,
    exact: true
  },
  {
    path: '/login',
    name: 'Login Page',
    component: LoginPage,
    exact: true
  },
  {
    path: '/register',
    name: 'Register Page',
    component: RegisterPage,
    exact: true
  },
  {
    path: '/users',
    name: 'Users List Page',
    component: UsersListPage,
    exact: true
  },
];

export default routes;