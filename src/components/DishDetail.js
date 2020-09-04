import React from 'react';

import {Card , CardImg, CardText, CardBody, Row, Col, Label,
     CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, 
     ModalHeader, ModalBody} from 'reactstrap';
     
import { Control, LocalForm, Errors } from 'react-redux-form';

import {Link} from 'react-router-dom';


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
    console.log(JSON.stringify(values));
    alert(JSON.stringify(values));
}
    
  DishDesc = (dish) => {
           return(           
     <div className ="col-12 col-md-5 m-1">
       <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody> 
              <CardTitle><h5>{dish.name}</h5></CardTitle>
                   <CardText>{dish.description}</CardText>
            </CardBody>
       </Card>
       </div>
           ); 
    }

   DishComments = (comments) => {
       return(
           <div className ="col-12 col-md-5 m-1">
           <h3>Comments</h3>
              {comments.map((comment) =>{
                  return (
                      <div key={comment.id}>
                          <div  className="m-3">{comment.comment}</div>
                  <div  className="m-3">-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
                      </div>
                  );
              })}
            <Button outline onClick={() => this.toggleModal()} >
            <span className="fa fa-sign-in fa-lg" ></span>
            Submit Comment</Button>
           </div>
       );
}

render(){

    const dish = this.props.dish;
    const comments = this.props.comments;

    if(dish !== undefined)
    {

       return(
        <div className="container">
        <div className="row">
           <Breadcrumb>
           <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
           </Breadcrumb>
           <div className="col-12"> 
              <h3>Menu</h3>
           </div>
        </div>
        <div className="row">   
           {this.DishDesc(dish)}
           {this.DishComments(comments)}
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
                                <Label htmlFor="yourname" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
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
        </div>
       )
    }
    else {
        return (
            <div></div>
        );
    }
  }
}

export default DishDetail;