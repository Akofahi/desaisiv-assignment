import Table from 'react-bootstrap/Table';

const employees = [
  {
    firstName: 'Jacop',
    lastName: 'Smith',
  },
  {
    firstName: 'Mark',
    lastName: 'Scot',
  }
]
function Emptable() {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {
          employees.map((emp) => <tr>
            <td>{emp.firstName}</td>
            <td>{emp.lastName}</td>
          </tr>)
        }

      </tbody>
    </Table>
  );
}

export default Emptable;