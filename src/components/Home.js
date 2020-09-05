import React from 'react';
import {Card, CardImg, CardText,
     CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from './LoadingComponent';

const RenderCard = ({item}) => {
    return (
        <Card>
            <CardImg src={item.image} alt={item.name}/>
            <CardBody>
                <CardTitle className="h4">{item.name}</CardTitle>
                {item.designation ? <CardSubtitle className="h6">{item.designation}</CardSubtitle> : null}
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}



const Home  = (props) => {

    if (props.menu.isLoading) {
        return(
                <Loading />
        );
    }
    else if (props.menu.errMess) {
        return(
                <h4>{props.menu.errMess}</h4>
        );
    }
    else
        console.log(props.menu)
       const dish = props.menu.dishes.filter((dish) => dish.featured)[0]
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={dish}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader}/>
                </div>
            </div>
        </div>
    );
}

export default Home;