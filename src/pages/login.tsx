import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login.css";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Alert, Toast } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseconfig";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [signInWithEmailAndPassword, userdata, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate('/employees');
    }
  }, [user])

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(email, password)
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="Login">
      {
        error && <Alert variant='danger'>
          Error: {error.message}
        </Alert>
      }

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" >
          Submit
        </Button>

        <div className="mt-3">
          <Link to='/register'>Register</Link>
        </div>

      </Form>
    </div>
  );
}

export default Login;
