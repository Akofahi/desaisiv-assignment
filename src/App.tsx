import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import Register from './pages/register';
import Emptable from './pages/emptable';
import * as firebase from './firebaseconfig'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';


const routes = [
  {
    lable: 'Register',
    component: <Register />,
    path: '/register'
  },
  {
    lable: 'Login',
    component: <Login />,
    path: '/login'
  },
  {
    lable: 'employees',
    component: <Emptable />,
    path: '/employees'
  },
]

function App() {
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    navigate('/employees')
  }, [])
  
  return (
    <div className="App">

      <header className="App-header">

        <Nav activeKey={location.pathname} className='nav-bar d-flex justify-content-center flex-column flex-sm-row mb-5'>
          {
            routes.map(route =>
              <Nav.Item key={route.path}>
                <Nav.Link as={Link} to={route.path} className='nav-link' href={route.path}>
                  {route.lable}
                </Nav.Link>
              </Nav.Item>)
          }
        </Nav>

      </header>

      <Container>
        <Routes>
          {
            routes.map(route => <Route key={route.path} path={route.path} element={route.component} />)
          }
        </Routes>
      </Container>
    </div>
  );
}


export default App;
