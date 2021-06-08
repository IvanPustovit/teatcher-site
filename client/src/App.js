import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Footer from "./component/Footer";

import Login from "./component/forms/Login";
import Register from "./component/forms/Register";
import Navigation from "./component/naigation/Navigation";
import AdminPanel from "./pages/AdminPanel.js";
import Documentation from "./pages/Documentation";
import Home from "./pages/Home";
import PhotoGallery from "./pages/PhotoGallery";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import SendEmailPass from "./pages/SendEmailPass";
import { getAuth } from "./redux/middleware/axios";

import "./style/global.css";
import { PrivateRouter, PrivateRouterProfile } from "./utils/route";

function App() {
  const currentUser = useSelector((state) => state.platform.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(getAuth(token));
    }
  }, []);

  return (
    <div className="App">
      <Navigation user={currentUser} />

      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/document" component={Documentation} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/photo" component={PhotoGallery} />
        {/* <Route path="/admin" component={AdminPanel} /> */}
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/reset" component={ResetPassword} />
        <Route path="/sendEmail" component={SendEmailPass} />

        <PrivateRouter component={AdminPanel} path="/admin" />
        <PrivateRouterProfile path="/profile">
          <Profile user={currentUser} />
        </PrivateRouterProfile>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
