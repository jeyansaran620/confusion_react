import React from 'react';
import {Card , CardImg, CardImgOverlay, 
    CardTitle} from 'reactstrap';

const Menu = ({menu,onSelect}) => {

        return (
                <div className="row">
            {menu.map((dish) => {
               return (
                 <div key={dish.id} className ="col-12 col-md-5 m-1">
                   <Card onClick= {() => onSelect(dish.id)}>
                       <CardImg width="100%" src={dish.image} alt={dish.name} />
                   <CardImgOverlay className="ml-5">
                       <CardTitle>{dish.name} </CardTitle>
                   </CardImgOverlay>
                </Card>
               </div>)
                })}
                </div>
        );
}

export default Menu;