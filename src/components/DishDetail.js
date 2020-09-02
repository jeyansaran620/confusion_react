import React from 'react';
import {Card , CardImg, CardImgOverlay, 
    CardText, CardBody, CardTitle} from 'reactstrap';
    
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
const DishComments = (dish) => {
       return(
           <div className ="col-12 col-md-5 m-1">
           <h3>Comments</h3>
              {dish.comments.map((comment) =>{
                  return (
                      <div key={comment.id}>
                          <div  className="m-3">{comment.comment}</div>
                  <div  className="m-3">-- {comment.author}, {comment.date}</div>
                      </div>
                  );
              })}
           </div>
       );
}

class DishDetail extends React.Component {
    render()
    {
    const dish = this.props.dish;
    if(dish != null)
    {
       return(
           <div className="row">   
           {DishDesc(dish)}
           {DishComments(dish)}
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