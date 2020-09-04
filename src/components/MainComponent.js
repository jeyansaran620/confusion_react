import React from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetail';
import  Header from './Header';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import {Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

class Main extends React.Component {

  render()
  {
    const HomePage = () => {
      return ( 
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        leader={this.props.leaders.filter((lead) => lead.featured)[0]}
        />
      )
    }
    const dishWithId = ({match}) => {
      return (    
           <DishDetail dish = {this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
             comments = {this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
           />
        );
    }

  return (
    <div>   
     <Header />
    
       <Switch>
         <Route path="/home" component={HomePage} />
         <Route exact path="/menu" component={() =>  <Menu menu={this.props.dishes}/> } />
         <Route path ="/menu/:dishId" component={dishWithId} />
         <Route exact path="/aboutus" component={() =>  <About leaders={this.props.leaders}/> } />
         <Route exact path="/contactus" component={Contact} />
         <Redirect to="/home" />
       </Switch>
    <Footer />
    </div>
  );
  }
}

const mapStateToProps = state => {
  return {
     dishes : state.dishes,
     comments : state.comments,
     leaders : state.leaders,
     promotions : state.promotions
  }
}

export default withRouter(connect(mapStateToProps)(Main));
