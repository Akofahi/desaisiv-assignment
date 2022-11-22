import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./register.css";
import CountryDropdown from "country-dropdown-with-flags-for-react";
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import  {firebase, db } from "../firebaseconfig";
import { doc, addDoc, collection, getFirestore } from "firebase/firestore"; 

const auth = getAuth(firebase);



function Register() {
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    addDoc(collection(db,'Users'),{
      firstName: fName,
      lastName: lName,
      country: country,
      email: email
    })
    createUserWithEmailAndPassword(auth, email, password);

  };
  return (
    <div className="Register">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="sm-1" controlId="formBasicName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter First Name" value={fName}
            onChange={(e) => setfName(e.target.value)}/>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Last Name" value={lName}
            onChange={(e) => setlName(e.target.value)}/>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <CountryDropdown
          id="UNIQUE_ID"
          className="YOUR_CSS_CLASS"
          preferredCountries={["gb", "us"]}
          value={country}
            onChange={(e) => setCountry(e.target.value)}
        ></CountryDropdown>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Register;
