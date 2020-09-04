import React from 'react';

import {Card , CardImg, CardText, CardBody,
     CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';


    
const DishDesc = (dish) => {
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
const DishComments = (comments) => {
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
           </div>
       );
}

const DishDetail = ({dish,comments}) => {

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
           {DishDesc(dish)}
           {DishComments(comments)}
        </div>
        </div>
       )
    }
    else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;