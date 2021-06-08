import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URI } from "../../constant/constant";

import InfoStudent from "../profile/InfoStudent";
import { useHistory } from "react-router";
import HomeWork from "../profile/HomeWork";
import GalleryStudent from "../profile/GalleryStudent";

const StudentProfile = () => {
  const [user, setUser] = useState();
  const history = useHistory();
  const userId = history.location.pathname.split("/")[3];

  const getStudent = async () => {
    try {
      const res = await axios.get(`${BASE_URI}/api/auth/reset?user=${userId}`);
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);
  return (
    <div>
      {user && (
        <>
          <InfoStudent user={user} />
          <HomeWork user={user} />
          <GalleryStudent user={user} />
        </>
      )}
    </div>
  );
};

export default StudentProfile;
