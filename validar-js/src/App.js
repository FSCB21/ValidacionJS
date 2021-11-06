import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from "./layouts/Header";
import Index from "./pages/Index";
import Productos from "./pages/productos/Productos";

function App() {
  return (
    <Router>

      <Header />

      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        
        <Route exact path="/productos">
          <Productos />
        </Route> 
 
      </Switch>
    </Router>
  );
}

export default App;
