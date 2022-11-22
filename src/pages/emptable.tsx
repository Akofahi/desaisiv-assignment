import Table from "react-bootstrap/Table";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, firebase } from "../firebaseconfig";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function Emptable() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate()
  const [value, loading, error] = useCollection(
    collection(getFirestore(firebase), "Users"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  useEffect(()=>{
    if (!user) {
      console.log('Dude',user)
      navigate('/login');
    } 
  },[user])
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
              <td>{JSON.stringify(doc.data().firstName)},{" "}</td>
              <td>{JSON.stringify(doc.data().lastName)},{" "}</td>
              <td></td>
            </tr>
          </React.Fragment>
        ))}

      </tbody>
    </Table>
  );

}


export default Emptable;
