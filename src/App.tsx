import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import Register from './pages/register';
import Emptable from './pages/emptable';
import * as firebase from './firebase.js'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';


const routes = [
  {
    lable: 'Home',
    component: <Home />,
    path: '/'
  },
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
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">

          <Nav className='d-flex justify-content-center flex-column flex-sm-row mb-5'>
            {
              routes.map(route =>
                <Nav.Item>
                  <Nav.Link>
                    <Link to={route.path}>{route.lable}</Link>
                  </Nav.Link>
                </Nav.Item>)
            }
          </Nav>

        </header>

        <Container>
          <Routes>
            {
              routes.map(route => <Route path={route.path} element={route.component} />)
            }
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

function Home() {
  return <h1>Home</h1>;
}


export default App;
