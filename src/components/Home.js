import React from 'react';
import {Card, CardImg, CardText,
     CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const RenderCard = ({isLoading,errMess,item}) => {
    if (isLoading) {
        return(
                <Loading />
        );
    }
    else if (errMess) {
        return(
                <h4>{errMess}</h4>
        );
    }
    else
    return (
        <Card>
            <CardImg src={baseUrl + item.image} alt={item.name}/>
            <CardBody>
                <CardTitle className="h4">{item.name}</CardTitle>
                {item.designation ? <CardSubtitle className="h6">{item.designation}</CardSubtitle> : null}
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}



const Home  = (props) => {
    console.log(props);
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard isLoading={props.dish.isLoading} errMess={props.dish.errMess} item={props.dish.dishes.filter((dish) => dish.featured)[0]}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard isLoading={props.promotion.isLoading} errMess={props.promotion.errMess} item={props.promotion.promotions.filter((promo) => promo.featured)[0]}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard  isLoading={props.leader.isLoading} errMess={props.leader.errMess} item={props.leader.leaders.filter((lead) => lead.featured)[0]}/>
                </div>
            </div>
        </div>
    );
}

export default Home;