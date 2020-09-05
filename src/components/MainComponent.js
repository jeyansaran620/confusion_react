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
import {addComment, fetchDishes} from '../redux/ActionCreaters';
import { actions } from 'react-redux-form';
class Main extends React.Component {

  componentDidMount() {
    this.props.fetchDishes();
  }

  render()
  {
    const HomePage = () => {
      return ( 
        <Home menu={this.props.dishes}
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        leader={this.props.leaders.filter((lead) => lead.featured)[0]}
        />
      )
    }
    const dishWithId = ({match}) => {
      return (    
           <DishDetail menu = {this.props.dishes}
              comments = {this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
              addComment={this.props.addComment}
              dishId={parseInt(match.params.dishId,10)}
             />
        );
    }

  return (
    <div>   
     <Header />
    
       <Switch>
         <Route path="/home" component={HomePage} />
         <Route exact path="/menu" component={() =>  <Menu menu={this.props.dishes}  /> } />
         <Route path ="/menu/:dishId" component={dishWithId} />
         <Route exact path="/aboutus" component={() =>  <About leaders={this.props.leaders}/> } />
         <Route exact path="/contactus" component={() =>  <Contact resetFeedbackForm={this.props.resetFeedbackForm}/> } />
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
const mapDispatchToProps = (dispatch) => ({
   addComment : (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
   fetchDishes: () => { dispatch(fetchDishes())},
   resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
