import './App.css';
import { Link, Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import View from './components/View';
import AllProducts from './components/AllProducts';
import Update from './components/Update';


function App() {



  return (
    <div className="App">
      <h1>Product Manager</h1>


      <BrowserRouter>
        <Switch>
          <Route path="/view/:id/edit">
            <Update />
          </Route>
          <Route exact path="/:id">
            <View />
          </Route>
          <Route exact path="/">
            <AllProducts />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;



