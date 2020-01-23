import React from "react";
import s from "./style.css";

const Card = props => (
  <div className={"game-card card img-container " + s.card}>
    <img 
      alt={"This image is " + props.name} 
      id={props.id}
      className="gameCards"
      src={props.image}
      style={{"width": "100%", "height": "100%"}}
      onClick={() => props.handleClick(props.id)}
      onMouseOver={() => props.handleHover(props.id)}
      onMouseLeave={() => props.handleLeave(props.id)}
    />
  </div>
);

export default Card;
