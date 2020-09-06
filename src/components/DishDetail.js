import React from 'react';

import {Card , CardImg, CardText, CardBody, Row, Col, Label,
     CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, 
     ModalHeader, ModalBody} from 'reactstrap';
import { Loading } from './LoadingComponent';    
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Control, LocalForm, Errors } from 'react-redux-form';

import {Link} from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);



class DishDetail extends React.Component {

    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);  
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.state = {     
          isModalOpen : false,
        };
      }

    toggleModal = () => {
       this.setState({
        isModalOpen : !this.state.isModalOpen
      });
   }

   handleSubmit(values) {
       this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);
       this.toggleModal();
}
    
  DishDesc = (dish) => {
    

    if (dish.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (dish.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{dish.errMess}</h4>
                </div>
            </div>
        );
    }
    else 
    {
        const dish1 = dish.dishes.filter((dish) => dish.id === this.props.dishId)[0];
     return(   
    <div className ="col-12 col-md-5 m-1">
     <div className="row">
        <Breadcrumb>
        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
           <BreadcrumbItem active>{dish1.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12"> 
           <h3>Menu</h3>
        </div>
     </div>
     <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
       <Card>
            <CardImg width="100%" src={baseUrl + dish1.image} alt={dish1.name} />
            <CardBody> 
              <CardTitle><h5>{dish1.name}</h5></CardTitle>
                   <CardText>{dish1.description}</CardText>
            </CardBody>
       </Card>
       </FadeTransform>
       </div>
           ); 
    }
}

   DishComments = (comments) => {
    if (comments.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (comments.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{comments.errMess}</h4>
                </div>
            </div>
        );
    }
    else 
    {
        const comment = comments.comments.filter((comment) => comment.dishId === this.props.dishId);
       return(
           <div className ="col-12 col-md-5 m-1">
           <h3>Comments</h3>
           <Stagger in>
              {comment.map((comment) =>{
                  return (
                      <Fade in key={comment.id}>
                          <div  className="m-3">{comment.comment}</div>
                  <div  className="m-3">-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
                      </Fade>
                  );
              })}
              </Stagger>
            <Button outline onClick={() => this.toggleModal()} >
            <span className="fa fa-pencil fa-lg" ></span>
            Submit Comment</Button>
           </div>
       );
   }
 }

render(){
       return(
        <>
        <div className="container">
           <div className="row">
           {this.DishDesc(this.props.dish)}
           {this.DishComments(this.props.comments)}
           </div>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>    
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required! ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
        </>
       )
    }
  }

export default DishDetail;