import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// Basics
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/index";
import "./globalCSS/app.scss";

// Login & Error
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound";

// Registration
import Register from "./pages/RegisterForms/Register";
import KgRegister from "./pages/RegisterForms/KgRegister";
import TeacherRegister from "./pages/RegisterForms/TeacherRegister";
import ManagerRegister from "./pages/RegisterForms/ManagerRegister";
import ChildRegister from "./pages/RegisterForms/ChildRegister";

// Dashboard
import EditProfile from "./pages/EditProfile/EditProfile";
import TeacherDashboard from "./pages/Dashboards/TeacherDashboard/TeacherDashboard";
import ManagerDashboard from "./pages/Dashboards/ManagerDashboard/ManagerDashboard";
import Teachers from "./pages/Teachers/Teachers";
import Calendar from "./components/Cards/appCards/Calendar/Calendar";
import Container from "./Container";

import Attendance from "./pages/Attendance/Attendance";
import AllGroups from "./pages/GroupsPages/AllGroups";
import SingleGroupEdit from "./pages/GroupsPages/SingleGroupEdit";
import SingleGroup from "./pages/GroupsPages/SingleGroup";
import AllChildren from "./pages/Children/AllChildren";
import AddGroup from "./pages/GroupsPages/AddGroup";
import ChildEdit from "./pages/Children/ChildEdit";
import SuccessPage from "./pages/Children/SuccessPage";

function App() {
  return (
    <Container>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/register" component={Register} />
          <Route path="/kgregister" component={KgRegister} />
          <Route path="/mregister" component={ManagerRegister} />
          <Route path="/tregister" component={TeacherRegister} />
          <Route path="/cregister" component={ChildRegister} />
          <Route path="/editchild" component={ChildEdit} />
          <Route path="/login" component={Login} />
          <Route path="/mpage" component={ManagerDashboard} />
          <Route path="/teachers" component={Teachers} />
          <Route path="/tpage" component={TeacherDashboard} />
          <Route path="/attendance" component={Attendance} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/groups" component={AllGroups} />
          <Route path="/editgroup" component={SingleGroupEdit} />
          <Route path="/group" component={SingleGroup} />
          <Route path="/children" component={AllChildren} />
          <Route path="/addgroup" component={AddGroup} />
          <Route path="/editprofile" component={EditProfile} />
          <Route path="/success" component={SuccessPage} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Container>
  );
}

export default withRouter(App);
