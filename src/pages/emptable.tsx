import Table from "react-bootstrap/Table";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebase } from "../firebaseconfig";
import React from "react";

function Emptable() {
  const [value, loading, error] = useCollection(
    collection(getFirestore(firebase), "Users"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
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


        {value.docs.map((doc) => (
          <React.Fragment key={doc.id}>
            <tr>
              <td>{JSON.stringify(doc.data().firstName)},{" "}</td>
              <td>{JSON.stringify(doc.data().lastName)},{" "}</td>
            </tr>
          </React.Fragment>
        ))}

      </tbody>
    </Table>
  );

}
//   <Table striped bordered hover size="sm">
//     <thead>
//       <tr>
//         <th>First Name</th>
//         <th>Last Name</th>
//       </tr>
//     </thead>
//     <tbody>
//       {
//         employees.forEach(element => {

//         });((emp) => <tr>
//           <td>{emp.firstName}</td>
//           <td>{emp.lastName}</td>
//         </tr>)
//       }

//     </tbody>
//   </Table>
// );

export default Emptable;
