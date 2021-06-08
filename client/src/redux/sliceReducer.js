const { createSlice } = require("@reduxjs/toolkit");

const sliceReducer = createSlice({
  name: "platform",
  initialState: {
    user: {
      currentUser: {},
      isAuth: false,
    },
    files: [],
    loader: false,
    message: "",
    classNumber: 5,
    studentList: [],
    posts: [],
    portfolioContent: [],
  },
  reducers: {
    loginUser(state, { payload }) {
      state.user = { currentUser: payload, isAuth: true };
    },
    logOutUser(state) {
      state.user = {
        currentUser: {},
        isAuth: false,
      };
    },
    onLoader(state) {
      state.loader = !state.loader;
    },
    addMessage(state, action) {
      state.message = action.payload;
    },
    enterClass(state, action) {
      state.classNumber = action.payload;
    },
    getStudentList(state, action) {
      state.studentList = action.payload;
    },
    getFiles(state, action) {
      state.files = action.payload;
    },
    addPost(state, action) {
      state.posts = action.payload;
    },
    getPortfolio(state, action) {
      state.portfolioContent = action.payload;
    },
  },
});

export default sliceReducer.reducer;
export const {
  loginUser,
  onLoader,
  addMessage,
  logOutUser,
  enterClass,
  getStudentList,
  getFiles,
  addPost,
  getPortfolio,
} = sliceReducer.actions;
