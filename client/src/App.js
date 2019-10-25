import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';


import SignUp from './SignUp'
import LogIn from './LogIn'
import NavBar from './NavBar'
import Landing from './Landing'


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className='App'>
        <BrowserRouter>
      
      <NavBar/>
      
      <Route path="/" exact component={Landing} />
      <Route path="/login" exact component={LogIn} />
      <Route path="/signup" exact component={SignUp} />
      
      </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
