import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function Student() {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((res) => {
        console.log(res.data);
        setStudent(Array.isArray(res.data) ? res.data : res.data.students || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50 border bg-white p-4 rounded">
        <button className="btn btn-success mb-2">Add Student</button>
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {student.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
