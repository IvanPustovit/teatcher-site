import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URI } from "../../constant/constant";
import { onLoader } from "../../redux/sliceReducer";
import Spiner from "../spiner/Spiner";

const GlobalInfo = () => {
  const classNumber = useSelector((state) => state.platform.classNumber);
  const loader = useSelector((state) => state.platform.loader);
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    try {
      const response = await axios.get(
        `${BASE_URI}/api/auth/users?classNumber=${classNumber}`
      );
      setStudents(response.data.user);
      dispatch(onLoader());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(onLoader());
    getStudents();
  }, [classNumber]);
  return (
    <>
      {loader && <Spiner />}

      <Table hover striped bordered>
        <thead>
          <tr>
            <th>№</th>
            <th>Аватарка</th>
            <th>ПІБ учня</th>
            <th>Клас</th>
            <th>Email</th>
            <th>Дата народження</th>
            <th>Відвідини</th>
            {/* <th>Статус д/р</th> */}
          </tr>
        </thead>
        <tbody>
          {students.length &&
            students
              .sort((a, b) =>
                a.lastName > b.lastName ? 1 : b.lastName > a.lastName ? -1 : 0
              )
              .map((student) => (
                <tr key={student._id}>
                  <td>
                    <Link to={`/admin/info/${student._id}`}>
                      {students.indexOf(student) + 1}
                    </Link>
                  </td>
                  <td>
                    <img src={student.avatar} style={{ width: "50px" }} />
                  </td>
                  <td>
                    {student.lastName} {student.name} {student.fatherName}
                  </td>
                  <td>{student.classNumber}</td>
                  <td>{student.email}</td>
                  {/* {student.owner && <td>{student.owner.birthday}</td>} */}
                  <td>{student.birthday}</td>
                  {student.dateLogin && (
                    <td>
                      {student.dateLogin.length &&
                        new Date(
                          Number(
                            student.dateLogin[student.dateLogin.length - 1]
                          )
                        )
                          .toISOString()
                          .substring(0, 10)}
                    </td>
                  )}
                </tr>
              ))}
        </tbody>
      </Table>
    </>
  );
};

export default GlobalInfo;
