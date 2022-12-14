import Table from "react-bootstrap/Table";
import { getFirestore, collection, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db, firebase } from "../firebaseconfig";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import { Button, Form, Toast, ToastContainer } from "react-bootstrap";

interface Employee {
  id: string;
  firstName: string;
  lastName: string
}

function Emptable() {
  const [filter, setFilter] = useState("");
  const [user] = useAuthState(auth);
  const [id, setId] = useState(null);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const handleClose = () => setShowModal(false);
  const showEditEmployee = (emp) => {
    setId(emp.id);
    setfName(emp.firstName);
    setlName(emp.lastName);
    setShowModal(true);
  }
  const saveChanges = () => {
    updateDoc(doc(db, "Users", id), {
      firstName: fName,
      lastName: lName,
    }).then(res => {
      console.log(res);
      setShowModal(false);
    });
  }

  const filterFn = (emp: Employee) => {
    const filterText = filter.toLowerCase().trim();
    if (!filterText) return true;
    return emp.firstName.toLowerCase().includes(filterText) || emp.lastName.toLowerCase().includes(filterText)
  };

  function deleteEntry() {
    deleteDoc(doc(db, "Users", id));
    handleClose();
  }

  const [value, loading, error] = useCollection(
    collection(getFirestore(firebase), "Users"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    setShowToast(true);
  }, []);

  return (
    <>
<ToastContainer className="p-3" position={'bottom-end'}>
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Login Success</strong>
        </Toast.Header>
        <Toast.Body>Welcome back {user?.email}</Toast.Body>
      </Toast>
      </ToastContainer>

      <Form.Group className="mb-3" controlId="filter">
        <Form.Control
          type="text"
          placeholder="Filter employees"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Form.Group>

      <Table striped bordered hover size="sm">
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {value?.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(filterFn).map((emp: Employee) => (

            <React.Fragment key={emp.id}>

              <tr>
                <td>{JSON.stringify(emp.firstName)}, </td>
                <td>{JSON.stringify(emp.lastName)}, </td>
                <td>
                  {" "}
                  <>
                    {" "}
                    <Button onClick={() => showEditEmployee(emp)}>
                      <BiPencil />
                    </Button>{" "}
                    <Modal show={showModal} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder={JSON.stringify(emp.firstName)}
                              autoFocus
                              value={fName}
                              onChange={(e) => setfName(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder={JSON.stringify(emp.lastName)}
                              autoFocus
                              value={lName}
                              onChange={(e) => setlName(e.target.value)}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="danger" onClick={() => deleteEntry()}>
                          Delete
                        </Button>
                        <Button variant="primary" onClick={() => saveChanges()}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Emptable;
