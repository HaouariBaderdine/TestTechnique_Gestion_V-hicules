// eslint-disable-next-line no-unused-vars
import logo from './logo.svg'
import "./App.css";
import ListVehicules from "./Views/ListVehicules";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import AddVehicule from "./Views/AddVehicule";
import ModifyVehicule from "./Views/ModifyVehicule";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ListVehicules} />
          <Route path="/addVehicule" component={AddVehicule} />
          <Route path="/modifyVehicule/:id" component={ModifyVehicule} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
