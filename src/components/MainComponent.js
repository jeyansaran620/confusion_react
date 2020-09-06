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
import {postComment, fetchPromos, fetchComments, fetchLeaders, fetchDishes, postFeedback} from '../redux/ActionCreaters';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Main extends React.Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  

  render()
  {
    const HomePage = () => {
      return ( 
        <Home dish={this.props.dishes}
        promotion={this.props.promotions}
        leader={this.props.leaders}
        />
      )
    }
    const dishWithId = ({match}) => {
      return (    
           <DishDetail dish = {this.props.dishes}
              comments = {this.props.comments}
              postComment={this.props.postComment}
              dishId={parseInt(match.params.dishId,10)}
             />
        );
    }

  return (
    <div>   
     <Header />
     <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
       <Switch>
         <Route path="/home" component={HomePage} />
         <Route exact path="/menu" component={() =>  <Menu menu={this.props.dishes}  /> } />
         <Route path ="/menu/:dishId" component={dishWithId} />
         <Route exact path="/aboutus" component={() =>  <About leaders={this.props.leaders}/> } />
         <Route exact path="/contactus" component={() =>  <Contact resetFeedbackForm={this.props.resetFeedbackForm}  postFeedback={this.props.postFeedback}/> } />
         <Redirect to="/home" />
       </Switch>
       </CSSTransition>
          </TransitionGroup>
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
const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstname, lastname, telnum,email,agree,contactType,message) => dispatch(postFeedback(firstname, lastname, telnum,email,agree,contactType,message)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
