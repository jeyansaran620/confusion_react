import React from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';
import Menu from './components/MenuComponent';
import {DISHES} from './shared/dishes';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes : DISHES
    };
  }
  render()
  {
  return (
    <div className="App">
     <Navbar dark color="primary">
       <div className="container">
         <NavbarBrand href="/">Jeyan Saran</NavbarBrand>
       </div>
     </Navbar>
     <Menu menu={this.state.dishes} />
    </div>
  );
  }
}

export default App;
