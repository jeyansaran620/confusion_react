import React from 'react';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leader';
import {PROMOTIONS} from '../shared/promotion';
import DishDetail from './DishDetail';
import  Header from './Header';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import {Switch, Route, Redirect} from 'react-router-dom';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes : DISHES,
      comments : COMMENTS,
      promotions : PROMOTIONS,
      leaders : LEADERS,
    };
  }

  render()
  {
    const HomePage = () => {
      return ( 
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
        leader={this.state.leaders.filter((lead) => lead.featured)[0]}
        />
      )
    }
    const dishWithId = ({match}) => {
      return (    
           <DishDetail dish = {this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
             comments = {this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
           />
        );
    }

  return (
    <div>   
     <Header />
    
       <Switch>
         <Route path="/home" component={HomePage} />
         <Route exact path="/menu" component={() =>  <Menu menu={this.state.dishes}/> } />
         <Route path ="/menu/:dishId" component={dishWithId} />
         <Route exact path="/aboutus" component={() =>  <About leaders={this.state.leaders}/> } />
         <Route exact path="/contactus" component={Contact} />
         <Redirect to="/home" />
       </Switch>
    <Footer />
    </div>
  );
  }
}

export default Main;
