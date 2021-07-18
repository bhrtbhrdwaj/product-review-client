import { BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';
import Home from './Home';
import AddProduct from './AddProduct';
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';
import { Nav, Navbar } from 'react-bootstrap';
import ProductView from './ProductView';

function App(props) {
  let location = props;
  return (
    <div> 
      <Router>
            
            <Navbar>
            <Navbar.Brand as={Link} to="/" >Product Review</Navbar.Brand>
            <Nav activeKey={location.pathname} className="mr-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
              </Nav>
          </Navbar>
            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route path="/products/:id"><ProductView /></Route>
            </Switch>
            </Router>
    </div>
  );
}

export default App;
