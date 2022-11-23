import Table from "react-bootstrap/Table";
import { getFirestore, collection, updateDoc, doc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db, firebase } from "../firebaseconfig";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";

function Emptable() {
  const [user] = useAuthState(auth);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [docId,setDocID] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const saveChanges = (id) =>
    updateDoc(doc(collection(db, "Users")), {
      firstName: fName,
      lastName: lName,
    });

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
                  <Button onClick={handleShow}>
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
                      <Button variant="primary" onClick={saveChanges}>
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
