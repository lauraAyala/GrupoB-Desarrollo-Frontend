import './App.css';
import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,

} from "react-router-dom";
import './App.css';
import Login from './componentes/Login';
import Home from './componentes/Home';
import Register from './componentes/Register';
import Profile from './componentes/Profile';
import Project from './componentes/Project'





export default class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Route>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Project></Project>



          </Switch>
        </Route>
      </BrowserRouter>);
  }
}