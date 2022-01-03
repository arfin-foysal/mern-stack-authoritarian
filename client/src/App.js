// import logo from './logo.svg';
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Registration from "./components/Registration";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import ChangeEmail from "./components/ChangePassword";
import NotFound from "./components/NotFound";

function App() {
  const tok = localStorage.getItem("token");
  let userRoute
  let Atoken =tok;
  if (Atoken === null) {
   
    userRoute = (
      <>
        <Switch>
          <Route exact path="/registration" component={Registration } />
          <Route exact path="/login" component={Login } />
          <Redirect to="/login" />
        </Switch>
      </>
    );
  } else {
    userRoute = (
      <>
        <Switch>
          <Route exact path="/changeemail" component={ChangeEmail} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" /> 
          <Route component={NotFound } />
        </Switch>
      </>
    );
  }
  return (
    <>
      <BrowserRouter>
        <Navbar />
        {userRoute}
      </BrowserRouter>
    </>
  );
}

export default App;
