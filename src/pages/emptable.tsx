import Table from "react-bootstrap/Table";
import { getFirestore, collection, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db, firebase } from "../firebaseconfig";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";

function Emptable() {
  const [user] = useAuthState(auth);
  const [id, setId] = useState(null);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const showEditEmployee = (doc) => {
    setId(doc.id);
    setfName(doc.data().firstName);
    setlName(doc.data().lastName);
    setShow(true);
  }
  function saveChanges(){
    console.log('saveChanges');
    
    updateDoc(doc(db, "Users",id), {
      firstName: fName,
      lastName: lName,
    }).then(res => {
      console.log(res);
      setShow(false);
      
    });
  }

  function deleteEntry(){
    deleteDoc(doc(db, "Users",id));
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
  return (
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
        {value?.docs.map((doc) => (
           
          <React.Fragment key={doc.id}>
           
            <tr>
              <td>{JSON.stringify(doc.data().firstName)}, </td>
              <td>{JSON.stringify(doc.data().lastName)}, </td>
              <td>
                {" "}
                <>
                  {" "}
                  <Button onClick={() => showEditEmployee(doc)}>
                    <BiPencil />
                  </Button>{" "}
                  <Modal show={show} onHide={handleClose}>
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
                            placeholder={JSON.stringify(doc.data().firstName)}
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
                            placeholder={JSON.stringify(doc.data().lastName)}
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
  );
}

export default Emptable;
