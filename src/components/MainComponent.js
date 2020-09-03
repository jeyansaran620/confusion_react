import React from 'react';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import DishDetail from './DishDetail';
import  Header from './Header';
import Footer from './Footer';
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes : DISHES,
      selectedDish : null
    };
  }

  onSelect = (dishId) => {
    this.setState({
        selectedDish: dishId
    })
}

  render()
  {
  return (
    <div>   
     <Header />
     <div className="container">
     <Menu menu={this.state.dishes} onSelect={this.onSelect} />
     <DishDetail dish = {this.state.dishes[this.state.selectedDish]} />
    </div>
    <Footer />
    </div>
  );
  }
}

export default Main;
