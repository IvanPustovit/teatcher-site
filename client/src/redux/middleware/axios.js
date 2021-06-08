import axios from "axios";
import { BASE_URI } from "../../constant/constant";
import {
  addMessage,
  loginUser,
  getStudentList,
  getFiles,
  onLoader,
  addPost,
} from "../sliceReducer";

export const getUser = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URI}/api/auth/login`, payload);
    dispatch(loginUser(response.data));
    sessionStorage.setItem("token", response.data.token);
    dispatch(addMessage(response.data.message));
    dispatch(onLoader());
  } catch (error) {
    console.log(error);
    dispatch(addMessage(error.response.data.message));
  }
};

export const getAuth = (payload) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URI}/api/auth/auth`, {
      headers: { Authorization: `Bearer ${payload}` },
    });
    dispatch(loginUser(response.data));
    sessionStorage.setItem("token", response.data.token);
  } catch (error) {
    console.log(error);
    sessionStorage.removeItem("token");
  }
};

export const updateRules = (payload) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URI}/api/auth/profile/rules`, {
      headers: { Authorization: `Bearer ${payload}` },
    });
    dispatch(loginUser(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const getStudents = (payload) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URI}/api/students/${payload}`);
    dispatch(getStudentList(response.data));
  } catch (error) {
    console.log(error);
    dispatch(addMessage(error.response.data.message));
  }
};

export const getFilesFetch = (payload) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URI}/api/files/?typeDoc=${payload}`
    );
    dispatch(getFiles(response.data.files));
    dispatch(onLoader());
  } catch (error) {
    console.log(error);
    dispatch(addMessage(error.response.data.message));
  }
};

export const getFilesFetchProgress = (payload) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URI}/api/files/progress?typeProgress=${payload}`
    );
    dispatch(getFiles(response.data.files));
    dispatch(onLoader());
  } catch (error) {
    console.log(error);
    dispatch(addMessage(error.response.data.message));
  }
};

export const getFilesLessonFetch = (payload) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URI}/api/files/lesson?classNumber=${payload.title.classNumber}&typeDoc=${payload.title.typeDoc}`
    );
    dispatch(getFiles(response.data.files));
    dispatch(onLoader());
  } catch (error) {
    console.log(error);
    dispatch(addMessage(error.response.data.message));
  }
};

export const getFilesHomeworkFetch = (payload) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URI}/api/files/task?typeDoc=${payload.typeDoc}&user=${payload.user}`
    );
    dispatch(getFiles(response.data.files));
    dispatch(onLoader());
  } catch (error) {
    console.log(error);
    dispatch(addMessage(error.response.data.message));
  }
};

export const updateFilesLessonFetch = (payload) => async (dispatch) => {
  try {
    const response = await axios.put(`${BASE_URI}/api/files/task`, {
      id: payload._id,
      isDone: true,
    });
    dispatch(
      getFilesLessonFetch({
        title: {
          classNumber: response.data.file.classNumber,
          dateLesson: response.data.file.dateLesson,
          typeDoc: "task",
        },
      })
    );
    dispatch(onLoader());
  } catch (error) {
    console.log(error);
    dispatch(addMessage(error.response.data.message));
  }
};

export const uploadFileFetch = (payload) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("file", payload.fileUpload);
    formData.append("title", payload.title.titleValue);
    formData.append("typeDoc", payload.title.typeDoc);
    formData.append("typeProgress", payload.title.typeProgress);

    await axios.post(`${BASE_URI}/api/files/upload`, formData, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    });

    dispatch(getFilesFetch(payload.title.typeDoc));
    dispatch(onLoader());
  } catch (error) {
    console.log(error);
  }
};

export const uploadFileLessonFetch = (payload) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("file", payload.fileUpload);
    formData.append("title", payload.title.titleValue);
    formData.append("typeDoc", payload.title.typeDoc);
    formData.append("classNumber", payload.title.classNumber);
    formData.append("dateLesson", payload.title.dateLesson);

    await axios.post(`${BASE_URI}/api/files/upload/lesson`, formData, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    });

    // dispatch(getFilesLessonFetch(payload.title));
    dispatch(onLoader());
  } catch (error) {
    console.log(error.response);
  }
};

export const uploadAvatarFetch = (payload) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("file", payload.fileUpload);
    formData.append("title", payload.title.titleValue);
    formData.append("typeDoc", payload.title.typeDoc);

    const response = await axios.post(
      `${BASE_URI}/api/files/upload/avatar`,
      formData,
      {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      }
    );

    dispatch(loginUser(response.data));
    dispatch(addMessage(response.data.message));
  } catch (error) {
    console.log(error);
  }
};

export const downloadFile = async (file) => {
  const response = await fetch(`${BASE_URI}/api/files/download?id=${file._id}`);
  if (response.status === 200) {
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};

export const deleteFileFetch = (payload) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${BASE_URI}/api/files/delete?id=${payload._id}`
    );
    dispatch(getFilesFetch(payload.typeDoc));
    dispatch(onLoader());
  } catch (error) {
    console.log(error);
  }
};

export const addPosts = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    await axios.post(`${BASE_URI}/api/posts/create`, payload);
    dispatch(getPosts());
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (payload) => async (dispatch) => {
  try {
    dispatch(onLoader());
    const response = await axios.get(`${BASE_URI}/api/posts`);
    dispatch(addPost(response.data));
    dispatch(onLoader());
  } catch (error) {
    console.log(error);
  }
};

export const deletePosts = (payload) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URI}/api/posts/delete?_id=${payload}`);
    dispatch(getPosts());
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URI}/api/auth/profile/update`,
      payload
    );
    dispatch(loginUser(response.data));
    dispatch(addMessage(response.data.message));
  } catch (error) {
    console.log(error);
    dispatch(addMessage(error.response.data.message));
  }
};
