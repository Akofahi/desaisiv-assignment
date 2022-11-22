import { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import Register from './pages/register';
import Emptable from './pages/emptable';
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
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebaseconfig';

function App() {
  const location = useLocation();
  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    navigate('/employees')
  }, [])


  return (
    <div className="App">

      <header className="App-header">

        <Nav activeKey={location.pathname} className='nav-bar d-flex justify-content-center flex-column flex-sm-row mb-5'>

          {
            !user && <Nav.Item>
              <Nav.Link as={Link} to='/register' className='nav-link' href='/register'>
                Register
              </Nav.Link>
            </Nav.Item>
          }
          {
            !user && <Nav.Item>
              <Nav.Link as={Link} to='/login' className='nav-link' href='/login'>
                Login
              </Nav.Link>
            </Nav.Item>
          }
          {
            user && <Nav.Item>
              <Nav.Link as={Link} to='/employees' className='nav-link' href='/employees'>
                Employees
              </Nav.Link>
            </Nav.Item>
          }


        </Nav>

      </header>

      <Container>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/employees' element={<Emptable />} />
        </Routes>
      </Container>
    </div>
  );
}


export default App;
